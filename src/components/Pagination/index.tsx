import React from 'react';
import ReactPaginate from 'react-paginate';

import styles from './Pagination.module.scss';

type PaginationProps = {
  currentPage: number;
  onCurrentPage: any /**позже сделаем дело */;
};

const Pagination: React.FC<PaginationProps> = ({ currentPage, onCurrentPage }) => {
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
        forcePage={currentPage - 1}
      />
    </>
  );
};

export default Pagination;
