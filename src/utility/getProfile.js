import { fetcher } from './fetcher'

export const getProfile = async () => {
    try {
        const result = await fetcher(`/profile`, { hasAuthentication: true })
        return result
    } catch (error) {
        throw error
    }
}