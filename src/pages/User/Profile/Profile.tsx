import { Col, Row } from "antd";
import React from "react";

type Props = {};

const Profile = (props: Props) => {
  return <div>
    
    <Row>
      <Col span={6} className="border-8 border-indigo-500 ">Card</Col>
      <Col span={18}>Detail</Col>

    </Row>
  </div>;
};

export default Profile;
