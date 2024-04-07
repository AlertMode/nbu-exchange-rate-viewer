import { useContext, React } from 'react'
import { RatesData } from '../../context/Context.js'
import CurrencyRatesPaginator from './CurrencyRatesPaginator'
import '../../sass/_styles.scss'

const CurrencyRates = () => {

    const { rates } = useContext(RatesData)

    if (!rates || rates.length === 0) return <h2>No data fetched!</h2>

    return (
        <div>
            <CurrencyRatesPaginator />
        </div>
    )
}

export default CurrencyRates