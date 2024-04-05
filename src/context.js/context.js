import { createContext, React, useState } from "react"
import PropTypes from 'prop-types'

export const RatesData = createContext(null)

const Context = ({ children }) => {
    const [rates, setRates] = useState()

    return (
        <RatesData.Provider value = {{ rates, setRates }}>
            {children}
        </RatesData.Provider>
    )
}

Context.propTypes = {
    children: PropTypes.any
}

export default Context