import { configureStore } from "@reduxjs/toolkit";
import { type } from "os";
import ModalReducer from "./ModalReducer/ModalReducer";
import SignInReducer from "./SignInReducer/SignInReducer";
import UserReducer from "./UserReducer/UserReducer";
import loginSlice from "./Login/loginSlice";
import LocationSlice from "./Home/LocationSlice";
import LocationReducer from "./LocationReducer/LocationReducer";
import DetailRoomSlice from "./DetailRoomSlice/DetailRoomSlice";
import RoomReducer from "./RoomReducer/RoomReducer";
import SignUpReducer from "./SignUpReducer/SignUpReducer";
import ProfileSlice from "./Profile/ProfileSlice";

export const store = configureStore({
  reducer: {
    // ADMIN
    SignInReducer,
    SignUpReducer,
    UserReducer,
    RoomReducer,
    LocationReducer,
    ModalReducer,

    // USER
    loginSlice,
    LocationSlice,
    ProfileSlice,
    DetailRoomSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type DispatchType = typeof store.dispatch;
