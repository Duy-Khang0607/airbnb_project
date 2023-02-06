import { SearchOutlined } from '@ant-design/icons';
import { Col, Tabs } from 'antd'
import React from 'react'
import type { TabsProps } from "antd";

const HeaderSearch = () => {
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
              <span className='bg-pink p-5 rounded-full w-6 h-6 items-center'>
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
  return (
    <div>
       
            <Tabs
              defaultActiveKey='1'
              items={items}
              onChange={onChange}
              className='absolute top-0   '></Tabs>
     
        
    </div>
  )
}

export default HeaderSearch