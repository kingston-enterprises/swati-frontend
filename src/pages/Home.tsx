import { SearchBar } from '../components/SearchBar';
import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux"; 

import { getUserItemsWithPagination } from "../features/items/itemSlice";
import { useToast } from "../hooks/use-toast";
import ItemsGrid from "../components/custom/ItemsGrid";

const Home: React.FC = () => {
  const dispatch = useDispatch();
  const { toast } = useToast();
  
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



  return (
    <div className="flex flex-col bg-white w-full h-full">
      <div className="h-full mx-auto flex flex-col items-start">
        <div className="min-h-1/2 bg-white w-full flex justify-center items-center flex-col mb-5 py-24 sm:py-36 sm:mb-10">
              <h1
                className="text-4xl sm:text-5xl font-bold text-center text-primary leading-10"
              >
                Welcome to 
                <span className="text-secondary">Eswatinis #1</span>
                Shop
              </h1>
              <p className="mt-5 text-primary font-normal text-center text-xl">
                The Best Place To Buy Local
              </p>
            
            <div className=" flex items-center jusify-center mt-10 w-full sm:w-2/3">
              <SearchBar />
            </div>
            </div>
            <div className="border border-black p-10 mb-10 flex w-full">
              
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
