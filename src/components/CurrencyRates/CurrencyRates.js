import React from 'react'
import PropTypes from 'prop-types'
import CurrencyRatesPaginator from './CurrencyRatesPaginator'
import '../../sass/_styles.scss'

const CurrencyRates = (props) => {

    if (!props.rates || props.rates.length === 0) return <h2>No data fetched!</h2>

    return (
        <div>
            <CurrencyRatesPaginator items = {props.rates} />
        </div>
    )
}

CurrencyRates.propTypes = {
    rates: PropTypes.any
}

export default CurrencyRates