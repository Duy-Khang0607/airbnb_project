import { NotificationOutlined, UserOutlined } from "@ant-design/icons";
import { Drawer } from "@mui/material";
import { Avatar, Badge, Button } from "antd";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

type Props = {};

const Profile = (props: Props) => {
  const [open, setOpen] = useState(false);
  const showDrawer = () => {
    setOpen(true);
  };
  const onClose = () => {
    setOpen(false);
  };
  // const user = useSelector((state) => state.user.profile);

  const navigate = useNavigate();

  const handleLogOut = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  useEffect(() => {}, []);
  return (
    <div>
      <div className='flex justify-end mr-6 align-content-center'>
        <div className='user '>
          <Button onClick={showDrawer} className='mx-2 '>
            <NotificationOutlined />
          </Button>
          <Badge count={1}>
            <Avatar shape='square' icon={<UserOutlined />} />
          </Badge>
          <span className='px-3 text-lg'>Duy Khang</span>
          <Button danger type='primary' onClick={handleLogOut}>
            Log Out
          </Button>
        </div>
      </div>
      <Drawer anchor='right' title='Basic Drawer' onClose={onClose} open={open}>
        <div>Thông báo</div>
      </Drawer>
    </div>
  );
};

export default Profile;
