import React from "react"
import PropTypes from 'prop-types'
import '../../sass/_styles.scss'

const CurrencyRate = (props) => {
    return (
        <div className = "currency-rate">
            <div className = "currency-rate__name">{props.name}</div>
            <div>{props.r030}</div>
            <div>{props.rate}</div>
            <div>{props.cc}</div>
            <div>{props.exchangeDate}</div>
        </div>
    )
}

CurrencyRate.propTypes = {
    key: PropTypes.number,
    name: PropTypes.string,
    r030: PropTypes.number,
    rate: PropTypes.number,
    cc: PropTypes.string,
    exchangeDate: PropTypes.string
}

export default CurrencyRate