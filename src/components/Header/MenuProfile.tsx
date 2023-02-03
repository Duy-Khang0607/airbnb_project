import * as React from "react";
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Tooltip from "@mui/material/Tooltip";
import { NavLink } from "react-router-dom";
import { ACCESS_TOKEN, USER_LOGIN, clearLocalStorage } from "src/utils/setting";

const MenuProfile = () => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const profile = localStorage.getItem(USER_LOGIN);
  console.log(profile);
  return (
    <React.Fragment>
      <Box sx={{ display: "flex", alignItems: "center", textAlign: "center" }}>
        <Typography sx={{ minWidth: 100 }}>Become a host</Typography>
        <Typography className="m-3">
          {" "}
          <NavLink to={""}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              className="h-5"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"
              ></path>
            </svg>
          </NavLink>
        </Typography>
        <Tooltip title="Account settings">
          <IconButton
            onClick={handleClick}
            size="small"
            sx={{ ml: 2 }}
            aria-controls={open ? "account-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
          >
            <Avatar sx={{ width: 32, height: 32 }}>M</Avatar>
          </IconButton>
        </Tooltip>
      </Box>
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
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
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        {profile ? (
          <MenuItem >
            <NavLink to={"/booked"} className="text-black no-underline">
              Booked{" "}
            </NavLink>
          </MenuItem>
        ) : (
          <MenuItem >
            <NavLink to={"/register"} className="text-black no-underline">
              {" "}
              Sign up
            </NavLink>
          </MenuItem>
        )}
        {profile ? (
          <MenuItem >
            <NavLink to={"/profile"} className="text-black no-underline">
              {" "}
              Profile
            </NavLink>
          </MenuItem>
        ) : (
          <MenuItem >
            <NavLink to={"/login"} className="text-black no-underline">
              Login
            </NavLink>
          </MenuItem>
        )}

        <Divider />
        <MenuItem >
          <NavLink to={"/"} className="text-black no-underline">
            {" "}
            Airbnb your home
          </NavLink>
        </MenuItem>
        <MenuItem >
          <NavLink to={"/"} className="text-black no-underline">
            {" "}
            Host an experience
          </NavLink>
        </MenuItem>
        <MenuItem >
          <NavLink to={"/"} className="text-black no-underline">
            {" "}
            Help
          </NavLink>
        </MenuItem>
        {profile && (
          <MenuItem >
            <NavLink
              to={"/"}
              className="text-black no-underline"
              onClick={() => {
                clearLocalStorage(USER_LOGIN);
                clearLocalStorage(ACCESS_TOKEN);
              }}
            >
              {" "}
              Log out
            </NavLink>
          </MenuItem>
        )}
      </Menu>
    </React.Fragment>
  );
};

export default MenuProfile;
