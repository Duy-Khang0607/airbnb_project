import { Col, Form, Input, Row } from "antd";
import { useFormik } from "formik";
import React from "react";
import * as yup from "yup"

type Props = {};

const Login = (props: Props) => {

  const formik  = useFormik<{
    email: string,
    password: string
  }> ({
    initialValues: {
      email:"",
      password:""
    },
    onSubmit: (values)=> {
      console.log(values)
    },
    validationSchema: yup.object().shape({
      email: yup.string().required("Must be email ").email("Invalid email"),
      password: yup.string().required("Please enter your password").min(8, "Must be at least 8 characters")
    })
  })
  return <div>
    
     
  <Row>
    <Col span={8} className="container mx-auto border-2 border-gray-300 border-solid  px-5 rounded-lg">
    <Form>
        <h5 className="text-center text-xl">Log In</h5>
        <p className="text-center">Welcom to Airbnb !</p>
      <Form.Item label="Email">
        <Input name="email" value={formik.values.email} onChange={formik.handleChange}/>
        {formik.errors.email && (
                <span className="text-red-400">{formik.errors.email}</span>
              )}
      </Form.Item>
      <Form.Item label="Password">
        <Input name="password" value={formik.values.password} onChange={formik.handleChange}/>
        {formik.errors.email && (
                <span className="text-red-400">{formik.errors.email}</span>
              )}
      </Form.Item>
    </Form>
    </Col>
  </Row>


  </div>;
};

export default Login;
