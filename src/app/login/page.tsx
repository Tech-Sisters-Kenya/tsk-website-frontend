'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import Button from '@/components/Button';

import GoogleLogo from '@/assets/devicon_google.svg';
import Person from '@/assets/person-icon.svg';
import Padlock from '@/assets/padlock-icon.svg';
import EyeOpen from '@/assets/eye-open-icon.svg';
import EyeClosed from '@/assets/eye-closed-icon.svg';

interface LoginFormValues {
  email: string;
  password: string;
}

export default function LoginPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [loginError, setLoginError] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>();

  const onSubmit = async (data: LoginFormValues) => {
    setIsLoading(true);
    setLoginError('');

    try {
      // Here you would connect to your Laravel backend
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || 'Failed to login');
      }

      // Redirect to dashboard or home page after successful login
      router.push('/');
    } catch (error) {
      setLoginError(error instanceof Error ? error.message : 'Login failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full md:max-w-4xl space-y-8 bg-tsk-light-2 py-8 px-24 rounded-lg">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-tsk-primary-dark">Welcome Back!</h1>
        </div>

        {/* Google Sign In Button */}
        <div className="w-full">
          <button
            type="button"
            className="flex w-full justify-center items-center bg-foreground py-3 px-4 border-2 border-tsk-primary-dark rounded-xl shadow-sm text-md font-semibold text-tsk-primary-dark hover:bg-gray-50"
          >
            <Image src={GoogleLogo} alt="Google logo" width={20} height={20} className="mr-2" />
            Sign In With Google
          </button>
        </div>

        {/* Divider */}
        <div className="relative flex items-center justify-center">
          <div className="px-3 bg-tsk-light-2 text-tsk-primary-dark font-semibold text-md">
            Or Sign In With Email
          </div>
        </div>

        {/* Login Form */}
        <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
          {loginError && (
            <div className="bg-red-50 text-red-600 p-3 rounded-xl text-md">{loginError}</div>
          )}

          <div>
            <label htmlFor="email" className="block text-md font-semibold text-tsk-primary-dark">
              Email or username
            </label>
            <div className="mt-1 relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Image src={Person} alt="Person icon" width={20} height={20} className="mr-2" />
              </div>
              <input
                id="email"
                type="text"
                autoComplete="email"
                placeholder="Enter your email or username"
                className={`pl-10 w-full py-2 px-3 border ${errors.email ? 'border-red-300' : 'border-tsk-primary-dark'} rounded-xl focus:outline-none focus:ring-tsk-primary focus:border-tsk-primary-dark`}
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
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <div className="mt-1 relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Image src={Padlock} alt="Padlock icon" width="20" height="20" className="mr-2" />
              </div>
              <input
                id="password"
                type={showPassword ? 'text' : 'password'}
                autoComplete="current-password"
                placeholder="Enter your password"
                className={`pl-10 w-full py-2 px-3 border ${errors.password ? 'border-red-300' : 'border-tsk-primary-dark'} rounded-xl focus:outline-none focus:ring-tsk-primary focus:border-tsk-primary`}
                {...register('password', {
                  required: 'Password is required',
                  minLength: { value: 6, message: 'Password must be at least 6 characters' },
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
            {errors.password && (
              <p className="mt-1 text-sm text-red-600">{errors.password.message}</p>
            )}
          </div>

          <div className="flex items-center justify-center">
            <Button type="submit" variant="primary" className="w-full" disabled={isLoading}>
              {isLoading ? 'Signing in...' : 'Sign In'}
            </Button>
          </div>
        </form>

        <div className="text-center mt-4">
          <Link href="/forgot-password" className="text-sm text-tsk-primary-dark hover:underline">
            I forgot my password
          </Link>
        </div>

        <div className="text-center mt-4">
          <p className="text-sm text-tsk-primary-dark">
            Don&apos;t have an account?{' '}
            <Link href="/signup" className="text-tsk-primary-dark font-medium hover:underline">
              Create account
            </Link>
          </p>
        </div>
      </div>
    </main>
  );
}
