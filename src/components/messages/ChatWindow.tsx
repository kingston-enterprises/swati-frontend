import { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { sendMessage, getMessagesByChatId } from "../../features/messages/messageSlice";
import { Input } from "../../components/custom/Input";
import { Button } from "../../components/custom/Button";

export const ChatWindow = ({ chat }: { chat: any }) => {
  const dispatch = useDispatch();
  const messages = useSelector((state: any) => state.message.messages);
  const currentUser = useSelector((state: any) => state.auth.user);
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
      {/* Header */}
      <div className="p-4 border-b bg-white">
        <h2 className="font-semibold text-lg truncate">{chat.item.title}</h2>
        <p className="text-sm text-gray-500 truncate">
          Chat with{" "}
          {chat.participants.find((p: any) => p._id !== currentUser._id)?.first_name || "User"}
        </p>
      </div>

      {/* Message List */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-gray-50">
        {messages && messages.map((msg: any) => {
          const isCurrentUser = msg.sender._id === currentUser._id;
          return (
            <div
              key={msg._id}
              className={`max-w-[75%] md:max-w-[60%] px-4 py-2 rounded-lg text-sm break-words ${
                isCurrentUser
                  ? "bg-blue-500 text-white ml-auto text-right"
                  : "bg-white text-gray-900 border"
              }`}
            >
              {msg.content}
              <div className="text-xs mt-1 opacity-70">
                {new Date(msg.createdAt).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
              </div>
            </div>
          );
        })}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="p-3 border-t bg-white flex items-center gap-2">
        <Input
          value={newMsg}
          onChange={(e:any) => setNewMsg(e.target.value)}
          placeholder="Type your message..."
          className="flex-1"
        />
        <Button onClick={handleSend} className="shrink-0">
          Send
        </Button>
      </div>
    </div>
  );
}

