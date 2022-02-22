import ReactPaginate from "react-paginate";
import "./Pagination.css";

function Pagination({
  pageCount,
  paginate,
}: {
  pageCount: number;
  paginate: Function;
}) {
  const handlePageClick = (data: { selected: number }) =>
    paginate(data.selected + 1);

  return (
    <>
      {pageCount > 0 && (
        <ReactPaginate
          pageCount={Math.ceil(pageCount)}
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
      )}
    </>
  );
}

export default Pagination;
