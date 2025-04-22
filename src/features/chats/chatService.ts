import axios from "axios";
import * as api from "@/api";

const API_URL = api.API_URL + "v0/";
const authToken = () => localStorage.getItem("authtoken");

const chatHeaders = () => ({
  headers: {
    Authorization: `Bearer ${authToken()}`,
  },
  withCredentials: true,
});

// 🔹 Start or get existing chat (ensures only one per user/item/recipient)
const startChat = async ({
  recipientId,
  itemId,
}: {
  recipientId: string;
  itemId: string;
}) => {
  if (!authToken()) throw new Error("Authentication token is missing.");

  const response = await axios.post(
    API_URL + "chat/start",
    { recipientId, itemId },
    chatHeaders()
  );

  console.log("Chat started/found:", response.data);
  return response.data.data;
};

// 🔹 Get all chats for the logged-in user
const getUserChats = async () => {
  if (!authToken()) throw new Error("Authentication token is missing.");

  const response = await axios.get(API_URL + "chat/mine", chatHeaders());

  console.log("User chats fetched:", response.data);
  return response.data.data;
};

const chatService = {
  startChat,
  getUserChats,
};

export default chatService;

