import { configureStore } from "@reduxjs/toolkit";
import itemReducer from "@/features/items/itemSlice"
import authReducer from "@/features/auth/authSlice"
export const store = configureStore({
  reducer: {
    auth: authReducer,
    item: itemReducer
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
