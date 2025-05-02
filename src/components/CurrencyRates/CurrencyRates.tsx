import React, { useEffect } from 'react'
import axiosInterceptorGetRateByDate from '../../requests/axiosInterceptorGetRateByDate'
import '../../sass/_styles.scss'
import { useStore } from '../../store'
import CurrencyRatesPaginator from './CurrencyRatesPaginator'

const CurrencyRates = () => {
  const { rates, setRates } = useStore()

  useEffect(() => {
    axiosInterceptorGetRateByDate()
      .then((response) => {
        setRates(response?.data || [])
      })
      .catch(console.error)
  }, [])

  if (!rates || rates.length === 0) return <h2>No data fetched!</h2>

  return (
    <div>
      <CurrencyRatesPaginator />
    </div>
  )
}

export default CurrencyRates
