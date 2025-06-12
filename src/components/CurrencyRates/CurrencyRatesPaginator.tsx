import React, { Fragment, useState } from 'react'
import FormSelect from 'react-bootstrap/FormSelect'
import Pagination from 'react-bootstrap/Pagination'
import '../../sass/_styles.scss'
import { useStore } from '../../store'
import { CurrencyRateProps } from '../../types/currency.types'
import CurrencyRate from './CurrencyRate'

const THE_FIRST_PAGE = 1
const FIVE_ITEMS_PER_PAGE = 5
const TEN_ITEMS_PER_PAGE = 10
const MAX_PAGES_TO_DISPLAY = 7
const MAX_PAGES_IN_BAR = 7
const TRIGGER_PAGE = 6

// TODO: Refactor this component to take properties from the parent component
// In order to use any other data source, not only the store
// and to use any other data type, not only CurrencyRateProps
const Paginator = (): React.JSX.Element => {
  const { rates } = useStore()
  const [currentPage, setCurrentPage] = useState(THE_FIRST_PAGE)
  const [itemsPerPage, setItemsPerPage] = useState(TEN_ITEMS_PER_PAGE)

  const totalPages = Math.ceil(rates.length / itemsPerPage)
  const indexOfTheLastItem = currentPage * itemsPerPage
  const indexOfTheFirstItem = indexOfTheLastItem - itemsPerPage
  const currentItems = rates.slice(indexOfTheFirstItem, indexOfTheLastItem)

  const handlePageChange = (pageNumber: number): void => {
    setCurrentPage(pageNumber)
  }

  const itemsPerPageHandler = (event: React.ChangeEvent<HTMLSelectElement>): void => {
    const itemsPerPage = Number(event.target.value)
    const totalPagesRecount: number = Math.ceil(rates.length / itemsPerPage)

    if (currentPage >= totalPagesRecount) {
      setCurrentPage(totalPages - totalPagesRecount)
    }

    setItemsPerPage(itemsPerPage)
  }

  const previousPageHandler = (): void => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1)
    }
  }

  const nextPageHandler = (): void => {
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
      <div className="currencies-list ">
        {currentItems.map((item: CurrencyRateProps, index: number) => (
          <Fragment key={index}>
            <CurrencyRate
              r030={item.r030}
              txt={item.txt}
              rate={item.rate}
              cc={item.cc}
              exchangedate={item.exchangedate}
            />
          </Fragment>
        ))}
      </div>

      {/* Renders the pagination bar with the buttons for changing the page. */}
      <Pagination className="pagination-bar">
        <Pagination.Prev onClick={previousPageHandler} />
        <Pagination.Item onClick={() => handlePageChange(1)} active={1 === currentPage}>
          {1}
        </Pagination.Item>
        {/* Renders the button moving currentPage pointer three pages backward */}
        {totalPages > MAX_PAGES_TO_DISPLAY && currentPage >= TRIGGER_PAGE && (
          <Fragment>
            <Pagination.Ellipsis onClick={() => handlePageChange(currentPage - 3)} />
          </Fragment>
        )}
        {/* Renders all array's content if its length is less than the value of maxPageInBar variable */}
        {totalPages <= MAX_PAGES_TO_DISPLAY &&
          pageNumbers.slice(1, totalPages - 1).map((number) => (
            <Pagination.Item key={number} active={number === currentPage} onClick={() => handlePageChange(number)}>
              {number}
            </Pagination.Item>
          ))}
        {/* Renders the beginning of an array until the value that is set in maxPagesInBar */}
        {totalPages > MAX_PAGES_TO_DISPLAY &&
          currentPage < TRIGGER_PAGE &&
          pageNumbers.slice(1, MAX_PAGES_IN_BAR).map((number) => (
            <Pagination.Item key={number} active={number === currentPage} onClick={() => handlePageChange(number)}>
              {number}
            </Pagination.Item>
          ))}
        {/* Renders five buttons in the pagination bar. The middle is active. */}
        {totalPages > MAX_PAGES_TO_DISPLAY &&
          currentPage >= TRIGGER_PAGE &&
          currentPage <= totalPages + 1 - TRIGGER_PAGE &&
          pageNumbers.slice(currentPage - 3, currentPage + 2).map((number) => (
            <Pagination.Item key={number} active={number === currentPage} onClick={() => handlePageChange(number)}>
              {number}
            </Pagination.Item>
          ))}
        {/* Renders the ending of an array until the value of triggerPage, counting from the very end */}
        {totalPages > MAX_PAGES_TO_DISPLAY &&
          currentPage > totalPages + 1 - TRIGGER_PAGE &&
          pageNumbers.slice(totalPages - MAX_PAGES_IN_BAR, totalPages - 1).map((number) => (
            <Pagination.Item key={number} active={number === currentPage} onClick={() => handlePageChange(number)}>
              {number}
            </Pagination.Item>
          ))}
        {/* Renders the button moving currentPage pointer three pages forward */}
        {totalPages > MAX_PAGES_TO_DISPLAY && currentPage <= totalPages + 1 - TRIGGER_PAGE && (
          <Fragment>
            <Pagination.Ellipsis onClick={() => handlePageChange(currentPage + 3)} />
          </Fragment>
        )}
        <Pagination.Item onClick={() => handlePageChange(totalPages)} active={totalPages === currentPage}>
          {totalPages}
        </Pagination.Item>
        <Pagination.Next onClick={nextPageHandler} />
      </Pagination>

      {/* Select for choosing the number of cards per page. It is set to 5 by default. */}
      <div className="pagination-selector">
        <div className="pagination-selector-text">Items per page:</div>
        <div>
          <FormSelect value={itemsPerPage} onChange={itemsPerPageHandler}>
            <option value={FIVE_ITEMS_PER_PAGE}>{FIVE_ITEMS_PER_PAGE}</option>
            <option value={TEN_ITEMS_PER_PAGE}>{TEN_ITEMS_PER_PAGE}</option>
          </FormSelect>
        </div>
      </div>
    </div>
  )
}

export default Paginator
