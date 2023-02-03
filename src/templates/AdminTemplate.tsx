import React, { useEffect, useState } from "react";
import "../assets/css/sidebar.css";
import { Layout, Menu, theme } from "antd";
import { NavLink, Outlet } from "react-router-dom";
import {
  FileOutlined,
  CalendarOutlined,
  UserOutlined,
  DashboardOutlined,
  CompassOutlined,
  HomeOutlined,
  EditOutlined,
} from "@ant-design/icons";
import logo from "../assets/imgs/airbnb.png";
import clsx from "clsx";
import Profile from "../pages/Admin/Profile/Profile";
import { getUserApi, UserModel } from "src/redux/UserReducer/UserReducer";
import { DispatchType, RootState } from "src/redux/configStore";
import { useDispatch, useSelector } from "react-redux";

type Props = {};

const AdminTemplate = () => {
  const user: UserModel[] = useSelector(
    (state: RootState) => state.UserReducer.arrUser
  );
  const profile = useSelector(
    (state: RootState) => state.SignInReducer.userLogin
  );
  const dispatch: DispatchType = useDispatch();
  const { Header, Content, Footer, Sider } = Layout;

  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  useEffect(() => {
    dispatch(getUserApi());
  }, [profile]);
  return (
    <div>
      <Layout
        style={{
          minHeight: "100vh",
        }}>
        <Sider
          className='sideBar'
          breakpoint='lg'
          collapsedWidth='0'
          onBreakpoint={(broken) => {}}
          collapsible
          collapsed={collapsed}
          onCollapse={(value) => setCollapsed(value)}>
          <div
            style={{
              height: "auto",
              margin: 5,
              textAlign: "center",
            }}>
            <img
              src={clsx(logo)}
              alt=''
              className='w-24 h-24 object-cover rounded-2xl'
            />
          </div>
          <Menu
            theme='dark'
            defaultSelectedKeys={["dashboard"]}
            mode='inline'
            className='bg-black text-lg'>
            <Menu.Item key='dashboard' icon={<DashboardOutlined />}>
              <NavLink to='/admin'>Dashboard</NavLink>
            </Menu.Item>
            <Menu.Item key='user' icon={<UserOutlined />}>
              <NavLink to='/admin/user'>User</NavLink>
            </Menu.Item>
            <Menu.Item key='location' icon={<CompassOutlined />}>
              <NavLink to='/admin/location'>Location</NavLink>
            </Menu.Item>
            <Menu.Item key='booking' icon={<HomeOutlined />}>
              <NavLink to='/admin/booking'>Room</NavLink>
            </Menu.Item>
            <Menu.Item key='loginAD' icon={<UserOutlined />}>
              <NavLink to='/admin/loginAD'>Login</NavLink>
            </Menu.Item>
            <Menu.Item key='registerAD' icon={<EditOutlined />}>
              <NavLink to='/admin/registerAD'>Register</NavLink>
            </Menu.Item>
          </Menu>
        </Sider>

        <Layout className='site-layout'>
          <Header
            style={{
              padding: 0,
              background: colorBgContainer,
            }}>
            <Profile />
          </Header>
          <Content
            style={{
              margin: "16px",
            }}>
            <div
              style={{
                padding: 24,
                minHeight: 360,
                background: colorBgContainer,
              }}>
              <Outlet />
            </div>
          </Content>
          <Footer
            style={{
              textAlign: "center",
            }}>
            Ant Design ©2018 Created by Ant UED
          </Footer>
        </Layout>
      </Layout>
    </div>
  );
};

export default AdminTemplate;
