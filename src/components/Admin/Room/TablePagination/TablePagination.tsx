import {
  BackwardOutlined,
  CaretLeftOutlined,
  CaretRightOutlined,
  ForwardOutlined,
} from "@ant-design/icons";
import { Button } from "antd";
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
    <nav className='d-flex justify-content-center'>
      <ul className='pagination'>
        <li className='page-item'>
          <Button
            className={
              currentPage - 1 <= 0
                ? "d-none"
                : "bg-black mx-2 rounded text-white hover:bg-gray-400"
            }
            onClick={() => handlePagination(1)}>
            {<BackwardOutlined className='text-2xl -mt-2' />}
          </Button>
        </li>
        <li className='page-item'>
          <Button
            className={
              currentPage - 1 <= 0
                ? "d-none"
                : "bg-black mx-2 rounded text-white hover:bg-gray-400"
            }
            onClick={() =>
              handlePagination(
                currentPage - 1 <= 0 ? currentPage : currentPage - 1
              )
            }>
            {<CaretLeftOutlined className='text-2xl -mt-2' />}
          </Button>
        </li>
        {pages.map((page) => (
          <Button
            className={
              page === currentPage
                ? "bg-pink mx-2 rounded text-white hover:bg-rose-300"
                : "bg-black text-white mx-2 rounded hover:bg-gray-600"
            }
            key={page}
            style={{ cursor: "pointer" }}
            onClick={() => handlePagination(page)}>
            {page}
          </Button>
        ))}
        <li className='page-item'>
          <Button
            className={
              pages.length - currentPage <= 0
                ? "d-none"
                : "bg-black mx-2 rounded text-white hover:bg-gray-400"
            }
            onClick={() =>
              handlePagination(
                currentPage + 1 > pageCount ? currentPage : currentPage + 1
              )
            }>
            {<CaretRightOutlined className='text-2xl -mt-2' />}
          </Button>
        </li>
        <li className='page-item'>
          <Button
            className={
              pages.length - currentPage <= 0
                ? "d-none"
                : "bg-black mx-2 rounded text-white hover:bg-gray-400"
            }
            onClick={() => handlePagination(pages.slice(-1)[0])}>
            {<ForwardOutlined className='text-2xl -mt-2' />}
          </Button>
        </li>
      </ul>
    </nav>
  );
}
