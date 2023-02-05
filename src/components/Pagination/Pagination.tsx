import { Button } from "antd";
import clsx from "clsx";
import React, { useState } from "react";
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
  const [active, setActive] = useState<number>(1);
  const handlebutton = (page: number) => {
    setCurrentPage(page);
    setActive(page);
  };

  let pages: number[] = [];

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
            onClick={() => {
              handlebutton(page);
              console.log("page", page);
              console.log("postsPerPage", postsPerPage);
              console.log("totalRow", totalRow);
              console.log("index", index);
              console.log(Math.ceil(totalRow / postsPerPage));
            }}
            className={
              page === active
                ? "bg-pink mx-2 rounded hover:bg-rose-300"
                : "bg-black mx-2 rounded hover:bg-gray-600"
            }>
            {page}
          </Button>
        );
      })}
    </div>
  );
}
