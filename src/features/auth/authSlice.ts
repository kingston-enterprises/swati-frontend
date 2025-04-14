import {
  createSlice,
  createAsyncThunk,
  GetThunkAPI
} from "@reduxjs/toolkit";
import authService from "@/features/auth/authService";
import { User } from "@/lib/interfaces";

// Get itesms from localStorage
const userItem: any = localStorage.getItem("user");
const user = JSON.parse(userItem);

/**
 * @type Redux state representing an user
 */
export type userState = {
  user: User | null;
  isAuthenticated: boolean;
  isError: boolean;
  isSuccess: boolean;
  isLoading: boolean;
  message: string;
};

/**
 * initial userState
 */
const initialState: userState = {
  user: user ? user : null,
  isAuthenticated: !!user,
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

/**
 * register user function for auth/register"
 *
 * @param user  - user
 * @param thunkAPI  - GetThunkAPI
 *
 * @returns Promise<any> | AsyncThunk<any, user, any>
 */
export const register: any = createAsyncThunk(
  "auth/register",
  async (user: User, thunkAPI: GetThunkAPI<any>) => {
    try {
      const response = await authService.register(user); // Keep the response

      if (response.status === 400) { // Check for 400 status
        // Handle 400 error specifically.
        const errorMessage = response.data.message || "Bad Request"; // Extract message
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

/**
 * login user function for "auth/login"
 *
 * @param user  - user
 * @param thunkAPI  - GetThunkAPI
 *
 * @returns Promise<any> | AsyncThunk<any, user, any>
 */
export const login: any = createAsyncThunk(
  "auth/login",
  async (user: User, thunkAPI: GetThunkAPI<any>) => {
    try {
      return await authService.login(user);
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

/**
 * logout user function for "auth/logout"
 */
export const logout: any = createAsyncThunk("auth/logout", async () => {
  authService.logout();
});

export const authSlice = createSlice({
  name: "auth",
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
      // register
      .addCase(register.pending, (state) => {
        state.isLoading = true;
        state.isAuthenticated = false;
      })
      .addCase(register.fulfilled, (state, action: any) => {
        state.isLoading = false;
        state.isAuthenticated = true;
        state.isSuccess = true;
        state.user = action.payload;
      })
      .addCase(register.rejected, (state, action: any) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.payload;
        state.user = null;
        state.isAuthenticated = false; 
      })
      // login
      .addCase(login.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(login.fulfilled, (state, action: any) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.user = action.payload.data;
        state.isAuthenticated = true;
        state.message = action.payload.message;
      })
      .addCase(login.rejected, (state, action: any) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.payload;
        state.user = null;
        state.isAuthenticated = false; 
      })
      // logout
      .addCase(logout.fulfilled, (state) => {
        state.isLoading = false;
        state.user = null;
        state.isAuthenticated = false; 
      });
  },
});

export const { reset } = authSlice.actions;
export default authSlice.reducer;
