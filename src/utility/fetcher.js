import { getAccessToken } from './accessToken'

import { config } from '../config'

const { API_ENDPOINT } = config

export const fetcher = async (endpoint, config) => {
    const headers = {
        Accept: 'application/json',
        'Content-Type': 'application/json',
    }

    const params = {
        method: config && config.method ? config.method : 'GET',
        headers,
    }

    if (config && config.hasAuthentication) {
        const accessToken = getAccessToken()
        if (!accessToken) throw new Error(401)
        headers.Authorization = `Bearer ${accessToken}`
    }

    if (config && config.body) {
        if (config.contentType === 'multipart') {
            params.body = config.body
            delete headers['Content-Type']
        } else {
            params.body = JSON.stringify(config.body)
        }
    }

    try {

        const response = await fetch(`${API_ENDPOINT}${endpoint}`, params)

        if (response.status === 401 && config && config.hasAuthentication) {
            throw response.status
        }

        if (response.status > 299) {
            throw response.status
        }

        const contentType = response.headers.get('content-type')
        if (contentType && contentType.indexOf('application/json') !== -1) {
            return response.json().then((data) => {
                return data
            })
        } else {
            return response.text().then((text) => {
                return text
            })
        }
    } catch (error) {
        throw error
    }
}