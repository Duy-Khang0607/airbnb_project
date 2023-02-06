import React, { useRef } from "react";
import { Button, Carousel } from "antd";
import { CarouselRef } from "antd/lib/carousel";
import { FcNext, FcPrevious } from "react-icons/fc";
import { NavLink } from "react-router-dom";
import { TbGitBranch } from "react-icons/tb";

type Props = {}
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

const CarouselSearch = ({} : Props) => {
    const slider = useRef<CarouselRef>(null);


    const settings = {
        dots: false,
        slidesToShow: 10,
        slidesToScroll: 1,
        autoplaySpeed: 2000,
      };
  return (
    <div>
        <div className="container flex mt-36">
            <div className=" relative w-11/12 inline-block mr-7">
                <button className="absolute left-0 font-medium  text-sm rounded-full bg-white w-9 h-9 shadow-light border-gray-300"
                style={{top: "50% ", transform: "translateY(-50%)", zIndex: "2"}}
                onClick={() => {
                    slider.current?.prev();
                }}
                >

                    <FcPrevious/>
                </button>
                <div>
                    <Carousel ref={slider} {...settings}>
                    {image1.map((item, index) => {
                        return (
                            <NavLink to={"/"} key={index} className="font-bold text-black">
                                <div className="flex flex-col items-center py-2">
                                    <img src={item.url} alt=".." className="w-6"/>
                                    <p  className="text-xs hover:text-black">{item.name}</p>
                                </div>

                            </NavLink>
                        )
                    })}
                    </Carousel>
                </div>
                <button className="absolute right-0 font-medium text-sm rounded-full bg-white w-9 h-9 shadow-light border-gray-300 items-center flex justify-center"
                 style={{top: "50% ", transform: "translateY(-50%)", zIndex: "2"}}
                 onClick={() => {
                     slider.current?.prev();
                 }}
                >
                    <FcNext/>
                </button>
            </div>
            <div className="flex items-center">
                <button className="flex items-center border rounded-md text-base  bg-white border-2 border-gray-400 shadow-md"> 
                <TbGitBranch className="mr-2" />
                Filter
                </button>
            </div>
        </div>
        

    </div>
  )
}

export default CarouselSearch