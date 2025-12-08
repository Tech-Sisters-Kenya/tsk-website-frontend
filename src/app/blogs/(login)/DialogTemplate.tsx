'use client';

import React from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import Image from 'next/image';
import Link from 'next/link';
import { CircleX } from 'lucide-react';

type DialogTemplateProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  children: React.ReactNode;
};

function DialogTemplate({ title, children, open, onOpenChange }: DialogTemplateProps) {
  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Overlay className="bg-black/25 fixed -inset-0 z-50 animate-overlayShow" />
        <Dialog.Content className="bg-white rounded-xl shadow-lg fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90vw] max-w-2xl pt-24 px-6 pb-10 z-50 focus:outline-none animate-contentShow">
          {/* title */}
          <Dialog.Title className="flex flex-col items-center">
            <Image src="/tsk-icon.svg" alt="TSK logo" width={70} height={70} />
            <span className="text-tsk-primary-dark font-semibold font-heading text-3xl mt-2 leading-[150%]">
              {title}
            </span>
          </Dialog.Title>

          {/* content */}
          <div className="flex flex-col items-center">{children}</div>

          {/* footer */}
          <div className="mt-8 flex flex-col items-center gap-4">
            <p className="font-medium font-body text-tsk-primary-dark">
              Don&apos;t have an account?{' '}
              <Link href={'/sign-up'} className="font-extrabold underline">
                Sign Up
              </Link>
            </p>
            <p className="font-medium font-body text-tsk-primary-dark text-sm text-center">
              By continuing, you accept our{' '}
              <Link href="/terms-and-conditions" className="text-[#70169E] underline font-medium">
                Terms and Conditions
              </Link>{' '}
              and the{' '}
              <Link href="/privacy-policy" className="text-[#70169E] underline font-medium">
                Privacy Policy
              </Link>
            </p>
          </div>

          {/* close button */}
          <Dialog.Close asChild>
            <button
              className="flex gap-2 items-center text-tsk-primary-dark font-semibold absolute top-10 right-10"
              aria-label="Close"
            >
              <CircleX /> <span>Close</span>
            </button>
          </Dialog.Close>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}

export default DialogTemplate;
