import { configureStore } from "@reduxjs/toolkit";
import itemReducer from "../../features/items/itemSlice"
import authReducer from "../../features/auth/authSlice"
import chatReducer from "../../features/chats/chatSlice"
import messageReducer from "../../features/messages/messageSlice"
export const store = configureStore({
  reducer: {
    auth: authReducer,
    item: itemReducer,
    chat: chatReducer,
    message: messageReducer
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
