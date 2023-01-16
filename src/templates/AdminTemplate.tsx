import React from "react";
import { Outlet } from "react-router-dom";

type Props = {};

const AdminTemplate = (props: Props) => {
  return (
    <>
      <header>Header</header>
      <Outlet />
      <footer>Footer</footer>
    </>
  );
};

export default AdminTemplate;
