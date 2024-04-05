import { useContext, React } from 'react'
import PropTypes from 'prop-types'
import { RatesData } from '../../context.js/context'
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

CurrencyRates.propTypes = {
    rates: PropTypes.any
}

export default CurrencyRates