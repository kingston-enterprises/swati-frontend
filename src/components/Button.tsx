import React from 'react';

interface ButtonProps {
  onClick: () => void;
  text: string;
  className?: string; // Optional: allows adding Tailwind classes
  type?: 'button' | 'submit' | 'reset'; 
}

export const ButtonPrimary: React.FC<ButtonProps> = ({ onClick, text, className = '', type = 'button' }) => {
  return (
    <button
      type={type} // Use the type prop
      onClick={onClick}
      className={`px-6 py-2 min-w-[120px] text-center text-white bg-primary border border-primary rounded active:text-violet-500 hover:bg-transparent hover:text-primary focus:outline-none focus:ring ${className}`}
    >
      {text}
    </button>
  );
};

export const ButtonSecondary: React.FC<ButtonProps> = ({ onClick, text, className = '', type = 'button' }) => {
  return (
    <button
      type={type} // Use the type prop
      onClick={onClick}
      className={`px-6 py-2 min-w-[120px] text-center text-primary border border-primary rounded hover:bg-primary hover:text-white active:bg-indigo-500 focus:outline-none focus:ring ${className}`}
    >
      {text}
    </button>
  );
};

