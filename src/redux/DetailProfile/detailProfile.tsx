import { createSlice } from "@reduxjs/toolkit";

// export type ProfileModel = {
//   tickets: any[];
//   deleteAt: boolean;
//   _id: string;
//   name: string;
//   email: string;
//   password: string;
//   phone: string;
//   gender: boolean;
//   address: string;
//   type: string;
//   __v: number;
//   avatar: string;
//   birthday: Date;
// };

export interface ProfileModel {
  // Sài interface có thể trùng tên được , mở rộng cao hơn
  tickets: any[];
  deleteAt: boolean;
  _id: string;
  name: string;
  email: string;
  password: string;
  phone: string;
  gender: boolean;
  address: string;
  type: string;
  __v: number;
  avatar: string;
  birthday: string;
}
export type ProfileState = {
  profile: ProfileModel[];
};

const initialState: ProfileState = {
  profile: [],
};

const detailProfile = createSlice({
  name: "detailProfile",
  initialState,
  reducers: {},
});

export const {} = detailProfile.actions;

export default detailProfile.reducer;
