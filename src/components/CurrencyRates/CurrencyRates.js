import React from 'react'
import CurrencyRate from './CurrencyRate'
import PropTypes from 'prop-types'

const CurrencyRates = (props) => {

    if (props.rates.length === 0) return <h2>No data fetched!</h2>

    return (
        <ul>
            {
                props.rates.map((rate) => (
                    <CurrencyRate 
                        key = {rate.r030} 
                        name = {rate.txt}
                        rate = {rate.rate}
                        cc = {rate.cc}
                        exchangeDate = {rate.exchangedate}
                    />
                ))
            }
        </ul>
    )
}

CurrencyRates.propTypes = {
    rates: PropTypes.any
}

export default CurrencyRates