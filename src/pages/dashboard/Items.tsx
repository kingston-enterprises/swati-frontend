import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux"; 
import { Button } from "../../components/ui/button";
import {
  Plus
} from "lucide-react";
import { getUserItemsWithPagination, createItem, updateItem } from "../../features/items/itemSlice";
import { useToast } from "../../hooks/use-toast";
import ItemsGrid from "../../components/custom/ItemsGrid";
import { Item } from "../../lib/interfaces";
import { conditionOptions, categoryOptions, statusOptions } from "../../lib/Options";
import CustomDialog from "../../components/CustomDialog";

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




  const handleSubmit = () => {
    const { title, description, price, category, condition, status, images } = form;
    if (!title || !description || !price || !category || !condition || !images.length) return;

    const newItem: Item = {
      _id: editItem ? editItem._id : '',
      title,
      description,
      price: parseFloat(price),
      category,
      condition,
      status,
      images,
      userId: user._id,
    };
    
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
    <div className="bg-accent p-6 w-full">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Items</h1>
        <Button onClick={openNewItemModal}>
          <Plus className="w-4 h-4 mr-2" /> Add Item
        </Button>
      </div>

            <div className="border border-black p-10 mb-10 flex w-full">
    {isLoading ? (
      <p>Loading items...</p>
    ) : (
       <ItemsGrid items={data}/>
    )}
    </div>
    <CustomDialog
  open={open}
  setOpen={setOpen}
  form={form}
  setForm={setForm}
  editItem={editItem}
  handleSubmit={handleSubmit}
  handleImageUpload={handleImageUpload}
  categoryOptions={categoryOptions}
  conditionOptions={conditionOptions}
  statusOptions={statusOptions}
/>

      {/* Create/Edit Dialog */}

    </div>
  );
}

