import React, { useState } from "react";
import "../assets/css/Sidebar.css";
import { Avatar, Badge, Layout, Menu, theme } from "antd";
import { NavLink, Outlet } from "react-router-dom";
import {
  FileOutlined,
  CalendarOutlined,
  UserOutlined,
  DashboardOutlined,
} from "@ant-design/icons";
import logo from "../assets/imgs/airbnb.png";
import logomini from "../assets/imgs/img2.png";
import SubMenu from "antd/es/menu/SubMenu";
import clsx from "clsx";
import Profile from "../pages/Admin/Profile/Profile";

type Props = {};

const AdminTemplate = () => {
  const { Header, Content, Footer, Sider } = Layout;

  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  return (
    <div>
      <Layout
        style={{
          minHeight: "100vh",
        }}>
        <Sider
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
            className='bg-black '>
            <Menu.Item key='dashboard' icon={<DashboardOutlined />}>
              <NavLink to='/admin'>Dashboard</NavLink>
            </Menu.Item>
            <Menu.Item key='user' icon={<UserOutlined />}>
              <NavLink to='/admin/user'>Quản lý người dùng</NavLink>
            </Menu.Item>
            <Menu.Item key='location' icon={<FileOutlined />}>
              <NavLink to='/admin/location'>Quản lý thông tin vị trí</NavLink>
            </Menu.Item>
            <Menu.Item key='booking' icon={<CalendarOutlined />}>
              <NavLink to='/admin/booking'>Quản lý thông tin phòng</NavLink>
            </Menu.Item>
            <Menu.Item key='loginAD' icon={<CalendarOutlined />}>
              <NavLink to='/admin/loginAD'>Đăng nhập</NavLink>
            </Menu.Item>
            <Menu.Item key='registerAD' icon={<CalendarOutlined />}>
              <NavLink to='/admin/registerAD'>Đăng ký</NavLink>
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
