import { useState } from 'react';
import { X } from 'lucide-react';
import Button from '@/components/Button';
import Image from 'next/image';
import logo from '@/assets/tsk-icon-logo.svg';
import userIcon from '@/assets/user.svg';
import emailIcon from '@/assets/useremail.svg';
import EmailVerificationModal from './EmailVerificationModal';
import Link from 'next/link';
import React from 'react';

interface EmailSignUpModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function EmailSignupModal({ isOpen, onClose }: EmailSignUpModalProps) {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [showEmailVerification, setShowEmailVerification] = useState(false);

  const handleSubmit = () => {
    if (!fullName.trim() || !email.trim()) {
      alert('Please fill in all fields');
      return;
    }
    if (!email.includes('@')) {
      alert('Please enter a valid email');
      return;
    }
    console.log('Account created:', { fullName, email });

    setShowEmailVerification(true);
  };
  if (showEmailVerification) {
    return (
      <EmailVerificationModal
        fullName={fullName}
        email={email}
        isOpen={showEmailVerification}
        onClose={() => setShowEmailVerification(false)}
        onChangeEmail={() => setShowEmailVerification(false)}
      />
    );
  }

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-foreground rounded-2xl shadow-2xl max-w-md w-full relative p-10">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 flex items-center gap-2 text-tsk-primary-dark hover:text-tsk-primary-dark transition"
        >
          <span className="p-1 border border-tsk-primary-dark rounded-full flex items-center justify-center">
            <X size={16} />
          </span>
          <span className="font-semibold text-tsk-primary-dark">Close</span>
        </button>

        {/* Logo */}
        <div className="flex justify-center mb-4 mt-6">
          <div className="w-12 h-12 rounded-full flex items-center justify-center">
            <Image src={logo} alt="Logo" width={64} height={64} className="object-contain" />
          </div>
        </div>

        {/* Title */}
        <h2 className="text-2xl font-semibold font-heading text-center mb-2">Sign up with Email</h2>

        {/* User input */}
        <div className="mb-2">
          <label className="block text-sm font-body font-semibold text-tsk-primary-dark">
            Full Name
          </label>
          <div className="relative">
            <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-tsk-primary-dark">
              <Image
                src={userIcon}
                alt="User Icon"
                width={24}
                height={24}
                className="object-contain"
              />
            </div>
            <input
              type="text"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              placeholder="Enter your full name"
              className="w-full text-tsk-primary-dark pl-10 pr-2 py-2 border border-tsk-primary-dark rounded-xl focus:ring-2 focus:ring-tsk-primary-dark focus:border-transparent outline-none placeholder-tsk-light-1 transition-all"
            />
          </div>
        </div>

        <div className="mb-6">
          <label className="block text-sm font-body font-semibold text-tsk-primary-dark">
            Email
          </label>
          <div className="relative">
            <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-tsk-primary-dark">
              <Image
                src={emailIcon}
                alt="Email Icon"
                width={24}
                height={24}
                className="object-contain"
              />
            </div>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="w-full text-tsk-primary-dark pl-10 pr-2 py-2 border border-tsk-primary-dark rounded-xl focus:ring-2 focus:ring-tsk-primary-dark focus:border-transparent outline-none placeholder-tsk-light-1 transition-all"
            />
          </div>
        </div>
        {/* Create Account Button */}
        <Button
          onClick={handleSubmit}
          className="w-full bg-tsk-primary-dark text-foreground font-semibold mb-6"
        >
          Create Account
        </Button>
        {/* Footer */}
        <p className="text-center text-tsk-primary-dark font-body text-sm mb-2">
          Already have an account?{' '}
          <Link href="/login" className="text-tsk-primary-dark underline font-bold">
            Log in
          </Link>
        </p>

        <p className="text-xs text-tsk-primary-dark text-center leading-relaxed">
          By continuing, you accept our{' '}
          <button
            onClick={() => alert('Terms and Conditions')}
            className="text-tsk-primary-dark underline"
          >
            Terms and Conditions
          </button>{' '}
          and{' '}
          <button
            onClick={() => alert('Privacy Policy')}
            className="text-tsk-primary-dark underline"
          >
            Privacy Policy
          </button>
        </p>
      </div>
    </div>
  );
}
