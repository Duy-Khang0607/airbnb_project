import { configureStore } from "@reduxjs/toolkit";
import { type } from "os";
import UserReducer from "./UserReducer/UserReducer";

export const store = configureStore({
  reducer: {
    UserReducer: UserReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type DispatchType = typeof store.dispatch;
