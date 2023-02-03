import { Dispatch } from '@reduxjs/toolkit'
import React from 'react'
import {useEffect} from "react"
import { useDispatch, useSelector } from 'react-redux'
import LocationItem from 'src/components/LocationItem/LocationItem'
import { getAllLocationApi } from 'src/redux/Home/LocationSlice'
import { DispatchType, RootState } from 'src/redux/configStore'

type Props = {}

const Location = ( {} : Props) => {
    // const dispatch = useDispatch<DispatchType>();
    const dispatch: DispatchType = useDispatch();

    const {locationList} = useSelector(
      (state: RootState) =>  state.LocationSlice
    )
    useEffect(()=> {
            dispatch(getAllLocationApi());
    }, [])
  return (
    <>
        <div className='flex justify-between flex-wrap m-5'>

{
  locationList.slice(30, 50).map((item: any, index: number ) => {
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

