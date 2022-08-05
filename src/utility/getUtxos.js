import { TransactionUnspentOutput } from '@emurgo/cardano-serialization-lib-asmjs'

import { getEnabledWalletApi } from './getEnabledWalletApi'

// Gets the UTXOs from the user's wallet
export async function getUtxos() {
    try {
        const API = await getEnabledWalletApi()
        let utxos = [];
        const rawUtxos = await API.getUtxos();

        for (const rawUtxo of rawUtxos) {
            const utxo = TransactionUnspentOutput.from_bytes(Buffer.from(rawUtxo, "hex"));
            const obj = {
                TransactionUnspentOutput: utxo,
            }
            utxos.push(obj);
        }
        return utxos
    } catch (err) {
        throw new Error('Error while trying to get UTXOs')
    }
}