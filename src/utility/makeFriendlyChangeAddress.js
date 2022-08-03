import { Address } from '@emurgo/cardano-serialization-lib-asmjs'
import { Buffer } from 'buffer'

export function makeFriendlyChangeAddress(changeAddress) {
    return Address.from_bytes(Buffer.from(changeAddress, "hex")).to_bech32()
}