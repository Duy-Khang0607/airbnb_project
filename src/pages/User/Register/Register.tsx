import {
  Button,
  Col,
  DatePicker,
  Form,
  Input,
  InputNumber,
  Row,
  Select,
} from "antd";
import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import requester from "src/api/api";
import { apiPath } from "src/api/apiPath";
import { signUpApi } from "src/redux/SignUpReducer/SignUpReducer";
import { DispatchType } from "src/redux/configStore";
import * as yup from "yup";

type Props = {};

const Register = (props: Props) => {
  const randomNumberInRange = (min: number, max: number) => {
    //  get number between min (inclusive) and max (inclusive)
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };
  const dispatch: DispatchType = useDispatch();
  const [num, setNum] = useState(randomNumberInRange(0, 1000000));
  const navigate = useNavigate();
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
      const action = signUpApi(values);
      console.log(action);
      // navigate("/login");
      dispatch(action);
    },
    validationSchema: yup.object().shape({
      name: yup.string().required("Name is required !"),
      email: yup
        .string()
        .required("Email is required !")
        .email("Invalid email"),
      password: yup
        .string()
        .required("Password is required ! ")
        .min(8, "Password must have at least 8 characters"),
      phone: yup
        .string()
        .required("Phone is required !")
        .min(10, "Phone must be at least 10 characters"),
      birthday: yup.string().required("Birthday is required !"),
    }),
  });

  useEffect(() => {
    setNum(randomNumberInRange(0, 1000000));
    // formik.setFieldValue("id", num);
  }, []);
  return (
    // <>
    //   <Row>
    //     <Col
    //       span={8}
    //       className="mt-32 container mx-auto border-2 border-gray-300 border-solid  px-5 rounded-lg   "
    //     >
    //       <h5 className="text-center text-xl   ">Sign Up</h5>
    //       <p className="text-center  text-lg font-normal">
    //         Welcome to Airbnb
    //       </p>{" "}
    //       <Form  onSubmitCapture={formik.handleSubmit}>
    //         <Form.Item label="Name">
    //           <Input
    //             name="name"
    //             value={formik.values.name}
    //             onChange={formik.handleChange}
    //           />
    //           {formik.errors.name && (
    //             <span className="text-red-400">{formik.errors.name}</span>
    //           )}
    //         </Form.Item>
    //         <Form.Item label="Email">
    //           <Input
    //             name="email"
    //             value={formik.values.email}
    //             onChange={formik.handleChange}
    //           />
    //           {formik.errors.email && (
    //             <span className="text-red-400">{formik.errors.email}</span>
    //           )}
    //         </Form.Item>
    //         <Form.Item label="Password">
    //           <Input
    //             name="password"
    //             value={formik.values.password}
    //             onChange={formik.handleChange}
    //           />
    //           {formik.errors.password && (
    //             <span className="text-red-400">{formik.errors.password}</span>
    //           )}
    //         </Form.Item>
    //         <Form.Item label="Phone">
    //           <Input
    //             name="phone"
    //             value={formik.values.phone}
    //             onChange={formik.handleChange}
    //           />
    //           {formik.errors.phone && (
    //             <span className="text-red-400">{formik.errors.phone}</span>
    //           )}
    //         </Form.Item>
    //         <Form.Item label="Birthday">
    //           <Input
    //             name="birthday"
    //             value={formik.values.birthday}
    //             onChange={formik.handleChange}
    //           />
    //           {formik.errors.birthday && (
    //             <span className="text-red-400">{formik.errors.birthday}</span>
    //           )}
    //         </Form.Item>
    //         <Form.Item label="Gender" name="gender">
    //           <Select
    //             options={[
    //               { value: "true", label: "Male" },
    //               { value: "false", label: "Female" },
    //             ]}
    //           />
    //         </Form.Item>
    //         <Form.Item label="Role">
    //         <Select
    //             options={[
    //               { value: "USER", label: "User" },
    //               { value: "ADMIN", label: "Admin" },
    //             ]}
    //           />

    //         </Form.Item>

    //         <div className="flex justify-center">
    //           {" "}
    //           <Button htmlType="submit" className="bg-pink text-white text-lg">
    //             Sign Up
    //           </Button>
    //         </div>
    //       </Form>
    //     </Col>
    //   </Row>
    // </>
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
                    // style={{ textTransform: "lowercase" }}
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
                    placeholder='0902926341'
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
                    placeholder='Mật khẩu phải có ít nhất 8 ký tự'
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
};

export default Register;
