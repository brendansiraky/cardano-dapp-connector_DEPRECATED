import { getWalletSelected } from './walletHelpers'

/*
    Enables the wallet that was selected by the user.
    If the site is not already whitelisted, the user will be prompted to approve the connection.
*/
export async function getEnabledWalletApi() {
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