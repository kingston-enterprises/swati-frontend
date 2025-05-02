import React, { ReactNode } from 'react';

interface ButtonProps {
  children: ReactNode;
  onClick?: () => void;
  type?: "button" | "submit" | "reset" | undefined;
  className?: string;
  iconLeft?: ReactNode;
  iconRight?: ReactNode;
  rounded?: 'sm' | 'md' | 'lg' | 'full' | undefined;
  variant?: 'primary' | 'secondary' | 'primary-outline' | 'secondary-outline' | 'text'; // Example variants
  size?: 'sm' | 'md' | 'lg' | undefined;
  disabled?: boolean;
  // Add other relevant props as needed
}

export const Button: React.FC<ButtonProps> = ({
  children,
  onClick,
  className = '',
  iconLeft,
  iconRight,
  rounded = 'md',
  variant = 'primary',
  size = 'md',
  disabled = false,
  ...rest
}) => {
  // Base button styles
  let baseStyles = `
    font-bold
    transition-colors
    duration-200
    focus:outline-none
    disabled:text-accent
    disabled:opacity-50
    disabled:cursor-not-allowed
    ${rounded ? `rounded-${rounded}` : 'rounded-md'}
    ${className}
    inline-flex
    items-center
    justify-center
    
  `;

  // Variant-specific styles
  let variantStyles = '';
  switch (variant) {
    case 'primary':
      variantStyles = 'bg-primary border hover:bg-secondary hover:border-primary text-secondary hover:text-primary';
      break;
    case 'secondary':
      variantStyles = 'bg-secondary border hover:bg-primary hover:border-secondary text-primary hover:text-secondary';
      break;
    case 'primary-outline':
      variantStyles = 'border border-primary hover:bg-primary text-secondary';
      break;
    case 'secondary-outline':
      variantStyles = 'border border-secondary hover:bg-secondary hover:border-primary text-secondary hover:text-primary';
      break;
    default:
      variantStyles = 'bg-primary hover:bg-secondary text-primary-accent';
  }

  // Size-specific styles
  let sizeStyles = '';
  switch (size) {
    case 'sm':
      sizeStyles = 'py-1 px-2 text-sm';
      break;
    case 'md':
      sizeStyles = 'py-2 px-4 text-base';
      break;
    case 'lg':
      sizeStyles = 'py-3 px-6 text-lg';
      break;
    default:
      sizeStyles = 'py-2 px-4 text-base';
  }

  const iconSpacing = children && (iconLeft || iconRight) ? 'ml-2 mr-2' : '';

  return (
    <button
      onClick={onClick}
      className={`${baseStyles} ${variantStyles} ${sizeStyles} ${iconSpacing}`}
      disabled={disabled}
      {...rest}
    >
      {iconLeft && <span className="inline-flex items-center">{iconLeft}</span>}
      {children}
      {iconRight && <span className="inline-flex items-center">{iconRight}</span>}
    </button>
  );
};

