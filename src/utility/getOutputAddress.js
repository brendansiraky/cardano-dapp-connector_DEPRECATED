import { config } from '../config';

const { MAINNET_ADDRESS, TESTNET_ADDRESS } = config

export const getOutputAddress = (network) => {
    if (network === 'mainnet') {
        return MAINNET_ADDRESS
    } else if (network === 'testnet') {
        return TESTNET_ADDRESS
    }
    return null
}