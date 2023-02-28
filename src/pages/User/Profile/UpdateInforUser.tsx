import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import * as Yup from "yup";
import React, { useState, useEffect } from "react";
import { DispatchType, RootState } from "src/redux/configStore";
import { getStoreJSON } from "src/utils/setting";
import { UserModel, editUserAction } from "src/redux/UserReducer/UserReducer";
import { getStore } from "src/utils/setting";

type Props = {};

export default function UpdateInforUser({}: Props) {
  // const userLogin = getStoreJSON("userLogin");
  // const userLoginGETSTORE = getStore("userLogin");

  const { userInfo } = useSelector((state: RootState) => state.UserReducer);
  const { userLogin } = useSelector((state: RootState) => state.SignInReducer);

  const randomNumberInRange = (min: number, max: number) => {
    // 👇️ get number between min (inclusive) and max (inclusive)
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };
  const dispatch: DispatchType = useDispatch();

  const [num, setNum] = useState(randomNumberInRange(0, 1000000));

  const [show, setShow] = useState(false);

  const avatarDefault = require("src/assets/imgs/avatarwhite.jpg");
  const avatar = getStoreJSON("userLogin");
  const formik = useFormik<{
    id: number;
    name: string;
    email: string;
    // password: string;
    phone: string;
    birthday: string;
    gender: boolean;
    role: string;
  }>({
    initialValues: {
      id: userInfo.id || userLogin.user.id,
      name: userInfo.name || userLogin.user.name,
      email: userInfo.email || userLogin.user.email,
      // password: userInfo.password || userLogin.user.password,
      phone: userInfo.phone || userLogin.user.phone,
      birthday: userInfo.birthday || userLogin.user.birthday,
      gender: userInfo.gender || userLogin.user.gender,
      role: userInfo.role || userLogin.user.role,
    },
    validationSchema: Yup.object().shape({
      name: Yup.string().required("Name is required!"),
      email: Yup.string()
        .required("Email is required!")
        .email("Invalid email!"),
      // password: Yup.string().required("Password is required!").min(8, "Password must have at least 8 characters"),
      phone: Yup.string()
        .required("Phone is required!")
        .min(9, "Phone must have at least 10 number"),
      birthday: Yup.string().required("birthday is required!"),
      gender: Yup.string().required("birthday is required!"),
      role: Yup.string().required("birthday is required!"),
    }),
    onSubmit: async (values) => {
      const updateProfile: UserModel = {
        id: values?.id,
        name: values?.name,
        email: values?.email,
        // password: values?.password,
        phone: values?.phone,
        birthday: values?.birthday,
        gender: values?.gender,
        role: values?.role,
      };
      const action = editUserAction(userLogin.user.id, updateProfile);
      await dispatch(action);
      console.log("hello");
    },
  });

  useEffect(() => {
    setNum(randomNumberInRange(0, 1000000));
    formik.setFieldValue("id", num);
  }, []);

  return (
    <div className='update-user container my-3 p-4 rounded-4'>
      <div className='title ms-4'>
        <h3>Update Your Information</h3>
      </div>
      <form onSubmit={formik.handleSubmit}>
        <div className='row'>
          <div className='col-lg-2 col-md-12 col-sm-12 image-user'>
            <div className='avatar' style={{ marginTop: "20px" }}>
              {userLogin?.user.avatar ? (
                <img
                  src={avatar.user.avatar}
                  className='rounded-circle'
                  alt='...'
                  style={{ width: "120px", height: "131px" }}
                />
              ) : (
                <img
                  src={avatarDefault}
                  className='rounded-circle'
                  alt='Người dùng chưa có ảnh...'
                  style={{ width: "120px", height: "131px" }}
                />
              )}
            </div>
          </div>
          <div className='col-lg-5 col-md-12 col-sm-12'>
            <div className='form-group my-1'>
              <label className='form-label'>Email</label>
              <input
                type='email'
                name='email'
                className='form-control'
                id='email'
                aria-describedby='emailHelp'
                placeholder='Email adrress'
                value={formik.values.email}
                onChange={formik.handleChange}
              />
              {formik.errors.email ? (
                <p className='text-danger mt-1'>{formik.errors.email}</p>
              ) : (
                ""
              )}
            </div>
            <div className='form-group my-1'>
              <label className='form-label'>Phone</label>
              <input
                type='number'
                name='phone'
                className='form-control'
                id='phone'
                aria-describedby='emailHelp'
                placeholder='Phone number'
                value={formik.values.phone}
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
          </div>
          <div className='col-lg-5 col-md-12 col-sm-12'>
            <div className='form-group my-1'>
              <label className='form-label'>Name</label>
              <input
                type='text'
                name='name'
                className='form-control'
                id='name'
                aria-describedby='emailHelp'
                placeholder='Your name'
                value={formik.values.name}
                onChange={formik.handleChange}
              />
              {formik.errors.name ? (
                <p className='text-danger mt-1'>{formik.errors.name}</p>
              ) : (
                ""
              )}
            </div>

            <div className='gender my-3'>
              <label className='form-label me-3'>Gender</label>
              <div className='form-check form-check-inline mx-3'>
                <input
                  className='form-check-input'
                  type='radio'
                  name='inlineRadioOptions'
                  id='gender'
                  defaultValue='option1'
                />
                <label className='form-check-label' htmlFor='inlineRadio1'>
                  Male
                </label>
              </div>
              <div className='form-check form-check-inline mx-3'>
                <input
                  className='form-check-input'
                  type='radio'
                  name='inlineRadioOptions'
                  id='gender'
                  defaultValue='option2'
                />
                <label className='form-check-label' htmlFor='inlineRadio2'>
                  Female
                </label>
              </div>
            </div>
          </div>
        </div>
        <div className='btnSubmit d-md-flex justify-content-md-end'>
          <button
            className='btn btn-outline-success btn-md me-4 rounded-pill px-4'
            type='submit'
            data-bs-dismiss='modal'
            onClick={() => {
              setShow(true);
            }}>
            Update
          </button>
        </div>
      </form>
    </div>
  );
}
