import React from "react";
import { NavLink } from "react-router-dom";
import { clearLocalStorage, getStoreJSON } from "../utils/setting";
// import { clearLocalStorage, getStoreJSON } from "../../util/setting";

type Props = {};

export default function Dropdown({}: Props) {
  const userLogin = getStoreJSON("userLogin");
  console.log("User: ", userLogin.user.role);
  const handleLogout = () => {
    clearLocalStorage("userLogin");
    clearLocalStorage("accessToken");
  };

  const renderDropdown = () => {
    if (userLogin) {
      return (
        <>
          <li>
            <NavLink to='/profile' className='dropdown__item'>
              Profile
            </NavLink>
          </li>
          <hr />
          <li>
            {/* <a href="#" className="dropdown__item">
              Host your home
            </a> */}
            <NavLink to='/admin' className='dropdown__item'>
              Admin Management
            </NavLink>
            {/* {userLogin.user.role !== "ADMIN" ? (
              <NavLink to="/admin" className="dropdown__item">
                Admin Management
              </NavLink>
            ) : (
              <NavLink to="/admin" className="dropdown__item">
                Admin Management
              </NavLink>
            )} */}
          </li>
          <li>
            <a href='#' className='dropdown__item'>
              Host an experience
            </a>
          </li>
          <li>
            <a href='#' className='dropdown__item'>
              Help
            </a>
          </li>
          <hr />
          <li onClick={handleLogout}>
            <NavLink to='/' className='dropdown__item'>
              Logout
            </NavLink>
          </li>
        </>
      );
    }
    return (
      <>
        <li>
          <NavLink to='/signin' className='dropdown__item'>
            Sign in
          </NavLink>
        </li>
        <li>
          <NavLink to='/signup' className='dropdown__item'>
            Sign up
          </NavLink>
        </li>
        <hr />
        <li>
          <a href='#' className='dropdown__item'>
            Host your home
          </a>
        </li>
        <li>
          <a href='#' className='dropdown__item'>
            Host an experience
          </a>
        </li>
        <li>
          <a href='#' className='dropdown__item'>
            Help
          </a>
        </li>
      </>
    );
  };
  return <>{renderDropdown()}</>;
}
