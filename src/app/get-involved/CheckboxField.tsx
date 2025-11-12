'use client';

import React from 'react';
import { Check } from 'lucide-react';
import { Control, useController, FieldValues, Path, PathValue } from 'react-hook-form';
import * as CheckboxPrimitive from '@radix-ui/react-checkbox';

type CheckboxProps<T extends FieldValues> = {
  name: Path<T>;
  control: Control<T>;
  options: string[];
  label: string;
  error?: { message?: string };
};

function CheckboxField<T extends FieldValues>({
  name,
  control,
  options,
  label,
  error,
}: CheckboxProps<T>) {
  const { field } = useController({
    name,
    control,
    defaultValue: [] as PathValue<T, Path<T>>,
    rules: { required: 'This field is required' },
  });

  const toggleOption = (option: string) => {
    const newValue = field.value === option ? '' : option;
    field.onChange(newValue);
  };

  return (
    <div>
      <h4 className="font-body text-xl text-tsk-primary-dark font-semibold mb-4">{label}</h4>
      <div className="flex flex-col gap-8">
        {options.map((option, index) => (
          <label
            key={index}
            className="flex items-center gap-3 cursor-pointer select-none text-tsk-primary-dark font-body font-semibold text-lg"
          >
            <CheckboxPrimitive.Root
              checked={field.value === option}
              onCheckedChange={() => toggleOption(option)}
              className="w-5 h-5 flex items-center justify-center rounded-sm border border-tsk-primary-dark bg-tsk-light-2"
            >
              <CheckboxPrimitive.Indicator>
                <Check size={16} className="text-[#45084A]" />
              </CheckboxPrimitive.Indicator>
            </CheckboxPrimitive.Root>
            <span>{option}</span>
          </label>
        ))}
      </div>

      {/* Error Message */}
      {error && <p className="text-sm text-red-500 mt-4">{error.message}</p>}
    </div>
  );
}

export default CheckboxField;
