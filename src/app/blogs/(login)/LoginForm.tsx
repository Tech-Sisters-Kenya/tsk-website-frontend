'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { useForm } from 'react-hook-form';
import Link from 'next/link';

import EyeOpen from '@/assets/eye-open-icon.svg';
import EyeClosed from '@/assets/eye-closed-icon.svg';
import Padlock from '@/assets/password.svg';
import Button from '@/components/Button';
import { useAuthStore } from '@/stores/useAuthStore';

type LoginFormValues = {
  email: string;
  password: string;
};

function LoginForm() {
  const router = useRouter();
  const [loginError, setLoginError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { setAuthData } = useAuthStore();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<LoginFormValues>();

  async function onSubmit(data: LoginFormValues) {
    setIsLoading(true);
    setLoginError('');

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          email: data.email.trim(),
          password: data.password,
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        if (response.status === 401) {
          throw new Error('Invalid email or password');
        }

        if (response.status === 422 && result.errors) {
          // Handle validation errors
          Object.entries(result.errors).forEach(([field, messages]) => {
            setError(field as keyof LoginFormValues, {
              type: 'manual',
              message: Array.isArray(messages) ? messages[0] : String(messages),
            });
          });
          return;
        }

        throw new Error(result.message || 'Login failed. Please try again.');
      }

      if (result.token && result.user) {
        setAuthData(result.token, {
          id: result.user.id,
          name: result.user.name,
          email: result.user.email,
          role: result.role,
          profilePhoto: result.user.profile_photo_url,
          emailVerified: !!result.user.email_verified_at,
        });

        // Store token in localStorage
        localStorage.setItem('authToken', result.token);

        // Redirect to dashboard or home page after successful login
        router.push('/');
      } else {
        throw new Error('Invalid response from server');
      }
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : 'Login failed. Please try again.';
      setLoginError(errorMessage);
      console.error('Login error:', error);
    } finally {
      setIsLoading(false);
    }
  }

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  return (
    <form className="space-y-6 mt-6 w-full max-w-lg" onSubmit={handleSubmit(onSubmit)}>
      {loginError && (
        <span className="bg-red-50 text-red-600 p-3 rounded-xl text-md">{loginError}</span>
      )}
      <div>
        <label htmlFor="email" className="block text-md font-semibold text-tsk-primary-dark">
          Email
        </label>
        <div className="mt-1 relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Image
              src={'/formkit_email.svg'}
              alt="Email icon"
              width={20}
              height={20}
              className="mr-2"
            />
          </div>
          <input
            id="email"
            type="email"
            autoComplete="email"
            placeholder="Enter your email"
            className={`pl-10 w-full py-4 px-3 border text-tsk-primary-dark font-medium placeholder:text-[#45084A]/50 ${errors.email ? 'border-red-300' : 'border-[#45084A]/50'} rounded-xl focus:outline-none focus:ring-tsk-primary focus:border-tsk-primary-dark`}
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
        <label htmlFor="password" className="block text-md font-semibold text-tsk-primary-dark">
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
            className={`pl-10 w-full py-4 px-3 border placeholder:text-[#45084A]/50 ${errors.password ? 'border-red-300' : 'border-[#45084A]/50'} rounded-xl focus:outline-none focus:ring-tsk-primary focus:border-tsk-primary`}
            {...register('password', {
              required: 'Password is required',
              minLength: {
                value: 8,
                message: 'Password must be at least 8 characters',
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
        {errors.password && <p className="mt-1 text-sm text-red-600">{errors.password.message}</p>}
      </div>

      <div className="text-right mt-4">
        <Link
          href="/forgot-password"
          className="font-medium text-lg text-tsk-primary-dark underline"
        >
          Forgot password?
        </Link>
      </div>

      <div className="flex items-center justify-center">
        <Button type="submit" variant="primary" className="w-full py-4" disabled={isLoading}>
          <span className="text-lg">{isLoading ? 'Signing in...' : 'Log In'}</span>
        </Button>
      </div>
    </form>
  );
}

export default LoginForm;
