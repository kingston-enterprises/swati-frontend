import axios from "axios";
import { User } from "../../lib/interfaces";
import * as api from "@/api";

/** NOTE(06/01/25): please enseure module is set to "es2020" in compilerOptions,
 *  else : error TS1343
 *  - qhawe
 */
const API_URL: string = api.API_URL + "v0/";

/**
 * Registers a new User
 *
 * @param {User} UserData - Users reistration details .
 * @returns {JSON} The Http response
 */
const register = async (UserData: User | void) => {
  const response = await axios.post(API_URL + "auth/signup", UserData);
  if (response.data) {
    
    localStorage.setItem("user", JSON.stringify(response.data.data));

    localStorage.setItem("authtoken", response.headers["authtoken"]);

  }

  return response.data;
};

/**
 * log in a User
 *
 * @param {User} UserData - Users login details .
 * @returns {JSON} The Http response
 */
const login = async (UserData: User | void) => {
  const response = await axios.post(API_URL + "auth/signin", UserData, {
    withCredentials: true,
  });

  if (response.data) {
   
    localStorage.setItem("user", JSON.stringify(response.data.data));
    localStorage.setItem("authtoken", response.headers["authtoken"]);
  }
  return response.data;
};

/**
 * logout User - by destroying localstorage item
 *
 * @returns {void}
 */
const logout = () => {
  localStorage.removeItem("user");
};

const authService = {
  register,
  logout,
  login,
};

export default authService;
