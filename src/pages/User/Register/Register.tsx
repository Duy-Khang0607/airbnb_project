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
import requester from "src/api/api";
import { apiPath } from "src/api/apiPath";
import * as yup from "yup";

type Props = {};

const Register = (props: Props) => {
  const randomNumberInRange = (min: number, max: number) => {
    //  get number between min (inclusive) and max (inclusive)
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  const [num, setNum] = useState(randomNumberInRange(0, 1000000));

  const formik = useFormik<{
    id:number,
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
      console.log(values);
      try {
        const res = await requester({
          method: "POST",
          url: apiPath.REGISTER,
          data: values
        })

        console.log(res.data.content)
        alert("Create User Account Successfully !");
      } catch (error:any) {
        alert(error.response?.data?.content)
      }
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
    formik.setFieldValue("id", num);
  }, []);
  return (
    <>
      <Row>
        <Col
          span={8}
          className="mt-32 container mx-auto border-2 border-gray-300 border-solid  px-5 rounded-lg   "
        >
          <h5 className="text-center text-xl   ">Sign Up</h5>
          <p className="text-center  text-lg font-normal">
            Welcome to Airbnb
          </p>{" "}
          <Form  onSubmitCapture={formik.handleSubmit}>
            <Form.Item label="Name">
              <Input
                name="name"
                value={formik.values.name}
                onChange={formik.handleChange}
              />
              {formik.errors.name && (
                <span className="text-red-400">{formik.errors.name}</span>
              )}
            </Form.Item>
            <Form.Item label="Email">
              <Input
                name="email"
                value={formik.values.email}
                onChange={formik.handleChange}
              />
              {formik.errors.email && (
                <span className="text-red-400">{formik.errors.email}</span>
              )}
            </Form.Item>
            <Form.Item label="Password">
              <Input
                name="password"
                value={formik.values.password}
                onChange={formik.handleChange}
              />
              {formik.errors.password && (
                <span className="text-red-400">{formik.errors.password}</span>
              )}
            </Form.Item>
            <Form.Item label="Phone">
              <Input
                name="phone"
                value={formik.values.phone}
                onChange={formik.handleChange}
              />
              {formik.errors.phone && (
                <span className="text-red-400">{formik.errors.phone}</span>
              )}
            </Form.Item>
            <Form.Item label="Birthday">
              <Input
                name="birthday"
                value={formik.values.birthday}
                onChange={formik.handleChange}
              />
              {formik.errors.birthday && (
                <span className="text-red-400">{formik.errors.birthday}</span>
              )}
            </Form.Item>
            <Form.Item label="Gender" name="gender">
              <Select
                options={[
                  { value: "true", label: "Male" },
                  { value: "false", label: "Female" },
                ]}
              />
            </Form.Item>
            <Form.Item label="Role">
            <Select
                options={[
                  { value: "USER", label: "User" },
                  { value: "ADMIN", label: "Admin" },
                ]}
              />
              
            </Form.Item>

            <div className="flex justify-center">
              {" "}
              <Button htmlType="submit" className="bg-pink text-white text-lg">
                Sign Up
              </Button>
            </div>
          </Form>
        </Col>
      </Row>
    </>
  );
};

export default Register;
