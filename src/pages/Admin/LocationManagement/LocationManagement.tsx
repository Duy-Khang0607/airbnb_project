import React, { useEffect, useState } from "react";
import {
  Button,
  Form,
  Input,
  InputNumber,
  Popconfirm,
  Table,
  Tag,
  Typography,
} from "antd";
import { SettingOutlined } from "@ant-design/icons";
import {
  deleteLocationApi,
  getLocationApi,
  getLocationByIdApi,
  getLocationPaginationApi,
  LocationModel,
} from "src/redux/LocationReducer/LocationReducer";
import { useDispatch, useSelector } from "react-redux";
import { DispatchType, RootState } from "src/redux/configStore";
import type { ColumnGroupType, ColumnsType } from "antd/es/table";
import Pagination from "src/components/Pagination/Pagination";
import Modaltest from "src/HOC/Modaltest";
import {
  setEditAction,
  setModalAction,
} from "src/redux/ModalReducer/ModalReducer";
import Upload_Image from "../UploadImage/Upload_Image";
import EditLocation from "../EditLocation/EditLocation";
import AddLocation from "../AddLocation/AddLocation";
import { getStore, USER_LOGIN } from "src/utils/setting";

type Props = {
  // postsPerPage: number;
  // setCurrentPage: (value: number) => void;
  // totalRow: number;
};
let timeout: ReturnType<typeof setTimeout>;
interface Item {
  id: string;
  tenViTri: string;
  tinhThanh: string;
  quocGia: string;
  hinhAnh: string;
  editable: boolean;
}

const LocationManagement: React.FC = () => {
  const location: LocationModel[] = useSelector(
    (state: RootState) => state.LocationReducer.arrLocation
  );
  const { arrLocationPageIndex, totalRow, statusAction } = useSelector(
    (state: RootState) => state.LocationReducer
  );
  const [reload, setReload] = useState<boolean>(false);
  /**
   * currentPage: trang hiện tại đang được trỏ tới
   */
  const [currentPage, setCurrentPage] = useState<number>(1);
  /**
   * postsPerPage: là số danh sách sản phẩm được hiển thị trên page
   */
  const [postsPerPage, setPostPerPage] = useState<number>(5);

  const dispatch: DispatchType = useDispatch();
  // const getAllLocationApi = () => {
  //   const location = getLocationApi();
  //   dispatch(location);
  // };
  const getLocationPageIndexAction = () => {
    const action = getLocationPaginationApi(currentPage, postsPerPage);
    dispatch(action);
  };

  const handleAdd = () => {
    const actionAddComponent = setModalAction({
      Component: AddLocation,
      title: "Add New Location",
    });
    dispatch(actionAddComponent);
  };

  const handleEdit = (id: number) => {
    const actionGetId = getLocationByIdApi(id);
    const actionEditComponent = setModalAction({
      Component: EditLocation,
      title: "Edit location infor",
    });
    dispatch(actionGetId);
    dispatch(actionEditComponent);
  };

  const handleUpload = (id: number) => {
    const actionUploadComponent = setEditAction({
      Component: Upload_Image,
      title: "Change Picture Location",
      ID: id,
    });
    console.log(id);
    dispatch(actionUploadComponent);
  };

  const handleDelete = (id: number) => {
    const deleteAction = deleteLocationApi(id);
    dispatch(deleteAction);
    setReload(true);
  };

  useEffect(() => {
    timeout = setTimeout(() => {
      // getAllLocationApi();
      getLocationPageIndexAction();
    }, 100);
    return () => {
      if (timeout !== null) {
        clearTimeout(timeout);
      }
    };
  }, [currentPage, statusAction]);
  return (
    <section>
      <Modaltest />
      <h1 className='text-4xl text-center'>Quản lý vị trí</h1>
      <div className='addAdminPage mb-3' style={{ cursor: "pointer" }}>
        <Button
          type='primary'
          data-bs-toggle='modal'
          data-bs-target='#modalId'
          onClick={handleAdd}
          className='text-xl'>
          <i className='fa fa-map-marker-alt mr-2'></i> Thêm vị trí
        </Button>
      </div>
      <div className='row'>
        <form className='search col-lg-4'>
          <div className='input-group mb-3'>
            <input
              className='form-control'
              placeholder='Locations Name'
              // onChange={handleChange}
              // value={id}
            />
            <button className='btn btn-outline-danger'>Search</button>
          </div>
        </form>

        <div className='table-responsive'>
          <table className='table table-hover'>
            <thead>
              <tr>
                <th scope='col'>ID</th>
                <th scope='col'>Location</th>
                <th scope='col'>City</th>
                <th scope='col'>Picture</th>
                <th scope='col'>Country</th>
                <th scope='col'>
                  <SettingOutlined className='text-2xl' />
                </th>
              </tr>
            </thead>
            <tbody>
              {arrLocationPageIndex?.map((locate: any, index: React.Key) => {
                return (
                  <tr key={index}>
                    <td>{locate?.id}</td>
                    <td>{locate?.tenViTri}</td>
                    <td>{locate?.tinhThanh}</td>
                    <td>
                      {locate?.hinhAnh !== "" ? (
                        <>
                          <img
                            src={locate?.hinhAnh}
                            alt='Image location'
                            className='w-56 h-56 rounded object-cover'
                          />
                          <button
                            className='btn btn-outline-dark btn-sm rounded-5 ms-2'
                            data-bs-toggle='modal'
                            data-bs-target='#modalId'
                            onClick={(event: React.MouseEvent<HTMLElement>) => {
                              handleUpload(locate?.id);
                            }}>
                            <i className='far fa-image'></i>
                          </button>
                        </>
                      ) : (
                        "No avatar"
                      )}
                    </td>
                    <td>{locate?.quocGia}</td>
                    <td>
                      {/* <button
                        className='btn btn-outline-primary btn-sm rounded-5 mx-1'
                        data-bs-toggle='modal'
                        data-bs-target='#modalId' >
                        <i className='fas fa-map-marker-alt'></i>
                      </button> */}
                      <button
                        className='btn btn-outline-warning btn-sm rounded-5 mx-1'
                        data-bs-toggle='modal'
                        data-bs-target='#modalId'
                        onClick={() => handleEdit(locate?.id)}>
                        <i className='fas fa-edit'></i>
                      </button>
                      <Popconfirm
                        title='Bạn có muốn xóa ? '
                        onConfirm={() => {
                          handleDelete(locate?.id);
                        }}>
                        <button className='btn btn-outline-danger btn-sm rounded-5'>
                          <i className='fas fa-trash-alt'></i>
                        </button>
                      </Popconfirm>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        <div className='pagination d-flex justify-content-center'>
          <Pagination
            postsPerPage={postsPerPage}
            setCurrentPage={setCurrentPage}
            totalRow={totalRow}
          />
        </div>
        {/* <Modal show={openModal} size="lg" className="modal-dialog-scrollable">
          <Modal.Header>
            <Modal.Title>
              {openPopUp ? "Upload Picture" : "Edit Location Infor"}
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {openPopUp ? (
              <UploadPicure id={String(idLocation)} />
            ) : (
              <EditLocation id={idLocation} />
            )}
          </Modal.Body>
          <Modal.Footer>
            <button
              className="btn btn-secondary"
              onClick={() => handleCloseModal()}
            >
              Close
            </button>
          </Modal.Footer>
        </Modal> */}
      </div>
    </section>
  );
};

export default LocationManagement;
