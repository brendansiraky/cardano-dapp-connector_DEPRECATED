export function saveAccessToken(access_token) {
    localStorage.setItem('access_token', access_token)
}

export function getAccessToken() {
    return localStorage.getItem('access_token')
}

export function removeAccessToken() {
    localStorage.removeItem('access_token')
}

export function checkHasAccessToken() {
    const access_token = getAccessToken()
    return !!access_token
}