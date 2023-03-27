import * as React from "react";
import Box from "@mui/material/Box";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Tooltip from "@mui/material/Tooltip";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { ACCESS_TOKEN, USER_LOGIN } from "src/utils/setting";
import { useSelector } from "react-redux";
import { RootState } from "src/redux/configStore";
import type { MenuProps } from "antd";
import { Dropdown, Space } from "antd";
import { Avatar } from "@mui/material";
import { BarsOutlined } from "@ant-design/icons";
import { deepOrange } from "@mui/material/colors";

const MenuProfile = () => {
  const { userLogin } = useSelector((state: RootState) => state.SignInReducer);
  const profile = localStorage.getItem(USER_LOGIN);
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleLogOut = () => {
    localStorage.removeItem("userLogin");
    localStorage.removeItem("isAdmin");
    localStorage.removeItem(ACCESS_TOKEN);
    // history.push('/');
    navigate("/login");
    console.log("123");

    window.location.reload();
  };
  const items: MenuProps["items"] = [
    {
      label: (
        <p>
          <Link className='no-underline text-black font-medium' to='/register'>
            Sign up
          </Link>
        </p>
      ),
      key: "0",
    },
    {
      label: (
        <p>
          <Link to='/login' className='no-underline text-black font-medium'>
            Login
          </Link>
        </p>
      ),
      key: "1",
    },
    {
      label: (
        // {userLogin?.user?.role === "ADMIN" ? (<div></div>):(<h3></h3>)}
        <p>
          {userLogin?.user?.role === "ADMIN" ? (
            <Link to='/login' className='no-underline text-black font-medium'>
              Admin Management
            </Link>
          ) : (
            <Link to='/' className='no-underline text-black font-medium'>
              Host your home
            </Link>
          )}
        </p>
      ),
      key: "2",
    },
    {
      type: "divider",
    },
    {
      label: (
        <p className='text-red-600 font-medium' onClick={handleLogOut}>
          Log out
        </p>
      ),
      key: "3",
    },
  ];

  return (
    <React.Fragment>
      <Box sx={{ display: "flex", alignItems: "center", textAlign: "center" }}>
        <Typography
          sx={{ minWidth: 100 }}
          className='cursor-pointer btn btn-light'>
          Become a host
        </Typography>
        <Typography className='m-3 cursor-pointer btn btn-light '>
          <NavLink to={""}>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 24 24'
              stroke='currentColor'
              className='h-5 text-black'>
              <path
                stroke-linecap='round'
                stroke-linejoin='round'
                stroke-width='2'
                d='M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9'></path>
            </svg>
          </NavLink>
        </Typography>
      </Box>
      <Box sx={{ display: "flex", alignItems: "center", textAlign: "center" }}>
        {/* chua login  */}
        {!userLogin && (
          <>
            <Dropdown menu={{ items }} trigger={["click"]}>
              <a onClick={(e) => e.preventDefault()}>
                <Space>
                  <button className='btn btn-light'>
                    <BarsOutlined className='text-black text-xl' />
                  </button>
                </Space>
              </a>
            </Dropdown>
          </>
        )}
        {/* profile */}
        {userLogin && (
          <>
            <nav className='flex gap-2 items-center'>
              {userLogin.user.avatar ? (
                <img
                  src={userLogin.user.avatar}
                  className='w-10 h-10 object-cover rounded-full'
                />
              ) : (
                <Avatar
                  alt='img'
                  src={userLogin.user.avatar}
                  sx={{ width: 56, height: 56, bgcolor: deepOrange[500] }}>
                  {userLogin.user.name}
                </Avatar>
              )}

              <Dropdown menu={{ items }} trigger={["click"]}>
                <a onClick={(e) => e.preventDefault()}>
                  <Space>
                    <button className='btn btn-light'>
                      <BarsOutlined className='text-black text-xl' />
                    </button>
                  </Space>
                </a>
              </Dropdown>
            </nav>
          </>
        )}

        {/* {userLogin?.user?.role === "ADMIN" ? (
          <MenuItem>
            <NavLink
              to='/admin'
              className='dropdown__item text-black no-underline'>
              Admin Management
            </NavLink>
          </MenuItem>
        ) : (
          <MenuItem>
            <NavLink to='' className='dropdown__item text-black no-underline'>
              Host your home
            </NavLink>
          </MenuItem>
        )}
       

        {userLogin && (
          <>
            <MenuItem>
              <NavLink
                to='/logout'
                className='dropdown__item text-black no-underline'
                onClick={() => {
                  localStorage.removeItem("userLogin");
                  localStorage.removeItem(ACCESS_TOKEN);
                  navigate("/");
                  window.location.reload();
                }}>
                Log out
              </NavLink>
            </MenuItem>
          </>
        )} */}
      </Box>
    </React.Fragment>
  );
};

export default MenuProfile;
