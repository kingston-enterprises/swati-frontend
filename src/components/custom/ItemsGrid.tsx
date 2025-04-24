import React, { useState, useEffect, useMemo } from "react";
import { useSelector, useDispatch } from "react-redux"; 
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import {
  Pencil,
  Trash2,
  Plus,
  UploadCloud,
  Image as ImageIcon,
} from "lucide-react";
import { v4 as uuidv4 } from "uuid";
import { Select } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { getUserItemsWithPagination, createItem, updateItem } from "@/features/items/itemSlice";
import { useToast } from "@/hooks/use-toast";
import { Item } from "@/lib/interfaces";
import ItemCard from "@/components/custom/ItemCard"; 
import ItemDialog from "@/components/custom/ItemDialog"; 
import Filters from "@/components/custom/Filter";
import { conditionOptions, categoryOptions, statusOptions } from "@/lib/Options";

interface ItemsGridProps {
items : Item[]
}

export default function ItemsGrid({items} : ItemsGridProps) {
  const [filters, setFilters] = useState({
    status: "",
    category: "",
    condition: "",
  });
  
  const [openDetailModal, setOpenDetailModal] = useState(false);
const [selectedItem, setSelectedItem] = useState<Item | null>(null);


console.log("TEMS: ", items);

const filteredItems = useMemo(() => {
  if (!items) return [];

  return items.items.filter(
    (item) =>

      (!filters.status || item.status === filters.status) &&
      (!filters.category || item.category === filters.category) &&
      (!filters.condition || item.condition === filters.condition)
  );
}, [items, filters]);

return (<>
         {/* Filters */}
<div className=" w-full flex flex-col items-center justify-center">
    <Filters />
              {/* Items Grid */}
     
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
  {filteredItems.map((item) => (
<ItemCard
  item={item}
  onEdit={(id) => openEditModal(id)}
  onDelete={(id) => handleDelete(id)}
  onViewDetails={(item) => {
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
