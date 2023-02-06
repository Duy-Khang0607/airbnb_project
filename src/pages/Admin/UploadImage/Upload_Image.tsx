import React, { useState, useEffect } from "react";
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { DispatchType, RootState } from "../../../redux/configStore";
import requester from "src/api/api";
import { Tag } from "antd";
import { openNotificationWithIcon } from "src/utils/notification";
import {
  clearStatusAction,
  setStatusAction,
  updateAvatar,
} from "src/redux/UserReducer/UserReducer";
import {
  LocationModel,
  UploadImgLocationApi,
} from "src/redux/LocationReducer/LocationReducer";
import { useParams } from "react-router-dom";
import * as Yup from "yup";

type Props = {};

export default function Upload_Image({}: Props) {
  const [active, setActive] = useState<number>(0);
  // const [active, setActive] = useState<string>("0");
  const [image, setImage] = useState<any>("");

  // const { statusAction } = useSelector((state: RootState) => state.UserReducer);
  const { idOrderRoom } = useSelector((state: RootState) => state.ModalReducer);

  const { location } = useSelector((state: RootState) => state.LocationReducer);

  const dispatch: DispatchType = useDispatch();
  console.log("ID: ", idOrderRoom);
  const formik = useFormik<{
    id: number;
    tenViTri: string;
    tinhThanh: string;
    quocGia: string;
    hinhAnh: string;
  }>({
    initialValues: {
      id: 0,
      tenViTri: "",
      tinhThanh: "",
      quocGia: "",
      hinhAnh: "",
    },
    validationSchema: Yup.object().shape({
      tenViTri: Yup.string().required("Location is required!"),
      tinhThanh: Yup.string().required("City is required!"),
      quocGia: Yup.string().required("Country is required!"),
      hinhAnh: Yup.string().required("Please enter website"),
    }),
    onSubmit: async (values) => {
      const locationEdit: LocationModel = {
        id: values?.id,
        tenViTri: values?.tenViTri,
        tinhThanh: values?.tinhThanh,
        quocGia: values?.quocGia,
        hinhAnh: values?.hinhAnh,
      };
      const updateAction = UploadImgLocationApi(idOrderRoom, locationEdit);
      dispatch(updateAction);
      const clearStatus = clearStatusAction();
      dispatch(clearStatus);
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
    // setActive(event.target.value);
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
  }, [active, location]);
  //   console.log("Image: ", image);

  return (
    <form onSubmit={formik.handleSubmit}>
      <div>
        <div className='card border-0'>
          <div className='form-group'>
            <select className='form-select' onChange={handleSelect}>
              <option selected>Open this select upload type</option>
              <option value={1}>URL</option>
              <option value={2}>FILE</option>
            </select>
          </div>

          <div className='card-body'>
            {handleAvatar()}
            <div className='btnSubmit d-md-flex justify-content-md-end'>
              <button
                className='btn btn-outline-warning btn-md mt-2 rounded-pill px-4'
                type='submit'>
                Upload
              </button>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
}
