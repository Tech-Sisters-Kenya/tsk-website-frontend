'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import Button from '@/components/Button';

import Padlock from '@/assets/padlock-icon.svg';
import EyeOpen from '@/assets/eye-open-icon.svg';
import EyeClosed from '@/assets/eye-closed-icon.svg';

interface ResetPasswordFormValues {
  email: string;
  current_password: string;
  new_password: string;
  confirmPassword: string;
}

export default function ResetPasswordPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [resetError, setResetError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<ResetPasswordFormValues>({
    defaultValues: {
      email: '',
      current_password: '',
      new_password: '',
      confirmPassword: '',
    },
  });

  const newPassword = watch('new_password');

  const onSubmit = async (data: ResetPasswordFormValues) => {
    setIsLoading(true);
    setResetError('');

    try {
      const response = await fetch('/api/auth/reset-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: data.email.trim(),
          current_password: data.current_password,
          new_password: data.new_password,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to reset password. Please try again.');
      }

      // Parse the response but don't store it since we don't use it
      await response.json();

      // Show success message
      // Redirect to login page with success message
      router.push('/login?reset=success');
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : 'Password reset failed. Please try again.';
      setResetError(errorMessage);
      console.error('Reset password error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  return (
    <main className="flex flex-col items-center justify-center pt-40 pb-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full md:max-w-4xl space-y-8 bg-[#F8EBFC] bg-opacity-40 py-8 px-24 rounded-lg">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-tsk-primary-dark">Enter a new password</h1>
        </div>

        {/* Reset Password Form */}
        <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
          {resetError && (
            <div className="bg-red-50 text-red-600 p-3 rounded-md text-sm">{resetError}</div>
          )}

          <div>
            <label htmlFor="email" className="block text-tsk-primary-dark font-semibold text-md">
              Email Address
            </label>
            <div className="mt-1">
              <input
                id="email"
                type="email"
                autoComplete="email"
                placeholder="Enter your email address"
                className={`w-full py-4 px-3 border placeholder:text-[#45084A]/50 ${errors.email ? 'border-red-300' : 'border-[#45084A]/50'} rounded-xl focus:outline-none focus:ring-tsk-primary focus:border-tsk-primary`}
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

          <div>
            <label
              htmlFor="current_password"
              className="block text-tsk-primary-dark font-semibold text-md"
            >
              Current Password
            </label>
            <div className="mt-1 relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Image src={Padlock} alt="Padlock icon" width="20" height="20" className="mr-2" />
              </div>
              <input
                id="current_password"
                type={showPassword ? 'text' : 'password'}
                autoComplete="current-password"
                placeholder="Enter your current password"
                className={`pl-10 w-full py-4 px-3 border placeholder:text-[#45084A]/50 ${errors.current_password ? 'border-red-300' : 'border-[#45084A]/50'} rounded-xl focus:outline-none focus:ring-tsk-primary focus:border-tsk-primary`}
                {...register('current_password', {
                  required: 'Current password is required',
                })}
              />
              <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                <button
                  type="button"
                  onClick={togglePasswordVisibility}
                  className="text-gray-400 hover:text-gray-500 focus:outline-none"
                >
                  {showPassword ? (
                    <Image src={EyeClosed} alt="Eye closed icon" width="20" height="20" />
                  ) : (
                    <Image src={EyeOpen} alt="Eye open icon" width="20" height="20" />
                  )}
                </button>
              </div>
            </div>
            {errors.current_password && (
              <p className="mt-1 text-sm text-red-600">{errors.current_password.message}</p>
            )}
          </div>

          <div>
            <label
              htmlFor="new_password"
              className="block text-tsk-primary-dark font-semibold text-md"
            >
              New Password
            </label>
            <div className="mt-1 relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Image src={Padlock} alt="Padlock icon" width="20" height="20" className="mr-2" />
              </div>
              <input
                id="new_password"
                type={showPassword ? 'text' : 'password'}
                autoComplete="new-password"
                placeholder="Enter your new password"
                className={`pl-10 w-full py-4 px-3 border placeholder:text-[#45084A]/50 ${errors.new_password ? 'border-red-300' : 'border-[#45084A]/50'} rounded-xl focus:outline-none focus:ring-tsk-primary focus:border-tsk-primary`}
                {...register('new_password', {
                  required: 'New password is required',
                  minLength: {
                    value: 8,
                    message: 'Password must be at least 8 characters',
                  },
                  validate: {
                    hasNumber: (value) =>
                      /[0-9]/.test(value) || 'Password must contain at least one number',
                    hasLetter: (value) =>
                      /[a-zA-Z]/.test(value) || 'Password must contain at least one letter',
                  },
                })}
              />
              <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                <button
                  type="button"
                  onClick={togglePasswordVisibility}
                  className="text-gray-400 hover:text-gray-500 focus:outline-none"
                >
                  {showPassword ? (
                    <Image src={EyeClosed} alt="Eye closed icon" width="20" height="20" />
                  ) : (
                    <Image src={EyeOpen} alt="Eye open icon" width="20" height="20" />
                  )}
                </button>
              </div>
            </div>
            {errors.new_password && (
              <p className="mt-1 text-sm text-red-600">{errors.new_password.message}</p>
            )}
          </div>

          <div>
            <label
              htmlFor="confirmPassword"
              className="block text-tsk-primary-dark font-semibold text-md"
            >
              Repeat password
            </label>
            <div className="mt-1 relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Image src={Padlock} alt="Padlock icon" width="20" height="20" className="mr-2" />
              </div>
              <input
                id="confirmPassword"
                type={showConfirmPassword ? 'text' : 'password'}
                autoComplete="new-password"
                placeholder="Enter your password"
                className={`pl-10 w-full py-4 px-3 border placeholder:text-[#45084A]/50 ${errors.confirmPassword ? 'border-red-300' : 'border-[#45084A]/50'} rounded-xl focus:outline-none focus:ring-tsk-primary focus:border-tsk-primary`}
                {...register('confirmPassword', {
                  required: 'Please confirm your password',
                  validate: (value) => value === newPassword || 'Passwords do not match',
                })}
              />
              <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                <button
                  type="button"
                  onClick={toggleConfirmPasswordVisibility}
                  className="text-gray-400 hover:text-gray-500 focus:outline-none"
                >
                  {showConfirmPassword ? (
                    <Image src={EyeClosed} alt="Eye closed icon" width="20" height="20" />
                  ) : (
                    <Image src={EyeOpen} alt="Eye open icon" width="20" height="20" />
                  )}
                </button>
              </div>
            </div>
            {errors.confirmPassword && (
              <p className="mt-1 text-sm text-red-600">{errors.confirmPassword.message}</p>
            )}
          </div>

          <div className="flex items-center justify-center py-4">
            <Button type="submit" variant="primary" className="w-full py-4" disabled={isLoading}>
              <span className="text-lg">{isLoading ? 'Processing...' : 'Save password'}</span>
            </Button>
          </div>
        </form>
      </div>
    </main>
  );
}
