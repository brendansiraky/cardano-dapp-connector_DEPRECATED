import { useEffect } from 'react'

// import Web3Token from 'web3-cardano-token/dist/browser'
import { Address, TransactionUnspentOutput, Value } from '@emurgo/cardano-serialization-lib-asmjs'
import { toast } from 'react-toastify'
import _Buffer from 'buffer'

import { getWalletSelected, setWalletSelected, removeWalletSelected } from '../utility/walletHelpers'
import { DEFAULT_WALLET_VALUES, useWalletActions } from './useWalletActions'
import { useTransition } from './useTransition'

const Buffer = _Buffer.Buffer

export const useDappConnector = () => {
    const [handleUpdateTransition, transition] = useTransition()
    const [handleUpdateWalletValue, walletValues] = useWalletActions()

    useEffect(() => {
        const walletSelected = getWalletSelected()
        setTimeout(() => {
            if (walletSelected) {
                handleWalletSelect(walletSelected)
            }
        }, 1000)
        // eslint-disable-next-line
    }, [])

    async function handleWalletSelect(wallet) {
        try {

            // Set the browser storage to the wallet that we have selected
            setWalletSelected(wallet)

            // Set the transition to loading
            handleUpdateTransition({ loading: true })
            
            // Request the user to enable
            await getEnabledWalletApi()
            
            // // Authenticate the user
            // await handleAuthenticateUser()
            
            // Set the address
            await handleSetChangeAddress()
            
            // Set the balance
            await handleSetBalance()
            
            // Set the network
            await handleSetNetwork()
            
            // Set isWalletEnabled
            await handleSetWalletEnabled()

            // await getUser()

            handleUpdateTransition({ loading: false })
        } catch (error) {
            toast.error(error.message)
            handleWalletDisconnect()
            handleUpdateTransition({ loading: false })
        }
    }

    function makeFriendlyChangeAddress(changeAddress) {
        return Address.from_bytes(Buffer.from(changeAddress, "hex")).to_bech32()
    }

    function handleWalletDisconnect() {
        handleUpdateWalletValue(DEFAULT_WALLET_VALUES)
        removeWalletSelected()
        handleUpdateTransition({ loading: false })
    }

    /*
        Enables the wallet that was selected by the user.
        If the site is not already whitelisted, the user will be prompted to approve the connection.
    */
    async function getEnabledWalletApi() {
        try {
            const wallet = getWalletSelected()
            if (wallet) {
                const API = await window.cardano[wallet].enable()
                return API
            } else {
                throw new Error('User Denied access to wallet.')
            }
        } catch (error) {
            throw new Error('Unable to access wallet.')
        }
    }

    async function handleSetChangeAddress() {
        try {
            const rawChangeAddress = await getChangeAddress()
            const changeAddress = makeFriendlyChangeAddress(rawChangeAddress)
            handleUpdateWalletValue({ address: changeAddress })
        } catch (err) {
            throw new Error('Error setting the change address!')
        }
    }

    /**
     * Get the address from the wallet into which any spare UTXO should be sent
     * as change when building transactions.
     * @returns {Promise<void>}
    */
    async function getChangeAddress() {
        try {
            const API = await getEnabledWalletApi()
            const rawChangeAddress = await API.getChangeAddress()
            return rawChangeAddress
        } catch (err) {
            throw new Error('Error getting the change address!')
        }
    }

    /**
     * Gets the current balance of in Lovelace in the user's wallet
     * This doesnt resturn the amounts of all other Tokens
     * For other tokens you need to look into the full UTXO list
     * @returns {Promise<void>}
    */
    async function handleSetBalance() {
        try {
            const API = await getEnabledWalletApi()
            const balanceCBORHex = API && API.getBalance && await API.getBalance()
            const balance = Value.from_bytes(Buffer.from(balanceCBORHex, "hex")).coin().to_str()
            handleUpdateWalletValue({ balance })
        } catch (err) {
            throw new Error('Error found when getting balance!')
        }
    }

    /**
     * Gets the Network ID to which the wallet is connected
     * 0 = testnet
     * 1 = mainnet
     * @returns {Promise<void>}
    */
    async function handleSetNetwork() {
        try {
            const API = await getEnabledWalletApi()
            const networkId = await API.getNetworkId()
            const network = networkId === 1 ? 'mainnet' : networkId === 0 ? 'testnet' : null
            handleUpdateWalletValue({ network })
        } catch (error) {
            throw new Error('Error while trying to get the networkId')
        }
    }

    async function handleSetWalletEnabled() {
        try {
            const walletSelected = getWalletSelected()
            if (walletSelected) {
                const isEnabled = await window.cardano[walletSelected].isEnabled()
                handleUpdateWalletValue({ walletEnabled: isEnabled })
            }
        } catch (error) {
            throw new Error('Error checking if wallet is enabled.')
        }
    }

    return {
        onWalletSelect: handleWalletSelect,
        onWalletDisconnect: handleWalletDisconnect,
        walletSelected: getWalletSelected(),
        isLoading: transition.loading,
        walletValues
    }

}