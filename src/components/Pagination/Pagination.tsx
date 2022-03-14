import ReactPaginate from "react-paginate";
import "./Pagination.css";

function Pagination({
  pageCount,
  handlePageClick,
  currentPage,
}: {
  pageCount: number;
  handlePageClick: (selectedItem: { selected: number }) => void;
  currentPage: number;
}) {
  return (
    <>
      {pageCount > 0 && (
        <ReactPaginate
          pageCount={pageCount}
          previousLabel={`<<`}
          nextLabel={`>>`}
          breakLabel={`...`}
          marginPagesDisplayed={2}
          pageRangeDisplayed={3}
          onPageChange={handlePageClick}
          forcePage={currentPage}
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
      )}
    </>
  );
}

export default Pagination;
