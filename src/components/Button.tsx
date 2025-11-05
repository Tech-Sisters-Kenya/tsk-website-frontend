import React, { ButtonHTMLAttributes } from 'react';
import clsx from 'clsx';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary';
}

const Button = ({ variant = 'primary', className, ...props }: ButtonProps) => {
  const baseStyles = 'px-8 py-2 border border-1 rounded-2xl text-sm font-bold transition-all';

  // Define variants using only CSS classes (no conflicting inline styles)
  const variants = {
    primary:
      'bg-tsk-primary-dark text-white font-bold border-tsk-primary-dark hover:bg-tsk-light-2 hover:text-tsk-primary-dark hover:border-tsk-primary-dark',
    secondary:
      'bg-tsk-light-2 text-tsk-primary-dark font-bold border-tsk-primary-dark hover:bg-tsk-primary-dark hover:text-tsk-light-1',
  };

  return (
    <button
      className={clsx(
        baseStyles,
        variants[variant],
        'disabled:opacity-50 disabled:cursor-not-allowed',
        className
      )}
      {...props}
    />
  );
};

export default Button;
