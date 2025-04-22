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
import { Card, CardContent } from "@/components/ui/card";
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
import ItemsGrid from "@/components/custom/ItemsGrid";
import Item from "@/lib/interface";
import { conditionOptions, categoryOptions, statusOptions } from "@/lib/Options";


export default function Items() {
  //  const [items, setItems] = useState<Item[]>([]);
  const [open, setOpen] = useState(false);
  const [editItem, setEditItem] = useState<Item | null>(null);
  const [form, setForm] = useState({
    title: "",
    description: "",
    price: "",
    category: "",
    condition: "",
    status: "Available",
    images: [] as string[],
  });
  const dispatch = useDispatch();
  const { toast } = useToast();
  const { user } = useSelector((state: any) => state.auth);
  
  const { data, message, isLoading, isError } = useSelector(
    (state: any) => state.item
  );
  const [hasFetched, setHasFetched] = useState(false);


  useEffect(() => {

      const fetchItems = async () => {
    const res = await dispatch(getUserItemsWithPagination()).unwrap(); // optional .unwrap() to handle errors nicely
console.log('res', res)  
  };

  fetchItems();

}, [dispatch]);

  useEffect(() => {
    if (isError) {
      toast({
        variant: "destructive",
        title: `Something went wrong : ${message}`,
        description: "Please try again",
      });
    }

  }, [data, isError, message]);

  const openNewItemModal = () => {
    setForm({
      title: "",
      description: "",
      price: "",
      category: "",
      condition: "",
      status: "Available",
      images: [],
    });
    setEditItem(null);
    setOpen(true);
  };

  const openEditModal = (item: Item) => {
    setEditItem(item);
    setForm({
      title: item.title,
      description: item.description,
      price: item.price.toString(),
      category: item.category,
      condition: item.condition,
      status: item.status,
      images: item.images,
    });
    setOpen(true);
  };

  const handleDelete = (id: string) => {
    setItems((prev) => prev.filter((item) => item.id !== id));
  };

  const handleSubmit = () => {
    const { title, description, price, category, condition, status, images } = form;
    if (!title || !description || !price || !category || !condition || !images.length) return;

    const newItem: Item = {
      id: editItem ? editItem._id : '',
      title,
      description,
      price: parseFloat(price),
      category,
      condition,
      status,
      images,
      userId: currentUserId,
    };
console.log(newItem.id)
    if (editItem) {
     
      dispatch(updateItem(newItem));

    } else {
      dispatch(createItem(newItem));
    }

    setOpen(false);
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    const readers = files.map((file) => {
      return new Promise<string>((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result as string);
        reader.onerror = reject;
        reader.readAsDataURL(file);
      });
    });

    Promise.all(readers).then((base64Images) => {
      setForm((prev) => ({
        ...prev,
        images: [...prev.images, ...base64Images],
      }));
    });
  };


   return (
    <div className="p-6 max-w-6xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Items</h1>
        <Button onClick={openNewItemModal}>
          <Plus className="w-4 h-4 mr-2" /> Add Item
        </Button>
      </div>
    {isLoading ? (
      <p>Loading items...</p>
    ) : (
       <ItemsGrid items={data}/>
    )}
      {/* Create/Edit Dialog */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>{editItem ? "Edit Item" : "New Item"}</DialogTitle>
          </DialogHeader>

          <div className="space-y-4">
            <Input
              placeholder="Title"
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
            />
            <Input
              placeholder="Description"
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
            />
            <Input
              type="number"
              placeholder="Price"
              value={form.price}
              onChange={(e) => setForm({ ...form, price: e.target.value })}
            />
            <select
              className="w-full border p-2 rounded-md"
              value={form.category}
              onChange={(e) => setForm({ ...form, category: e.target.value })}
            >
              <option value="">Select Category</option>
              {categoryOptions.map((cat) => (
                <option key={cat}>{cat}</option>
              ))}
            </select>
            <select
              className="w-full border p-2 rounded-md"
              value={form.condition}
              onChange={(e) => setForm({ ...form, condition: e.target.value })}
            >
              <option value="">Select Condition</option>
              {conditionOptions.map((cond) => (
                <option key={cond}>{cond}</option>
              ))}
            </select>
            <select
              className="w-full border p-2 rounded-md"
              value={form.status}
              onChange={(e) => setForm({ ...form, status: e.target.value })}
            >
              {statusOptions.map((s) => (
                <option key={s}>{s}</option>
              ))}
            </select>

            {/* Image Upload */}
            <div>
              <Label>Images</Label>
              <Input type="file" multiple accept="image/*" onChange={handleImageUpload} />
              <div className="flex flex-wrap mt-2 gap-2">
                {form.images.map((img, idx) => (
                  <img
                    key={idx}
                    src={img}
                    alt={`preview-${idx}`}
                    className="w-16 h-16 object-cover rounded"
                  />
                ))}
              </div>
            </div>
          </div>

          <DialogFooter className="mt-4">
            <Button variant="ghost" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleSubmit}>
              {editItem ? "Save Changes" : "Add Item"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

