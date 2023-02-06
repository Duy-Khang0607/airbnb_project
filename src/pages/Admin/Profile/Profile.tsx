import {
  LoginOutlined,
  NotificationOutlined,
  UserAddOutlined,
  UsergroupAddOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Drawer } from "@mui/material";
import { Avatar, Badge, Button, Image } from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import { DispatchType, RootState } from "../../../redux/configStore";
import { getUserApi, UserModel } from "../../../redux/UserReducer/UserReducer";
import {
  ACCESS_TOKEN,
  clearLocalStorage,
  getStoreJSON,
  USER_LOGIN,
} from "../../../utils/setting";
import logoAvatar from "src/assets/imgs/profile.png";
import UploadAvatar from "../UploadAvatar/UploadAvatar";
import { setModalAction } from "src/redux/ModalReducer/ModalReducer";
type Props = {};

const Profile = (props: Props) => {
  const profile = useSelector(
    (state: RootState) => state.SignInReducer.userLogin
  );

  const user: UserModel[] = useSelector(
    (state: RootState) => state.UserReducer.arrUser
  );
  const { statusAction } = useSelector((state: RootState) => state.UserReducer);

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
    clearLocalStorage(ACCESS_TOKEN);
    navigate("/admin/loginAD");
    window.location.reload();
  };

  const getAllUserApi = () => {
    // Goi api va dua du lieu len redux
    const actionAsync = getUserApi();
    dispatch(actionAsync);
  };

  const handleUploadAvatar = (id: number) => {
    const actionUploadComponent = setModalAction({
      Component: UploadAvatar,
      title: "Upload User Avatar",
    });
    dispatch(actionUploadComponent);
  };

  useEffect(() => {
    getAllUserApi();
  }, [profile?.user, statusAction]);
  return (
    <div>
      <div className='flex justify-end mr-6 align-content-center'>
        {profile ? (
          <div className='user '>
            <Button onClick={showDrawer} className='mx-2 '>
              <NotificationOutlined />
            </Button>
            <Badge className='cursor-pointer'>
              {profile?.user?.avatar ? (
                <img
                  src={profile?.user?.avatar}
                  className='w-10 h-10 rounded'
                  alt='Image logo'
                />
              ) : (
                <Badge count={"!"}>
                  <img src='' className='w-10 h-10 rounded' alt='Image User' />
                </Badge>
              )}
            </Badge>
            <span className='px-3 text-lg'>{profile?.user?.name}</span>
            <Button danger type='primary' onClick={handleLogOut}>
              Log Out <i className='icomoon icon-exit'></i>
            </Button>
          </div>
        ) : (
          <nav className='nav-profile'>
            <NavLink
              to='/admin/loginAD'
              className={({ isActive }) => {
                if (isActive) {
                  return "text-red-500 text-xl no-underline";
                }
                return "text-black text-xl no-underline";
              }}>
              Đăng nhập <LoginOutlined className='text-2xl' />
            </NavLink>
            <span className='text-black text-lg mx-2'>|</span>
            <NavLink
              to='/admin/registerAD'
              className={({ isActive }) => {
                if (isActive) return "text-red-500 text-xl no-underline";
                return "text-black text-xl no-underline";
              }}>
              Đăng ký <UsergroupAddOutlined className='text-2xl' />
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
