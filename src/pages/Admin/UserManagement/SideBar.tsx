import React, { useState } from "react";
import logo from "../../../assets/img/airbnb.png";
// import logo from "assets/img/airbnb.png";
import { SideBarData } from "./DataSideBar/Data";
type Props = {};

const SideBar = (props: Props) => {
  const [selected, setSelected] = useState(0);
  return (
    <div className='sideBar'>
      <div className='logo'>
        <img src={logo} alt='' className='w-20 rounded object-cover' />
        <span>
          Air<span>BnB</span>
        </span>
      </div>
      <div className='menu'>
        {SideBarData.map((item, index) => {
          return (
            <div
              key={index}
              className={selected === index ? "menuItem active" : "menuItem"}
              onClick={() => setSelected(index)}>
              <div>{item.icon}</div>
              <span>{item.heading}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default SideBar;
