import React from "react";
import { Row, Col } from "antd";
import "./sidebar.css";
import SideBar from "./SideBar";
import MainDash from "./MainDash";
type Props = {};

const UserManagement = (props: Props) => {
  return (
    <Row>
      <Col span={6}>
        <SideBar />
      </Col>
      <Col span={18}>
        <MainDash />
      </Col>
    </Row>
  );
};

export default UserManagement;
