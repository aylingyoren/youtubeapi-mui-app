import ReactPaginate from "react-paginate";
import styled from "@emotion/styled";

const PaginationDiv = styled.div`
  margin: 20px 0 5px;

  @media (min-width: 320px) and (max-width: 442px) {
    .page-link {
      padding: 5px;
    }
  }
`;

const Pagination = ({
  pageCount,
  handlePageClick,
  currentPage,
}: {
  pageCount: number;
  handlePageClick: (selectedItem: { selected: number }) => void;
  currentPage: number;
}) => (
  <>
    {pageCount > 0 && (
      <PaginationDiv>
        <ReactPaginate
          pageCount={pageCount}
          previousLabel={`<<`}
          nextLabel={`>>`}
          breakLabel={`...`}
          marginPagesDisplayed={2}
          pageRangeDisplayed={2}
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
      </PaginationDiv>
    )}
  </>
);

export default Pagination;
