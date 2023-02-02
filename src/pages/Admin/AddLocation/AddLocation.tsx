import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { DispatchType, RootState } from "src/redux/configStore";
import {
  clearStatusAction,
  getLocationApi,
  LocationModel,
  postLocationApi,
} from "src/redux/LocationReducer/LocationReducer";
import { useParams } from "react-router-dom";

type Props = {};

export default function AddLocation({}: Props) {
  const [active, setActive] = useState<number>(0);
  const [submit, setSubmit] = useState(0);
  const [image, setImage] = useState<any>("");
  const profile = useSelector(
    (state: RootState) => state.SignInReducer.userLogin
  );
  const dispatch: DispatchType = useDispatch();
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
      hinhAnh: Yup.string().required("Picture is required !"),
    }),
    onSubmit: async (values) => {
      console.log("Location: ", values);
      const location: LocationModel = {
        id: values?.id,
        tenViTri: values?.tenViTri,
        tinhThanh: values?.tinhThanh,
        quocGia: values?.quocGia,
        hinhAnh: values?.hinhAnh,
      };

      const addLocationAction = postLocationApi(location);
      dispatch(addLocationAction);
      handleResetValues();
      const clearStatus = clearStatusAction();
      dispatch(clearStatus);
      dispatch(getLocationApi());
      console.log(values.hinhAnh);
    },
  });

  const handleResetValues = () => {
    formik.setFieldValue("id", 0);
    formik.setFieldValue("tenVitri", " ");
    formik.setFieldValue("tinhThanh", " ");
    formik.setFieldValue("quocGia", " ");
    formik.setFieldValue("hinhAnh", " ");
  };

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
            accept='.jpeg, .png, .jpg'
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

  useEffect(() => {}, []);

  return (
    <div>
      <div className='row'>
        <div className='col-sm-9 mx-auto'>
          <div className='card border-0 shadow rounded-3 my-5'>
            <div className='card-body p-4 p-sm-5'>
              <h3 className='card-title text-center mb-5'>New Location</h3>
              <form onSubmit={formik.handleSubmit}>
                <div className='form-group mb-3'>
                  <label className='my-1'>Location Name</label>
                  <input
                    type='text'
                    className='form-control'
                    id='tenViTri'
                    placeholder='Your Location'
                    onChange={formik.handleChange}
                  />
                  {formik.errors.tenViTri ? (
                    <p className='text-danger mt-1'>{formik.errors.tenViTri}</p>
                  ) : (
                    ""
                  )}
                </div>
                <div className='form-group mb-3'>
                  <label className='my-1'>City</label>
                  <input
                    type='text'
                    className='form-control'
                    id='tinhThanh'
                    placeholder='City'
                    onChange={formik.handleChange}
                  />
                  {formik.errors.tinhThanh ? (
                    <p className='text-danger mt-1'>
                      {formik.errors.tinhThanh}
                    </p>
                  ) : (
                    ""
                  )}
                </div>
                <div className='form-group mb-3'>
                  <label className='my-1'>Country</label>
                  <input
                    type='text'
                    className='form-control'
                    id='quocGia'
                    placeholder='Country'
                    onChange={formik.handleChange}
                  />
                  {formik.errors.quocGia ? (
                    <p className='text-danger mt-1'>{formik.errors.quocGia}</p>
                  ) : (
                    ""
                  )}
                </div>
                <div className='form-group mb-3'>
                  <label className='my-1'>Picture</label>
                  <select className='form-select' onChange={handleSelect}>
                    <option value={0}>Open this select upload type</option>
                    <option value={1}>Upload by URL</option>
                    <option value={2}>Upload by File</option>
                  </select>
                  {handleAvatar()}
                  {formik.errors.hinhAnh ? (
                    <p className='text-danger mt-1'>{formik.errors.hinhAnh}</p>
                  ) : (
                    ""
                  )}
                </div>
                <div className='btnSubmit d-md-flex justify-content-md-end'>
                  <button
                    className='btn btn-outline-success btn-md rounded-pill px-4'
                    type='submit'>
                    Submit
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
