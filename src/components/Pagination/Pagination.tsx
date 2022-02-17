import React, { useState } from "react";
import ReactPaginate from "react-paginate";
import "./Pagination.css";

function Pagination({
  videosPerPage,
  totalVideos,
  paginate,
}: {
  videosPerPage: number;
  totalVideos: number;
  paginate: Function;
}) {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalVideos / videosPerPage); i++) {
    pageNumbers.push(i);
  }

  const handlePageClick = (data: any) => console.log(data.selected);
  return (
    <>
      <nav>
        <ul className="pagination-custom">
          {pageNumbers.map((number) => (
            <li key={number} className="page-item-custom">
              <a
                onClick={() => {
                  paginate(number);
                }}
                href="!#"
                className="page-link-custom"
                style={{ textDecoration: "none", fontSize: "24px" }}
              >
                {number}
              </a>
            </li>
          ))}
        </ul>
      </nav>
      <ReactPaginate
        pageCount={Math.ceil(totalVideos / videosPerPage)}
        previousLabel={`<<`}
        nextLabel={`>>`}
        breakLabel={`...`}
        marginPagesDisplayed={2}
        pageRangeDisplayed={3}
        onPageChange={handlePageClick}
        containerClassName={`pagination justify-content-center`}
        pageClassName={`page-item`}
        pageLinkClassName={`page-link`}
        previousClassName={`page-item`}
        nextClassName={`page-item`}
        previousLinkClassName={`page-link`}
        nextLinkClassName={`page-link`}
        breakClassName={`page-item`}
        breakLinkClassName={`page-link`}
        activeClassName={`active`}
      />
    </>
  );
}

export default Pagination;
