import { HeartOutlined } from "@ant-design/icons";
import React, { useState } from "react";
import { useNavigate } from "react-router";
import { NavLink } from "react-router-dom";

type Props = {
  location: any;
};

function LocationItem({ location }: Props) {
  const [Status, setStatus] = useState(false);
  const navigate = useNavigate();

  return (
    <div className="w-80 h-96 m-2  relative ">
      <NavLink to={`/detail/${location.id}`} className="no-underline">
        <div>
          <img
            src={location.hinhAnh}
            alt=""
            className="w-72 h-60 rounded-2xl"
            onClick={() => {}}
          />
        </div>
        <div className="m-1 leading-3 text-black " onClick={() => {}}>
          <h6 className=" overflow-hidden text-start mt-1 text-decoration-none">
            {location.tenPhong}
          </h6>
          <p className="text-gray-500 ">7548 km</p>
          <p className="text-gray-500">Ngày 7 - Ngày 22 tháng 9</p>
          <p>
            <span className="font-bold">${location.giaTien}</span> US
          </p>
        </div>
        {/* <button></button>
<button></button> */}
        <span className="absolute top-2 right-12 text-pink">
          <HeartOutlined />
        </span>
      </NavLink>
    </div>
  );
}

export default LocationItem;
