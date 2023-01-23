import { Col, DatePicker, Form, Input, InputNumber, Row, Select } from "antd";
import React from "react";

type Props = {};

const Register = (props: Props) => {
  return (
    <>
      <Row>
       
        <Col span={8} className="container mx-auto border-2 border-pink " style={{border: "5px" , borderColor: "red"}}>
        <h4 className="text-center text-lg">Sign Up</h4>
          {" "}
          <Form>
            <Form.Item label="Name" name="name">
              <Input />
            </Form.Item>
            <Form.Item label="Email" name="email">
              <Input />
            </Form.Item>
            <Form.Item label="Password" name="password">
              <Input />
            </Form.Item>
            <Form.Item label="Phone" name="phone">
              <InputNumber />
            </Form.Item>
            <Form.Item label="Birthday" name="birthday">
              <DatePicker />
            </Form.Item>
            <Form.Item label="Gender" name="gender">
              <Select options={[{value:"male" , label:"Male"}, {value: "female", label: "Female"}]} />
            </Form.Item>
            <Form.Item label="Address" name="address">
              <Input />
            </Form.Item>
          </Form>
        </Col>
      </Row>
    </>
  );
};

export default Register;
