import { createSlice, createAsyncThunk, GetThunkAPI } from "@reduxjs/toolkit";
import itemService from "../../features/items/itemService";



/**
 * @type Redux state representing an items
 */
export type itemState = {
  data: any;
  isAuthenticated?: boolean;
  isError: boolean;
  isSuccess: boolean;
  isLoading: boolean;
  message: string;
};

/**
 * initial state
 */
const initialState: itemState = {
  data: null,
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

export const updateItem: any = createAsyncThunk(
  "items/update",
  async (item: any, thunkAPI: GetThunkAPI<any>) => {
    try {
      const response = await itemService.updateItem(item); 

      if (response.status === 400) { // Check for 400 status
        // Handle 400 error specificallya
        
        const errorMessage = response.data.message || "Bad Request";
        
        return thunkAPI.rejectWithValue(errorMessage); // Reject with specific message
      }

      // If not a 400 error, return the data (assuming it's the successful registration data)
      return response.data;
    } catch (error: any) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const createItem: any = createAsyncThunk(
  "items/create",
  async (item, thunkAPI: GetThunkAPI<any>) => {
    try {
      const response = await itemService.createItem(item); 

      if (response.status === 400) { // Check for 400 status
        // Handle 400 error specificallya
        
        const errorMessage = response.data.message || "Bad Request";
        
        return thunkAPI.rejectWithValue(errorMessage); // Reject with specific message
      }

      // If not a 400 error, return the data (assuming it's the successful registration data)
      return response.data;
    } catch (error: any) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);


export const getAllItemsWithPagination: any = createAsyncThunk(
  "items/getAllItemsWithPagination",
  async (thunkAPI: GetThunkAPI<any>) => {
    try {
      return await itemService.getAllItemsWithPagination();
    } catch (error: any) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();

      return thunkAPI.rejectWithValue(message);
    }
  }
);


export const getUserItemsWithPagination: any = createAsyncThunk(
  "items/getUserItemsWithPagination",
  async (thunkAPI: GetThunkAPI<any>) => {
    try {
      return await itemService.getUserItemsWithPagination();
    } catch (error: any) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();

      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const itemSlice = createSlice({
  name: "item",
  initialState,
  reducers: {
    reset: (state) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = false;
      state.message = "";
    },
  },
  extraReducers: (builder) => {
    builder
      // updateItem
      .addCase(updateItem.pending, (state) => {
        state.isLoading = true;
        state.isAuthenticated = false;
      })
      .addCase(updateItem.fulfilled, (state) => {
        state.isLoading = false;
        state.isAuthenticated = true;
        state.isSuccess = true;
        //state.data = action.payload;
      })
      .addCase(updateItem.rejected, (state, action: any) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.payload;
        state.isAuthenticated = false; 
      })
      // createItem
      .addCase(createItem.pending, (state) => {
        state.isLoading = true;
        state.isAuthenticated = false;
      })
      .addCase(createItem.fulfilled, (state) => {
        state.isLoading = false;
        state.isAuthenticated = true;
        state.isSuccess = true;
        //state.data = action.payload;
      })
      .addCase(createItem.rejected, (state, action: any) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.payload;
        state.isAuthenticated = false; 
      })
      // getAllItemsWithPagination
      .addCase(getAllItemsWithPagination.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllItemsWithPagination.fulfilled, (state, action: any) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.data = action.payload;
        state.isAuthenticated = true;
        state.message = action.payload.message;
      })
      .addCase(getAllItemsWithPagination.rejected, (state, action: any) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.payload;
        state.isAuthenticated = false; 
      })
      //
      .addCase(getUserItemsWithPagination.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getUserItemsWithPagination.fulfilled, (state, action: any) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.data = action.payload;
        state.isAuthenticated = true;
        state.message = action.payload.message;
      })
      .addCase(getUserItemsWithPagination.rejected, (state, action: any) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.payload;
        state.isAuthenticated = false; 
      })
  },
});

export const { reset } = itemSlice.actions;
export default itemSlice.reducer;
