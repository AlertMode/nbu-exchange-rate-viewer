import React from "react"
import PropTypes from 'prop-types'

const CurrencyRate = (props) => {
    return (
        <li>
            <div>
                {console.log('ff')}
                <h2>{props.name}</h2>
                <div>{props.rate}</div>
                <div>{props.cc}</div>
                <div>{props.exchangeDate}</div>
            </div>
        </li>
    )
}

CurrencyRate.propTypes = {
    key: PropTypes.number,
    name: PropTypes.string,
    rate: PropTypes.number,
    cc: PropTypes.string,
    exchangeDate: PropTypes.string
}

export default CurrencyRate