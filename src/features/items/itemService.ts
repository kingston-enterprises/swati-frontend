import axios from "axios";
import { Item } from "../../lib/interfaces";
import * as api from "../../api";

const API_URL: string = api.API_URL + "v0/";

const updateItem = async (ItemData: Item) => {

  //  Instead of localStorage, get it from a more secure location
    const authToken = localStorage.getItem('authtoken');
    if (!authToken) {
        throw new Error("Authentication token is missing.");
    }

    const response = await axios.put(`${API_URL}items/${ItemData._id}`, ItemData, {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
        withCredentials: true,
      });
 
  if (response.data) {
  
  }

  return response.data;
};


const createItem = async (ItemData: Item | void) => {


  //  Instead of localStorage, get it from a more secure location
    const authToken = localStorage.getItem('authtoken');
    if (!authToken) {
        throw new Error("Authentication token is missing.");
    }

    const response = await axios.post(API_URL + "items/new", ItemData, {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
        withCredentials: true,
      });
 
  if (response.data) {
  }

  return response.data;
};

const getAllItemsWithPagination = async () => {
  const response = await axios.get(API_URL + "items/all", {
    withCredentials: true,
  });

  if (response.data) {
   
  }

  return response.data.data;
};


const getUserItemsWithPagination = async () => {

  //  Instead of localStorage, get it from a more secure location
    const authToken = localStorage.getItem('authtoken');
    if (!authToken) {
        throw new Error("Authentication token is missing.");
    }

    const response = await axios.get(API_URL + "items/all/mine", {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
        withCredentials: true,
      });

  if (response.data) {
  

  }

  return response.data.data;
};

const itemService = {
  createItem,
  updateItem,
  getAllItemsWithPagination,
  getUserItemsWithPagination
};

export default itemService;
