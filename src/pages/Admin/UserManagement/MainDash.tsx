import React from "react";
import Card from "./Card/Card";
import "./maindash.css";
type Props = {};

const MainDash = (props: Props) => {
  return (
    <div className='mainDash'>
      <h1>Trang chủ</h1>
      <Card />
    </div>
  );
};

export default MainDash;
