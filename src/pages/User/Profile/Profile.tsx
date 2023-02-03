import { Col, Row } from "antd";
import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import avatar from "src/assets/imgs/avatarwhite.jpg"

type Props = {};

const Profile = (props: Props) => {
  const [isDisplay, setIsDisplay] = useState(false);

  return <div>
    
    <div className="container mx-auto p-5 flex ">
      <div  className="border-2 border-solid border-gray-300 w-1/4 rounded-xl">
        
      <div className="px-2 py-3">
          <div className="text-center ">
            <img src={avatar} alt="" className="rounded-full"/>
           <p className="underline cursor-pointer" >Update avatar</p>
          </div>

          <div className="text-left  border-2 border-solid border-x-0 border-t-0 pb-5 pt-2 border-gray-200 pl-3">

            <h6>Xác minh danh tính</h6>
            <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. </p>

            <button className="p-2 rounded-xl border-2 border-solid bg-white"> Nhận huy hiệu</button>
          </div>

          <div className="text-center m-2" >
            <h5>Xác nhận email</h5>
            <p className="text-left">Địa chỉ Email</p>
          </div>
      </div>

      </div>
      <div className="w-3/4 mx-5">
        
        <div>
          <h3 >Welcome, tôi tên là</h3>
          <p className="text-gray-400">Bắt đầu tham gia </p>
          <p className="underline"> Chỉnh sửa hồ sơ</p>
        </div>
        <div  className="border-2 border-x-0 border-t-0 border-gray-300 border-solid my-2 ">
          Đánh giá
        </div>
          <div className="border-2 border-x-0 border-t-0 border-gray-300 border-solid my-2">
           <p className="underline"> Đánh giá của bạn</p>
          </div>
      </div>

    </div>
  </div>;
};

export default Profile;
