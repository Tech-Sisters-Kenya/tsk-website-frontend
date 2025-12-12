import React from 'react';
import Image from 'next/image';
import { X } from 'lucide-react';
import logo from '@/assets/tsk-icon-logo.svg';

interface EmailVerificationModalProps {
  fullName: string;
  email: string;
  isOpen: boolean;
  onClose: () => void;
  onChangeEmail: () => void;
}
export default function EmailVerificationModal({
  isOpen,
  onClose,
  onChangeEmail,
}: EmailVerificationModalProps) {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-foreground rounded-2xl shadow-2xl w-full max-w-md px-12 py-10 relative">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 flex items-center gap-2 text-tsk-primary-dark hover:text-tsk-primary-dark transition"
        >
          <span className="p-1 border border-tsk-primary-dark rounded-full flex items-center justify-center">
            <X size={14} />
          </span>
          <span className="font-semibold text-tsk-primary-dark">Close</span>
        </button>

        {/* Logo */}
        <div className="flex justify-center mb-4 mt-6">
          <div className="w-12 h-12 rounded-full flex items-center justify-center">
            <Image src={logo} alt="Logo" width={64} height={64} className="object-contain" />
          </div>
        </div>

        {/* Heading */}
        <h2 className="text-2xl font-semibold font-heading text-center text-tsk-primary-dark mb-2">
          Almost there!
        </h2>

        {/* Message */}
        <p className="text-center text-tsk-primary-dark font-body font-medium text-[10px] leading-relaxed mb-8">
          We&apos;ve sent a verification link to your email address.
          <br />
          Please check your inbox (or spam folder) and click the link to activate your account.
        </p>

        {/* Buttons */}
        <div className="flex gap-4 justify-center">
          <button
            onClick={onChangeEmail}
            className="px-6 border border-tsk-primary-dark rounded-xl text-tsk-primary-dark text-[10px] font-medium hover:bg-tsk-light-1 transition"
          >
            Change email
          </button>

          <button
            onClick={() => console.log('Resend link')}
            className="px-6 py-2.5 bg-tsk-primary-dark text-foreground text-[10px] rounded-xl font-medium font-body hover:bg-tsk-light-2 hover:text-tsk-primary-dark transition"
          >
            Resend verification link
          </button>
        </div>
      </div>
    </div>
  );
}
