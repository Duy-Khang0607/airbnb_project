import { configureStore } from "@reduxjs/toolkit";
import { type } from "os";
import ModalReducer from "./ModalReducer/ModalReducer";
import SignInReducer from "./SignInReducer/SignInReducer";
import UserReducer from "./UserReducer/UserReducer";
import loginSlice from "./Login/loginSlice";
import LocationSlice from "./Home/LocationSlice";
import LocationReducer from "./LocationReducer/LocationReducer";
<<<<<<< HEAD

import RoomReducer from "./RoomReducer/RoomReducer";
import SignUpReducer from "./SignUpReducer/SignUpReducer";

import ProfileSlice from "./Profile/ProfileSlice";
import DetailRoomSlice from "./DetailRoomSlice/DetailRoomSlice";
=======
import RoomReducer from "./RoomReducer/RoomReducer";
import SignUpReducer from "./SignUpReducer/SignUpReducer";
import ProfileSlice from "./Profile/ProfileSlice";
>>>>>>> master

export const store = configureStore({
  reducer: {
    SignInReducer,
    SignUpReducer,

    UserReducer,
    RoomReducer,
    LocationReducer,
    ModalReducer,
<<<<<<< HEAD
    SignInReducer,
    SignUpReducer,
    RoomReducer,
    loginSlice,
    LocationSlice,
    ProfileSlice,
    DetailRoomSlice,

=======

    loginSlice,
    LocationSlice,
    ProfileSlice,
>>>>>>> master
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type DispatchType = typeof store.dispatch;
