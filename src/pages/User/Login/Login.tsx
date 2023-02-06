import { Button, Col, Form, Input, Row } from "antd";
import { useFormik } from "formik";
import React, { useEffect } from "react";
import requester from "src/api/api";
import { apiPath } from "src/api/apiPath";
import * as yup from "yup"
import { useNavigate } from "react-router";
import { loginApi } from "src/redux/Login/loginSlice";
import { useDispatch } from "react-redux";
import { DispatchType } from "src/redux/configStore";

type Props = {};

const Login = (props: Props) => {

  const navigate = useNavigate();

  const dispatch: DispatchType = useDispatch();

  const formik  = useFormik<{
    email: string,
    password: string
  }> ({
    initialValues: {
      email:"",
      password:""
    },
    onSubmit: async (values)=> {
      console.log(values);
     const action = loginApi(values);
     dispatch(action);
     navigate('/');

    },
    validationSchema: yup.object().shape({
      email: yup.string().required("Must be email ").email("Invalid email"),
      password: yup.string().required("Please enter your password").min(8, "Must be at least 8 characters")
    })
  })

  useEffect(()=> {

  }, [])
  return <div className="">
    
     
  <Row className="">
    <Col span={8} className=" mt-36 container mx-auto border-2 border-gray-300 border-solid  px-5 rounded-lg">
    <Form onSubmitCapture={formik.handleSubmit}>
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
      <div className="flex justify-center">
        <Button htmlType="submit">Log In</Button>
      </div>
    </Form>
    </Col>
  </Row>


  </div>;
};

export default Login;
