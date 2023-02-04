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
=======
import ProfileSlice from "./Profile/ProfileSlice";
>>>>>>> 2b3ffd680430cc9b41d0734e49f1817b05506113
import DetailRoomSlice from "./DetailRoomSlice/DetailRoomSlice";

export const store = configureStore({
  reducer: {
    UserReducer,
    LocationReducer,
    ModalReducer,
    SignInReducer,
<<<<<<< HEAD
    SignUpReducer,
    RoomReducer,
=======
    loginSlice,
    LocationSlice,
    ProfileSlice,
    DetailRoomSlice,
>>>>>>> 2b3ffd680430cc9b41d0734e49f1817b05506113
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type DispatchType = typeof store.dispatch;
