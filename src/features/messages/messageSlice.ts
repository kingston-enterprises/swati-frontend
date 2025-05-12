import { createSlice, createAsyncThunk, GetThunkAPI } from "@reduxjs/toolkit";
import messageService from "./messageService";
import { Message } from "../../lib/interfaces";
type MessagesState = {
  messages: Message[] | null;
  isLoading: boolean;
  isSuccess: boolean;
  isError: boolean;
  message: string;
};

const initialState: MessagesState = {
  messages: null,
  isLoading: false,
  isSuccess: false,
  isError: false,
  message: "",
};

export const sendMessage : any = createAsyncThunk(
  "messages/send",
  async (
    { chatId, content }: { chatId: string; content: string },
    thunkAPI: GetThunkAPI<any>
  ) => {
    try {
      console.log('send to : ', content);
      return await messageService.sendMessage({chatId, content});
    } catch (error: any) {
      const message =
        error.response?.data?.message || error.message || error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const getMessagesByChatId : any = createAsyncThunk(
  "messages/getByChatId",
  async (chatId: string, thunkAPI: GetThunkAPI<any>) => {
    try {
      return await messageService.getMessagesByChatId(chatId);
    } catch (error: any) {
      const message =
        error.response?.data?.message || error.message || error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const messagesSlice = createSlice({
  name: "messages",
  initialState,
  reducers: {
    resetMessages: (state) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = false;
      state.message = "";
      state.messages = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // sendMessage
      .addCase(sendMessage.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(sendMessage.fulfilled, (state, action: any) => {
        state.isLoading = false;
        state.isSuccess = true;
        if (state.messages) {
          state.messages.push(action.payload);
        } else {
          state.messages = [action.payload];
        }
      })
      .addCase(sendMessage.rejected, (state, action: any) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })

      // getMessagesByChatId
      .addCase(getMessagesByChatId.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getMessagesByChatId.fulfilled, (state, action: any) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.messages = action.payload;
      })
      .addCase(getMessagesByChatId.rejected, (state, action: any) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.messages = null;
      });
  },
});

export const { resetMessages } = messagesSlice.actions;
export default messagesSlice.reducer;

