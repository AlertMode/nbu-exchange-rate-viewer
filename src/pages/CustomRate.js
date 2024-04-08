import React from 'react'
import { useStore } from '../store'

const CustomRate = () => {

    const { rates } = useStore()

    return (
        <div>
            <h2>Changed Exchange Rates</h2>
            {console.log(rates)}
        </div>
    )
}

export default CustomRate