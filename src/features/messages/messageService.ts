import axios from "axios";
import * as api from "@/api";

const API_URL = api.API_URL + "v0/";
const authToken = () => localStorage.getItem("authtoken");

const messageHeaders = () => ({
  headers: {
    Authorization: `Bearer ${authToken()}`,
  },
  withCredentials: true,
});

// 🔹 Send a message to a chat
const sendMessage = async ({
  chatId,
  content,
}: {
  chatId: string;
  content: string;
}) => {
  if (!authToken()) throw new Error("Authentication token is missing.");

  const response = await axios.post(
    API_URL + "messages/send",
    { chatId, content },
    messageHeaders()
  );

  console.log("Message sent:", response.data);
  return response.data.data;
};

// 🔹 Get all messages for a specific chat
const getMessagesByChatId = async (chatId: string) => {
  if (!authToken()) throw new Error("Authentication token is missing.");

  const response = await axios.get(API_URL + `messages/${chatId}`, messageHeaders());

  console.log("Messages fetched:", response.data);
  return response.data.data;
};

const messageService = {
  sendMessage,
  getMessagesByChatId,
};

export default messageService;
