import { useState } from 'react'

export const DEFAULT_WALLET_VALUES = {
    address: null,
    balance: null,
    network: null,
    walletEnabled: false,
}

export const useWalletActions = () => {
    const [walletValues, setWalletValues] = useState(DEFAULT_WALLET_VALUES)

    const handleUpdateWalletValue = (objToUpdate) => {
        setWalletValues(prev => ({
            ...prev,
            ...objToUpdate
        }))
    }

    return [handleUpdateWalletValue, walletValues]
}