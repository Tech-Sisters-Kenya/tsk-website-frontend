'use client';

import React from 'react';
import clsx from 'clsx';
import { Control, FieldValues, Path, useController, PathValue } from 'react-hook-form';

type SelectFieldProps<T extends FieldValues> = {
  id: string;
  label: string;
  placeholder: string;
  options: string[];
  error?: { message?: string };
  control: Control<T>;
  name: Path<T>;
};

function SelectField<T extends FieldValues>({
  id,
  label,
  placeholder,
  options,
  error,
  control,
  name,
  ...props
}: SelectFieldProps<T>) {
  const { field } = useController({
    name,
    control,
    defaultValue: '' as PathValue<T, Path<T>>,
    rules: { required: 'This field is required' },
  });

  return (
    <div className="flex flex-col gap-4">
      <label htmlFor={id} className="font-body text-tsk-primary-dark font-semibold">
        {label}
      </label>

      <div className="relative">
        <select
          id={id}
          className={clsx(
            'w-full py-4 px-3 pr-10 border rounded-xl appearance-none text-tsk-primary-dark focus:outline-none cursor-pointer',
            error ? 'text-gray-300' : 'text-[#45084A]',
            error
              ? 'border-red-300 focus:border-red-300 focus:ring-red-300'
              : 'border-[#45084A]/50 focus:border-tsk-primary focus:ring-tsk-primary/50'
          )}
          aria-invalid={error ? 'true' : 'false'}
          aria-describedby={error ? `${id}-error` : ''}
          {...props}
          value={field.value}
          onChange={field.onChange}
          onBlur={field.onBlur}
          ref={field.ref}
        >
          <option value="" disabled className="text-gray-300">
            {placeholder}
          </option>
          {options.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>

        {/* Chevron */}
        <svg
          className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 text-tsk-primary-dark"
          viewBox="0 0 20 20"
          fill="currentColor"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          <path d="M5.23 7.21a.75.75 0 0 1 1.06.02L10 10.17l3.71-2.94a.75.75 0 1 1 .94 1.17l-4.24 3.36a.75.75 0 0 1-.94 0L5.21 8.4a.75.75 0 0 1 .02-1.19z" />
        </svg>
      </div>

      {error && <p className="mt-1 text-sm text-red-600">{error.message}</p>}
    </div>
  );
}

export default SelectField;
