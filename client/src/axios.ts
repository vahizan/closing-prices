import axios from 'axios'
import qs from 'querystring'
const baseURL =
    process.env.NODE_ENV === 'development'
        ? 'http://localhost:3001/'
        : process.env.REACT_APP_API_BASE_URL
const instance = axios.create({
    baseURL,
    timeout: 1000,
    headers: {
        'Content-Type': 'application/json',
    },
    paramsSerializer: (params) => {
        return qs.stringify(params)
    },
})

export default instance
