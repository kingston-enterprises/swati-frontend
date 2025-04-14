import React from 'react';
import { Navbar } from '@/components/Navbar';
import { SearchBar } from '@/components/SearchBar';
export const Home: React.FC = () => {
  return (
    <div className="flex flex-col bg-secondary-accent min-h-screen">
      <div class="bg-">
        <div class="bg-transparent">
          <div class="mx-auto flex flex-col items-center py-12 sm:py-24">
            <div class="w-11/12 sm:w-2/3 lg:flex justify-center items-center flex-col mb-5 sm:mb-10">
              <h1
                class="text-4xl sm:text-5xl md:text-5xl lg:text-5xl xl:text-6xl text-center text-primary text-primary font-black leading-10"
              >
                Welcome to 
                <span class="text-secondary">Eswatinis #1</span>
                Shop
              </h1>
              <p class="mt-5 sm:mt-10 lg:w-10/12 text-gray-600 dark:text-gray-300 font-normal text-center text-xl">
                The Best Place To Buy Local
              </p>
            </div>
            <div class="flex w-11/12 md:w-8/12 xl:w-6/12">
            <SearchBar />
           </div>
          </div>
        </div>
      </div>
    </div>
  );
};
