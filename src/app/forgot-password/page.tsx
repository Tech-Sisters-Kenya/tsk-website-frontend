'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import Button from '@/components/Button';
import Email from '@/assets/email-icon.svg';

interface ForgotPasswordFormValues {
  email: string;
}

export default function ForgotPasswordPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [formError, setFormError] = useState('');

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ForgotPasswordFormValues>();

  const onSubmit = async (data: ForgotPasswordFormValues) => {
    setIsLoading(true);
    setFormError('');

    try {
      // Here you would connect to your Laravel backend
      const response = await fetch('/api/auth/forgot-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || 'Failed to send reset email');
      }

      // Redirect to confirmation page
      router.push('/reset-confirmation');
    } catch (error) {
      setFormError(
        error instanceof Error ? error.message : 'Failed to send reset email. Please try again.'
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="flex flex-col items-center justify-center pt-40 pb-8 px-4 sm:px-6 lg:px-8">
      <div className="w-full md:max-w-4xl space-y-6 bg-[#F8EBFC] bg-opacity-40 py-8 px-24 rounded-lg">
        <div className="text-center">
          <h1 className="text-5xl font-bold text-tsk-primary-dark">Forgot your password?</h1>
          <p className="mt-2 text-md font-medium text-tsk-primary-dark">
            Enter your email address and we will send you a message <br />
            to create a new password.
          </p>
        </div>

        {/* Forgot Password Form */}
        <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
          {formError && (
            <div className="bg-red-50 text-red-600 p-3 rounded-md text-sm">{formError}</div>
          )}

          <div>
            <label htmlFor="email" className="block text-md font-semibold text-tsk-primary-dark">
              Email Address
            </label>
            <div className="mt-1 relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Image src={Email} alt="Email icon" width={20} height={20} className="mr-2" />
              </div>
              <input
                id="email"
                type="email"
                autoComplete="email"
                placeholder="Enter your email"
                className={`pl-10 w-full py-4 px-3 border placeholder:text-[#45084A]/50 ${errors.email ? 'border-red-300' : 'border-[#45084A]/50'} rounded-xl focus:outline-none focus:ring-tsk-primary focus:border-tsk-primary`}
                {...register('email', {
                  required: 'Email is required',
                  pattern: {
                    value: /\S+@\S+\.\S+/,
                    message: 'Please enter a valid email address',
                  },
                })}
              />
            </div>
            {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>}
          </div>

          <div className="flex items-center justify-center py-4">
            <Button type="submit" variant="primary" className="w-full py-4" disabled={isLoading}>
              <span className="text-lg">{isLoading ? 'Sending...' : 'Continue'}</span>
            </Button>
          </div>
        </form>

        <div className="text-center mt-4">
          <Link href="/login" className="text-sm text-tsk-primary-dark hover:underline">
            I remember my password
          </Link>
        </div>
      </div>
    </main>
  );
}
