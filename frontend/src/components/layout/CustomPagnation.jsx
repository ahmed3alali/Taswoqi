import React from "react";
import { useSearchParams } from "react-router-dom";
import { Pagination } from "react-bootstrap";

const CustomPagination = ({ resPerPage, filteredProductsCount, currentPage, setCurrentPage }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const totalPages = Math.ceil(filteredProductsCount / resPerPage);

  const setCurrentPageNo = (pageNumber) => {
    if (pageNumber < 1 || pageNumber > totalPages) return;
    setCurrentPage(pageNumber);
    setSearchParams({ page: pageNumber });
  };

  return (
    <div className="d-flex justify-content-center my-5">
      {filteredProductsCount > resPerPage && (
        <Pagination>
          <Pagination.First onClick={() => setCurrentPageNo(1)} disabled={currentPage === 1} />
          <Pagination.Prev onClick={() => setCurrentPageNo(currentPage - 1)} disabled={currentPage === 1} />

          {[...Array(totalPages)].map((_, index) => (
            <Pagination.Item
              key={index + 1}
              active={index + 1 === currentPage}
              onClick={() => setCurrentPageNo(index + 1)}
            >
              {index + 1}
            </Pagination.Item>
          ))}

          <Pagination.Next onClick={() => setCurrentPageNo(currentPage + 1)} disabled={currentPage === totalPages} />
          <Pagination.Last onClick={() => setCurrentPageNo(totalPages)} disabled={currentPage === totalPages} />
        </Pagination>
      )}
    </div>
  );
};

export default CustomPagination;
