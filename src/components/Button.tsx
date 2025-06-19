import React, { ButtonHTMLAttributes } from 'react';
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
    primary:
      'bg-tsk-primary-dark text-tsk-light-1 font-bold border border-tsk-primary-dark hover:bg-tsk-light-2 hover:text-tsk-primary-dark hover:border-tsk-primary-dark',
    secondary:
      'bg-tsk-light-2 text-tsk-primary-dark font-bold border border-tsk-primary-dark hover:bg-tsk-primary-dark hover:text-tsk-light-1',
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
