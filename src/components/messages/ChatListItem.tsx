
import { Chat } from "../../lib/interfaces";
import { cn } from "../../lib/utils"

export default function ChatListItem({ chat, onClick, isActive }: {
  chat: Chat;
  onClick: () => void;
  isActive: boolean;
}) {
  const recipient = chat.participants.find((p:any) => !p.isCurrentUser); // Example logic

  return (
    <div
      onClick={onClick}
      className={cn(
        "p-4 cursor-pointer border-b hover:bg-gray-50",
        isActive && "bg-gray-100 font-semibold"
      )}
    >
      <div className="flex justify-between items-center">
        <div>
          <div className="text-sm">{recipient}</div>
          <div className="text-xs text-gray-500">{chat.item}</div>
        </div>
        <div className="text-xs text-gray-400">
          {new Date(chat.updatedAt).toLocaleDateString()}
        </div>
      </div>
    </div>
  );
}

