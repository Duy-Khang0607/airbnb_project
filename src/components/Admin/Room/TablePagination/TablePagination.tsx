import {
  BackwardOutlined,
  CaretLeftOutlined,
  CaretRightOutlined,
  ForwardOutlined,
} from "@ant-design/icons";
import { Button, Col, Row } from "antd";
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
    <nav className=''>
      <ul className='pagination justify-content-center'>
        <li className='page-item arrow-left-single'>
          <Button
            className={
              currentPage - 1 <= 0
                ? "d-none"
                : "bg-black mx-2 rounded text-white hover:bg-gray-400"
            }
            onClick={() => handlePagination(1)}>
            <i className='fa fa-caret-left'></i>
            <i className='fa fa-caret-left'></i>
          </Button>
        </li>
        <li className='page-item arrow-left-double'>
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
            <i className='fa fa-caret-left'></i>
          </Button>
        </li>
        <li className='page-item'>
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
        </li>
        <li className='page-item arrow-right-single '>
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
            <i className='fa fa-caret-right'></i>
          </Button>
        </li>
        <li className='page-item arrow-right-double '>
          <Button
            className={
              pages.length - currentPage <= 0
                ? "d-none"
                : "bg-black mx-2 rounded text-white hover:bg-gray-400"
            }
            onClick={() => handlePagination(pages.slice(-1)[0])}>
            <i className='fa fa-caret-right'></i>
            <i className='fa fa-caret-right'></i>
          </Button>
        </li>
      </ul>
    </nav>
  );
}
