import {
  createSlice,
  createAsyncThunk,
  PayloadAction,
} from "@reduxjs/toolkit";
import profileService from "./profileService";
import { User } from "../../lib/interfaces";
import { setUser } from "../auth/authSlice"; // Import the action from authSlice
import { userState } from "../auth/authSlice";

// Define local state only for profile update status
export interface ProfileState {
  isUpdating: boolean;
  updateSuccess: boolean;
  updateError: boolean;
  updateMessage: string;
}

const initialState: ProfileState = {
  isUpdating: false,
  updateSuccess: false,
  updateError: false,
  updateMessage: "",
};

export const updateProfile: any = createAsyncThunk(
  "profile/updateProfile",
  async (userData: Partial<User>, thunkAPI) => {
    try {
      const state = thunkAPI.getState() as { auth: userState };
      const userId = state.auth.user?._id;

      if (!userId) {
        return thunkAPI.rejectWithValue("User ID not found.");
      }

      const response = await profileService.updateProfile(userId, userData);

      // Dispatch action to update user in authSlice
      thunkAPI.dispatch(setUser(response.data));

      return response.data;
    } catch (error: any) {
      const message =
        (error.response?.data?.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {
    resetProfileState(state) {
      state.isUpdating = false;
      state.updateSuccess = false;
      state.updateError = false;
      state.updateMessage = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(updateProfile.pending, (state) => {
        state.isUpdating = true;
        state.updateError = false;
        state.updateSuccess = false;
      })
      .addCase(updateProfile.fulfilled, (state) => {
        state.isUpdating = false;
        state.updateSuccess = true;
        state.updateMessage = "Profile updated successfully!";
      })
      .addCase(updateProfile.rejected, (state, action: PayloadAction<any>) => {
        state.isUpdating = false;
        state.updateError = true;
        state.updateMessage = action.payload || "Profile update failed.";
      });
  },
});

export const { resetProfileState } = profileSlice.actions;
export default profileSlice.reducer;

