

import React from "react";
import { Outlet } from "react-router-dom";
import Footer from "src/components/Footer/Footer";
import Header from "src/components/Header/Header";

type Props = {};

const HomeTemplate = (props: Props) => {
  return (
    <>
      <Header/>
      <Outlet />
      <Footer/>
    </>
  );
};

export default HomeTemplate;
