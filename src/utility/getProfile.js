import { fetcher } from './fetcher'

export const getProfile = async () => {
    try {
        const result = await fetcher(`/users`, { hasAuthentication: true })
        return result
    } catch (error) {
        throw error
    }
}