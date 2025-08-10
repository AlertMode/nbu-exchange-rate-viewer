import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios'

/**
 * AxiosInterceptorClient is a wrapper around Axios that provides a pre-configured
 * Axios instance with interceptors for handling requests and responses.
 *
 * This class simplifies making HTTP requests by providing methods for common
 * HTTP verbs (GET, POST, PUT, PATCH, DELETE, HEAD, OPTIONS) and allows for
 * additional request configuration.
 *
 * Features:
 * - Automatically sets the base URL and default headers for all requests.
 * - Includes request and response interceptors for custom handling (e.g., adding
 *   a loading spinner, authentication, or error logging).
 *
 * Usage:
 * ```typescript
 * const client = new AxiosInterceptorClient('https://api.example.com');
 * client.get('/endpoint').then(response => console.log(response.data));
 * ```
 */
export class AxiosInterceptorClient {
  private baseURL: string
  protected readonly instance: AxiosInstance

  constructor(baseURL: string) {
    this.baseURL = baseURL
    this.instance = axios.create({
      baseURL: this.baseURL,
      headers: {
        'Content-Type': 'application/json',
      },
    })

    this.instance.interceptors.request.use((config) => {
      // TODO: Add loading spinner, auth, etc.
      return config
    })

    this.instance.interceptors.response.use(
      (response) => response,
      (error) => {
        const errorMessage =
          error.response?.data?.error || error.response?.data || error.request || error.message || 'Unknown error'
        if (error.response) {
          console.error(`ERROR >> HttpClient >> response: ${errorMessage}`)
        } else if (error.request) {
          console.error(`ERROR >> HttpClient >> request: ${errorMessage}`)
        } else {
          console.error(`ERROR >> HttpClient >> message: ${errorMessage}`)
        }
        console.error(`ERROR >> HttpClient: ${error}`)
        return Promise.reject(error)
      }
    )
  }

  /**
   * Sends a GET request to the specified URL using the Axios instance.
   *
   * @template T - The type of the response data.
   * @template R - The type of the Axios response, defaults to `AxiosResponse<T>`.
   * @param {string} url - The URL to send the GET request to.
   * @param {AxiosRequestConfig} [config] - Optional Axios request configuration.
   * @returns {Promise<R>} A promise that resolves to the Axios response.
   */
  public get<T = unknown, R = AxiosResponse<T>>(url: string, config?: AxiosRequestConfig): Promise<R> {
    return this.instance.get<T, R>(url, config)
  }

  /**
   * Sends a POST request to the specified URL with the provided data and configuration.
   *
   * @template T - The type of the response data.
   * @template R - The type of the Axios response, defaults to `AxiosResponse<T>`.
   * @param {string} url - The URL to send the POST request to.
   * @param {any} [data] - The data to be sent as the request body (optional).
   * @param {AxiosRequestConfig} [config] - Additional Axios request configuration options (optional).
   * @returns {Promise<R>} A promise that resolves to the Axios response.
   */
  public post<T = unknown, R = AxiosResponse<T>>(url: string, data?: unknown, config?: AxiosRequestConfig): Promise<R> {
    return this.instance.post<T, R>(url, data, config)
  }

  /**
   * Sends an HTTP PUT request to the specified URL with the provided data and configuration.
   *
   * @template T - The type of the response data.
   * @template R - The type of the Axios response, defaults to `AxiosResponse<T>`.
   * @param {string} url - The URL to send the PUT request to.
   * @param {any} [data] - The data to be sent as the request body (optional).
   * @param {AxiosRequestConfig} [config] - Optional Axios request configuration.
   * @returns {Promise<R>} A promise that resolves to the Axios response.
   */
  public put<T = unknown, R = AxiosResponse<T>>(url: string, data?: unknown, config?: AxiosRequestConfig): Promise<R> {
    return this.instance.put<T, R>(url, data, config)
  }

  /**
   * Sends a PATCH request to the specified URL with the provided data and configuration.
   *
   * @template T - The type of the response data.
   * @template R - The type of the Axios response, defaults to `AxiosResponse<T>`.
   * @param {string} url - The URL to send the PATCH request to.
   * @param {any} [data] - The data to be sent as the request body (optional).
   * @param {AxiosRequestConfig} [config] - Additional Axios request configuration options (optional).
   * @returns {Promise<R>} A promise that resolves to the Axios response.
   */
  public patch<T = unknown, R = AxiosResponse<T>>(
    url: string,
    data?: unknown,
    config?: AxiosRequestConfig
  ): Promise<R> {
    return this.instance.patch<T, R>(url, data, config)
  }

  /**
   * Sends an HTTP DELETE request to the specified URL with the optional configuration.
   *
   * @template T - The expected response data type.
   * @template R - The Axios response type, defaulting to `AxiosResponse<T>`.
   * @param {string} url - The URL to send the DELETE request to.
   * @param {AxiosRequestConfig} [config] - Optional Axios request configuration.
   * @returns {Promise<R>} A promise that resolves to the Axios response.
   */
  public delete<T = unknown, R = AxiosResponse<T>>(url: string, config?: AxiosRequestConfig): Promise<R> {
    return this.instance.delete<T, R>(url, config)
  }

  /**
   * Sends an HTTP HEAD request to the specified URL with the optional configuration.
   *
   * @template T - The expected response data type.
   * @template R - The Axios response type, defaulting to `AxiosResponse<T>`.
   * @param {string} url - The URL to send the HEAD request to.
   * @param {AxiosRequestConfig} [config] - Optional Axios request configuration.
   * @returns {Promise<R>} A promise that resolves to the Axios response.
   */
  public head<T = unknown, R = AxiosResponse<T>>(url: string, config?: AxiosRequestConfig): Promise<R> {
    return this.instance.head<T, R>(url, config)
  }

  /**
   * Sends an HTTP OPTIONS request to the specified URL with the optional configuration.
   *
   * @template T - The expected response data type.
   * @template R - The Axios response type, defaulting to `AxiosResponse<T>`.
   * @param {string} url - The URL to send the OPTIONS request to.
   * @param {AxiosRequestConfig} [config] - Optional Axios request configuration.
   * @returns {Promise<R>} A promise that resolves to the Axios response.
   */
  public options<T = unknown, R = AxiosResponse<T>>(url: string, config?: AxiosRequestConfig): Promise<R> {
    return this.instance.options<T, R>(url, config)
  }
}
