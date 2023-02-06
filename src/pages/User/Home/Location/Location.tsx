import { Dispatch } from '@reduxjs/toolkit'
import React from 'react'
import {useEffect} from "react"
import { useDispatch, useSelector } from 'react-redux'
import LocationItem from 'src/components/LocationItem/LocationItem'
import { getAllLocationApi } from 'src/redux/Home/LocationSlice'
import { getAllRoomsApi } from 'src/redux/RoomReducer/RoomReducer'
import { DispatchType, RootState } from 'src/redux/configStore'

type Props = {}

const Location = ( {} : Props) => {
    // const dispatch = useDispatch<DispatchType>();
    const dispatch: DispatchType = useDispatch();

    const {arrRooms, statusAction} = useSelector(
      (state: RootState) =>  state.RoomReducer
    )

    console.log(arrRooms)
    useEffect(()=> {
            dispatch(getAllRoomsApi());
    }, [statusAction])
  return (
    <>
        <div className='flex justify-between flex-wrap m-5'>

{
  arrRooms.slice(30, 50).map((item: any, index: number ) => {
    return (
        <LocationItem key={index} location={item}/>
    )
  })
}


        </div>

    </>
  )
}

export default Location

