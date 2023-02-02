import { Button } from "antd";
import clsx from "clsx";
import React, { useState } from "react";
import "./pagination.css";
type Props = {
  postsPerPage: number;
  setCurrentPage: (value: number) => void;
  totalRow: number;
};

export default function Pagination({
  postsPerPage,
  setCurrentPage,
  totalRow,
}: Props) {
  const [active, setActive] = useState(false);
  const handlebutton = (page: number) => {
    setCurrentPage(page);
    setActive(!active);
  };

  let pages: number[] = [];
  let currentPage = 1;
  for (let i = 1; i <= Math.ceil(totalRow / postsPerPage); i++) {
    pages.push(i);
  }
  return (
    <div>
      {pages.map((page, index) => {
        return (
          <Button
            type='primary'
            key={index}
            // onClick={() => {
            //   setCurrentPage(page);
            //   console.log(page);

            //   // setActive("btn btn-warning  mx-2 rounded-0 btnPagination");
            // }}>
            className={`bg-black mx-2 ${
              active === true ? "bg-red-600" : "bg-green-700"
            }`}
            onClick={() => {
              handlebutton(page);
            }}>
            {page}
          </Button>
        );
      })}
    </div>
  );
}
