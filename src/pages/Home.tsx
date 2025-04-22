
import { Navbar } from '@/components/Navbar';
import { SearchBar } from '@/components/SearchBar';
import ItemSection from '@/components/custom/ItemSection';
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

const Home: React.FC = () => {
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



  return (
    <div className="flex flex-col bg-white w-full h-full">
      <div class="h-full mx-auto flex flex-col items-start">
        <div class="min-h-1/2 bg-white w-full flex justify-center items-center flex-col mb-5 py-24 sm:py-36 sm:mb-10">
              <h1
                class="text-4xl sm:text-5xl font-bold text-center text-primary leading-10"
              >
                Welcome to 
                <span class="text-secondary">Eswatinis #1</span>
                Shop
              </h1>
              <p class="mt-5 text-primary font-normal text-center text-xl">
                The Best Place To Buy Local
              </p>
            
            <div class=" flex items-center jusify-center w-full sm:w-2/3">
              <SearchBar />
            </div>
            </div>
            <div class="border border-black p-10 mb-10 flex w-full">
              
              {isLoading ? (
      <p>Loading items...</p>
    ) : (
       <ItemsGrid items={data}/>
    )}

</div>
          </div>
        </div>
  );
};


export default Home;
