import React, { useEffect, useState } from 'react'
import getRatesByDate from '../../requests/getRatesByDate'
import '../../sass/_styles.scss'
import { useStore } from '../../store'
import CurrencyRatesPaginator from './CurrencyRatesPaginator'

// TODO: Think of using promise like here:
// https://www.linkedin.com/posts/nikolaj-lebed-570438207_%D0%BA%D0%B8%D0%B4%D0%B0%D0%B2%D1%81%D1%8F-%D0%BF%D1%80%D0%BE%D0%BC%D1%96%D1%81%D0%B0%D0%BC%D0%B8-%D1%89%D0%B5-%D0%B4%D0%BE-%D1%82%D0%BE%D0%B3%D0%BE-%D1%8F%D0%BA-%D1%86%D0%B5-%D1%81%D1%82%D0%B0%D0%BB%D0%BE-activity-7332843620980396032-fkXH?utm_source=share&utm_medium=member_desktop&rcm=ACoAACTmiGwBZPGDzUoRuj1f2PbHr6Bf93y_s_s
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

  return (
    <div>
      {
        //TODO: Refactor this component to take properties from the parent component
      }
      <CurrencyRatesPaginator />
    </div>
  )
}

export default CurrencyRates
