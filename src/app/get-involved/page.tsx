import Donate from '@/components/donate';
import Volunteer from '@/components/volunteer';
import React from 'react';
import Link from 'next/link';

import GIHeroSection from '@/components/GIHeroSection';
import GICardSection from '@/components/GICardSection';
import GIPartnershipSection from '@/components/GIPartnershipSection';
import Navbar from '@/components/Navbar';
import CallToAction from '@/components/CallToAction';
import Footer from '@/components/Footer';

export default function GetInvolved() {
  return (
    <main className="flex flex-col justify-center">
      <Navbar />
      <GIHeroSection />

      <div className="w-full px-12 text-tsk-primary-dark">
        <p className="ml-4 font-body">
          <span className="pr-4">&#62; Home</span>
          <span>&#62; Get Involved</span>
        </p>

        <div className="mt-8 ml-8 flex flex-col md:flex-row gap-4">
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

      <div id="become-a-tech-sister">
        <GICardSection />
      </div>

      <div id="partnership">
        <GIPartnershipSection />
      </div>
      <div id="volunteer">
        <Volunteer />
      </div>
      <div id="donate">
        <Donate />
      </div>

      <CallToAction />
      <Footer />
    </main>
  );
}
