'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import Button from '@/components/Button';

export default function ResetConfirmationPage() {
  const router = useRouter();

  return (
    <main className="flex flex-col items-center justify-center pt-40 pb-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full md:max-w-4xl space-y-6 bg-[#F8EBFC] bg-opacity-40 py-32 px-24 rounded-lg">
        <div className="text-center">
          <h2 className="text-xl font-medium text-tsk-primary-dark">
            The email was sent, please check your inbox (check your spam folder as well) and follow
            the instructions.
          </h2>
        </div>

        <div className="flex items-center justify-center py-4">
          <Button
            type="button"
            variant="primary"
            className="w-full py-4"
            onClick={() => router.push('/login')}
          >
            <span className="text-lg">Ok</span>
          </Button>
        </div>
      </div>
    </main>
  );
}
