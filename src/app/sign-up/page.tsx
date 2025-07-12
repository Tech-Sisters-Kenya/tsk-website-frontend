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
import { User } from '@/lib/auth';

interface SignupFormValues {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

interface SignupResponse {
  token?: string;
  user?: User;
  message?: string;
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
      const response = await fetch('https://api.techsisterskenya.org/api/auth/register', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          first_name: data.firstName,
          last_name: data.lastName,
          name: `${data.firstName} ${data.lastName}`, // Some APIs expect a full name field
          email: data.email,
          password: data.password,
          password_confirmation: data.password, // Laravel often requires password confirmation
        }),
      });

      if (!response.ok) {
        if (response.status === 422) {
          const errorData = await response.json();
          // Handle validation errors
          if (errorData.errors) {
            const errorMessages = Object.values(errorData.errors).flat();
            throw new Error(errorMessages.join(', '));
          } else {
            throw new Error(errorData.message || 'Validation failed. Please check your input.');
          }
        } else if (response.status === 409) {
          throw new Error('An account with this email already exists.');
        } else {
          throw new Error('Registration failed. Please try again.');
        }
      }

      const result: SignupResponse = await response.json();

      // If the API returns a token immediately after registration
      if (result.token) {
        localStorage.setItem('auth_token', result.token);
        if (result.user) {
          localStorage.setItem('user_info', JSON.stringify(result.user));
        }
        // Redirect to dashboard
        router.push('/dashboard');
      } else {
        // If no token is returned, redirect to login page
        router.push('/login?message=Registration successful! Please log in.');
      }
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
    <main className="flex min-h-screen flex-col items-center justify-center pt-40 pb-12 px-4 sm:px-6 lg:px-8">
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
          <p className="text-lg font-medium text-tsk-primary-dark">
            Already have an account?{' '}
            <Link href="/login" className="text-tsk-primary-dark font-bold hover:underline">
              Log In
            </Link>
          </p>
        </div>

        {/* Divider */}
        <div className="relative flex items-center justify-center">
          <div className="px-3 text-tsk-primary-dark font-semibold text-md">Sign Up With Email</div>
        </div>

        {/* Signup Form */}
        <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
          {signupError && (
            <div className="bg-red-50 text-red-600 p-3 rounded-xl text-sm">{signupError}</div>
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
                  className={`w-full py-4 px-3 border placeholder:text-[#45084A]/50 ${errors.firstName ? 'border-red-300' : 'border-[#45084A]/50'} rounded-xl focus:outline-none focus:ring-tsk-primary focus:border-tsk-primary`}
                  {...register('firstName', {
                    required: 'First name is required',
                    minLength: { value: 2, message: 'First name must be at least 2 characters' },
                    maxLength: { value: 50, message: 'First name must be less than 50 characters' },
                  })}
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
                  className={`w-full py-4 px-3 border placeholder:text-[#45084A]/50 ${errors.lastName ? 'border-red-300' : 'border-[#45084A]/50'} rounded-xl focus:outline-none focus:ring-tsk-primary focus:border-tsk-primary`}
                  {...register('lastName', {
                    required: 'Last name is required',
                    minLength: { value: 2, message: 'Last name must be at least 2 characters' },
                    maxLength: { value: 50, message: 'Last name must be less than 50 characters' },
                  })}
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
                className={`pl-10 w-full py-4 px-3 border placeholder:text-[#45084A]/50 ${errors.email ? 'border-red-300' : 'border-[#45084A]/50'} rounded-xl focus:outline-none focus:ring-tsk-primary focus:border-tsk-primary`}
                {...register('email', {
                  required: 'Email is required',
                  pattern: {
                    value: /\S+@\S+\.\S+/,
                    message: 'Please enter a valid email address',
                  },
                  maxLength: {
                    value: 255,
                    message: 'Email must be less than 255 characters',
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
                className={`pl-10 w-full py-4 px-3 border placeholder:text-[#45084A]/50 ${errors.password ? 'border-red-300' : 'border-[#45084A]/50'} rounded-xl focus:outline-none focus:ring-tsk-primary focus:border-tsk-primary`}
                {...register('password', {
                  required: 'Password is required',
                  minLength: { value: 8, message: 'Password must be at least 8 characters' },
                  pattern: {
                    value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
                    message:
                      'Password must contain at least one uppercase letter, one lowercase letter, and one number',
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
            {errors.password && (
              <p className="mt-1 text-sm text-red-600">{errors.password.message}</p>
            )}
          </div>

          <div className="flex items-center justify-center py-4">
            <label htmlFor="accept-terms" className="block text-tsk-primary-dark text-base">
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
              <span className="text-lg">{isLoading ? 'Creating Account...' : 'Sign Up'}</span>
            </Button>
          </div>
        </form>
      </div>
    </main>
  );
}
