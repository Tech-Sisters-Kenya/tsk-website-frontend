import { X } from 'lucide-react';
import Image from 'next/image';
import logo from '@/assets/tsk-icon-logo.svg';
import React, { useState } from 'react';
import EmailSignupModal from '@/components/EmailSignupModal';
interface SignUpModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function SignUpModal({ isOpen, onClose }: SignUpModalProps) {
  const [showEmailSignup, setShowEmailSignup] = useState(false);

  if (!isOpen) return null;

  return (
    <div
      data-testid="signup-modal"
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
    >
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-8 sm:p-10 md:p-14 lg:p-16 relative">
        {/* Close Button */}
        <button
          aria-label="Close"
          data-testid="close-button"
          onClick={onClose} // Changed from setIsOpen(false)
          className="absolute top-6 right-6 flex items-center gap-2 text-tsk-primary-dark hover:text-tsk-primary-dark transition"
        >
          <span className="p-1 border border-tsk-primary-dark rounded-full flex items-center justify-center">
            <X size={16} />
          </span>
          <span className="font-semibold text-tsk-primary-dark">Close</span>
        </button>

        {/* Logo */}
        <div className="flex justify-center mb-6 mt-6">
          <div className="w-12 h-12 rounded-full flex items-center justify-center">
            <Image
              src={logo}
              alt="Logo"
              width={64}
              height={64}
              className="object-contain"
              data-testid="logo"
            />
          </div>
        </div>

        {/* Heading */}
        <h2 className="text-xl font-heading font-semibold text-center text-tsk-primary-dark mb-6">
          Create Account to Join Conversation
        </h2>

        {/* Sign in with Google Button */}
        <button
          data-testid="google-button"
          onClick={() => {
            window.location.href = 'https://api.techsisterskenya.org/api/auth/google/redirect';
          }}
          className="w-full flex items-center justify-center gap-3 px-3 py-2 border-2 border-tsk-primary-dark rounded-lg mb-4 hover:bg-tsk-light-2 transition"
        >
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path
              d="M19.6 10.227c0-.709-.064-1.39-.182-2.045H10v3.868h5.382a4.6 4.6 0 01-1.996 3.018v2.51h3.232c1.891-1.742 2.982-4.305 2.982-7.35z"
              fill="#4285F4"
            />
            <path
              d="M10 20c2.7 0 4.964-.895 6.618-2.423l-3.232-2.509c-.895.6-2.04.955-3.386.955-2.605 0-4.81-1.76-5.595-4.123H1.064v2.59A9.996 9.996 0 0010 20z"
              fill="#34A853"
            />
            <path
              d="M4.405 11.9c-.2-.6-.314-1.24-.314-1.9 0-.66.114-1.3.314-1.9V5.51H1.064A9.996 9.996 0 000 10c0 1.614.386 3.14 1.064 4.49l3.34-2.59z"
              fill="#FBBC05"
            />
            <path
              d="M10 3.977c1.468 0 2.786.505 3.823 1.496l2.868-2.868C14.959.99 12.695 0 10 0 6.09 0 2.71 2.24 1.064 5.51l3.34 2.59C5.19 5.736 7.395 3.977 10 3.977z"
              fill="#EA4335"
            />
          </svg>
          <span className="text-sm text-tsk-primary-dark font-semibold font-body">
            Sign Up With Google
          </span>
        </button>

        {/* Sign in with Email Button */}
        <button
          data-testid="email-button"
          onClick={() => {
            setShowEmailSignup(true);
          }}
          className="w-full flex items-center justify-center gap-3 px-3 py-2 border-2 border-tsk-primary-dark rounded-lg hover:bg-tsk-light-2 transition"
        >
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path
              d="M18 4H2C1.44772 4 1 4.44772 1 5V15C1 15.5523 1.44772 16 2 16H18C18.5523 16 19 15.5523 19 15V5C19 4.44772 18.5523 4 18 4Z"
              stroke="#45084A"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M1 5L10 11L19 5"
              stroke="#45084A"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <span className="text-sm text-tsk-primary-dark font-body font-semibold">
            Sign Up With Email
          </span>
        </button>

        {/* Footer Text */}
        <p className="text-center font-body text-[10px] font-medium text-tsk-primary-dark mt-6">
          Already have an account?{' '}
          <a href="/login" className="text-tsk-primary-dark font-extrabold underline">
            Log In
          </a>
        </p>

        <p className="text-center text-[10px] text-tsk-primary-dark font-body mt-4">
          By continuing, you accept our{' '}
          <a href="/terms-and-conditions" className="text-tsk-secondary font-medium underline">
            Terms and Conditions
          </a>{' '}
          and{' '}
          <a href="/privacy-policy" className="text-tsk-secondary font-medium underline">
            the Privacy Policy
          </a>
        </p>
      </div>
      {showEmailSignup && (
        <EmailSignupModal isOpen={showEmailSignup} onClose={() => setShowEmailSignup(false)} />
      )}
    </div>
  );
}
