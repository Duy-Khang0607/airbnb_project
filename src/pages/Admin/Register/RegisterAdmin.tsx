import React, { useState, useEffect } from "react";
import { Formik, useFormik, FormikProps } from "formik";
import * as Yup from "yup";
// import { http } from "../../util/setting";
import { useNavigate } from "react-router-dom";
import requester from "../../../api/api";
import { Button } from "antd";
import { DispatchType } from "../../../redux/configStore";
import { useDispatch } from "react-redux";
import { signUpApi } from "../../../redux/SignUpReducer/SignUpReducer";

type Props = {};

export default function RegisterAdmin({}: Props) {
  const randomNumberInRange = (min: number, max: number) => {
    // 👇️ get number between min (inclusive) and max (inclusive)
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };
  const dispatch: DispatchType = useDispatch();

  const navigate = useNavigate();

  const [num, setNum] = useState(randomNumberInRange(0, 1000000));

  const formik = useFormik<{
    id: number;
    name: string;
    email: string;
    password: string;
    phone: string;
    birthday: string;
    gender: boolean;
    role: string;
  }>({
    initialValues: {
      id: 0,
      name: "",
      email: "",
      password: "",
      phone: "",
      birthday: "",
      gender: true,
      role: "",
    },
    onSubmit: async (values) => {
      // try {
      //   let result = await requester.post("/api/auth/signup", values);
      //   console.log(result.data.content);
      //   alert("Đăng kí thành công !");
      // } catch (err: any) {
      //   console.log(err.response.data);
      // }
      const action = signUpApi(values);
      console.log(action);
      navigate("/admin/loginAD");
      dispatch(action);
    },
    validationSchema: Yup.object().shape({
      name: Yup.string().required("Name is required!"),
      email: Yup.string()
        .required("Email is required!")
        .email("Invalid email!"),
      password: Yup.string()
        .required("Password is required!")
        .min(8, "Password must have at least 8 characters"),
      phone: Yup.string()
        .required("Phone is required!")
        .min(10, "Phone must have at least 10 number"),
      birthday: Yup.string().required("birthday is required!"),
    }),
  });

  useEffect(() => {
    setNum(randomNumberInRange(0, 1000000));
    formik.setFieldValue("id", num);
  }, []);

  return (
    <div className='container'>
      <div className='row'>
        <div className='col-sm-9 col-md-7 col-lg-5 mx-auto'>
          <div className='card border-0 shadow rounded-3 my-5'>
            <div className='card-body p-4 p-sm-5'>
              <h3 className='text-center mb-5 text-3xl'>Đăng ký</h3>
              <h3 style={{ color: "rgb(255 56 92)" }}>Welcome to Airbnb</h3>
              <form onSubmit={formik.handleSubmit}>
                <div className='form-group mb-3'>
                  <label className='my-1'>ID</label>
                  <input
                    type='text'
                    className='form-control'
                    id='id'
                    placeholder='ID User'
                    readOnly
                    value={formik.values.id}
                    onChange={formik.handleChange}
                  />
                </div>
                <div className='form-group mb-3'>
                  <label className='my-1'>Name</label>
                  <input
                    type='text'
                    className='form-control'
                    id='name'
                    placeholder='User name'
                    onChange={formik.handleChange}
                    style={{ textTransform: "lowercase" }}
                  />
                  {formik.errors.name ? (
                    <p className='text-danger mt-1'>{formik.errors.name}</p>
                  ) : (
                    ""
                  )}
                </div>
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
                  <label className='my-1'>Phone</label>
                  <input
                    type='phone'
                    className='form-control'
                    id='phone'
                    placeholder='Phone'
                    onChange={formik.handleChange}
                  />
                  {formik.errors.phone ? (
                    <p className='text text-danger valid-notice'>
                      {formik.errors.phone}
                    </p>
                  ) : (
                    ""
                  )}
                </div>
                <div className='form-group mb-3'>
                  <label className='my-1'>Birthday</label>
                  <input
                    type='text'
                    className='form-control'
                    id='birthday'
                    placeholder='MM/DD/YYYY'
                    onChange={formik.handleChange}
                  />
                  {formik.errors.birthday ? (
                    <p className='text-danger mt-1'>{formik.errors.birthday}</p>
                  ) : (
                    ""
                  )}
                </div>
                <div className='form-group mb-3'>
                  <label className='my-1'>Password</label>
                  <input
                    type='password'
                    className='form-control'
                    id='password'
                    placeholder='password'
                    onChange={formik.handleChange}
                  />
                  {formik.errors.password ? (
                    <p className='text-danger mt-1'>{formik.errors.password}</p>
                  ) : (
                    ""
                  )}
                </div>
                <div className='form-group mb-3'>
                  <label className='my-1'>Role</label>
                  <select
                    className='form-select'
                    aria-label='Default select example'
                    id='role'
                    onChange={formik.handleChange}>
                    <option selected>Chọn người dùng</option>
                    <option value='ADMIN'>Admin</option>
                    <option value='USER'>User</option>
                  </select>
                </div>

                <div className='form-group mb-3'>
                  <label className='my-1'>Sex</label>
                  <select
                    className='form-select'
                    aria-label='Default select example'
                    id='gender'
                    onChange={formik.handleChange}>
                    <option selected>Chọn giới tính</option>
                    <option value='true'>Male</option>
                    <option value='false'>Female</option>
                  </select>
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
                    }}>
                    Đăng ký
                  </button>
                </div>
                <hr className='my-4' />
                <div className='d-grid'>
                  <Button
                    onClick={() => navigate("/admin/loginAD")}
                    type='primary'>
                    Đăng nhập
                  </Button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
