import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { useNavigate } from "react-router-dom";
import requester from "../../api/api";
import {
  ACCESS_TOKEN,
  setStore,
  setStoreJSON,
  USER_LOGIN,
} from "../../utils/setting";
import { DispatchType } from "../configStore";
import { setUserInfo } from "../UserReducer/UserReducer";

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
      alert(`Email: ${userLogin.email} - Password: ${userLogin.password}`);
      setStore(ACCESS_TOKEN, res.data.content.accessToken);
      setStoreJSON(USER_LOGIN, res.data.content);
      const action = setUserLogin(res.data.content);
      dispatch(action);
      dispatch(setUserInfo(res.data.content.user));
      // setUserInfo(result.data.content);
      const actionState = setStateLogin("okay");
      dispatch(actionState);
    } catch (err: any) {
      const actionState = setStateLogin("fail");
      dispatch(actionState);
      alert(err.response.data.content);
    }
  };
};
