import React, { useState } from "react";
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
  return (
    <nav>
      <ul className="pagination">
        {pageNumbers.map((number) => (
          <li key={number} className="page-item">
            <a
              onClick={() => {
                paginate(number);
              }}
              href="!#"
              className="page-link"
              style={{ textDecoration: "none", fontSize: "24px" }}
            >
              {number}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}

export default Pagination;
