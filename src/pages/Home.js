import React from 'react'
import PropTypes from 'prop-types'
import CurrencyRates from '../components/CurrencyRates/CurrencyRates'
const Home = () => {
    return (
        <div>
            <CurrencyRates />
        </div>
    )
}

Home.propTypes = {
    rates: PropTypes.any
}

export default Home