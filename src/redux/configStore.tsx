import { configureStore } from "@reduxjs/toolkit";
import { type } from "@testing-library/user-event/dist/type";

export const store = configureStore({
  reducer: {},
});

export type RootState = ReturnType<typeof store.getState>;
