'use client';

import React from 'react';
import { Control, useController, Path, FieldValues, PathValue } from 'react-hook-form';
import * as RadioGroupPrimitive from '@radix-ui/react-radio-group';

type RadioGroupProps<T extends FieldValues> = {
  name: Path<T>;
  options: { value: string; label: string }[];
  control: Control<T>;
  error?: { message?: string };
  label: string;
};

function RadioGroup<T extends FieldValues>({
  name,
  options,
  control,
  error,
  label,
}: RadioGroupProps<T>) {
  const { field } = useController({
    name,
    control,
    defaultValue: [] as PathValue<T, Path<T>>,
  });

  return (
    <div>
      <h4 className="font-body text-xl text-tsk-primary-dark font-semibold mb-4">{label}</h4>
      <RadioGroupPrimitive.Root
        value={field.value ?? ''}
        onValueChange={(value) => field.onChange(value ?? '')}
        className="flex gap-8"
      >
        {options.map((opt) => (
          <label key={opt.value} className="flex items-center gap-2">
            <RadioGroupPrimitive.Item
              value={opt.value}
              className="w-5 h-5 rounded-full border border-gray-400 bg-white 
                         data-[state=checked]:bg-white
                         flex items-center justify-center font-medium"
            >
              <RadioGroupPrimitive.Indicator className="w-2.5 h-2.5 rounded-full bg-tsk-primary-dark" />
            </RadioGroupPrimitive.Item>
            {opt.label}
          </label>
        ))}
      </RadioGroupPrimitive.Root>

      {/* Error Message */}
      {error && <p className="text-sm text-red-500 mt-4">{error.message}</p>}
    </div>
  );
}

export default RadioGroup;
