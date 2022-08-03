import { getEnabledWalletApi } from './getEnabledWalletApi'

/*
    Get the address from the wallet into which any spare UTXO should be sent
    as change when building transactions.
*/
export async function getChangeAddress() {
    try {
        const API = await getEnabledWalletApi()
        const rawChangeAddress = await API.getChangeAddress()
        return rawChangeAddress
    } catch (err) {
        throw new Error('Error getting the change address!')
    }
}