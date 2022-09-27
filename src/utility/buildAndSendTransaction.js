import {
    Address,
    TransactionOutput,
    Value,
    TransactionBuilder,
    TransactionUnspentOutputs,
    TransactionBuilderConfigBuilder,
    LinearFee,
    BigNum,
    TransactionWitnessSet,
    Transaction
} from "@emurgo/cardano-serialization-lib-asmjs"
import { Buffer } from 'buffer'
import { toast } from 'react-toastify'

import { getEnabledWalletApi } from './getEnabledWalletApi'
import { getUtxos } from './getUtxos'
import { adaToLovelace } from './adaToLovelace'

const UNSPENT_OUTPUT = 2
const protocolParams = {
    linearFee: {
        minFeeA: "44",
        minFeeB: "155381",
    },
    minUtxo: "34482",
    poolDeposit: "500000000",
    keyDeposit: "2000000",
    maxValSize: 5000,
    maxTxSize: 16384,
    priceMem: 0.0577,
    priceStep: 0.0000721,
    coinsPerUtxoWord: "34482",
}

/**
 * Builds an object with all the UTXOs from the user's wallet
 * @returns {Promise<TransactionUnspentOutputs>}
*/
const getTxUnspentOutputs = async (utxos) => {
    let txOutputs = TransactionUnspentOutputs.new()
    // if (!utxos) return toast.error('Whoops, something went wrong.')
    for (const utxo of utxos) {
        txOutputs.add(utxo.TransactionUnspentOutput)
    }
    return txOutputs
}

/**
 * Every transaction starts with initializing the
 * TransactionBuilder and setting the protocol parameters
 * This is boilerplate
 * @returns {Promise<TransactionBuilder>}
 */
const initTransactionBuilder = async () => {
    const txBuilder = TransactionBuilder.new(
        TransactionBuilderConfigBuilder.new()
            .fee_algo(LinearFee.new(BigNum.from_str(protocolParams.linearFee.minFeeA), BigNum.from_str(protocolParams.linearFee.minFeeB)))
            .pool_deposit(BigNum.from_str(protocolParams.poolDeposit))
            .key_deposit(BigNum.from_str(protocolParams.keyDeposit))
            .coins_per_utxo_word(BigNum.from_str(protocolParams.coinsPerUtxoWord))
            .max_value_size(protocolParams.maxValSize)
            .max_tx_size(protocolParams.maxTxSize)
            .prefer_pure_change(true)
            .build()
    );

    return txBuilder
}

/**
 * The transaction is build in 3 stages:
 * 1 - initialize the Transaction Builder
 * 2 - Add inputs and outputs
 * 3 - Calculate the fee and how much change needs to be given
 * 4 - Build the transaction body
 * 5 - Sign it (at this point the user will be prompted for
 * a password in his wallet)
 * 6 - Send the transaction
 * @returns {Promise<void>}
*/

export const buildAndSendAdaTransaction = async (ada, outputAddress, changeAddress, onTransactionSuccess) => {

    try {
        const API = await getEnabledWalletApi()
        const utxos = await getUtxos()
        const amount = adaToLovelace(ada).toFixed()

        const txBuilder = await initTransactionBuilder()
        const shelleyOutputAddress = Address.from_bech32(outputAddress);
        const shelleyChangeAddress = Address.from_bech32(changeAddress);
        
        txBuilder.add_output(
            TransactionOutput.new(
                shelleyOutputAddress,
                Value.new(BigNum.from_str(amount.toString()))
            ),
        );
        
        // Find the available UTXOs in the wallet and
        // us them as Inputs
        const txUnspentOutputs = await getTxUnspentOutputs(utxos)
        
        txBuilder.add_inputs_from(txUnspentOutputs, UNSPENT_OUTPUT)
        
        // calculate the min fee required and send any change to an address
        txBuilder.add_change_if_needed(shelleyChangeAddress)
        
        // once the transaction is ready, we build it to get the tx body without witnesses
        const txBody = txBuilder.build();
        
        // Tx witness
        const transactionWitnessSet = TransactionWitnessSet.new();

        const tx = Transaction.new(
            txBody,
            TransactionWitnessSet.from_bytes(transactionWitnessSet.to_bytes())
        )

        let txVkeyWitnesses = await API.signTx(Buffer.from(tx.to_bytes(), "utf8").toString("hex"), true);
        txVkeyWitnesses = TransactionWitnessSet.from_bytes(Buffer.from(txVkeyWitnesses, "hex"));

        transactionWitnessSet.set_vkeys(txVkeyWitnesses.vkeys());

        const signedTx = Transaction.new(
            tx.body(),
            transactionWitnessSet
        );

        await API.submitTx(Buffer.from(signedTx.to_bytes(), "utf8").toString("hex"));
        onTransactionSuccess && onTransactionSuccess()
        toast.success('Transaction Submitted! Please wait atleast 5 minutes before submitting another transaction.')

    } catch (error) {
        if (typeof error === 'string' && error.includes('Balance Insufficient')) {
            toast.error('Insufficient Balance')
        } else if (error.info) {
            toast.error(`${error.info}. Try waiting a few minutes before submitting another transaction.`)
        } else {
            toast.error('Whoops something went wrong, try waiting a few minutes before submitting another transaction.')
        }
    }
}