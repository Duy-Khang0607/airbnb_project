import _ from "lodash";

type Props = {
  totalRow: number;
  currentPage: number;
  handlePagination: (page: number) => void;
  pageSize: number;
};

export default function TablePagination({
  totalRow,
  handlePagination,
  currentPage,
  pageSize,
}: Props) {
  const pageCount = totalRow > 0 ? Math.ceil(totalRow / pageSize) : 0;

  const pages = _.range(1, pageCount + 1);

  return (
    <nav className='d-flex justify-content-end'>
      <ul className='pagination'>
        <li className='page-item'>
          <button
            className={currentPage - 1 <= 0 ? "d-none" : "page-link"}
            onClick={() => handlePagination(1)}>
            {"<<"}
          </button>
        </li>
        <li className='page-item'>
          <button
            className={currentPage - 1 <= 0 ? "d-none" : "page-link"}
            onClick={() =>
              handlePagination(
                currentPage - 1 <= 0 ? currentPage : currentPage - 1
              )
            }>
            {"<"}
          </button>
        </li>
        {pages.map((page) => (
          <li
            className={page === currentPage ? "page-item active" : "page-item"}
            key={page}
            style={{ cursor: "pointer" }}
            onClick={() => handlePagination(page)}>
            <button className='page-link'>{page}</button>
          </li>
        ))}
        <li className='page-item'>
          <button
            className={pages.length - currentPage <= 0 ? "d-none" : "page-link"}
            onClick={() =>
              handlePagination(
                currentPage + 1 > pageCount ? currentPage : currentPage + 1
              )
            }>
            {">"}
          </button>
        </li>
        <li className='page-item'>
          <button
            className={pages.length - currentPage <= 0 ? "d-none" : "page-link"}
            onClick={() => handlePagination(pages.slice(-1)[0])}>
            {">>"}
          </button>
        </li>
      </ul>
    </nav>
  );
}
