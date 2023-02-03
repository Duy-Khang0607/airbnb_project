import { configureStore } from "@reduxjs/toolkit";
import { type } from "os";
import ModalReducer from "./ModalReducer/ModalReducer";
import SignInReducer from "./SignInReducer/SignInReducer";
import UserReducer from "./UserReducer/UserReducer";
import loginSlice from "./Login/loginSlice";
import LocationSlice from "./Home/LocationSlice";
import LocationReducer from "./LocationReducer/LocationReducer";
import RoomReducer from "./RoomReducer/RoomReducer";
import SignUpReducer from "./SignUpReducer/SignUpReducer";

export const store = configureStore({
  reducer: {
    UserReducer,
    LocationReducer,
    ModalReducer,
    SignInReducer,
    SignUpReducer,
    RoomReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type DispatchType = typeof store.dispatch;
