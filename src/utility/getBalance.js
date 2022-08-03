
import { Value } from '@emurgo/cardano-serialization-lib-asmjs'
import { Buffer } from 'buffer'

import { getEnabledWalletApi } from './getEnabledWalletApi'

// Gets the current balance in lovelace.
export async function getBalance() {
    const API = await getEnabledWalletApi()
    const balanceCBORHex = API && API.getBalance && await API.getBalance()
    return Value.from_bytes(Buffer.from(balanceCBORHex, "hex")).coin().to_str()
}