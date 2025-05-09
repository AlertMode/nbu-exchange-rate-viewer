import React, { useEffect } from 'react'
import getRatesByDate from '../../requests/getRatesByDate'
import '../../sass/_styles.scss'
import { useStore } from '../../store'
import CurrencyRatesPaginator from './CurrencyRatesPaginator'

const CurrencyRates = () => {
  const { rates, setRates } = useStore()

  useEffect(() => {
    requestRates()
  }, [])

  async function requestRates() {
    try {
      const response = await getRatesByDate()
      console.log('response', response)
      if (response && response?.data) {
        setRates(response?.data)
      } else {
        setRates([])
        throw new Error('No data fetched')
      }
    } catch (error: unknown) {
      console.error(`ERROR >> requestRates: ${error}`)
    }
  }

  if (!rates || rates.length === 0) return <h2>No data fetched!</h2>

  return (
    <div>
      <CurrencyRatesPaginator />
    </div>
  )
}

export default CurrencyRates
