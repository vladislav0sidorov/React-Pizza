import React from 'react';
import ReactPaginate from 'react-paginate';

import styles from './Pagination.module.scss';
const Pagination = ({ onCurrentPage }) => {
  return (
    <>
      <ReactPaginate
        className={styles.paginate}
        breakLabel="..."
        nextLabel=">"
        previousLabel="<"
        onPageChange={(changePage) => onCurrentPage(changePage.selected + 1)}
        pageRangeDisplayed={8}
        pageCount={2}
        renderOnZeroPageCount={null}
      />
    </>
  );
};

export default Pagination;