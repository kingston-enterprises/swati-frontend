import { useSelector } from "react-redux"; 
import { Chat } from "../../lib/interfaces";
import { cn } from "../../lib/utils"

export const ChatListItem = ({ chat, onClick, isActive }: {
  chat: Chat;
  onClick: () => void;
  isActive: boolean;
}) => {
  
  const { user } = useSelector((state: any) => state.auth);
  const recipient : any = chat.participants.find((p:any) => p._id !== user._id ); 
console.log('recipient: ', recipient);
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
          <div className="text-sm">{recipient?.first_name}</div>
          <div className="text-xs text-gray-500">{chat.item?.title}</div>
        </div>
        <div className="text-xs text-gray-400">
          {new Date(chat.updatedAt).toLocaleDateString()}
        </div>
      </div>
    </div>
  );
}

