import React from 'react';
import Link from 'next/link';

import GIHeroSection from '@/components/GIHeroSection';
import GICardSection from '@/components/GICardSection';

export default function GetInvolved() {
  return (
    <main className="flex min-h-screen flex-col items-center p-12">
      <GIHeroSection />

      <div className="w-full mt-12">
        <p className="ml-4 font-body">
          <span className="pr-4">&#62; Home</span>
          <span>&#62; Get Involved</span>
        </p>

        <div className="mt-8 ml-8 flex flex-col md:flex-row gap-4">
          <Link
            href=""
            className="border border-tsk-primary-dark px-4 py-2 rounded-full text-center"
          >
            Become a Tech Sister
          </Link>
          <Link
            href=""
            className="border border-tsk-primary-dark px-4 py-2 rounded-full text-center"
          >
            Partnership
          </Link>
          <Link
            href=""
            className="border border-tsk-primary-dark px-4 py-2 rounded-full text-center"
          >
            Volunteer
          </Link>
          <Link
            href=""
            className="border border-tsk-primary-dark px-4 py-2 rounded-full text-center"
          >
            Donate
          </Link>
        </div>
      </div>

      <GICardSection />
    </main>
  );
}
