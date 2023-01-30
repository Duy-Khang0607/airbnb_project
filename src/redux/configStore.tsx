import { configureStore } from "@reduxjs/toolkit";
import { type } from "os";
import UserReducer from "./UserReducer/UserReducer";
import loginSlice from "./Login/loginSlice";
import LocationSlice from "./Home/LocationSlice"

export const store = configureStore({
  reducer: {
    UserReducer: UserReducer,
     loginSlice,
     LocationSlice,
     
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type DispatchType = typeof store.dispatch;
