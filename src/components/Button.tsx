import React from 'react';
import { ButtonHTMLAttributes } from 'react';
import clsx from 'clsx';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary';
}

const Button = ({ variant = 'primary', className, ...props }: ButtonProps) => {
  const baseStyles = 'px-8 py-2 border border-1 rounded-2xl text-sm font-bold transition-all';

  // Using style attribute to apply CSS variables
  const variantStyles = {
    primary: {
      backgroundColor: 'var(-tsk-primary-dark)',
      color: 'var(-foreground)',
    },
    secondary: {
      backgroundColor: 'var(-tsk-light-1)',
      color: 'var(-tsk-primary)',
      border: '2px solid var(-tsk-primary-dark)',
      textColor: 'var(-tsk-primary-dark)',
    },
  };

  // Keep common Tailwind classes for spacing, etc.
  const variants = {
    primary: 'bg-tsk-primary-dark text-tsk-light-1 font-bold hover:opacity-90',
    secondary:
      'bg-foreground text-tsk-primary-dark font-bold border-tsk-primary-dark hover:opacity-80',
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
