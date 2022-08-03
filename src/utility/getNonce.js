import { fetcher } from './fetcher'

export async function getNonce(address) {

    try {
        const nonce = await fetcher(`/users/${address}`)

        if (nonce === '404') {
            const result = await fetcher(`/users`, {
                method: 'POST',
                body: { address }
            })
            return result.nonce
        }
        return nonce
    } catch (error) {
        throw new Error('Error while trying to authenticate nonce.')
    }
}