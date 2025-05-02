import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserChats } from "../../features/chats/chatSlice";
import { ChatWindow } from "../../components/messages/ChatWindow";
import { ChatListItem } from "../../components/messages/ChatListItem";
import { ArrowLeft } from "lucide-react";
import { Chat } from "../../lib/interfaces";

export const MessagesPage = () => {
  const dispatch = useDispatch();
  const { chats, isLoading } = useSelector((state:any)=> state.chat);
  const [selectedChat, setSelectedChat] = useState<Chat | null>();

  useEffect(() => {
    dispatch(getUserChats())
  }, []);

  const showChat = !!selectedChat;

  return (
    <div className="flex flex-col md:flex-row h-screen bg-gray-100">
      {/* Sidebar */}
      <div
        className={`
          w-full md:w-1/3 border-r overflow-y-auto bg-white
          ${showChat ? "hidden md:block" : "block"}
        `}
      >
        <div className="p-4 font-bold text-xl border-b">Your Conversations</div>
        {isLoading ? (
          <div className="p-4">Loading chats...</div>
        ) : chats && chats.length === 0 ? (
          <div className="p-4 text-gray-500">No chats yet.</div>
        ) : (
          chats &&
          chats.map((chat:Chat) => (
            <ChatListItem
              key={chat._id}
              chat={chat}
              onClick={() => setSelectedChat(chat)}
              isActive={selectedChat?._id === chat._id}
            />
          ))
        )}
      </div>

      {/* Chat Window */}
      <div
        className={`
          flex-1 bg-white h-full flex flex-col
          ${!showChat ? "hidden md:flex" : "flex"}
        `}
      >
        {/* Mobile Back Button */}
        <div className="md:hidden p-2 border-b">
          <button
            onClick={() => setSelectedChat(null)}
            className="flex items-center text-sm text-blue-600"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to chats
          </button>
        </div>

        {selectedChat ? (
          <ChatWindow chat={selectedChat} />
        ) : (
          <div className="h-full flex items-center justify-center text-gray-500">
            Select a chat to start messaging.
          </div>
        )}
      </div>
    </div>
  );
}

