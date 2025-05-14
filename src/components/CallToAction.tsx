'use client';
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

import Button from './Button';
import Logo from '@/assets/tsk-icon-only-logo.svg';
import CTAImage from '@/assets/call-to-action.svg';

const CallToAction = () => {
  const ctaStyles = {
    backgroundColor: 'var(--tsk-primary-dark)',
    color: 'var(--tsk-light-1)',
  };

  return (
    <div className="w-full py-8 px-4 md:py-12 md:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto overflow-hidden rounded-3xl shadow-lg relative">
        {/* Background image */}
        <div className="w-full">
          <Image
            src={CTAImage}
            alt="Tech Sisters Kenya Community"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Purple section */}
        <div
          className="md:absolute md:top-1/2 md:right-0 md:transform md:-translate-y-1/2 w-full md:w-2/5 py-8 px-16 mr-10 rounded-3xl"
          style={ctaStyles}
        >
          <div className="mb-6 flex justify-center">
            <Image src={Logo} alt="Tech Sisters Kenya Logo" width={80} height={40} />
          </div>

          <p className="text-base mb-6 text-center">There&apos;s a space for you here.</p>

          <p className="text-base mb-6 text-center">
            Tech Sisters is more than a community — it&apos;s a movement of women learning, growing,
            and showing up for each other in tech.
          </p>

          <p className="text-base mb-10 text-center">
            Whether you&apos;re just starting out, switching careers, or already in tech — you
            belong here.
          </p>

          <div className="flex justify-center">
            <Link href="/get-involved">
              <Button variant="secondary">
                <span className="font-extrabold">Join Our Community</span>
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CallToAction;
