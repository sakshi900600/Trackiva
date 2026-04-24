import React from "react";
import styles from "./Pagination.module.css";

const Pagination = ({ currentPage, totalPages, setCurrentPage }) => {
  return (
    <div className={styles.pagination}>
      
      <button
        className={styles.btn}
        disabled={currentPage === 1}
        onClick={() => setCurrentPage((prev) => prev - 1)}
      >
        Prev
      </button>

      <span className={styles.pageInfo}>
        {currentPage} / {totalPages || 1}
      </span>

      <button
        className={styles.btn}
        disabled={currentPage === totalPages}
        onClick={() => setCurrentPage((prev) => prev + 1)}
      >
        Next
      </button>

    </div>
  );
};

export default Pagination;