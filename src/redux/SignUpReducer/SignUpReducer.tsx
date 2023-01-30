import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { DispatchType } from "../configStore";
import requester from "../../api/api";

export interface UserSignUp {
  id: number;
  name: string;
  email: string;
  password: string;
  phone: string;
  birthday: string;
  gender: string;
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
      console.log(res.data.content);
      //  setStore(ACCESS_TOKEN, res.data.content.accessToken);
      //  setStoreJSON(USER_LOGIN, res.data.content);
      //  const action = setUserLogin(res.data.content);
      //  dispatch(action);
      //  dispatch(setUserInfo(res.data.content.user));
      //  // setUserInfo(result.data.content);
      //  const actionState = setStateLogin("okay");
      dispatch(res.data.content);
      alert("Đăng ký thành công !");
    } catch (err: any) {
      console.log(err.response.data);
      alert(err.response.data);
      //  const actionState = setStateLogin("fail");
      //  dispatch(actionState);
    }
  };
};
