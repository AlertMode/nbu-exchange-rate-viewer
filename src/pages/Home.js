import React from 'react'
import PropTypes from 'prop-types'
import CurrencyRates from '../components/CurrencyRates/CurrencyRates'

const Home = (props) => {
    return (
        <div>
            <h2>Home Page</h2>
            {console.log(props.rates)}
            <CurrencyRates rates = {props.rates} />
        </div>
    )
}

Home.propTypes = {
    rates: PropTypes.any
}

export default Home