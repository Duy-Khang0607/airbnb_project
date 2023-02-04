import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { DispatchType } from '../configStore';
import requester from 'src/api/api';
import { apiPath } from 'src/api/apiPath';
import { request } from 'https';
import type { UploadFile } from 'antd/es/upload/interface';
import { ACCESS_TOKEN, getStore } from 'src/utils/setting';

export interface UserProfile {
  id: number;
  name: string;
  email: string;
  birthday: string;
  gender: string;
  password: string;
  phone: string;
  role: string;

}

export interface UserState {
  userProfile: UserProfile | any  ,

}

const initialState: UserState  = {
  userProfile: {}
}

const ProfileSlice = createSlice({
  name: "profileSlice",
  initialState,
  reducers: {
    setProfile: (state: UserState, action: PayloadAction<UserProfile>  ) => {
      state.userProfile = action.payload;
    }
  }
});

export const {setProfile} = ProfileSlice.actions

export default ProfileSlice.reducer



//api


export const fetchProfileApi = (id: number | string) => {
    return async (dispatch: DispatchType) => {
        try {
          const res = await requester({
            method: "GET",
            url: apiPath.GETUSERBYID + id,

          })

          const action = res.data.content;
          dispatch(setProfile(action));

        } catch (error) {
          console.log(error)
        }
    }
}

export const UpdateProfileApi = (id: number | string, profile : UserProfile) => {
  return async (dispatch: DispatchType) => {
      try {
        const res = await requester({
          method: "PUT",
          url: apiPath.GETUSERBYID + id,
          data: profile,

        })

        const action = res.data.content;
        dispatch(setProfile(action));

      } catch (error) {
        console.log(error)
      }
  }
}


export const UploadImgage = (formData : UploadFile[]) => {
  return async (dispatch: DispatchType) => {
    try {
      const res = await requester({
        method: "POST",
        url: apiPath.UPLOADIMGAGE,
        data: formData,
        headers: {
          token: getStore(ACCESS_TOKEN)
        }
      })
      console.log(res.data.content)
    } catch (error) {
      console.log(error)
    }
  }
}