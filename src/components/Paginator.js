import React, { useState } from 'react'
import PropTypes from 'prop-types'
import Pagination from 'react-bootstrap/Pagination'
import CurrencyRate from './CurrencyRates/CurrencyRate'
import '../sass/_styles.scss'

const Paginator = (props) => {
    
    const itemsPerPage = 10

    const [currentPage, setCurrentPage] = useState(1)

    const indexOfTheLastItem = currentPage * itemsPerPage
    const indexOfTheFirstItem = indexOfTheLastItem - itemsPerPage

    const currentItems = props.items.slice(indexOfTheFirstItem, indexOfTheLastItem)
    
    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber)
    }

    const previousPageHandler = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1)
        }
    }

    const nextPageHandler = () => {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1)
        }
    }

    const totalPages = Math.ceil(props.items.length / itemsPerPage)
    
    const pageNumbers = []
    for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i)
    }

    return (
        <div>
            <ul className='currencies-list'>
                {
                    currentItems.map((item) => (
                        <CurrencyRate 
                            key = {item.r030} 
                            name = {item.txt}
                            item = {item.item}
                            cc = {item.cc}
                            exchangeDate = {item.exchangedate}
                        />
                    ))
                }
            </ul>

            <Pagination>
                <Pagination.Prev onClick = {previousPageHandler} />
                {
                    pageNumbers.map((number) => (
                        <Pagination.Item key = {number} active = {number === currentPage} onClick={() => handlePageChange(number)}>
                            {number}
                        </Pagination.Item>
                    ))
                }
                <Pagination.Next onClick = {nextPageHandler} />
            </Pagination>
        </div>
    )
}

Paginator.propTypes = {
    items: PropTypes.array
}

export default Paginator