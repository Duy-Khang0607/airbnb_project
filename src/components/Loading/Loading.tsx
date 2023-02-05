import React, { Fragment } from "react";
import { useSelector } from "react-redux";
import { RootState } from "src/redux/configStore";

import gifLoading from "src/assets/imgs/loading-unscreen.gif";

type Props = {};

export default function Loading({}: Props) {
  return (
    <div
      className='fixed top-0 left-0 w-full h-full flex justify-center items-center '
      style={{ backgroundColor: "rgb(0,0,0,0.7", zIndex: "9999" }}>
      <img
        src={gifLoading}
        style={{
          backgroundColor: "transparent",
        }}
        alt=''
      />
    </div>
  );
}
