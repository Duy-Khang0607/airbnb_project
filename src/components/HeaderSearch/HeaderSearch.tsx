import { SearchOutlined } from "@ant-design/icons";
import { Col, Select, Tabs, Form } from "antd";
import React, { useEffect, useState } from "react";
import type { TabsProps } from "antd";
import type { SelectProps } from "antd";
import type { DatePickerProps } from "antd";
import { DatePicker, Space } from "antd";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import { TreeSelect } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { getLocationApi } from "src/redux/LocationReducer/LocationReducer";
import { DispatchType, RootState } from "src/redux/configStore";
import { NavLink } from "react-router-dom";
import useScroll from "src/HOOK/UseScroll";

const HeaderSearch = () => {
  const dispatch: DispatchType = useDispatch();

  const { arrLocation } = useSelector(
    (state: RootState) => state.LocationReducer
  );

  const treeData = [{}];

  const [value, setValue] = useState<string>();

  const onChangeTreeSlect = (newValue: string) => {
    console.log(newValue);
    setValue(newValue);
  };

  let [idLocation, setId] = useState<number>();

  const onChange = (value: number) => {
    setId(value);
  };

  console.log(idLocation);
  const onSearch = (value: string) => {
    // console.log("search:", value);
  };

  const { RangePicker } = DatePicker;

  const dateFormat = "YYYY/MM/DD";
  const weekFormat = "MM/DD";
  const monthFormat = "YYYY/MM";

  const dateFormatList = ["DD/MM/YYYY", "DD/MM/YY"];

  const customFormat: DatePickerProps["format"] = (value) =>
    `custom format: ${value.format(dateFormat)}`;

  const customWeekStartEndFormat: DatePickerProps["format"] = (value) =>
    `${dayjs(value).startOf("week").format(weekFormat)} ~ ${dayjs(value)
      .endOf("week")
      .format(weekFormat)}`;


  useEffect(() => {
    dispatch(getLocationApi());
  }, []);

  return (
    <div className="" onScroll={() => {}}>
      <div className="w-1/2 mx-auto bg-gray-100 border-2 border-solid border-gray-100 px-3 py-2  rounded-3xl flex flex-nowrap justify-between items-center">
        <div className="w-1/5">
          <Select
            className="w-full"
            showSearch
            placeholder="Where"
            optionFilterProp="children"
            onChange={onChange}
            onSearch={onSearch}
            filterOption={(input, option) =>
              (option?.label ?? "").toLowerCase().includes(input.toLowerCase())
            }
            options={arrLocation.map((item, index) => ({
              label: item.tenViTri,
              value: item.id,
            }))}
          />
        </div>

        <div className="w-2/5">
          <RangePicker
            defaultValue={[
              dayjs("2015/01/01", dateFormat),
              dayjs("2015/01/01", dateFormat),
            ]}
            format={dateFormat}
          />
        </div>
        <div className="w-1/5">
          <TreeSelect
            showSearch
            style={{ width: "100%" }}
          
            dropdownStyle={{ maxHeight: 400, overflow: "auto" }}
            placeholder="Who guests"
            allowClear
            multiple
            treeDefaultExpandAll
            onChange={onChange}
            treeData={treeData}
          />
        </div>
        <NavLink
          className="border-none bg-pink  rounded-full py-2 px-4 text-white  w-1/5 ml-2 no-underline "
          to={`/roombycity/${idLocation}`}
        >
          Search
        </NavLink>
      </div>
    </div>
  );
};

export default HeaderSearch;
