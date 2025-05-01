import React from "react"
import CurrencyRateProps from "../../types/currency.types"
import '../../sass/_styles.scss'

const CurrencyRate = (props: CurrencyRateProps) => {
    return (
        <div className = "currency-rate">
            <div className = "currency-rate__name">{props.txt}</div>
            <div>{props.r030}</div>
            <div>{props.rate}</div>
            <div>{props.cc}</div>
            <div>{props.exchangedate}</div>
        </div>
    )
}

export default CurrencyRate