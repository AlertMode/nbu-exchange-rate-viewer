import axios, { AxiosInstance } from 'axios'

const NBU_API_BASE_URL = 'https://bank.gov.ua/'

/**
 * Creates and configures an Axios instance with a predefined base URL and default headers.
 *
 * @constant
 * @type {AxiosInstance}
 * @description
 * This Axios instance is configured to communicate with the NBU API.
 * It sets the `baseURL` to `NBU_API_BASE_URL` and includes a default
 * `Content-Type` header of `application/json` for all requests.
 */
const axiosInstance: AxiosInstance = axios.create({
  baseURL: NBU_API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})

axiosInstance.interceptors.request.use((config) => {
  // TODO: For the further development, add a loading spinner to the app, etc.
  return config
})

axiosInstance.interceptors.response.use(
  async (response) => {
    return response
  },
  async (error) => {
    const errorMessage =
      error.response?.data?.error || error.response?.data || error.request || error.message || 'Unknown error'
    if (error.response) {
      console.error(`ERROR >> axiosInstance >> response: ${errorMessage}`)
    } else if (error.request) {
      console.error(`ERROR >> axiosInstance >> request: ${errorMessage}`)
    } else {
      console.error(`ERROR >> axiosInstance >> message: ${errorMessage}`)
    }
    console.error(`ERROR >> axiosInstance: ${error}`)
    return Promise.reject(error)
  }
)

export default axiosInstance
