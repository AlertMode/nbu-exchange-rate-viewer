import React, { Fragment, useEffect, useMemo, useState } from 'react'
import FormSelect from 'react-bootstrap/FormSelect'
import Pagination from 'react-bootstrap/Pagination'
import '../../sass/_styles.scss'

interface PaginatorProps<T> {
  items: T[]
  renderItem: (item: T, index: number) => React.ReactNode
  getKey?: (item: T, index: number) => string | number
  initialItemsPerPage?: number
  itemsPerPageOptions?: number[]
  maxPagesToDisplay?: number
  ellipsisJump?: number
}

function getPageNumbers(totalPages: number, currentPage: number, maxPages: number): number[] {
  if (totalPages <= maxPages) {
    return Array.from({ length: totalPages }, (_, i) => i + 1)
  }

  const half = Math.floor(maxPages / 2)
  let start = Math.max(currentPage - half, 1)
  const end = Math.min(start + maxPages - 1, totalPages)

  if (end - start + 1 < maxPages) {
    start = Math.max(end - maxPages + 1, 1)
  }

  return Array.from({ length: end - start + 1 }, (_, i) => start + i)
}

/**
 * A generic, reusable paginator component for displaying a list of items with pagination controls.
 * It handles the logic for slicing the items array, managing the current page, and allowing the user
 * to change the number of items displayed per page.
 *
 * @template T The type of the items in the list.
 *
 * @param {object} props The component props.
 * @param {T[]} props.items The array of items to be paginated.
 * @param {(item: T, index: number) => React.JSX.Element} props.renderItem A function that takes an item and its index, and returns the JSX element to render for that item.
 * @param {(item: T, index: number) => React.Key} [props.getKey] An optional function to generate a unique key for each item. If not provided, the item's index is used.
 * @param {number} [props.initialItemsPerPage=10] The number of items to display per page initially.
 * @param {number[]} [props.itemsPerPageOptions=[5, 10, 20]] An array of numbers representing the available options for items per page in the selector.
 * @param {number} [props.maxPagesToDisplay=7] The maximum number of page number links to display in the pagination bar.
 * @param {number} [props.ellipsisJump=3] The number of pages to jump forward or backward when an ellipsis button is clicked.
 * @returns {React.JSX.Element} A container with the list of items for the current page, pagination controls, and an items-per-page selector.
 */
const Paginator = <T,>({
  items,
  renderItem,
  getKey,
  initialItemsPerPage = 10,
  itemsPerPageOptions = [5, 10, 20],
  maxPagesToDisplay = 7,
  ellipsisJump = 3,
}: PaginatorProps<T>): React.JSX.Element => {
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage, setItemsPerPage] = useState(initialItemsPerPage)

  const totalPages = Math.ceil(items.length / itemsPerPage)

  // Clamp page if items or itemsPerPage change
  useEffect(() => {
    if (currentPage > totalPages) {
      setCurrentPage(totalPages || 1)
    }
  }, [items, itemsPerPage, totalPages, currentPage])

  const currentItems = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage
    return items.slice(start, start + itemsPerPage)
  }, [items, currentPage, itemsPerPage])

  const handlePageChange = (page: number) => {
    if (page < 1 || page > totalPages || page === currentPage) return
    setCurrentPage(page)
  }

  const handleItemsPerPageChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const newItemsPerPage = Number(event.target.value)
    const newTotalPages = Math.ceil(items.length / newItemsPerPage)
    setItemsPerPage(newItemsPerPage)
    setCurrentPage((prev) => Math.min(prev, newTotalPages) || 1)
  }

  const visiblePages = useMemo(
    () => getPageNumbers(totalPages, currentPage, maxPagesToDisplay),
    [totalPages, currentPage, maxPagesToDisplay]
  )

  if (totalPages === 0) {
    return <div>No items to display</div>
  }

  return (
    <div className="pagination-container">
      {/* Items list */}
      <div className="items-list">
        {currentItems.map((item, index) => (
          <Fragment key={getKey ? getKey(item, index) : index}>{renderItem(item, index)}</Fragment>
        ))}
      </div>

      {/* Pagination bar */}
      <Pagination className="pagination-bar" aria-label="Page navigation" role="navigation">
        <Pagination.Prev
          disabled={currentPage === 1}
          onClick={() => handlePageChange(currentPage - 1)}
          aria-label="Previous page"
        />

        {visiblePages[0] > 1 && (
          <Fragment key="start-ellipsis">
            <Pagination.Item onClick={() => handlePageChange(1)} aria-label="Page 1">
              1
            </Pagination.Item>
            <Pagination.Ellipsis
              onClick={() => handlePageChange(Math.max(currentPage - ellipsisJump, 1))}
              aria-label="Previous pages"
            />
          </Fragment>
        )}

        {visiblePages.map((page) => (
          <Pagination.Item
            key={page}
            active={page === currentPage}
            aria-current={page === currentPage ? 'page' : undefined}
            onClick={() => handlePageChange(page)}
            aria-label={`Page ${page}`}
          >
            {page}
          </Pagination.Item>
        ))}

        {visiblePages[visiblePages.length - 1] < totalPages && (
          <Fragment key="end-ellipsis">
            <Pagination.Ellipsis
              onClick={() => handlePageChange(Math.min(currentPage + ellipsisJump, totalPages))}
              aria-label="Next pages"
            />
            <Pagination.Item onClick={() => handlePageChange(totalPages)} aria-label={`Page ${totalPages}`}>
              {totalPages}
            </Pagination.Item>
          </Fragment>
        )}

        <Pagination.Next
          disabled={currentPage === totalPages}
          onClick={() => handlePageChange(currentPage + 1)}
          aria-label="Next page"
        />
      </Pagination>

      {/* Items per page selector */}
      <div className="pagination-selector">
        <div className="pagination-selector-text">Items per page:</div>
        <FormSelect value={itemsPerPage} onChange={handleItemsPerPageChange} aria-label="Items per page selector">
          {itemsPerPageOptions.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </FormSelect>
      </div>
    </div>
  )
}

export default Paginator
