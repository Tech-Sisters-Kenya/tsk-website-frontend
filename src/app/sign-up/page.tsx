'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import Button from '@/components/Button';

import GoogleLogo from '@/assets/devicon_google.svg';
import Email from '@/assets/email-icon.svg';
import Padlock from '@/assets/padlock-icon.svg';
import EyeOpen from '@/assets/eye-open-icon.svg';
import EyeClosed from '@/assets/eye-closed-icon.svg';

interface SignupFormValues {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

export default function SignupPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [signupError, setSignupError] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignupFormValues>();

  const onSubmit = async (data: SignupFormValues) => {
    setIsLoading(true);
    setSignupError('');

    try {
      // Here you would connect to your Laravel backend
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          first_name: data.firstName,
          last_name: data.lastName,
          email: data.email,
          password: data.password,
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || 'Failed to create account');
      }

      // Redirect to dashboard or login page after successful signup
      router.push('/login');
    } catch (error) {
      setSignupError(
        error instanceof Error ? error.message : 'Registration failed. Please try again.'
      );
    } finally {
      setIsLoading(false);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full md:max-w-4xl space-y-8 bg-[#F8EBFC] bg-opacity-40 py-8 px-24 rounded-lg">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-tsk-primary-dark">Create New Account!</h1>
        </div>

        {/* Google Sign Up Button */}
        <div className="w-full">
          <button
            type="button"
            className="flex w-full justify-center items-center bg-foreground py-3 px-4 border-2 border-tsk-primary-dark rounded-xl shadow-sm text-md font-semibold text-tsk-primary-dark hover:bg-gray-50"
          >
            <Image src={GoogleLogo} alt="Google logo" width={20} height={20} className="mr-2" />
            Sign Up With Google
          </button>
        </div>

        {/* Already have an account */}
        <div className="text-center">
          <p className="text-sm text-tsk-primary-dark">
            Already have an account?{' '}
            <Link href="/login" className="text-tsk-primary-dark font-medium hover:underline">
              Log In
            </Link>
          </p>
        </div>

        {/* Divider */}
        <div className="relative flex items-center justify-center">
          <div className="px-3 bg-tsk-light-2 text-tsk-primary-dark font-semibold text-md">
            Or Sign In With Email
          </div>
        </div>

        {/* Signup Form */}
        <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
          {signupError && (
            <div className="bg-red-50 text-red-600 p-3 rounded-md text-sm">{signupError}</div>
          )}

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label
                htmlFor="firstName"
                className="block text-tsk-primary-dark font-semibold text-md"
              >
                First Name
              </label>
              <div className="mt-1">
                <input
                  id="firstName"
                  type="text"
                  placeholder="Enter your first name"
                  className={`w-full py-4 px-3 border placeholder:text-[#45084A] placeholder:text-opacity-49 ${errors.firstName ? 'border-red-300' : 'border-tsk-primary-dark'} rounded-xl focus:outline-none focus:ring-tsk-primary focus:border-tsk-primary`}
                  {...register('firstName', { required: 'First name is required' })}
                />
              </div>
              {errors.firstName && (
                <p className="mt-1 text-sm text-red-600">{errors.firstName.message}</p>
              )}
            </div>

            <div>
              <label
                htmlFor="lastName"
                className="block text-tsk-primary-dark font-semibold text-md"
              >
                Last Name
              </label>
              <div className="mt-1">
                <input
                  id="lastName"
                  type="text"
                  placeholder="Enter your last name"
                  className={`w-full py-4 px-3 border placeholder:text-[#45084A] placeholder:text-opacity-49 ${errors.lastName ? 'border-red-300' : 'border-tsk-primary-dark'} rounded-xl focus:outline-none focus:ring-tsk-primary focus:border-tsk-primary`}
                  {...register('lastName', { required: 'Last name is required' })}
                />
              </div>
              {errors.lastName && (
                <p className="mt-1 text-sm text-red-600">{errors.lastName.message}</p>
              )}
            </div>
          </div>

          <div>
            <label htmlFor="email" className="block text-tsk-primary-dark font-semibold text-md">
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
                className={`pl-10 w-full py-4 px-3 border placeholder:text-[#45084A] placeholder:text-opacity-49 ${errors.email ? 'border-red-300' : 'border-tsk-primary-dark'} rounded-xl focus:outline-none focus:ring-tsk-primary focus:border-tsk-primary`}
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
            <label htmlFor="password" className="block text-tsk-primary-dark font-semibold text-md">
              Password
            </label>
            <div className="mt-1 relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Image src={Padlock} alt="Padlock icon" width="20" height="20" className="mr-2" />
              </div>
              <input
                id="password"
                type={showPassword ? 'text' : 'password'}
                autoComplete="new-password"
                placeholder="Enter your password"
                className={`pl-10 w-full py-4 px-3 border placeholder:text-[#45084A] placeholder:text-opacity-49 ${errors.password ? 'border-red-300' : 'border-tsk-primary-dark'} rounded-xl focus:outline-none focus:ring-tsk-primary focus:border-tsk-primary`}
                {...register('password', {
                  required: 'Password is required',
                  minLength: { value: 8, message: 'Password must be at least 8 characters' },
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

          <div className="flex items-center">
            <label htmlFor="accept-terms" className="ml-2 block text-tsk-primary-dark text-md">
              By continuing, you accept our{' '}
              <Link href="/terms" className="text-[#DA4BDA] underline">
                Terms and Conditions
              </Link>{' '}
              and the{' '}
              <Link href="/privacy" className="text-[#DA4BDA] underline">
                Privacy Policy
              </Link>
            </label>
          </div>

          <div className="flex items-center justify-center py-4">
            <Button type="submit" variant="primary" className="w-full py-4" disabled={isLoading}>
              {isLoading ? 'Creating account...' : 'Sign Up'}
            </Button>
          </div>
        </form>
      </div>
    </main>
  );
}
