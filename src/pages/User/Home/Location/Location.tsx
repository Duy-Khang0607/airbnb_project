import { Dispatch } from '@reduxjs/toolkit'
import React from 'react'
import {useEffect} from "react"
import { useDispatch } from 'react-redux'
import { getAllLocationApi } from 'src/redux/Home/LocationSlice'
import { DispatchType } from 'src/redux/configStore'

type Props = {}

const Location = ( {} : Props) => {
    // const dispatch = useDispatch<DispatchType>();
    const dispatch: DispatchType = useDispatch();
    useEffect(()=> {
            dispatch(getAllLocationApi());
    }, [])
  return (
    <>
        <div className='flex justify-between flex-wrap'>

gfdgfdgdg
        </div>

    </>
  )
}

export default Location

