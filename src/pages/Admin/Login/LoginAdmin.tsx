import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useDispatch } from "react-redux";
import { getStoreJSON } from "../../../utils/setting";
import { DispatchType } from "../../../redux/configStore";
import { signInApi } from "../../../redux/SignInReducer/SignInReducer";
import { Input, Tag } from "antd";
import { openNotificationWithIcon } from "src/utils/notification";

type Props = {};

export default function LoginAdmin({}: Props) {
  const userLogin = getStoreJSON("userLogin");
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
    onSubmit: async (values: any) => {
      try {
        const action = signInApi(values);
        await dispatch(action);
        navigate("/admin");
        console.log(values.data.content);
      } catch (error: any) {
        console.log(error.response.data.content);
      }
    },
    validationSchema: Yup.object().shape({
      email: Yup.string()
        .required("Email is required!")
        .email("Invalid email!"),
      password: Yup.string()
        .required("Password is required!")
        .min(8, "Password must have at least 8 characters"),
    }),
  });

  useEffect(() => {
    // !userLogin && navigate("/admin/loginAD");
    // if (userLogin) {
    //   navigate("/");
    // } else {
    //   navigate("/admin/loginAD");
    // }
  }, []);

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
                <div className='form-group mb-3'>
                  <label className='my-1'>Password</label>
                  <Input.Password
                    type='password'
                    className='form-control'
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
}
