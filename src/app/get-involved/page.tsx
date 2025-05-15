import Donate from '@/app/get-involved/donate';
import Volunteer from '@/app/get-involved/volunteer';
import React from 'react';
import Link from 'next/link';

import GIHeroSection from '@/app/get-involved/GIHeroSection';
import GICardSection from '@/app/get-involved/GICardSection';
import GIPartnershipSection from '@/app/get-involved/GIPartnershipSection';

export default function GetInvolved() {
  return (
    <main className="flex flex-col justify-center">
      <GIHeroSection />

      <div className="w-full mt-8 px-12 text-tsk-primary-dark">
        <p className="ml-4 font-body">
          <span className="pr-4">&#62; Home</span>
          <span>&#62; Get Involved</span>
        </p>

        <div className="mt-5 ml-8 flex flex-col md:flex-row gap-4">
          <Link
            href="#become-a-tech-sister"
            className="border border-tsk-primary-dark px-4 py-2 rounded-full text-center"
          >
            Become a Tech Sister
          </Link>
          <Link
            href="#partnership"
            className="border border-tsk-primary-dark px-4 py-2 rounded-full text-center"
          >
            Partnership
          </Link>
          <Link
            href="#volunteer"
            className="border border-tsk-primary-dark px-4 py-2 rounded-full text-center"
          >
            Volunteer
          </Link>
          <Link
            href="#donate"
            className="border border-tsk-primary-dark px-4 py-2 rounded-full text-center"
          >
            Donate
          </Link>
        </div>
      </div>

      <div id="become-a-tech-sister" className="w-full">
        <GICardSection />
      </div>

      <div id="partnership" className="w-full">
        <GIPartnershipSection />
      </div>
      <div id="volunteer">
        <Volunteer />
      </div>
      <div id="donate">
        <Donate />
      </div>
    </main>
  );
}
