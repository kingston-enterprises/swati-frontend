import React, { useState } from 'react';
import { HiOutlineSearchCircle } from "react-icons/hi";
import { Input } from "./Input";
import { Button } from "./Button";
import * as api from "../../api";


const API_URL: string = api.API_URL + "v0/";

interface SearchBarProps {
  onSearch?: (query: string) => void;
  className?: string;
}

export const SearchBar: React.FC<SearchBarProps> = ({className = '' }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [items, setItems] = useState([]);
  const [searched, setSearched] = useState(false); 
  
	const search = async (query: any) => {
	if (query != ""){
		    const res = await fetch(`${API_URL}items/search?q=${encodeURIComponent(query)}`);
  if (!res.ok) {
    throw new Error('Failed to search items');
  }
    const data = await res.json(); // <-- this is the fix
    setItems(data.data);  
setSearched(true);
	} else {
	    setItems([]);  
setSearched(true);
	}
	}

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const handleSearchClick = () => {
    search(searchTerm.trim());
    
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      search(searchTerm.trim());
    }
  };

  return (
<div className={`w-full max-w-3xl mx-auto flex flex-col gap-4 ${className}`}>
  {/* Search Input and Button */}
  <div className="flex items-center gap-2">
    <Input
      type="text"
      name="q"
      placeholder="Search items..."
      value={searchTerm}
      onChange={handleInputChange}
      onKeyDown={() => handleKeyDown}
      rounded="full"
      variant="outline"
      size="lg"
      className="flex-1"
    />
    <Button
      variant="primary"
      rounded="full"
      size="md"
      onClick={handleSearchClick}
      iconRight={<HiOutlineSearchCircle className="text-accent ml-2" />}
    >
      <span>Find</span>
    </Button>
  </div>

  {/* Search Results */}
  <div className="w-full mt-2">
    {searched && items.length === 0 && (
      <p className="text-gray-500 text-center py-4 border rounded-lg bg-gray-50">
        No results found
      </p>
    )}

    {items.length > 0 && (
      <ul className="space-y-3">
        {items.map((item: any, index) => (
          <li
            key={index}
            className="p-4 bg-white shadow-sm rounded-xl border hover:shadow-md transition-shadow"
          >
            <span className="text-base font-medium text-gray-800">{item.title}</span>
          </li>
        ))}
      </ul>
    )}
  </div>
</div>

  );
};

