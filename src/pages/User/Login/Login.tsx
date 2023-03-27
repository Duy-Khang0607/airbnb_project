import { Button, Col, Form, Input, Row } from "antd";
import { useFormik } from "formik";
import React, { useEffect } from "react";
import requester from "src/api/api";
import { apiPath } from "src/api/apiPath";
import * as yup from "yup";
import { useNavigate } from "react-router";
import { loginApi } from "src/redux/Login/loginSlice";
import { useDispatch } from "react-redux";
import { DispatchType } from "src/redux/configStore";
import { signInApi } from "src/redux/SignInReducer/SignInReducer";

type Props = {};

const Login = (props: Props) => {
  const navigate = useNavigate();

  const dispatch: DispatchType = useDispatch();

  const formik = useFormik<{
    email: string;
    password: string;
  }>({
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit: async (values) => {
      try {
        console.log(values);
        const action = signInApi(values);
        await dispatch(action);
      } catch (error) {
        console.log(error);
      }
    },
    validationSchema: yup.object().shape({
      email: yup
        .string()
        .required("Please enter your email")
        .email("Invalid email"),
      password: yup
        .string()
        .required("Please enter your password")
        .min(8, "Must be at least 8 characters"),
    }),
  });

  useEffect(() => {}, []);
  return (
    <div className='container'>
      <div className='row'>
        <div className='col-sm-9 col-md-7 col-lg-5 mx-auto'>
          <div className='card border-0 shadow rounded-3 my-5'>
            <div className='card-body p-4 p-sm-5'>
              <h5 className='card-title text-center mb-5 titleSignIn text-3xl'>
                Đăng nhập
              </h5>
              <h3 style={{ color: "rgb(255 56 92)" }}>Welcome to Airbnb</h3>
              <form onSubmit={formik.handleSubmit}>
                <div className='form-group mb-3'>
                  <label className='my-1'>Email</label>
                  <input
                    type='email'
                    className='form-control'
                    id='email'
                    placeholder='name@example.com'
                    onChange={formik.handleChange}
                  />
                  {formik.errors.email ? (
                    <p className='text-danger mt-1'>{formik.errors.email}</p>
                  ) : (
                    ""
                  )}
                </div>
                <div className='form-group mb-3 '>
                  <label className='my-1'>Password</label>
                  <Input.Password
                    type='password'
                    className='form-control flex'
                    id='password'
                    placeholder='Password'
                    onChange={formik.handleChange}
                  />
                  {formik.errors.password ? (
                    <p className='text-danger mt-1'>{formik.errors.password}</p>
                  ) : (
                    ""
                  )}
                </div>
                <div className='d-grid'>
                  <button
                    style={{
                      background: "rgb(22 119 255)",
                      borderRadius: "6px",
                      lineHeight: "22px",
                      fontSize: "14px",
                      borderColor: "rgb(22 119 255)",
                      outline: "rgb(22 119 255)",
                      padding: "4px 15px",
                      color: "#fff",
                      marginTop: "20px",
                    }}
                    type='submit'>
                    Sign In
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
