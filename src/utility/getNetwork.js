import { getEnabledWalletApi } from './getEnabledWalletApi'

// Gets the Network ID and returns a string containing the network type.
export async function getNetwork() {
    const API = await getEnabledWalletApi()
    const networkId = await API.getNetworkId()
    return networkId === 1 ? 'mainnet' : networkId === 0 ? 'testnet' : null
}