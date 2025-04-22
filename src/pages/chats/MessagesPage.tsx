import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserChats } from "@/features/chats/chatSlice";
import { RootState } from "@/app/store";
import ChatWindow from "@/components/messages/ChatWindow";
import ChatListItem from "@/components/messages/ChatListItem";

export default function MessagesPage() {
  const dispatch = useDispatch();
  const { chats, isLoading } = useSelector((state: RootState) => state.chat);
  const [selectedChat, setSelectedChat] = useState(null);

  useEffect(() => {
    dispatch(getUserChats());
  }, [dispatch]);

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="w-1/3 border-r overflow-y-auto bg-white">
        <div className="p-4 font-bold text-xl border-b">Your Conversations</div>
        {isLoading ? (
          <div className="p-4">Loading chats...</div>
        ) : chats && chats.length === 0 ? (
          <div className="p-4 text-gray-500">No chats yet.</div>
        ) : (
          chats && chats.map((chat) => (
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
      <div className="flex-1">
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

