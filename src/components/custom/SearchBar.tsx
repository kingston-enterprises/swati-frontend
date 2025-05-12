import React, { useState } from 'react';
import { HiOutlineSearchCircle } from "react-icons/hi";

import { Input } from "./Input";
import { Button } from "./Button";


interface SearchBarProps {
  onSearch?: (query: string) => void;
  className?: string;
}

export const SearchBar: React.FC<SearchBarProps> = ({ onSearch, className = '' }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const handleSearchClick = () => {
    if (onSearch) {
      onSearch(searchTerm);
    }
  };

 /* const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter' && onSearch) {
      onSearch(searchTerm);
    }
  };*/

  return (
    <div className={`flex rounded-md w-full h-full ${className}`}>
      <Input
        type="text"
        name="q"
        placeholder="keyword"
        value={searchTerm}
        onChange={handleInputChange}
        rounded="full"
        variant="outline"
        size="lg"
        //onKeyDown={handleKeyDown} // Trigger search on Enter key
      />
      <Button
        variant="primary"
        rounded="full"
        size="md"
        className={'max-w-2/5'}
        onClick={handleSearchClick}
        iconRight={<HiOutlineSearchCircle className="text-accent ml-5" />}
      >
        <span>Find</span>
      </Button>
    </div>
  );
};
