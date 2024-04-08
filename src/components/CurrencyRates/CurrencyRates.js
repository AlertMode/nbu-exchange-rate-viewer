import React from 'react'
import { useStore } from '../../store'
import CurrencyRatesPaginator from './CurrencyRatesPaginator'
import '../../sass/_styles.scss'

const CurrencyRates = () => {
    const { rates } = useStore()

    console.log(rates)

    if (!rates || rates.length === 0) return <h2>No data fetched!</h2>

    return (
        <div>
            <CurrencyRatesPaginator />
        </div>
    )
}

export default CurrencyRates