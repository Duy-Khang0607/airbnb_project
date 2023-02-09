import { Col, Modal, Row } from "antd";
import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import avatar from "src/assets/imgs/avatarwhite.jpg";
import Upload from "./UpLoad";
import FormProfile from "./FormProfile";
import { fetchProfileApi } from "src/redux/Profile/ProfileSlice";
import { USER_LOGIN, getStoreJSON } from "src/utils/setting";
import { useDispatch, useSelector } from "react-redux";
import { DispatchType, RootState } from "src/redux/configStore";
import "src/assets/css/profileUser.css";
type Props = {};

const Profile = (props: Props) => {
  const dispatch: DispatchType = useDispatch();
  const { userProfile } = useSelector((state: RootState) => state.ProfileSlice);

  const [isDisplay, setIsDisplay] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    dispatch(fetchProfileApi(getStoreJSON(USER_LOGIN).user.id));
  }, []);
  return (
    <Row gutter={80} className='profile container mx-auto p-5 flex '>
      <Col
        xs={24}
        sm={24}
        md={8}
        lg={8}
        className='avatar border-2 border-solid border-gray-300 rounded-xl'>
        <div className='px-2 py-3'>
          <div className='text-center '>
            <img src={avatar} alt='' className='rounded-full' />
            <p className='underline cursor-pointer' onClick={showModal}>
              Update avatar
            </p>
            <Modal
              title='Basic Modal'
              open={isModalOpen}
              onOk={handleOk}
              onCancel={handleCancel}>
              <Upload />
            </Modal>
          </div>

          <div className='text-left  border-2 border-solid border-x-0 border-t-0 pb-5 pt-2 border-gray-200 pl-3'>
            <h6>
              <img src='' alt='' />
              Xác minh danh tính
            </h6>
            <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. </p>

            <button className='p-2 rounded-xl border-2 border-solid border-gray-300 bg-white hover:bg-gray-600'>
              {" "}
              Nhận huy hiệu
            </button>
          </div>

          <div className='text-center m-2'>
            <h5>Xác nhận email</h5>
            <p className='text-left'>
              <i className='fa fa-envelope mr-2'></i>
              Địa chỉ Email
            </p>
          </div>
        </div>
      </Col>
      <Col xs={24} sm={24} md={16} lg={18} className=''>
        {!isDisplay && (
          <div className='name'>
            <div>
              <h3>Welcome, tôi tên là</h3>
              <p className='text-gray-400'>Bắt đầu tham gia </p>
              <p
                className='underline cursor-pointer'
                onClick={() => {
                  setIsDisplay(true);
                }}>
                {" "}
                Chỉnh sửa hồ sơ
              </p>
            </div>
            <div className='border-2 border-x-0 border-t-0 border-gray-300 border-solid my-2 '>
              <i className='fa fa-pen'></i> Đánh giá
            </div>
            <div className='border-2 border-x-0 border-t-0 border-gray-300 border-solid my-2'>
              <p className='underline'> Đánh giá của bạn</p>
            </div>
          </div>
        )}
        {isDisplay && <FormProfile userProfile={userProfile} />}
      </Col>
    </Row>
  );
};

export default Profile;
