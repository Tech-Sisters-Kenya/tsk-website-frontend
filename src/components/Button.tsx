import { ButtonHTMLAttributes } from 'react';
import clsx from 'clsx';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary';
}

const Button = ({ variant = 'primary', className, ...props }: ButtonProps) => {
  const baseStyles = 'px-8 py-2 border border-1 rounded-2xl text-sm font-medium transition-all';

  // Using style attribute to apply CSS variables
  const variantStyles = {
    primary: {
      backgroundColor: '#45084A',
      color: '#ffffff',
    },
    secondary: {
      backgroundColor: '#efd5f8',
      color: '#45084A',
    },
  };

  // Keep common Tailwind classes for spacing, etc.
  const variants = {
    primary: 'hover:opacity-90',
    secondary: 'hover:opacity-80',
  };

  return (
    <button
      className={clsx(baseStyles, variants[variant], className)}
      style={variantStyles[variant]}
      {...props}
    />
  );
};

export default Button;
