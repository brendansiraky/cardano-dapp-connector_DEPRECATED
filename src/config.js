require('dotenv').config()

const {
    REACT_APP_API_ENDPOINT
} = process.env

export const config = {
    API_ENDPOINT: REACT_APP_API_ENDPOINT
}