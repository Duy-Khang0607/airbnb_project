import { createSlice } from '@reduxjs/toolkit'

const initialState = {

}

const ProfileSlice = createSlice({
  name: "profileSlice",
  initialState,
  reducers: {}
});

export const {} = ProfileSlice.actions

export default ProfileSlice.reducer



//api


export const fetchProfileApi = () => {
    return async () => {
        
    }
}