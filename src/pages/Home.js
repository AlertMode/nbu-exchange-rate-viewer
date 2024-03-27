import React from 'react'
import PropTypes from 'prop-types'
import CurrencyRates from '../components/CurrencyRates/CurrencyRates'
const Home = (props) => {
    return (
        <div>
            <CurrencyRates rates = {props.rates} />
        </div>
    )
}

Home.propTypes = {
    rates: PropTypes.any
}

export default Home