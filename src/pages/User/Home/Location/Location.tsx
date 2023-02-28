import { HeartOutlined } from "@ant-design/icons";
import { Col, Row } from "antd";
import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import LocationItem from "src/components/LocationItem/LocationItem";
import { getLocationApi } from "src/redux/LocationReducer/LocationReducer";
import { getAllRoomsApi } from "src/redux/RoomReducer/RoomReducer";
import { DispatchType, RootState } from "src/redux/configStore";

type Props = {};

const Location = ({}: Props) => {
  const dispatch: DispatchType = useDispatch();

  const { arrLocation, arrLocationPageIndex } = useSelector(
    (state: RootState) => state.LocationReducer
  );

  const { arrRoomPageIndex, arrRooms } = useSelector(
    (state: RootState) => state.RoomReducer
  );

  return (
    <Row gutter={50} className='conatiner mx-auto'>
      {arrRoomPageIndex?.map((item: any, index: number) => {
        return (
          <Col lg={6} className='relative'>
            <NavLink to={`/detail/${item.id}`} className='no-underline'>
              <div className='w-full h-96 mx-auto'>
                <div className='w-full'>
                  <img
                    src={item.hinhAnh}
                    alt=''
                    className='w-full h-60 rounded-2xl object-cover'
                    onClick={() => {}}
                  />
                </div>
                <div>
                  <h6
                    className='text-black  text-start mt-1 text-decoration-none'
                    style={{ width: "300px", height: "40px" }}>
                    {item.tenPhong}
                  </h6>
                  <p className='text-gray-500 h-2'>7548 km</p>
                  <p className='text-gray-500 h-2'>Ngày 7 - Ngày 22 tháng 9</p>
                  <p>
                    <span className='font-bold text-black'>
                      ${item.giaTien} US
                    </span>
                  </p>
                </div>
                <button className='absolute top-2 right-8 z-20 bg-pink shadow-2xl shadow-pink border-0 rounded-xl'>
                  <HeartOutlined className='font-bold text-xl text-white leading-0' />
                </button>
              </div>
            </NavLink>
          </Col>
        );
      })}
    </Row>
  );
};

export default Location;
