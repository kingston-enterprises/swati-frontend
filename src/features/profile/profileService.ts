import axios from "axios";
import { User } from "../../lib/interfaces";
import * as api from "../../api";

/** NOTE(01/05/2025): Ensuring module is set to "es2020" in compilerOptions as previously noted.

 */
const API_URL: string = api.API_URL + "v0/";

const authToken = () => localStorage.getItem("authtoken");

const Headers = () => ({
  headers: {
    Authorization: `Bearer ${authToken()}`,
  },
  withCredentials: true,
});

/**
 * Updates an existing User's profile.
 *
 * @param {string} userId - The ID of the user to update.
 * @param {Partial<User>} userData - An object containing the fields to update.
 * @returns {JSON} The HTTP response.
 */
const updateProfile = async (userId: string, userData: Partial<User>) => {
  try {
    const response = await axios.patch(API_URL + `users/profile/${userId}`, userData, Headers());

    localStorage.setItem("user", JSON.stringify(response.data.data));


  return response.data;
  } catch (error: any) {
    // Handle specific error responses if needed
    if (error.response && error.response.data) {
      throw error.response.data;
    }
    throw error;
  }
};

const profileService = {
  updateProfile,
};

export default profileService;
