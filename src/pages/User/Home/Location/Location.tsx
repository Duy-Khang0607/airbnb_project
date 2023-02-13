import { Dispatch } from "@reduxjs/toolkit";
import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import LocationItem from "src/components/LocationItem/LocationItem";
import { getAllLocationApi } from "src/redux/Home/LocationSlice";
import { getAllRoomsApi } from "src/redux/RoomReducer/RoomReducer";
import { DispatchType, RootState } from "src/redux/configStore";

type Props = {};

const Location = ({}: Props) => {
  const dispatch: DispatchType = useDispatch();
  const { arrRoomPageIndex } = useSelector(
    (state: RootState) => state.RoomReducer
  );
  // const { arrRooms } = useSelector(
  //   (state: RootState) => state.RoomReducer
  // );

  useEffect(() => {}, []);
  return (
    <>
      <div className='flex justify-between flex-wrap m-5'>
        {arrRoomPageIndex?.map((item: any, index: number) => {
          return <LocationItem key={index} location={item} />;
        })}
      </div>
    </>
  );
};

export default Location;
