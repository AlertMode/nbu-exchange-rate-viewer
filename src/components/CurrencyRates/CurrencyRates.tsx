import React, { useEffect, useState } from 'react'
import getRatesByDate from '../../requests/getRatesByDate'
import '../../sass/_styles.scss'
import { useStore } from '../../store'
import { CurrencyRateProps } from '../../types/currency.types'
import Paginator from '../common/Paginator'
import CurrencyRate from './CurrencyRate'

const CurrencyRates = () => {
  const { rates, setRates } = useStore()
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    requestRates()
  }, [])

  async function requestRates() {
    setLoading(true)
    try {
      const response = await getRatesByDate()
      if (response?.data) {
        setRates(response.data)
        setError(null)
      } else {
        setRates([])
        setError('No data fetched!')
      }
    } catch (error: unknown) {
      setError('Failed to fetch rates.')
      console.error(`ERROR >> requestRates: ${error}`)
    } finally {
      setLoading(false)
    }
  }

  if (loading) return <h2>Loading...</h2>
  if (error) return <h2>{error}</h2>
  if (!rates || rates.length === 0) return <h2>No data fetched!</h2>

  //TODO: Implement current page displaying in the site address
  return (
    <>
      <Paginator
        items={rates}
        getKey={(item) => item.cc}
        renderItem={(item: CurrencyRateProps, index) => (
          <CurrencyRate
            r030={item.r030}
            txt={item.txt}
            rate={item.rate}
            cc={item.cc}
            exchangedate={item.exchangedate}
          />
        )}
      />
    </>
  )
}

export default CurrencyRates
