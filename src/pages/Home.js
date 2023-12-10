import React from 'react'
import PropTypes from 'prop-types'
import CurrenciesList from '../components/CurrencyRates/CurrenciesList'
const Home = (props) => {
    return (
        <div>
            <CurrenciesList rates = {props.rates} />
        </div>
    )
}

Home.propTypes = {
    rates: PropTypes.any
}

export default Home