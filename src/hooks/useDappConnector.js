import { useEffect } from 'react'
import { toast } from 'react-toastify'

import { getWalletSelected, setWalletSelected, removeWalletSelected } from '../utility/walletHelpers'
import { makeFriendlyChangeAddress } from '../utility/makeFriendlyChangeAddress'
import { DEFAULT_WALLET_VALUES, useWalletActions } from './useWalletActions'
import { getEnabledWalletApi } from '../utility/getEnabledWalletApi'
import { authenticateUser } from '../utility/authenticateUser'
import { getChangeAddress } from '../utility/getChangeAddress'
import { removeAccessToken } from '../utility/accessToken'
import { getNetwork } from '../utility/getNetwork'
import { getBalance } from '../utility/getBalance'
import { useTransition } from './useTransition'

export const useDappConnector = () => {
    const [handleUpdateTransition, transition] = useTransition()
    const [handleUpdateWalletValue, walletValues] = useWalletActions()

    useEffect(() => {
        const walletSelected = getWalletSelected()

        // Slight hacky fix here due to the component mounting before the some of the wallets have been injected into the window object.
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
            await authenticateUser()
            
            // Set the address
            await handleSetChangeAddress()
            
            // Set the balance
            await handleSetBalance()
            
            // Set the network
            await handleSetNetwork()
            
            // Set isWalletEnabled
            await handleSetWalletEnabled()

            handleUpdateTransition({ loading: false })
        } catch (error) {
            toast.error(error.message)
            handleWalletDisconnect()
            handleUpdateTransition({ loading: false })
        }
    }

    function handleWalletDisconnect() {
        handleUpdateWalletValue(DEFAULT_WALLET_VALUES)
        removeWalletSelected()
        removeAccessToken()
        handleUpdateTransition({ loading: false })
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

    async function handleSetBalance() {
        try {
            const balance = await getBalance()
            handleUpdateWalletValue({ balance })
        } catch (err) {
            throw new Error('Error found when getting balance!')
        }
    }

    async function handleSetNetwork() {
        try {
            const network = await getNetwork()
            handleUpdateWalletValue({ network })
        } catch (error) {
            throw new Error('Error while trying to get the network')
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