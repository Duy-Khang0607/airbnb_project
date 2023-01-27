import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { DispatchType } from "../configStore";
import requester from "../../api/api";
// Sài interface sử dụng trùng tên dc , khả năng mở rộng cao hơn với type
export interface UserModel {
  id: number;
  name: string;
  email: string;
  password: string;
  phone: null;
  birthday: string;
  avatar: null;
  gender: boolean;
  role: string;
  //   tags: string[];
}

export type UserState = {
  arrUser: UserModel[];
};

const initialState: UserState = {
  arrUser: [],
};

const UserReducer = createSlice({
  name: "userReducer",
  initialState,
  reducers: {
    setArrUserAction: (
      state: UserState,
      action: PayloadAction<UserModel[]>
    ) => {
      state.arrUser = action.payload;
    },
  },
});

export const { setArrUserAction } = UserReducer.actions;

export default UserReducer.reducer;

// C1: Viết trong Reducer
// ------------ Action api ---------------
export const getUserApi = () => {
  return async (dispatch: DispatchType) => {
    try {
      const res = await requester({
        url: "/api/users",
        method: "GET",
      });
      const content: UserModel[] = res.data.content;
      //  Sau khi lấy dữ liệu từ API về => Bắt đầu dispatch lên store
      const action: PayloadAction<UserModel[]> = setArrUserAction(content);
      dispatch(action);
      console.log(content);
    } catch (error) {
      console.log(error);
    }
  };
};

export const deleteUser = (id: number) => {
  return async (dispatch: DispatchType) => {
    try {
      const res = await requester({
        url: "/api/users",
        method: "DELETE",
        params: {
          id: id,
        },
      });
      alert("Xóa thành công");
      console.log(res.data.content);
    } catch (error) {
      console.log(error);
      alert("Xóa thất bại");
    }
  };
};

export const editUser = (id: number) => {
  return async (dispatch: DispatchType) => {
    try {
      const res = await requester({
        method: "PUT",
        url: "/api/users",
        data: id,
      });
      alert("Sửa người dùng thành công ");
      console.log(res.data.content);
    } catch (error) {
      console.log(error);
      alert(error);
    }
  };
};
// C2: Viết theo ExtraReducer
