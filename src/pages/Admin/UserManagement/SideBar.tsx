import React from "react";
import logo from "../../../assets/img/airbnb.png";
type Props = {};

const SideBar = (props: Props) => {
  return (
    <div className='sideBar'>
      <div className='logo'>
        <img src={logo} alt='' className='w-20 rounded object-cover' />
        <span>
          Air<span>BnB</span>
        </span>
      </div>
      <div className='menu'>
        <div className='menuItem'>
          <div>icon</div>
          <span>Dashboard</span>
        </div>
      </div>
    </div>
  );
};

export default SideBar;
