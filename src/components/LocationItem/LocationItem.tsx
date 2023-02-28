import { HeartOutlined } from "@ant-design/icons";
import React, { useEffect } from "react";
import { NavLink } from "react-router-dom";
import { getLocationApi } from "src/redux/LocationReducer/LocationReducer";

type Props = {
  location: any;
};

function LocationItem({ location }: Props) {
  return (
    <section className='w-80 h-96 m-2  relative '>
      <NavLink to={`/detail/${location.id}`} className='no-underline'>
        <div>
          <img
            src={location.hinhAnh}
            alt=''
            className='w-72 h-60 rounded-2xl object-cover'
            onClick={() => {}}
          />
        </div>
        <div className='m-1 leading-3 text-black ' onClick={() => {}}>
          <h6 className=' overflow-hidden text-start mt-1 text-decoration-none'>
            {location.tenPhong}
          </h6>
          <p className='text-gray-500 '>7548 km</p>
          <p className='text-gray-500'>Ngày 7 - Ngày 22 tháng 9</p>
          <p>
            <span className='font-bold'>${location.giaTien}</span> US
          </p>
        </div>
        <span className='absolute top-2 right-12 text-pink'>
          <HeartOutlined />
        </span>
      </NavLink>
    </section>
  );
}

export default LocationItem;
