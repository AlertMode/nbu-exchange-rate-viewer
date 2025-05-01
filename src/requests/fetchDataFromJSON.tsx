// TODO: Refacrtor this file to use Axios instead of Fetch API
// TODO: Also, impelemt the usage of axios.interceptors to handle errors and responses globally

export async function fetchDataFromJSON(url: string): Promise<Response> {
  try {
    const response = await fetch(url, {
      method: 'GET',
    })

    if (!response.ok) throw new Error(`HTTP error: ${response.status}`)

    return response
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error(`Could not get the data: ${error.message}`)
    }
    throw new Error('Could not get the data: Unknown error')
  }
}
