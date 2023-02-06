import React, { useEffect, useState } from "react";
import { Col, Row } from "antd";
import { NavLink } from "react-router-dom";
import { Input, Space } from "antd";
import logo from "src/assets/svg/logo.svg";
import { SearchOutlined } from "@ant-design/icons";
import MenuProfile from "./MenuProfile";
import HeaderSearch from "../HeaderSearch/HeaderSearch";
import useScroll from "src/HOOK/UseScroll";



const { Search } = Input;

type Props = {};



const Header = (props: Props) => {
  const [isClicked, setIsClicked] = useState(false);
  const onSearch = (value: string) => console.log(value);

  const showDropdown = () => {
    setIsClicked(!isClicked);
  };
  const scroll = useScroll();
  useEffect(() => {
    if (scroll > 100) {
      setIsClicked(false)
      
    }
  }, [scroll]);
  return (
    <div className="fixed w-full bg-white z-30" >
      <Row
        className='bg-white py-3 mx-16 border-b-2 border-gray-400  '
        style={{ border: "20px", borderColor: "red" }}>
        <Col span={8} className=' flex justify-start items-center'>
          <NavLink to={""}>
            <img src={logo} className='' alt='airbnb-logo' />
          </NavLink>
        </Col>
         
          <Col span={8}>
            <div
              className='  flex justify-between items-center rounded-full border-2 border-solid border-gray-300 p-2 shadow-sm   '
              onClick={showDropdown}>
              <button className='border-none bg-inherit  w-1/4 text-sm'>
                AnyWhere
              </button>

              <button className=' bg-inherit border-y-0 border-solid border-gray-300  w-1/4 text-sm'>
                {" "}
                AnyWeek
              </button>

              <button className=' flex justify-between border-none bg-inherit  w-2/4 items-center text-sm text-gray-400'>
                <span className='text-center m-auto'>Add guests </span>

                <span className='bg-pink p-2 rounded-full w-10 h-10 items-center'>
                  <SearchOutlined className='text-white' />
                </span>
              </button>
            </div>
          </Col>
        




        <Col span={8} className='flex justify-end'>
          <MenuProfile />
        </Col>
      </Row>
    
      {isClicked && <HeaderSearch />}
       
      
    </div>
  );
};

export default Header;
