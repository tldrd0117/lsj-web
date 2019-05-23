import axios from 'axios'
import axiosRetry from 'axios-retry'
import AxiosLogger from 'axios-logger'

const host = process.env.VUE_APP_API_HOST
const client = axios.create({
    baseURL: host,
    timeout: 10000,
    withCredentials: true
})

axiosRetry(client, { retries: 3, shouldResetTimeout: true })

client.interceptors.request.use(AxiosLogger.requestLogger, AxiosLogger.errorLogger)
client.interceptors.response.use(AxiosLogger.responseLogger, AxiosLogger.errorLogger)

export default client
