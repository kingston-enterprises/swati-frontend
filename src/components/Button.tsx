import React, { ReactNode } from 'react';

interface ButtonProps {
  children: ReactNode;
  onClick?: () => void;
  className?: string;
  iconLeft?: ReactNode;
  iconRight?: ReactNode;
  rounded?: 'sm' | 'md' | 'lg' | 'full' | undefined;
  variant?: 'primary' | 'secondary' | 'primary-outline' | 'secondary-outline' | 'text'; // Example variants
  size?: 'sm' | 'md' | 'lg' | undefined;
  disabled?: boolean;
  // Add other relevant props as needed
}

const Button: React.FC<ButtonProps> = ({
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
    disabled:text-primary-accent
    disabled:opacity-10
    disabled:cursor-not-allowed
    ${rounded ? `rounded-${rounded}` : 'rounded-md'}
    ${className}
    inline-flex
    items-center
    justify-center
    w-full
  `;

  // Variant-specific styles
  let variantStyles = '';
  switch (variant) {
    case 'primary':
      variantStyles = 'bg-primary hover:bg-secondary text-primary-accent';
      break;
    case 'secondary':
      variantStyles = 'bg-secondary hover:bg-primary text-primary-accent hover:text-primary-accent';
      break;
    case 'primary-outline':
      variantStyles = 'border border-primary hover:bg-primary text-primary hover:text-primary-accent';
      break;
    case 'secondary-outline':
      variantStyles = 'border border-secondary hover:bg-secondary text-secondary hover:text-primary';
      break;
    case 'primary-text':
      variantStyles = 'text-primary hover:text-secondary';
      break;
    case 'secondary-text':
      variantStyles = 'text-secondary hover:text-primary';
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

export default Button;
