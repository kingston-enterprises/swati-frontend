import React from 'react';

interface TopRibbonProps {
  // Props will be defined here later
  [key: string]: any; // Allows for any other props to be passed
}

const TopRibbon: React.FC<TopRibbonProps> = ({ children, ...restProps }) => {
  return (
    <>
      <div className="w-full m-0 p-3 bg-primary text-primary-accent">
        <div className="flex flex-col text-sm items-center justify-center sm:flex-row sm:justify-between">
          <div>For Help: +268 7612 3456 | help@eswatini.shop</div>
          <div>Watch out for our membership promotions</div>
        </div>
      </div>
    </>);
};

export default TopRibbon;
