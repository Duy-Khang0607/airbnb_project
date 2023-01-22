import { configureStore } from "@reduxjs/toolkit";
import { type } from "@testing-library/user-event/dist/type";
import detailProfile from "./DetailProfile/detailProfile";

export const store = configureStore({
  reducer: {
    detailProfile: detailProfile,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type DispatchType = typeof store.dispatch;
