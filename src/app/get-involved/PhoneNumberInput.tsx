'use client';

import React from 'react';
import { Controller, Control, FieldValues, Path } from 'react-hook-form';
import PhoneInput, { isValidPhoneNumber } from 'react-phone-number-input';
import clsx from 'clsx';

import 'react-phone-number-input/style.css';
import './phoneInput.css';

type PhoneNumberInputProps<T extends FieldValues> = {
  name: Path<T>;
  control: Control<T>;
  error?: { message?: string };
};

function PhoneNumberInput<T extends FieldValues>({
  name,
  error,
  control,
}: PhoneNumberInputProps<T>) {
  return (
    <div className="flex flex-col gap-4 w-full">
      <label htmlFor={name} className="font-body text-xl text-tsk-primary-dark font-semibold">
        Phone Number *
      </label>

      <Controller
        name={name}
        control={control}
        rules={{
          required: 'Phone number is required',
          validate: (value) => {
            return value && isValidPhoneNumber(value) ? true : 'Please enter a valid phone number';
          },
        }}
        render={({ field }) => (
          <PhoneInput
            {...field}
            defaultCountry="KE" // Kenya 🇰🇪 pre-selected
            international
            countryCallingCodeEditable={false} // lock prefix
            className={clsx(
              'w-full flex items-stretch border rounded-xl overflow-hidden',
              'border placeholder:text-[#45084A]/50 rounded-xl bg-white focus:outline-none focus:ring-tsk-primary focus:border-tsk-primary',
              error
                ? 'border-red-300 focus:border-red-300 focus:ring-red-300'
                : 'border-[#45084A]/50 focus:border-tsk-primary'
            )}
          />
        )}
      />

      {/* Error Message */}
      {error && <p className="text-sm text-red-500 mt-1">{error.message}</p>}
    </div>
  );
}

export default PhoneNumberInput;
