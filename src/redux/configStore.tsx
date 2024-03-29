import { configureStore } from "@reduxjs/toolkit";
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
import OrderRoomReducer from "./OrderRoomReducer/OrderRoomReducer";

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
    LocationSlice,
    ProfileSlice,
    DetailRoomSlice,
    OrderRoomReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type DispatchType = typeof store.dispatch;
