import { ButtonHTMLAttributes } from 'react';
import clsx from 'clsx';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary';
}

const Button = ({ variant = 'primary', className, ...props }: ButtonProps) => {
  const baseStyles = 'px-8 py-2 rounded-2xl text-sm font-medium transition-all';

  // Using style attribute to apply CSS variables
  const variantStyles = {
    primary: {
      backgroundColor: 'var(-tsk-primary-dark)',
      color: 'var(-foreground)',
    },
    secondary: {
      backgroundColor: 'var(-tsk-light-1)',
      color: 'var(-tsk-primary)',
    },
  };

  // Keep common Tailwind classes for spacing, etc.
  const variants = {
    primary: 'bg-tsk-primary-dark text-foreground  hover:opacity-90',
    secondary: 'bg-foreground text-tsk-primary-dark  hover:opacity-80',
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
