import { useState } from "react";
import Styles from "../assets/css/home.module.css";

function CustomPagination({ totalPages = 20, initialPage = 1, onPageChange }) {
  const [currentPage, setCurrentPage] = useState(initialPage);

  const goToPage = (page) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
    onPageChange && onPageChange(page);
  };

  return (
    <div className={Styles.commonPagenationMainCard}>
      <button onClick={() => goToPage(1)} disabled={currentPage === 1}>
        First
      </button>
      <button onClick={() => goToPage(currentPage - 1)} disabled={currentPage === 1}>
        Prev
      </button>

      {currentPage > 2 && <span onClick={() => goToPage(1)}>1</span>}
      {currentPage > 3 && <span>...</span>}

      {currentPage > 1 && (
        <span onClick={() => goToPage(currentPage - 1)}>{currentPage - 1}</span>
      )}

      <span className={Styles.activePage}>{currentPage}</span>

      {currentPage < totalPages && (
        <span onClick={() => goToPage(currentPage + 1)}>{currentPage + 1}</span>
      )}

      {currentPage < totalPages - 2 && <span>...</span>}
      {currentPage < totalPages - 1 && (
        <span onClick={() => goToPage(totalPages)}>{totalPages}</span>
      )}

      <button onClick={() => goToPage(currentPage + 1)} disabled={currentPage === totalPages}>
        Next
      </button>
      <button onClick={() => goToPage(totalPages)} disabled={currentPage === totalPages}>
        Last
      </button>
    </div>
  );
}

export default CustomPagination;
