import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { DispatchType } from "../configStore";
import requester from "../../api/api";
import { openNotificationWithIcon } from "src/utils/notification";
import { Tag } from "antd";
import { setStatusAction } from "../UserReducer/UserReducer";

export interface UserSignUp {
  id: number;
  name: string;
  email: string;
  password: string;
  phone: string;
  birthday: string;
  gender: boolean;
  role: string;
}

type SignUpState = {
  userRegister: UserSignUp[];
};

const initialState: SignUpState = {
  userRegister: [],
};

const SignUpReducer = createSlice({
  name: "signUpReducer",
  initialState,
  reducers: {
    setUserRegister: (
      state: SignUpState,
      action: PayloadAction<UserSignUp[]>
    ) => {
      state.userRegister = action.payload;
    },
  },
});

export const { setUserRegister } = SignUpReducer.actions;

export default SignUpReducer.reducer;

// Đăng ký
export const signUpApi = (userRegister: UserSignUp) => {
  return async (dispatch: DispatchType) => {
    try {
      const res = await requester({
        url: "/api/auth/signup",
        method: "POST",
        data: userRegister,
      });
      openNotificationWithIcon(
        "success",
        " ",
        <Tag color='success' className='text-xl'>
          Đăng ký thành công
        </Tag>
      );
      console.log(res.data.content);
      dispatch(res.data.content);
      dispatch(setStatusAction(res.status));
    } catch (err: any) {
      console.log(err.response.data.content);
      openNotificationWithIcon(
        "error",
        " ",
        <Tag color='error' className='text-xl'>
          {err.response.data.content}
        </Tag>
      );
    }
  };
};
