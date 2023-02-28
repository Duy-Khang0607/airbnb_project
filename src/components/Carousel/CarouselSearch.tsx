import React, { useRef } from "react";
import { Button, Row, Col, Carousel } from "antd";
import { CarouselRef } from "antd/lib/carousel";
import { FcNext, FcPrevious } from "react-icons/fc";
import { NavLink } from "react-router-dom";
import { TbGitBranch } from "react-icons/tb";
import { DispatchType, RootState } from "src/redux/configStore";
import { getRoomPaginationApi } from "src/redux/RoomReducer/RoomReducer";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import Pagination from "../Pagination/Pagination";

type Props = {};
const image1 = [
  {
    url: "./images/Bắc cực.jpg",
    name: "Bắc cực",
  },
  {
    url: "./images/bãi biển.jpg",
    name: "Bãi biển",
  },
  {
    url: "./images/cabin.jpg",
    name: "Cabin",
  },
  {
    url: "./images/Chơi golf.jpg",
    name: "Chơi golf",
  },
  {
    url: "./images/công viên quốc gia.jpg",
    name: "Công viên quốc gia",
  },
  {
    url: "./images/Đảo.jpg",
    name: "Đảo",
  },
  {
    url: "./images/hang động.jpg",
    name: "Hang động",
  },
  {
    url: "./images/hồ bơi tuyệt vời.jpg",
    name: "Hồ bơi tuyệt vời",
  },
  {
    url: "./images/khung cảnh tuyệt vời.jpg",
    name: "Khung cảnh tuyệt vời",
  },
  {
    url: "./images/lướt sóng.jpg",
    name: "Lướt sóng",
  },
  {
    url: "./images/nhà chung.jpg",
    name: "Nhà chung",
  },
  {
    url: "./images/nhà dưới lòng đất.jpg",
    name: "Nhà dưới lòng đất",
  },
  {
    url: "./images/nhà nhỏ.jpg",
    name: "Nhà nhỏ",
  },
  {
    url: "./images/nhiệt đới.jpg",
    name: "Nhiệt đới",
  },
  {
    url: "./images/Bắc cực.jpg",
    name: "Bắc cực",
  },
  {
    url: "./images/Phục vụ bữa sáng.jpg",
    name: "Phục vụ bữa sáng",
  },
  {
    url: "./images/thật ấn tượng.jpg",
    name: "Thật ấn tượng",
  },
  {
    url: "./images/thiết kế.jpg",
    name: "Thiết kế",
  },
  {
    url: "./images/ven hồ.jpg",
    name: "Ven hồ",
  },
  {
    url: "./images/thiết kế.jpg",
    name: "Thiết kế",
  },
  {
    url: "./images/bietthu.jpg",
    name: "Biệt thự",
  },
  {
    url: "./images/khucamtrai.jpg",
    name: "Khu cắm trại",
  },
  {
    url: "./images/nhakhungchua.jpg",
    name: "Nhà khung chữ A",
  },
  {
    url: "./images/laudai.jpg",
    name: "Lâu đài",
  },
];
let timeout: ReturnType<typeof setTimeout>;

const CarouselSearch = ({}: Props) => {
  const slider = useRef<CarouselRef>(null);
  const settings = {
    dots: false,
    slidesToShow: 10,
    slidesToScroll: 1,
    autoplaySpeed: 2000,
  };
  const { arrRoomPageIndex } = useSelector(
    (state: RootState) => state.RoomReducer
  );

  return (
    <Row className='container flex mt-36 justify-center mx-auto'>
      <Col
        xs={6}
        md={12}
        lg={24}
        className='relative w-11/12 inline-block mr-7'>
        <button
          className='absolute top-5 left-0 font-medium  text-sm rounded-full bg-white w-9 h-9 shadow-light border-gray-300 z-10'
          onClick={() => {
            slider.current?.prev();
          }}>
          <FcPrevious />
        </button>
        <div>
          <Carousel ref={slider} {...settings}>
            {image1.map((item, index) => {
              return (
                <NavLink
                  to={"/"}
                  key={index}
                  className='font-bold text-black no-underline'>
                  <div className='flex flex-col items-center py-2'>
                    <img src={item.url} alt='..' className='w-6' />
                    <p className='text-xs hover:text-black'>{item.name}</p>
                  </div>
                </NavLink>
              );
            })}
          </Carousel>
        </div>
        <button
          className='absolute top-5 right-0 font-medium  text-sm rounded-full bg-white w-9 h-9 shadow-light border-gray-300 z-10'
          onClick={() => {
            slider.current?.prev();
          }}>
          <FcNext />
        </button>
      </Col>
    </Row>
  );
};

export default CarouselSearch;
