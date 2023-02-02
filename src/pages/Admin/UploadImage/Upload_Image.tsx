import React, { useState, useEffect } from "react";
import { useFormik } from "formik";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/configStore";
import requester from "src/api/api";
import { Tag } from "antd";
import { openNotificationWithIcon } from "src/utils/notification";
type Props = {};

export default function Upload_Image({}: Props) {
  const [active, setActive] = useState<number>(0);
  const [submit, setSubmit] = useState(0);
  const [image, setImage] = useState<any>("");
  const { idOrderRoom } = useSelector((state: RootState) => state.ModalReducer);
  console.log("ID: ", idOrderRoom);
  const formik = useFormik<{
    hinhAnh: string | any;
  }>({
    initialValues: {
      hinhAnh: "",
    },
    // validationSchema: Yup.object({
    //   avatar: Yup.mixed().required("Required !"),
    // }),
    onSubmit: async (values) => {
      //   setImage(values.hinhAnh);
      try {
        let result = await requester.post(
          `/api/users/upload-avatar`,
          values?.hinhAnh
        );
        openNotificationWithIcon(
          "success",
          " ",
          <Tag color='success' className='text-xl'>
            Thêm ảnh thành công
          </Tag>
        );
        console.log(result.data.content);
      } catch (err: any) {
        console.log(err);
        openNotificationWithIcon(
          "error",
          " ",
          <Tag color='error' className='text-xl'>
            Thêm ảnh thất bại
          </Tag>
        );
      }
    },
  });

  const handleFile = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file: File = (event.target.files as FileList)[0];
    const reader = new FileReader();
    reader.readAsDataURL(file as any);
    reader.onload = () => {
      if (reader.readyState === 2) {
        formik.setFieldValue("hinhAnh", reader.result);
        setImage(reader.result);
      }
    };
  };

  const handleSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
    console.log("Value: ", event.target.value);
    setActive(Number(event.target.value));
  };

  const renderURL = () => {
    return (
      <>
        <div className='form-group my-2'>
          <input
            type='text'
            className='form-control'
            id='hinhAnh'
            aria-describedby='emailHelp'
            placeholder='Your picture'
            onChange={formik.handleChange}
          />
        </div>
      </>
    );
  };

  const renderFile = () => {
    return (
      <>
        <div className='form-group my-2'>
          <input
            type='file'
            className='form-control'
            id='hinhAnh'
            aria-describedby='emailHelp'
            placeholder='Your picture'
            accept='.jpeg, .png, .jpg, .jfif'
            onChange={handleFile}
          />
        </div>
      </>
    );
  };

  const handleAvatar = () => {
    if (active === 0) {
      return <></>;
    } else if (active === 1) {
      return renderURL();
    } else {
      return renderFile();
    }
  };

  useEffect(() => {
    setImage("");
  }, [active]);
  //   console.log("Image: ", image);

  return (
    <div>
      <div className='card my-1 border-0'>
        <select className='form-select' onChange={handleSelect}>
          <option value={0}>Open this select upload type</option>
          <option value={1}>Upload by URL</option>
          <option value={2}>Upload by File</option>
        </select>
        <form onSubmit={formik.handleSubmit}>
          {handleAvatar()}
          <div className='d-flex justify-content-end mt-2'>
            <button className='btn btn-outline-success rounded-4' type='submit'>
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
