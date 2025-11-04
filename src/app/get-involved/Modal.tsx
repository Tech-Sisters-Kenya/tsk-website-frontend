'use client';

import React, { useEffect } from 'react';
import {
  useFloating,
  FloatingPortal,
  useRole,
  useDismiss,
  useInteractions,
  offset,
  shift,
} from '@floating-ui/react';
import Button from '@/components/Button';
import Link from 'next/link';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function Modal({ isOpen, onClose }: ModalProps) {
  const { refs, context } = useFloating({
    open: isOpen,
    onOpenChange: (open) => !open && onClose(),
    middleware: [offset(0), shift()],
  });

  const { getFloatingProps } = useInteractions([
    useRole(context, { role: 'dialog' }),
    useDismiss(context, { outsidePress: true }),
  ]);

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <FloatingPortal>
      <div
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/25"
        onClick={(e) => {
          if (e.target === e.currentTarget) onClose();
        }}
      >
        <div
          ref={refs.setFloating}
          {...getFloatingProps({
            className: 'bg-white rounded-lg p-6 shadow-lg w-full max-w-xl ring-1 ring-black/5',
          })}
          style={{
            position: 'relative',
          }}
        >
          <h2 className="font-decorative text-6xl text-center">Thanks for reaching out!</h2>
          <div className="text-center text-tsk-primary-dark font-body mt-4">
            <p>
              Thank you for reaching out about a partnership. We&apos;ve received your message and
              will respond within 72 hours.
            </p>
            <p className="mt-4">
              We&apos;re looking forward to exploring ways we can work together.
            </p>
          </div>
          <Link href="/" className="flex items-center justify-center">
            <Button
              onClick={onClose}
              aria-label="Close modal"
              className="p-1 rounded-lg text-white hover:bg-gray-100 focus:outline-none mt-4 "
            >
              Return to HomePage
            </Button>
          </Link>
        </div>
      </div>
    </FloatingPortal>
  );
}
