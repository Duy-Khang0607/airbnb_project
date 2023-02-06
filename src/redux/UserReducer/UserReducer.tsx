import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { DispatchType } from "../configStore";
import requester from "../../api/api";
import { openNotificationWithIcon } from "src/utils/notification";
import { Tag } from "antd";
// Sài interface sử dụng trùng tên dc , khả năng mở rộng cao hơn với type
export interface UserModel {
  id: number;
  name: string;
  email: string;
  password: string;
  phone: string;
  birthday: string;
  avatar: string;
  gender: boolean;
  role: string;
}

export type UserState = {
  arrUser: UserModel[];
  editUser: any;
  userInfo: any;
  statusAction: number;
};

const initialState: UserState = {
  arrUser: [],
  editUser: {},
  userInfo: {},
  statusAction: 0,
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
    setArrUserDeleteAction: (
      state: UserState,
      action: PayloadAction<UserModel[]>
    ) => {
      state.arrUser = action.payload;
    },
    setArrUserEditAction: (
      state: UserState,
      action: PayloadAction<UserModel[]>
    ) => {
      state.arrUser = action.payload;
    },
    setUserInfo: (state: UserState, action: PayloadAction<UserModel[]>) => {
      state.userInfo = action.payload;
    },
    setStatusAction: (state: UserState, action: PayloadAction<number>) => {
      state.statusAction = action.payload;
    },
    setUserByID: (state: UserState, action: PayloadAction<UserModel[]>) => {
      state.editUser = action.payload;
    },
  },
});

export const {
  setArrUserAction,
  setUserInfo,
  setArrUserDeleteAction,
  setArrUserEditAction,
  setStatusAction,
  setUserByID,
} = UserReducer.actions;

export default UserReducer.reducer;

// C1: Viết trong Reducer
// Lấy danh sách người dùng
export const getUserApi = () => {
  return async (dispatch: DispatchType) => {
    try {
      const res = await requester({
        url: "/api/users",
        method: "GET",
      });
      const content: UserModel[] = res.data.content;
      console.log(content);
      //  Sau khi lấy dữ liệu từ API về => Bắt đầu dispatch lên store
      const action: PayloadAction<UserModel[]> = setArrUserAction(content);
      dispatch(action);
    } catch (error) {
      console.log(error);
    }
  };
};

// Thêm người dùng
export const postUserApi = (user: UserModel) => {
  return async (dispatch: DispatchType) => {
    try {
      const res = await requester({
        url: "/api/users",
        method: "POST",
        data: user,
      });

      // const content: UserModel[] = res.data.content;
      // //  Sau khi lấy dữ liệu từ API về => Bắt đầu dispatch lên store
      // const action: PayloadAction<UserModel[]> = setArrUserAction(content);
      // dispatch(action);
      dispatch(setStatusAction(res.status));
      openNotificationWithIcon(
        "success",
        " ",
        <Tag color='success' className='text-xl'>
          Thêm thành công
        </Tag>
      );
    } catch (error: any) {
      console.log(error?.response.data);
      openNotificationWithIcon(
        "error",
        " ",
        <Tag color='error' className='text-xl'>
          {error?.response.data}
        </Tag>
      );
    }
  };
};

// Xóa người dùng
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
      console.log(res.data.content);
      const content: UserModel[] = res.data.content;
      //  Sau khi lấy dữ liệu từ API về => Bắt đầu dispatch lên store
      const action: PayloadAction<UserModel[]> =
        setArrUserDeleteAction(content);
      dispatch(action);
      dispatch(setStatusAction(res.status));
      openNotificationWithIcon(
        "success",
        " ",
        <Tag color='success' className='text-xl'>
          Xóa thành công
        </Tag>
      );
    } catch (error) {
      console.log(error);
      alert("Xóa thất bại");
    }
  };
};

// Chỉnh sửa thông tin người dùng
export const editUser = (id: number) => {
  return async (dispatch: DispatchType) => {
    try {
      if (id !== null) {
        const result = await requester.get(`/api/users/${id}`);
        console.log(result.data.content);
        dispatch(setUserByID(result.data.content));
      }
    } catch (err) {}
  };
};

export const updateUserApi = (id: number, user: UserModel) => {
  return async (dispatch: DispatchType) => {
    try {
      let result = await requester.put(`/api/users/${id}`, user);
      console.log(result.data.content);
      dispatch(setStatusAction(result.status));
      openNotificationWithIcon(
        "success",
        " ",
        <Tag color='success' className='text-xl'>
          Sửa người dùng thành công
        </Tag>
      );
    } catch (err) {
      console.log(err);
      openNotificationWithIcon(
        "error",
        " ",
        <Tag color='error' className='text-xl'>
          Sửa người dùng thất bại
        </Tag>
      );
    }
  };
};

export const updateAvatar = (formFile: string) => {
  return async (dispatch: DispatchType) => {
    try {
      const res = await requester({
        url: "/api/users/upload-avatar",
        method: "POST",
        data: formFile,
      });
      // const content: UserModel[] = res.data.content;
      // console.log(content);
      // const action: PayloadAction<UserModel[]> = setArrUserAction(content);
      // dispatch(action);
      dispatch(setStatusAction(res.status));
      openNotificationWithIcon(
        "success",
        " ",
        <Tag color='success' className='text-xl'>
          Thêm ảnh thành công
        </Tag>
      );
    } catch (err) {
      console.log(err);
      openNotificationWithIcon(
        "error",
        " ",
        <Tag color='error' className='text-xl'>
          Thêm ảnh thất bại
        </Tag>
      );
    }
  };
};

//Clear StatusAction
export const clearStatusAction = () => {
  return async (dispatch: DispatchType) => {
    dispatch(setStatusAction(0));
  };
};

// C2: Viết theo ExtraReducer
