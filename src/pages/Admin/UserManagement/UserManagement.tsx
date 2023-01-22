import React, { useEffect } from "react";
import { Row, Col } from "antd";
import "./sidebar.css";
import SideBar from "./SideBar";
import MainDash from "./MainDash";
import { useDispatch } from "react-redux";
import { fetchProfilePageAction } from "../../../redux/DetailProfile/action";
import { DispatchType } from "../../../redux/configStore";
type Props = {};

const UserManagement = (props: Props) => {
  const dispatch: DispatchType = useDispatch();
  useEffect(() => {
    dispatch(fetchProfilePageAction());
  }, []);
  return (
    <Row>
      <Col span={4}>
        <SideBar />
      </Col>
      <Col span={20}>
        <MainDash />
      </Col>
    </Row>
  );
};

export default UserManagement;
