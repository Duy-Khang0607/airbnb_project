import React, { useEffect, useState } from "react";
import { Formik, useFormik, FormikProps } from "formik";
import * as Yup from "yup";
import { useDispatch } from "react-redux";
import { DispatchType } from "src/redux/configStore";
import { postUserApi } from "src/redux/UserReducer/UserReducer";
import { openNotificationWithIcon } from "src/utils/notification";
import { clearStatusAction } from "src/redux/LocationReducer/LocationReducer";

type Props = {};
let timeout: ReturnType<typeof setTimeout>;
export default function AddUser({}: Props) {
  const [active, setActive] = useState<number>(0);
  const [submit, setSubmit] = useState(0);
  const dispatch: DispatchType = useDispatch();

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
    validationSchema: Yup.object().shape({
      id: Yup.number().required("ID is required!"),
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
      role: Yup.string().required("role is required!"),
    }),
    onSubmit: async (values) => {
      console.log("User: ", values);
      try {
        setSubmit(1);
        const addUserAction = postUserApi(values);
        dispatch(addUserAction);
        openNotificationWithIcon(
          "success",
          "Add user successfully !!",
          <p>Return user table to review information !</p>
        );
        resetFieldValue();
      } catch (err) {
        console.log(err);
      }
    },
  });

  //   const handleFile = (event: React.ChangeEvent<HTMLInputElement>) => {
  //     const file: File = (event.target.files as FileList)[0];
  //     const reader = new FileReader();
  //     reader.readAsDataURL(file as any);
  //     reader.onload = () => {
  //       if (reader.readyState === 2) {
  //         formik.setFieldValue("avatar", reader.result);
  //       }
  //     };
  //   };

  //   const handleSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
  //     console.log("Value: ", event.target.value);
  //     setActive(Number(event.target.value));
  //   };

  //   const renderURL = () => {
  //     return (
  //       <>
  //         <div className='form-group my-2'>
  //           <input
  //             type='text'
  //             className='form-control'
  //             id='avatar'
  //             aria-describedby='emailHelp'
  //             placeholder='Your picture'
  //             onChange={formik.handleChange}
  //           />
  //         </div>
  //       </>
  //     );
  //   };

  //   const renderFile = () => {
  //     return (
  //       <>
  //         <div className='form-group my-2'>
  //           <input
  //             type='file'
  //             className='form-control'
  //             id='avatar'
  //             aria-describedby='emailHelp'
  //             placeholder='Your picture'
  //             accept='.jpeg, .png, .jpg'
  //             onChange={handleFile}
  //           />
  //           {/* {formik.errors.hinhAnh && (
  //             <p className="text-danger">{formik.errors.hinhAnh}</p>
  //           )} */}
  //         </div>
  //       </>
  //     );
  //   };

  //   const handleAvatar = () => {
  //     if (active === 0) {
  //       return <></>;
  //     } else if (active === 1) {
  //       return renderURL();
  //     } else {
  //       return renderFile();
  //     }
  //   };

  const resetFieldValue = () => {
    formik.setFieldValue("id", 0);
    formik.setFieldValue("name", " ");
    formik.setFieldValue("email", " ");
    formik.setFieldValue("password", " ");
    formik.setFieldValue("phone", " ");
    formik.setFieldValue("birthday", " ");
    formik.setFieldValue("gender", false);
    formik.setFieldValue("role", " ");
  };

  const clearStatus = () => {
    const clearAction = clearStatusAction();
    dispatch(clearAction);
  };

  useEffect(() => {
    timeout = setTimeout(() => {
      clearStatus();
    }, 200);
    return () => {
      if (timeout !== null) {
        clearTimeout(timeout);
        setSubmit(0);
      }
    };
  }, [submit]);

  return (
    <div className='update-user container my-3 p-4 rounded-4'>
      <div className='title'>
        <h3>Information's User</h3>
      </div>
      <form onSubmit={formik.handleSubmit}>
        <div className='row'>
          <div className='col-lg-6 col-md-12 col-sm-12'>
            <div className='form-group my-1'>
              <label className='form-label'>Email</label>
              <input
                type='email'
                className='form-control'
                id='email'
                aria-describedby='emailHelp'
                placeholder='Email adrress'
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
                type='text'
                className='form-control'
                id='phone'
                aria-describedby='emailHelp'
                placeholder='Phone number'
                onChange={formik.handleChange}
              />
              {formik.errors.phone ? (
                <p className='text-danger mt-1'>{formik.errors.phone}</p>
              ) : (
                ""
              )}
            </div>
            <div className='form-group my-1'>
              <label className='form-label'>Role</label>
              <select
                className='form-select'
                aria-label='Default select example'
                id='role'
                onChange={formik.handleChange}>
                <option selected>Choose your role</option>
                <option value='ADMIN'>Admin</option>
                <option value='USER'>User</option>
              </select>
              {formik.errors.role ? (
                <p className='text-danger mt-1'>{formik.errors.role}</p>
              ) : (
                ""
              )}
            </div>
            {/* <div className="form-group my-1">
              <label className="form-label">Avatar</label>
              <select className="form-select" onChange={handleSelect}>
                <option value={0}>Open this select upload type</option>
                <option value={1}>Upload by URL</option>
                <option value={2}>Upload by File</option>
              </select>
            </div>
            <form>
              {handleAvatar()}
            </form> */}
            <div className='form-group my-1'>
              <div className='gender-title mb-2'>Gender</div>
              <select
                className='form-select'
                aria-label='Default select example'
                id='gender'
                onChange={formik.handleChange}>
                <option selected>Choose your gender</option>
                <option value='true'>Male</option>
                <option value='false'>Female</option>
              </select>
              {formik.errors.gender ? (
                <p className='text-danger mt-1'>{formik.errors.gender}</p>
              ) : (
                ""
              )}
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
                placeholder='Your birthday'
                onChange={formik.handleChange}
              />
              {formik.errors.birthday ? (
                <p className='text-danger mt-1'>{formik.errors.birthday}</p>
              ) : (
                ""
              )}
            </div>
            <div className='form-group my-1'>
              <label className='form-label'>Name</label>
              <input
                type='text'
                className='form-control'
                id='name'
                aria-describedby='emailHelp'
                placeholder='Your name'
                onChange={formik.handleChange}
              />
              {formik.errors.name ? (
                <p className='text-danger mt-1'>{formik.errors.name}</p>
              ) : (
                ""
              )}
            </div>
            <div className='form-group my-1'>
              <label className='form-label'>Password</label>
              <input
                type='text'
                className='form-control'
                id='password'
                aria-describedby='emailHelp'
                placeholder='Type your password'
                onChange={formik.handleChange}
              />
              {formik.errors.password ? (
                <p className='text-danger mt-1'>{formik.errors.password}</p>
              ) : (
                ""
              )}
            </div>

            <div className='btnSubmit d-md-flex justify-content-md-end mt-4'>
              <button
                className='btn btn-outline-success btn-md me-4 rounded-pill px-4'
                type='submit'>
                Submit
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
