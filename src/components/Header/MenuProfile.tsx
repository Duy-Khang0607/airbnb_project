import * as React from "react";
import Box from "@mui/material/Box";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Tooltip from "@mui/material/Tooltip";
import { NavLink, useNavigate } from "react-router-dom";
import { USER_LOGIN } from "src/utils/setting";
import { useSelector } from "react-redux";
import { RootState } from "src/redux/configStore";

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
        <div title='Account Setting'>
          {/* <IconButton
            className='btn btn-light'
            onClick={handleClick}
            size='small'
            sx={{ ml: 2 }}
            aria-controls={open ? "account-menu" : undefined}
            aria-haspopup='true'
            aria-expanded={open ? "true" : undefined}>
            <i className='fa fa-bars'></i>
            <i className='fa fa-user'></i>
          </IconButton> */}
          <div onClick={handleClick}>
            <button className='btn btn-light  mx-auto btnUser relative'>
              <>
                <i className='fa fa-bars text-xl font-semibold'></i>
                <i className='fa fa-user w-7 h-7 rounded-full bg-gray-400  leading-7 text-xl ml-2'></i>
                <div className='d-inline-block absolute top-0 right-0 h-4 w-4 rounded-full text-center bg-red-500 text-white text-sm'>
                  1
                </div>
              </>
            </button>
          </div>
        </div>
      </Box>
      <Menu
        key={userLogin.user.id}
        anchorEl={anchorEl}
        id='account-menu'
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: "visible",
            filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
            mt: 1.5,
            "& .MuiAvatar-root": {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            "&:before": {
              content: '""',
              display: "block",
              position: "absolute",
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: "background.paper",
              transform: "translateY(-50%) rotate(45deg)",
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}>
        {/* chua login  */}
        {!userLogin && (
          <>
            <MenuItem>
              <NavLink
                to='/login'
                className='dropdown__item text-black no-underline'>
                Sign in
              </NavLink>
            </MenuItem>
            <MenuItem>
              <NavLink
                to='/register'
                className='dropdown__item text-black no-underline'>
                Sign up
              </NavLink>
            </MenuItem>
          </>
        )}
        {/* profile */}
        {userLogin && (
          <>
            <MenuItem>
              <NavLink
                to='/profile'
                className='dropdown__item text-black no-underline'
                onClick={() => {}}>
                Profile
              </NavLink>
            </MenuItem>
          </>
        )}
        <hr />

        {userLogin?.user?.role === "ADMIN" ? (
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
        <MenuItem>
          <NavLink to='' className='dropdown__item text-black no-underline'>
            Help
          </NavLink>
        </MenuItem>

        {userLogin && (
          <>
            <MenuItem>
              <NavLink
                to='/logout'
                className='dropdown__item text-black no-underline'
                onClick={() => {
                  //logout
                  localStorage.removeItem("userLogin");
                  // localStorage.removeItem(ACCESS_TOKEN);
                  // history.push('/');
                  navigate("/");
                  window.location.reload();
                }}>
                Log out
              </NavLink>
            </MenuItem>
          </>
        )}
      </Menu>
    </React.Fragment>
  );
};

export default MenuProfile;
