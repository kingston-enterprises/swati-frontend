import { useState, useMemo } from "react";
import { useNavigate } from 'react-router-dom';
import { Item } from "../../lib/interfaces";
import ItemCard from "../../components/custom/ItemCard"; 
import { ItemDialog } from "../../components/custom/ItemDialog"; 
import Filters from "../../components/custom/Filter";
import { useToast } from "../../hooks/use-toast";
import { startChat } from "../../features/chats/chatSlice";
import { useDispatch, useSelector } from "react-redux";

interface ItemsGridProps {
data : any
}

export default function ItemsGrid({data} : ItemsGridProps) {
const [status, setStatus] = useState("");
const [category, setCategory] = useState("");
const [condition, setCondition] = useState("");
  const { user } = useSelector(
    (state: any) => state.auth
  );

const resetFilters = () => {
  setStatus("");
  setCategory("");
  setCondition("");
};

  const [filters, ] = useState({
    status: "",
    category: "",
    condition: "",
  });
  
  const [openDetailModal, setOpenDetailModal] = useState(false);
const [selectedItem, setSelectedItem] = useState<any>(null);

  const [, setOpen] = useState(false);
  const [, setEditItem] = useState<Item | null>(null);
  const [, setForm] = useState({
    title: "",
    description: "",
    price: "",
    category: "",
    condition: "",
    status: "Available",
    images: [] as string[] | undefined,
  });


  const handleDelete = (e: any) => {
  console.log(e);
    };

const filteredItems = useMemo(() => {
  if (!data) return [];
  
  return data.items.filter(
    (item:any) =>

      (!filters.status || item.status === filters.status) &&
      (!filters.category || item.category === filters.category) &&
      (!filters.condition || item.condition === filters.condition)
  );
}, [data, filters]);

  const openEditModal = (item: Item) => {
    setEditItem(item);
    setForm({
      title: `${item.title}`,
      description: `${item.description}`,
      price: `${item.price?.toString()}`,
      category: `${item.category}`,
      condition: `${item.condition}`,
      status: `${item.status}`,
      images: item.images,
    });
    setOpen(true);
  };

  const dispatch = useDispatch();

  const { toast } = useToast();
  const navigate = useNavigate();
 
  const handleChatWithSeller = (recipientId: string, itemId: string) => {
  

    if (!user) {
    toast({
      variant: "default",
      title: "Chat failed",
      description: "You need to be logged In to chat with the seller",
    });
 
      return; // Stop the chat creation process
    }
console.log(recipientId)
    // At this point, the user is authenticated.
    // Dispatch the createChat thunk, passing the necessary data.
    // Adjust the payload as needed for your createChat thunk.
    dispatch(startChat({recipientId, itemId})).then(() => {
        // Handle successful chat creation (e.g., redirect to chat)
    toast({
      variant: "default",
      title: "Chat started succesfully",
      description: "You can now chat with the seller to complete your purchase",
    });
        navigate('/messages'); // Redirect to /messages
      })
      .catch((error: any) => {
        // Handle chat creation error
    toast({
      variant: "default",
      title: "Chat error",
      description: `error: ${error}`,
    });
      });



};

return (<>
         {/* Filters */}
<div className=" w-full flex flex-col items-center justify-center">
   <Filters
  status={status}
  setStatus={setStatus}
  category={category}
  setCategory={setCategory}
  condition={condition}
  setCondition={setCondition}
  resetFilters={resetFilters}
/>
              {/* Items Grid */}
     
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
  {filteredItems.map((item : any) => (
<ItemCard
  key={item._id}
  item={item}
  currentUserId={user && user._id}
  onEdit={(item : any) => openEditModal(item)}
  onDelete={(id : any) => handleDelete(id)}
  onViewDetails={(item : any) => {
    setSelectedItem(item);
    setOpenDetailModal(true);
  }}
/>

        ))}
        <ItemDialog
  open={openDetailModal}
  item={selectedItem}
  onClose={() => setOpenDetailModal(false)}
  onChat={() => handleChatWithSeller(selectedItem.userId._id, selectedItem._id)}
/>

      </div>
</div>
 </> );
}
