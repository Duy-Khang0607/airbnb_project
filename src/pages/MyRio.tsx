import * as React from "react";
import { Button, Tabs } from "antd";
import logo from "src/assets/imgs/img1.png";
import { Col, Row } from "antd";
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Tooltip from "@mui/material/Tooltip";
import PersonAdd from "@mui/icons-material/PersonAdd";
import Settings from "@mui/icons-material/Settings";
import Logout from "@mui/icons-material/Logout";
import type { TabsProps } from "antd";
import avatar from "src/assets/imgs/avatarwhite.jpg";
import { DownOutlined } from "@ant-design/icons";
import logo1 from "src/assets/imgs/locoNav.png";

type Props = {};

const MyRio = ({}: Props) => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: any) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const onChange = (key: string) => {
    console.log(key);
  };
  return (
    <section
      className='container mx-auto fixed w-full bg-white z-50'
      style={{ borderBottom: "1px solid gray" }}>
      <Row>
        <Col span={8}>
          <img src={logo1} alt='logo' className='object-cover h-8 w-auto ' />
        </Col>
        <Col span={8}>
          <div className='text-center items-center'>
            <nav className='py-2 flex justify-center'>
              <a href='#' className='no-underline mx-2 text-black'>
                GPS
              </a>
              <a href='#' className='no-underline mx-2 text-black '>
                ANALYTICS
              </a>
              <a href='#' className='no-underline mx-2 text-black'>
                TIPS
              </a>
              <a href='#' className='no-underline mx-2 text-black'>
                EXAMPLE
              </a>
              <a href='#' className='no-underline mx-2 text-black'>
                LOCATION
              </a>
              <a href='#' className='no-underline mx-2 text-black'>
                EXP
              </a>
            </nav>
          </div>
        </Col>
        <Col span={8}>
          <section className='m-0 p-0 flex justify-end'>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                textAlign: "center",
              }}>
              <Avatar sx={{ width: 32, height: 32 }}>
                <img
                  src={avatar}
                  className='w-10 h-10 object-cover rounded'
                  alt=''
                />
              </Avatar>
              <Typography sx={{ minWidth: 100 }}>Duy Khang</Typography>
              <Tooltip title='Account settings'>
                <IconButton
                  onClick={handleClick}
                  size='small'
                  sx={{ ml: 2 }}
                  aria-controls={open ? "account-menu" : undefined}
                  aria-haspopup='true'
                  aria-expanded={open ? "true" : undefined}>
                  <DownOutlined className='text-xl' />
                </IconButton>
              </Tooltip>
            </Box>
            <Menu
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
              <MenuItem onClick={handleClose}>
                <Avatar /> Profile
              </MenuItem>
              <MenuItem onClick={handleClose}>
                <Avatar /> My account
              </MenuItem>
              <Divider />
              <MenuItem onClick={handleClose}>
                <ListItemIcon>
                  <PersonAdd fontSize='small' />
                </ListItemIcon>
                Add another account
              </MenuItem>
              <MenuItem onClick={handleClose}>
                <ListItemIcon>
                  <Settings fontSize='small' />
                </ListItemIcon>
                Settings
              </MenuItem>
              <MenuItem onClick={handleClose}>
                <ListItemIcon>
                  <Logout fontSize='small' />
                </ListItemIcon>
                Logout
              </MenuItem>
            </Menu>
          </section>
        </Col>
      </Row>
    </section>
  );
};

export default MyRio;
