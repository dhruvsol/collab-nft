import { configureStore } from "@reduxjs/toolkit";
import FormReducers from "../features/member";
export const store = configureStore({
  reducer: {
    FormReducers: FormReducers,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
