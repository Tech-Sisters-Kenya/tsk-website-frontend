'use client';

import React, { forwardRef } from 'react';
import clsx from 'clsx';

type InputProps = {
  label: string;
  id: string;
  error?: { message?: string };
  placeholder: string;
  type: string;
};

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, id, error, placeholder, type, ...props }, ref) => {
    return (
      <div className="flex flex-col gap-4">
        <label htmlFor={id} className="font-body text-xl text-tsk-primary-dark font-semibold">
          {label}
        </label>
        <input
          id={id}
          ref={ref}
          type={type}
          placeholder={placeholder}
          className={clsx(
            'w-full py-4 px-3 border placeholder:text-[#45084A]/50 rounded-xl focus:outline-none focus:ring-tsk-primary focus:border-tsk-primary',
            error
              ? 'border-red-300 focus:border-red-300 focus:ring-red-300'
              : 'border-[#45084A]/50 focus:border-tsk-primary'
          )}
          {...props}
        />
        {error && <p className="mt-1 text-sm text-red-600">{error.message}</p>}
      </div>
    );
  }
);

Input.displayName = 'Input';
export default Input;
