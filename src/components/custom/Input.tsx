import React, { ReactNode, ChangeEvent } from 'react';

interface InputProps {
  id?:string;
  type?: string;
  name?: string;
  placeholder?: string;
  value?: any;
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
  className?: string;
  iconLeft?: ReactNode;
  iconRight?: ReactNode;
  rounded?: 'sm' | 'md' | 'lg' | 'full' | undefined;
  variant?: 'primary' | 'secondary' | 'outline'; 
  size?: 'sm' | 'md' | 'lg' | undefined | number;
  disabled?: boolean;
  required?: boolean;
  onKeyDown?: any;
  ref?: any;
}

export const Input: React.FC<InputProps> = ({
  id='',
  type = 'text',
  placeholder = '',
  value,
  onChange,
  className = '',
  iconLeft,
  name,
  iconRight,
  rounded = 'md',
  variant = 'primary',
  size = 'md',
  disabled = false,
  required = true,
  onKeyDown,
  ref,
  ...rest
}) => {

  // Base input styles
  let baseStyles = `
    transition-colors
    duration-200
    focus:outline-none
    disabled:opacity-50
    disabled:cursor-not-allowed
    ${rounded ? `rounded-${rounded}` : 'rounded-md'}
    ${className}
    inline-flex
    items-center
    w-full
  `;

  // Variant-specific styles
  let variantStyles = '';
  switch (variant) {
    case 'primary':
      variantStyles = 'bg-accent focus:ring-primary focus:border-primary text-primary';
      break;
    case 'secondary':
      variantStyles = 'bg-secondary focus:ring-secondary focus:border-secondary text-secondary';
      break;
    case 'outline':
      variantStyles = 'border focus:ring-primary focus:border-primary text-primary';
      break;
    default:
      variantStyles = 'bg-primary-light focus:ring-primary focus:border-primary text-primary';
  }

  // Size-specific styles (adjust padding and font size)
  let sizeStyles = '';
  switch (size) {
    case 'sm':
      sizeStyles = 'py-1 px-2 text-sm';
      break;
    case 'md':
      sizeStyles = 'py-2 px-3 text-base';
      break;
    case 'lg':
      sizeStyles = 'py-3 px-4 text-lg';
      break;
    default:
      sizeStyles = 'py-2 px-3 text-base';
  }

  const iconLeftSpacing = iconLeft ? 'pl-10' : 'pl-3'; // Add padding for left icon
  const iconRightSpacing = iconRight ? 'pr-10' : 'pr-3'; // Add padding for right icon
  const iconContainerStyles = 'absolute inset-y-0 flex items-center pointer-events-none';
  const inputCombinedStyles = `${baseStyles} ${variantStyles} ${sizeStyles} ${iconLeftSpacing} ${iconRightSpacing}`;

  return (
    <div className="relative flex items-center w-full">
      {iconLeft && (
        <div className={`${iconContainerStyles} left-0 ml-3`}>
          {iconLeft}
        </div>
      )}
      <input
        id={id}
        type={type}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className={inputCombinedStyles}
        disabled={disabled}
              onKeyDown={onKeyDown}
        {...rest}
      />
      {iconRight && (
        <div className={`${iconContainerStyles} right-0 mr-3`}>
          {iconRight}
        </div>
      )}
    </div>
  );
};

