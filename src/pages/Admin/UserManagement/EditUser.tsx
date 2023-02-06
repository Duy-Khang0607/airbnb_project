import React, { useState, useEffect } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment/moment.js";
import { DispatchType, RootState } from "../../../redux/configStore";
import {
  clearStatusAction,
  updateUserApi,
  UserModel,
} from "../../../redux/UserReducer/UserReducer";
import { getStoreJSON, setStoreJSON, USER_LOGIN } from "src/utils/setting";

type Props = {};
let timeout: ReturnType<typeof setTimeout>;
const EditUser = (props: Props) => {
  const { editUser } = useSelector((state: RootState) => state.UserReducer);
  const userLogin = getStoreJSON("userLogin");
  const profile = useSelector(
    (state: RootState) => state.SignInReducer.userLogin
  );
  const { statusAction } = useSelector((state: RootState) => state.UserReducer);

  const [submit, setSubmit] = useState(0);
  console.log("User Edit: ", editUser);
  const dispatch: DispatchType = useDispatch();
  const formik = useFormik<{
    id: number;
    name: string;
    email: string;
    password: string;
    phone: string;
    birthday: string;
    avatar: string;
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
      avatar: "",
      gender: false,
      role: "USER",
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
      // avatar: Yup.string().required("Avatar is required!"),
      role: Yup.string().required("role is required!"),
    }),
    onSubmit: async (values) => {
      console.log("User: ", values);
      const updateUser: UserModel = {
        id: values?.id,
        name: values?.name,
        email: values?.email,
        password: values?.password,
        phone: values?.phone,
        birthday: moment(values?.birthday).format("MM/DD/YYYY").toString(),
        avatar: values?.avatar,
        gender: values?.gender,
        role: values?.role,
      };
      // setStoreJSON(USER_LOGIN, updateUser);
      const updateAction = updateUserApi(editUser?.id, updateUser);
      dispatch(updateAction);
      const clearAction = clearStatusAction();
      dispatch(clearAction);
      // dispatch(getUserApi());
      setSubmit(1);
      resetFieldValue();
    },
  });

  const setFieldValue = () => {
    formik.setFieldValue("id", editUser.id);
    formik.setFieldValue("name", editUser.name);
    formik.setFieldValue("email", editUser.email);
    formik.setFieldValue("password", editUser.password);
    formik.setFieldValue("phone", editUser.phone);
    formik.setFieldValue(
      "birthday",
      moment(editUser.birthday).format("MM/DD/YYYY")
    );
    // formik.setFieldValue("avatar", editUser.avatar);
    formik.setFieldValue("role", editUser.role);
  };

  const resetFieldValue = () => {
    formik.setFieldValue("id", 0);
    formik.setFieldValue("name", "");
    formik.setFieldValue("email", "");
    formik.setFieldValue("password", "");
    formik.setFieldValue("phone", "");
    formik.setFieldValue("birthday", "");
    // formik.setFieldValue("avatar", "");
    formik.setFieldValue("role", "");
  };

  useEffect(() => {
    setFieldValue();
    renderEditUser();
  }, [editUser, submit, statusAction]);

  const renderEditUser = () => {
    return (
      <>
        <form onSubmit={formik.handleSubmit}>
          <div className='row'>
            <div className='col-lg-6 col-md-12 col-sm-12'>
              <div className='form-group my-1'>
                <label className='form-label'>ID</label>
                <input
                  type='id'
                  className='form-control'
                  placeholder="User's ID"
                  id='id'
                  value={formik.values?.id}
                  readOnly
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                />
              </div>
              <div className='form-group my-1'>
                <label className='form-label'>Email</label>
                <input
                  type='email'
                  className='form-control'
                  id='email'
                  aria-describedby='emailHelp'
                  placeholder='Email adrress'
                  value={formik.values?.email}
                  // onChange={formik.handleChange}
                  onChange={formik.handleChange}
                />
                {formik.errors.email && formik.touched.email && (
                  <p className='text-danger my-1'>Email Invalid</p>
                )}
              </div>
              <div className='form-group my-1'>
                <label className='form-label'>Phone</label>
                <input
                  type='text'
                  className='form-control'
                  id='phone'
                  aria-describedby='emailHelp'
                  placeholder='Phone number'
                  value={formik.values?.phone}
                  onChange={formik.handleChange}
                />
                {formik.errors.phone && formik.touched.phone && (
                  <p className='text-danger my-1'>Phone Invalid</p>
                )}
              </div>
              <div className='form-group my-1'>
                <label className='form-label'>Role</label>
                <input
                  type='text'
                  className='form-control'
                  id='role'
                  placeholder='Your role'
                  value={formik.values?.role?.toLocaleUpperCase()}
                  onChange={formik.handleChange}
                />
              </div>
            </div>
            <div className='col-lg-6 col-md-12 col-sm-12'>
              <div className='form-group my-1'>
                <label className='form-label'>Birthday</label>
                <input
                  type='birthday'
                  className='form-control'
                  id='birthday'
                  aria-describedby='emailHelp'
                  placeholder='MM/DD/YYYY'
                  value={formik.values?.birthday}
                  onChange={formik.handleChange}
                />
              </div>
              <div className='form-group my-1'>
                <label className='form-label'>Name</label>
                <input
                  type='text'
                  className='form-control'
                  id='name'
                  aria-describedby='emailHelp'
                  placeholder='Your name'
                  value={formik.values?.name}
                  onChange={formik.handleChange}
                />
              </div>
              <div className='form-group my-1'>
                <label className='form-label'>Password</label>
                <input
                  type='text'
                  className='form-control'
                  id='password'
                  aria-describedby='emailHelp'
                  placeholder='Type your password'
                  value={formik.values?.password}
                  onChange={formik.handleChange}
                />
                {formik.errors.password && formik.touched.password && (
                  <p className='text-danger my-1'>Password Invalid</p>
                )}
              </div>
            </div>
            <div className='btnSubmit d-md-flex justify-content-md-end'>
              <button
                className='btn btn-outline-primary btn-md me-4 rounded-pill px-4'
                type='submit'>
                Update
              </button>
            </div>
          </div>
        </form>
      </>
    );
  };

  return (
    <div className='update-user container my-3 p-4 rounded-4'>
      <div className='title'>
        <h3>Thông tin người dùng</h3>
      </div>
      {renderEditUser()}
    </div>
  );
};

export default EditUser;
