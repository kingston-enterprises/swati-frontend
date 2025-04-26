import { createSlice, createAsyncThunk, GetThunkAPI } from "@reduxjs/toolkit";
import chatService from "./chatService";
import { Chat } from "../../lib/interfaces"; // Ensure you define this properly

export type ChatState = {
  chats: Chat[] | null;
  chat: Chat | null;
  isLoading: boolean;
  isSuccess: boolean;
  isError: boolean;
  message: string;
};

const initialState: ChatState = {
  chats: null,
  chat: null,
  isLoading: false,
  isSuccess: false,
  isError: false,
  message: "",
};

export const createChat = createAsyncThunk(
  "chats/create",
  async ({ recipientId, itemId }: { recipientId: string; itemId: string }, thunkAPI: GetThunkAPI<any>) => {
    try {
    
    console.log(itemId)
      return await chatService.startChat({recipientId, itemId});
    } catch (error: any) {
      const message = error.response?.data?.message || error.message || error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const getUserChats = createAsyncThunk(
  "chats/getUserChats",
  async (_, thunkAPI: GetThunkAPI<any>) => {
    try {
      return await chatService.getUserChats();
    } catch (error: any) {
      const message = error.response?.data?.message || error.message || error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const getChatById = createAsyncThunk(
  "chats/getChatById",
  async (chatId: string, thunkAPI: GetThunkAPI<any>) => {
    try {
    console.log(chatId)
      return await chatService.getUserChats();
    } catch (error: any) {
      const message = error.response?.data?.message || error.message || error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    reset: (state) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = false;
      state.message = "";
      state.chat = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createChat.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createChat.fulfilled, (state, action: any) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.chat = action.payload;
      })
      .addCase(createChat.rejected, (state, action: any) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.chat = null;
      })
      .addCase(getUserChats.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getUserChats.fulfilled, (state, action: any) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.chats = action.payload;
      })
      .addCase(getUserChats.rejected, (state, action: any) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.chats = null;
      })
      .addCase(getChatById.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getChatById.fulfilled, (state, action: any) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.chat = action.payload;
      })
      .addCase(getChatById.rejected, (state, action: any) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.chat = null;
      });
  },
});

export const { reset } = chatSlice.actions;
export default chatSlice.reducer;

