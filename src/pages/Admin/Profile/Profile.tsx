import { NotificationOutlined, UserOutlined } from "@ant-design/icons";
import { Drawer } from "@mui/material";
import { Avatar, Badge, Button, Image } from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import { DispatchType, RootState } from "../../../redux/configStore";
import { getUserApi, UserModel } from "../../../redux/UserReducer/UserReducer";
import {
  clearLocalStorage,
  getStore,
  getStoreJSON,
  setStore,
  USER_LOGIN,
} from "../../../utils/setting";

type Props = {};

const Profile = (props: Props) => {
  const profile = useSelector(
    (state: RootState) => state.SignInReducer.userLogin
  );
  console.log(profile);

  const user: UserModel[] = useSelector(
    (state: RootState) => state.UserReducer.arrUser
  );
  const userLogin = getStoreJSON("userLogin");
  const navigate = useNavigate();
  const dispatch: DispatchType = useDispatch();

  const [open, setOpen] = useState(false);
  const showDrawer = () => {
    setOpen(true);
  };
  const onClose = () => {
    setOpen(false);
  };
  // const user = useSelector((state) => state.user.profile);

  const handleLogOut = () => {
    // localStorage.removeItem(USER_LOGIN);
    clearLocalStorage(USER_LOGIN);
    navigate("/admin/loginAD");
    window.location.reload();
  };

  const getAllUserApi = () => {
    // Goi api va dua du lieu len redux
    const actionAsync = getUserApi();
    dispatch(actionAsync);
  };

  useEffect(() => {
    getAllUserApi();
  }, [profile?.user]);
  return (
    <div>
      <div className='flex justify-end mr-6 align-content-center'>
        {profile ? (
          <div className='user '>
            <Button onClick={showDrawer} className='mx-2 '>
              <NotificationOutlined />
            </Button>
            <Badge count={1}>
              {profile.avatar ? (
                <img src={profile?.user?.avatar} alt='Image' />
              ) : (
                <Avatar
                  src={
                    <Image
                      src='https://joeschmoe.io/api/v1/random'
                      style={{ width: 50 }}
                    />
                  }
                />
              )}
            </Badge>
            <span className='px-3 text-lg'>{profile?.user?.name}</span>
            <Button danger type='primary' onClick={handleLogOut}>
              Log Out
            </Button>
          </div>
        ) : (
          <nav className='nav-profile'>
            <NavLink
              to='/admin/loginAD'
              className={({ isActive }) => {
                if (isActive) return "text-red-200 text-lg";
                return "text-white text-xl   ";
              }}>
              <Button className='text-base' type='text'>
                Đăng nhập
              </Button>
            </NavLink>
            <span className='text-black text-lg'>|</span>
            <NavLink to='/admin/registerAD' className='text-white text-xl'>
              <Button className='text-base' type='text'>
                Đăng ký
              </Button>
            </NavLink>
          </nav>
        )}
      </div>
      <Drawer anchor='right' title='Basic Drawer' onClose={onClose} open={open}>
        <div>Thông báo</div>
      </Drawer>
    </div>
  );
};

export default Profile;
