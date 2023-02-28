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
import { NavLink } from "react-router-dom";
import requester from "src/api/api";
import { apiPath } from "src/api/apiPath";
import { UpdateProfileApi, UserProfile } from "src/redux/Profile/ProfileSlice";
import { DispatchType } from "src/redux/configStore";
import * as yup from "yup";
import { useDispatch } from "react-redux";

type Props = { userProfile: UserProfile };

function FormProfile({ userProfile }: Props) {
  const [isDisplay, setIsDisplay] = useState(false);

  const dispatch: DispatchType = useDispatch();
  const formik = useFormik<UserProfile>({
    initialValues: {
      id: userProfile?.id,
      name: userProfile?.name,
      email: userProfile?.email,
      password: userProfile?.password,
      phone: userProfile?.phone,
      birthday: userProfile?.birthday,
      gender: userProfile?.gender,
      role: userProfile?.role,
    },

    onSubmit: (values) => {
      console.log(values);
      dispatch(UpdateProfileApi(userProfile?.id, values));
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
  return (
    <div>
      <Form onSubmitCapture={formik.handleSubmit}>
        <Form.Item label='Name'>
          <Input
            name='name'
            value={formik.values.name}
            onChange={formik.handleChange}
          />
          {formik.errors.name && (
            <span className='text-red-400'>{formik.errors.name}</span>
          )}
        </Form.Item>
        <Form.Item label='Email'>
          <Input
            name='email'
            value={formik.values.email}
            onChange={formik.handleChange}
          />
          {formik.errors.email && (
            <span className='text-red-400'>{formik.errors.email}</span>
          )}
        </Form.Item>

        <Form.Item label='Phone'>
          <Input
            name='phone'
            value={formik.values.phone}
            onChange={formik.handleChange}
          />
          {formik.errors.phone && (
            <span className='text-red-400'>{formik.errors.phone}</span>
          )}
        </Form.Item>
        <Form.Item label='Birthday'>
          <Input
            name='birthday'
            value={formik.values.birthday}
            onChange={formik.handleChange}
          />
          {formik.errors.birthday && (
            <span className='text-red-400'>{formik.errors.birthday}</span>
          )}
        </Form.Item>
        <Form.Item label='Gender' name='gender'>
          <Select
            options={[
              { value: "true", label: "Male" },
              { value: "false", label: "Female" },
            ]}
            value={formik.values.gender}
            onChange={formik.handleChange}
          />
        </Form.Item>

        <div className='flex justify-center'>
          {" "}
          <Button htmlType='submit' className='bg-green-600 text-white text-lg'>
            Submit
          </Button>
          <button
            onClick={() => {
              setIsDisplay(false);
            }}
            className='border-none mx-5 rounded-md bg-red-500 '>
            <NavLink to={"/profile/"} className='text-white no-underline'>
              Back
            </NavLink>
          </button>
        </div>
      </Form>
    </div>
  );
}

export default FormProfile;
