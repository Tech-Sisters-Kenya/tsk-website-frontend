'use client';

import React from 'react';
import Link from 'next/link';

const JoinUsOptions = () => {
  return (
    <div className=" py-8 px-2 my-10 lg:mt-20 w-full text-center text-tsk-primary-dark grid grid-cols-1 lg:grid-cols-3 gap-8 md:mx-auto lg:gap-0">
      {/* Contact Us */}
      <div className="flex flex-col gap-6 lg:gap-8 lg:border-r lg:border-tsk-primary-dark lg:pr-10">
        <p className="font-extrabold text-2xl md:text-[32px]">Contact Us</p>
        <p className="font-semibold text-[16px] md:text-[19px]">
          Have a question or need support? We’re here to help
        </p>
        <Link href="/contact">
          <p className="font-semibold text-[16px] md:text-[19px] underline cursor-pointer md:mt-8">
            Contact Us
          </p>
        </Link>
      </div>
      <hr className="border-t-1 border-tsk-primary-dark md:w-4/5 md:mx-auto lg:hidden"></hr>{' '}
      {/* Partner With Us */}
      <div className="flex flex-col gap-6 lg:gap-8 lg:border-r lg:border-tsk-primary-dark lg:pr-10 lg:pl-10">
        <p className="font-extrabold text-2xl md:text-[32px]">Partner With Us</p>
        <p className="font-semibold text-[16px] md:text-[19px]">
          Interested in co-creating or building together? <br /> Let&apos;s discuss partnership
          opportunities.
        </p>
        <Link href="/get-involved/partner-with-us">
          <p className="font-semibold text-[16px] md:text-[19px] underline cursor-pointer">
            Partner With Us
          </p>
        </Link>
      </div>
      <hr className="border-t-1 border-tsk-primary-dark md:w-4/5 md:mx-auto lg:hidden"></hr>
      {/* Support Our Initiatives */}
      <div className="flex flex-col gap-6 lg:pl-10 lg:gap-8">
        <p className="font-extrabold text-2xl md:text-[32px]">Support Our Initiatives</p>
        <p className="font-semibold text-[16px] md:text-[19px]">
          Interested in supporting out initiatives. <br /> Get in touch to discuss potential
          partnerships.
        </p>
        <Link href="/get-involved/become-a-sponsor">
          <p className="font-semibold text-[16px] md:text-[19px] underline cursor-pointer">
            Sponsor Us
          </p>
        </Link>
      </div>
    </div>
  );
};
export default JoinUsOptions;
