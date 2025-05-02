import { AxiosResponse } from 'axios'
import axiosInstance from '../services/axiosInterceptor'
import { CurrencyRateProps } from '../types/currency.types'

/**
 * Fetches currency exchange rates for a specific date using an Axios interceptor.
 *
 * @param - The date for which to fetch the exchange rates in the format 'YYYYMMDD'.
 *                             If no date is provided, the default is an empty string.
 * @returns {Promise<AxiosResponse<CurrencyRateProps[], unknown>>} A promise that resolves
 *          to the Axios response containing an array of currency rate properties, or undefined if an error occurs.
 * @throws {Error} Throws an error if the request fails or an unknown error occurs.
 *
 * @example
 * ```typescript
 * const rates = await axiosInterceptorGetRateByDate('20231010');
 * console.log(rates?.data);
 * ```
 */
export default async function axiosInterceptorGetRateByDate(
  date = '' // Default date format YYYYMMDD
): Promise<AxiosResponse<CurrencyRateProps[], unknown>> {
  try {
    const url = `/NBUStatService/v1/statdirectory/exchange?date=${date}&json`
    return await axiosInstance.get(url)
  } catch (error: unknown) {
    const normalizedError = error instanceof Error ? error : new Error(String(error))
    console.error(`ERROR >> axiosInterceptorGetRateByDate: ${normalizedError.message}`)
    throw normalizedError
  }
}
