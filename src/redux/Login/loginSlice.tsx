import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { DispatchType } from "../configStore";
import requester from "src/api/api";
import { apiPath } from "src/api/apiPath";
import {
  ACCESS_TOKEN,
  USER_LOGIN,
  setStore,
  setStoreJSON,
} from "src/utils/setting";

export interface UserLogin {
  email: string;
  password: string;
}

type LoginState = {
  userLogin: any;
  stateLogin: string;
};

const initialState = {
  userLogin: localStorage.getItem(USER_LOGIN)
    ? JSON.parse(localStorage.getItem(USER_LOGIN) as string)
    : null,
  stateLogin: "",
};

const loginSlice = createSlice({
  name: "loginSlice",
  initialState,
  reducers: {
    setUserLogin: (state: LoginState, action: PayloadAction<UserLogin[]>) => {
      state.userLogin = action.payload;
    },
    setStateLogin: (state: LoginState, action: PayloadAction<string>) => {
      state.stateLogin = action.payload;
    },
  },
});

export const { setUserLogin, setStateLogin } = loginSlice.actions;

export default loginSlice.reducer;

//api

export const loginApi = (userLogin: UserLogin) => {
  return async (dispatch: DispatchType) => {
    try {
      const res = await requester({
        method: "POST",
        url: apiPath.LOGIN,
        data: userLogin,
      });

      console.log(res.data.content);
      // setStore(ACCESS_TOKEN, res.data.content.accessToken);
      setStore(ACCESS_TOKEN, res.data.content.token);
      setStoreJSON(USER_LOGIN, res.data.content);
      localStorage.setItem("isAdmin", res.data.content.user.role);
      const action = setUserLogin(res.data.content);
      dispatch(action);

      const actionState = setStateLogin("ok");
      dispatch(actionState);
    } catch (error: any) {
      console.log(error);
      const actionState = setStateLogin("fail");
      dispatch(actionState);
    }
  };
};
