import React from 'react'
import PropTypes from 'prop-types'

const Home = (props) => {
    return (
        <div>
            <h2>Home Page</h2>
            {console.log(props.rate)}
        </div>
    )
}

Home.propTypes = {
    rate: PropTypes.array
}

export default Home