import { React, useContext } from 'react'
import { RatesData } from '../context/Context.js'


const CustomRate = () => {

    const { rates } = useContext(RatesData)

    return (
        <div>
            <h2>Changed Exchange Rates</h2>
            {console.log(rates)}
        </div>
    )
}

export default CustomRate