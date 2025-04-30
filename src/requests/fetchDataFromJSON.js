export async function fetchDataFromJSON(url) {
  try {
    const response = await fetch(url, {
      method: 'GET',
    })

    if (!response.ok) throw new Error(`HTTP error: ${response.status}`)

    return await response.json()
  } catch (error) {
    throw new Error(`Could not get the data: ${error.message}`)
  }
}
