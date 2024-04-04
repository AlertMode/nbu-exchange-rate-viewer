import React, { Fragment, useState } from 'react'
import PropTypes from 'prop-types'
import FormSelect from 'react-bootstrap/FormSelect'
import Pagination from 'react-bootstrap/Pagination'
import CurrencyRate from './CurrencyRate'
import '../../sass/_styles.scss'

const Paginator = (props) => {
    
    const [currentPage, setCurrentPage] = useState(1)
    const [itemsPerPage, setItemsPerPage] = useState(10)

    const totalPages = Math.ceil(props.items.length / itemsPerPage)
    const maxPagesToDisplay = 10
    const maxPagesInBar = 7
    const triggerPage = 6
    const indexOfTheLastItem = currentPage * itemsPerPage
    const indexOfTheFirstItem = indexOfTheLastItem - itemsPerPage
    const currentItems = props.items.slice(indexOfTheFirstItem, indexOfTheLastItem)
    
    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber)
    }
    
    const itemsPerPageHandler = (event) => {
        const totalPagesRecount = Math.ceil(props.items.length / event.target.value)

        if (currentPage > totalPagesRecount) {
            setCurrentPage(totalPages - totalPagesRecount + 1)
        }

        setItemsPerPage(event.target.value)
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
    
    const pageNumbers = []
    for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i)
    }

    return (
        <div className="pagination-container">
            <div className="currencies-list">
                {
                    currentItems.map((item, index) => (
                    <Fragment key = {index}>
                        <CurrencyRate 
                            r030 = {item.r030} 
                            name = {item.txt}
                            item = {item.item}
                            cc = {item.cc}
                            exchangeDate = {item.exchangedate}
                        />
                    </Fragment>
                    ))
                }
            </div>

            <Pagination className = "pagination-bar">
                <Pagination.Prev onClick = {previousPageHandler} />
                <Pagination.Item onClick={() => handlePageChange(1)} active = {1 === currentPage}>{1}</Pagination.Item>
                {/* Renders the button moving currentPage pointer three pages backward */}
                {
                    (totalPages > maxPagesToDisplay) && (currentPage >= triggerPage) &&
                    (   
                        <Fragment>
                            <Pagination.Ellipsis onClick={() => handlePageChange(currentPage - 3)} />
                        </Fragment>
                    )
                }
                {/* Renders all array's content if its length is less than the value of maxPageInBar variable */}
                {
                    (   
                        (totalPages <= maxPagesToDisplay) &&
                        pageNumbers.slice(1, totalPages - 1).map((number) => (
                            <Pagination.Item key = {number} active = {number === currentPage} onClick={() => handlePageChange(number)}>
                                {number}
                            </Pagination.Item>
                        ))
                    )
                }
                {/* Renders the beginning of an array until the value that is set in maxPagesInBar */}
                {
                    (   
                        (totalPages > maxPagesToDisplay) && (currentPage < triggerPage) &&
                        pageNumbers.slice(1, maxPagesInBar).map((number) => (
                            <Pagination.Item key = {number} active = {number === currentPage} onClick={() => handlePageChange(number)}>
                                {number}
                            </Pagination.Item>
                        ))
                    )
                }
                {/* Renders five buttons in the pagination bar. The middle is active. */}
                {
                    (   
                        (totalPages > maxPagesToDisplay) && (currentPage >= triggerPage) && (currentPage <= totalPages + 1 - triggerPage) &&
                        pageNumbers.slice(currentPage - 3, currentPage + 2).map((number) => (
                            <Pagination.Item key = {number} active = {number === currentPage} onClick={() => handlePageChange(number)}>
                                {number}
                            </Pagination.Item>
                        ))
                    )
                }
                { /* Renders the ending of an array until the value of triggerPage, counting from the very end */}
                {
                    (   
                        (totalPages > maxPagesToDisplay) && (currentPage > totalPages + 1 - triggerPage) &&
                        pageNumbers.slice(totalPages - maxPagesInBar, totalPages - 1).map((number) => (
                            <Pagination.Item key = {number} active = {number === currentPage} onClick={() => handlePageChange(number)}>
                                {number}
                            </Pagination.Item>
                        ))
                    )
                }
                {/* Renders the button moving currentPage pointer three pages forward */}
                {
                    (totalPages > maxPagesToDisplay) && (currentPage <= totalPages + 1 - triggerPage) &&
                    (   
                        <Fragment>
                            <Pagination.Ellipsis onClick={() => handlePageChange(currentPage + 3)} />
                        </Fragment>
                    )
                    
                }
                <Pagination.Item onClick={() => handlePageChange(totalPages)} active = {totalPages === currentPage}>{totalPages}</Pagination.Item>
                <Pagination.Next onClick = {nextPageHandler} />
            </Pagination>

            <div className = "pagination-selector">
                <div className = "pagination-selector-text">Cards per page:</div>
                <div>
                    <FormSelect value = {itemsPerPage} onChange = {itemsPerPageHandler}>
                        <option value = "5">5</option>
                        <option value = "10">10</option>
                    </FormSelect>
                </div>
            </div>
        </div>
    )
}

Paginator.propTypes = {
    items: PropTypes.array
}

export default Paginator