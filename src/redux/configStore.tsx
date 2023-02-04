import { configureStore } from "@reduxjs/toolkit";
import { type } from "os";
import ModalReducer from "./ModalReducer/ModalReducer";
import SignInReducer from "./SignInReducer/SignInReducer";
import UserReducer from "./UserReducer/UserReducer";
import loginSlice from "./Login/loginSlice";
import LocationSlice from "./Home/LocationSlice";
import LocationReducer from "./LocationReducer/LocationReducer";
import ProfileSlice from "./Profile/ProfileSlice";
import DetailRoomSlice from "./DetailRoomSlice/DetailRoomSlice";

export const store = configureStore({
  reducer: {
    UserReducer,
    LocationReducer,
    ModalReducer,
    SignInReducer,
    loginSlice,
    LocationSlice,
    ProfileSlice,
    DetailRoomSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type DispatchType = typeof store.dispatch;
