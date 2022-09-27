import Web3Token from 'web3-cardano-token/dist/browser'
import { toast } from 'react-toastify'

import { makeFriendlyChangeAddress } from './makeFriendlyChangeAddress'
import { getEnabledWalletApi } from './getEnabledWalletApi'
import { getChangeAddress } from './getChangeAddress'
import { saveAccessToken } from './accessToken'
import { convertToHex } from './convertToHex'
import { getProfile } from './getProfile'
import { getNonce } from './getNonce'
import { fetcher } from './fetcher'

export async function authenticateUser() {

    try {
        const result = await getProfile()
        
        const rawChangeAddress = await getChangeAddress()
        const friendlyChangeAddress = makeFriendlyChangeAddress(rawChangeAddress)

        if (result.id !== friendlyChangeAddress) {
            throw new Error(401)
        }
    } catch (error) {
        if (error === 404 || error.message === '401') {

            const rawChangeAddress = await getChangeAddress()
            const friendlyChangeAddress = makeFriendlyChangeAddress(rawChangeAddress)
            const nonce = await getNonce(friendlyChangeAddress)

            if (nonce) {
                try {
                    const API = await getEnabledWalletApi()
                    const token = await Web3Token.sign(() => {
                        return API.signData(rawChangeAddress, convertToHex('Please sign this message to verify your identity.'))
                    }, '7d', { nonce })

                    if (token) {
                        const response = await fetcher(`/auth/login`, {
                            method: 'POST',
                            body: { token, address: friendlyChangeAddress }
                        })
                        saveAccessToken(response.access_token)
                        toast.success('Successfully Connected!')
                    } else {
                        throw new Error('Unable to authenticate')
                    }

                } catch (error) {
                    throw new Error(error.info)
                }
            } else {
                throw new Error('Unable to authenticate')
            }
        } else {
            throw new Error('Unable to authenticate')
        }
    }
}