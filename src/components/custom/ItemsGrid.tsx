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
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div>
          <Label>Status</Label>
          <select
            className="w-full border p-2 rounded-md"
            value={filters.status}
            onChange={(e) => setFilters((f) => ({ ...f, status: e.target.value }))}
          >
            <option value="">All</option>
            {statusOptions.map((status) => (
              <option key={status}>{status}</option>
            ))}
          </select>
        </div>
        <div>
          <Label>Category</Label>
          <select
            className="w-full border p-2 rounded-md"
            value={filters.category}
            onChange={(e) => setFilters((f) => ({ ...f, category: e.target.value }))}
          >
            <option value="">All</option>
            {categoryOptions.map((cat) => (
              <option key={cat}>{cat}</option>
            ))}
          </select>
        </div>
        <div>
          <Label>Condition</Label>
          <select
            className="w-full border p-2 rounded-md"
            value={filters.condition}
            onChange={(e) => setFilters((f) => ({ ...f, condition: e.target.value }))}
          >
            <option value="">All</option>
            {conditionOptions.map((cond) => (
              <option key={cond}>{cond}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Items Grid */}
     
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
  {filteredItems.map((item) => (
          <Card key={item._id} className="relative">
            <CardContent className="p-4 space-y-2">
              {item.images.length > 0 && (
                <img
                  src={item.images[0]}
                  alt="Item"
                  className="w-full h-40 object-cover rounded"
                />
              )}
              <h2 className="text-lg font-semibold">{item.title}</h2>
              <p className="text-gray-500">${item.price.toFixed(2)}</p>
              <p className="text-sm text-gray-600">{item.description}</p>
              <p className="text-xs text-gray-500">
                {item.category} · {item.condition} · {item.status}
              </p>
              <div className="absolute top-2 right-2 flex space-x-2">
                <Button
                  size="icon"
                  variant="ghost"
                  onClick={() => openEditModal(item)}
                >
                  <Pencil className="w-4 h-4" />
                </Button>
                <Button
                  size="icon"
                  variant="ghost"
                  onClick={() => handleDelete(item.id)}
                >
                  <Trash2 className="w-4 h-4 text-red-500" />
                </Button>
              </div>
            </CardContent>
                        <CardFooter>

                <Button
  className="w-full bg-primary text-white hover:from-purple-600 hover:to-blue-600"
  onClick={() => {
    setSelectedItem(item);
    setOpenDetailModal(true);
  }}
>
  View Details
</Button>
            </CardFooter>
          </Card>
        ))}
        <Dialog open={openDetailModal} onOpenChange={setOpenDetailModal}>
  <DialogContent className="max-w-4xl w-full h-[90vh] overflow-auto">
    <DialogHeader>
      <DialogTitle>{selectedItem?.title}</DialogTitle>
    </DialogHeader>

    {selectedItem && (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          {selectedItem.images?.[0] && (
            <img
              src={selectedItem.images[0]}
              alt={selectedItem.title}
              className="w-full h-auto rounded"
            />
          )}
        </div>
        <div className="space-y-4">
          <p className="text-lg text-gray-700">{selectedItem.description}</p>
          <p className="text-xl font-semibold text-primary">${selectedItem.price.toFixed(2)}</p>
          <p className="text-sm text-muted-foreground">
            Category: {selectedItem.category}
          </p>
          <p className="text-sm text-muted-foreground">
            Condition: {selectedItem.condition}
          </p>
          <p className="text-sm text-muted-foreground">
            Status: {selectedItem.status}
          </p>
        </div>
      </div>
    )}

    <DialogFooter>
          <Button variant="outline" onClick={() => setOpenDetailModal(false)}>
        Chat with Seller
      </Button>
      <Button variant="outline" onClick={() => setOpenDetailModal(false)}>
        Close
      </Button>
    </DialogFooter>
  </DialogContent>
</Dialog>

      </div>


 </> );
}
