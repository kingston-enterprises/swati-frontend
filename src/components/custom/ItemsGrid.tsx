import { useState, useMemo } from "react";

import { Item } from "../../lib/interfaces";
import ItemCard from "../../components/custom/ItemCard"; 
import ItemDialog from "../../components/custom/ItemDialog"; 
import Filters from "../../components/custom/Filter";

interface ItemsGridProps {
items : Item[]
}

export default function ItemsGrid({items} : ItemsGridProps) {
const [status, setStatus] = useState("");
const [category, setCategory] = useState("");
const [condition, setCondition] = useState("");

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
const [selectedItem, setSelectedItem] = useState<Item | null>(null);

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

console.log("TEMS: ", items);
  const handleDelete = (e: any) => {
  console.log(e);
    };

const filteredItems = useMemo(() => {
  if (!items) return [];

  return items.filter(
    (item:any) =>

      (!filters.status || item.status === filters.status) &&
      (!filters.category || item.category === filters.category) &&
      (!filters.condition || item.condition === filters.condition)
  );
}, [items, filters]);

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
     
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
  {filteredItems.map((item : any) => (
<ItemCard
  item={item}
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
  onChat={() => console.log("Chat with seller")}
/>

      </div>
</div>
 </> );
}
