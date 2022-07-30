import { getAccessToken } from './accessToken'

export const checkAuthentication = async () => {
    const accessToken = getAccessToken()

    try {
        const result = await fetch(`/authenticate`, {
            method: 'GET',
            headers = {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                Authorization: `Bearer ${accessToken}`
            }
        })
        return result
    } catch (error) {
        throw error
    }
}