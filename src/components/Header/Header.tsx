import React, { useState } from "react";
import { Col, Row } from "antd";
import { NavLink } from "react-router-dom";
import { Input, Space } from "antd";
import logo from "src/assets/svg/logo.svg";
import { SearchOutlined } from "@ant-design/icons";
import MenuProfile from "./MenuProfile";
import HeaderSearch from "../HeaderSearch/HeaderSearch";
import { Tabs } from "antd";
import type { TabsProps } from "antd";

const { Search } = Input;

type Props = {};

const onChange = (key: string) => {
  console.log(key);
};

const items: TabsProps["items"] = [
  {
    key: "1",
    label: `Stays`,
    children: (
      <>
        <div className='rounded flex justify-center '>
          <div>Where </div>
          <div>Check in</div>
          <div>Check out </div>
          <div>
            <span>
              <h4>Who</h4>
              <p>Add guests</p>
            </span>
            <span className='bg-pink p-5 rounded-full w-12 h-12 items-center'>
              <SearchOutlined className='text-white' />
              Search
            </span>
          </div>
        </div>
      </>
    ),
  },
  {
    key: "2",
    label: `Experiences`,
    children: `Content of Tab Pane 2`,
  },
  {
    key: "3",
    label: `Online Experience`,
    children: `Content of Tab Pane 3`,
  },
];

const Header = (props: Props) => {
  const [isClicked, setIsClicked] = useState(false);
  const onSearch = (value: string) => console.log(value);

  const showDropdown = () => {
    setIsClicked(!isClicked);
  };
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
        {true && (
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
        )}
        {false && (
          <Col span={8} className='relative flex justify-center '>
            <Tabs
              defaultActiveKey='1'
              items={items}
              onChange={onChange}
              className='absolute top-0   '></Tabs>
          </Col>
        )}

        <Col span={8} className='flex justify-end'>
          <MenuProfile />
        </Col>
      </Row>

      <HeaderSearch />
    </div>
  );
};

export default Header;
