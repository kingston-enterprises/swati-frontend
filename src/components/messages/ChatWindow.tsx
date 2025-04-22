import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { sendMessage, getMessagesByChatId } from "@/features/messages/messageSlice";
import { Message, Chat } from "@/lib/interfaces";
import { RootState } from "@/app/store";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function ChatWindow({ chat }: { chat: Chat }) {
  const dispatch = useDispatch();
  const messages = useSelector((state: RootState) => state.message.messages);
  const currentUser = useSelector((state: RootState) => state.auth.user);
  console.log('currr: ', currentUser);
  const [newMsg, setNewMsg] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    dispatch(getMessagesByChatId(chat._id));
  }, [chat._id, dispatch]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = () => {
    if (!newMsg.trim()) return;

    dispatch(sendMessage({ chatId: chat._id, content: newMsg }));
    setNewMsg("");
  };

  return (
    <div className="flex flex-col h-full">
      <div className="p-4 border-b">
        <h2 className="font-semibold text-lg">{chat.item.title}</h2>
        <p className="text-sm text-gray-500">
          Chat with {chat.participants.find(p => p._id !== currentUser._id)?.first_name}
        </p>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-2">
        {messages && messages.map((msg: Message) => {
          const isCurrentUser = msg.sender._id === currentUser._id;
          return (
            <div
              key={msg._id}
              className={`max-w-xs px-4 py-2 rounded-lg ${
                isCurrentUser
                  ? "bg-blue-500 text-white ml-auto text-right"
                  : "bg-gray-200 text-black"
              }`}
            >
              {msg.content}
              <div className="text-xs mt-1 opacity-70">
                {new Date(msg.createdAt).toLocaleTimeString()}
              </div>
            </div>
          );
        })}
        <div ref={messagesEndRef} />
      </div>

      <div className="p-4 border-t flex gap-2">
        <Input
          value={newMsg}
          onChange={(e) => setNewMsg(e.target.value)}
          placeholder="Type your message..."
        />
        <Button onClick={handleSend}>Send</Button>
      </div>
    </div>
  );
}

