import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Tag } from "antd";
import { useNavigate } from "react-router-dom";
import { openNotificationWithIcon } from "src/utils/notification";
import requester from "../../api/api";
import {
  ACCESS_TOKEN,
  getStore,
  setStore,
  setStoreJSON,
  USER_LOGIN,
} from "../../utils/setting";
import { DispatchType } from "../configStore";
import { setStatusAction, setUserInfo } from "../UserReducer/UserReducer";

export interface UserSignIn {
  email: string;
  password: string;
}

type SignInState = {
  userLogin: {};
  stateLogin: string;
};

const initialState = {
  userLogin: localStorage.getItem(USER_LOGIN)
    ? JSON.parse(localStorage.getItem(USER_LOGIN) as string)
    : null,
  stateLogin: "",
};

const SignInReducer = createSlice({
  name: "signInReducer",
  initialState,
  reducers: {
    setUserLogin: (state: SignInState, action: PayloadAction<UserSignIn[]>) => {
      state.userLogin = action.payload;
    },
    setStateLogin: (state: SignInState, action: PayloadAction<string>) => {
      state.stateLogin = action.payload;
    },
  },
});

export const { setUserLogin, setStateLogin } = SignInReducer.actions;

export default SignInReducer.reducer;

// Đăng nhập
export const signInApi = (userLogin: UserSignIn) => {
  return async (dispatch: DispatchType) => {
    try {
      const res = await requester({
        url: "/api/auth/signin",
        method: "POST",
        data: userLogin,
      });
      console.log(
        `Email: ${userLogin.email} - Password: ${userLogin.password}`
      );
      setStore(ACCESS_TOKEN, res.data.content.token);
      // getStore(ACCESS_TOKEN);
      console.log(getStore(ACCESS_TOKEN));
      setStoreJSON(USER_LOGIN, res.data.content);
      // setStoreJSON(ACCESS_TOKEN, res.data.content.token);

      const action = setUserLogin(res.data.content);
      dispatch(action);
      dispatch(setUserInfo(res.data.content.user));
      // setUserInfo(result.data.content);
      const actionState = setStateLogin("okay");
      dispatch(actionState);
      dispatch(setStatusAction(res.status));
      openNotificationWithIcon(
        "success",
        " ",
        <Tag color='success' className='text-xl'>
          Đăng nhập thành công
        </Tag>
      );
    } catch (err: any) {
      const actionState = setStateLogin("fail");
      dispatch(actionState);
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

export const getUserInfoAction = () => {
  return async (dispatch: DispatchType) => {
    try {
      const result = await requester.post("/api/users");
      if (result.status === 200) {
        setUserLogin(result.data.content);
      }
      console.log("result", result);
    } catch (errors: any) {
      console.log("errors", errors.response?.data);
    }
  };
};
