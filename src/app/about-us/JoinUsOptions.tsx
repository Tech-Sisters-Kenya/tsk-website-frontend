'use client';

import React from 'react';

const JoinUsOptions = () => {
  // TODO - add links to the respective contact, partnership and sponsorship pages
  return (
    <div className=" py-8 px-2 my-10 lg:mt-20 w-full text-center text-tsk-primary-dark grid grid-cols-1 lg:grid-cols-3 gap-8 md:w-4/5 lg:w-[90%] md:mx-auto lg:gap-2">
      {/* Contact Us */}
      <div className="flex flex-col gap-6 lg:gap-8 lg:border-r lg:border-tsk-primary-dark lg:pr-10">
        <p className="font-extrabold text-2xl md:text-[32px]">Contact Us</p>
        <p className="font-semibold text-[16px] md:text-[19px]">
          Have a question or need support? We’re here to help
        </p>
        <p className="font-semibold text-[16px] md:text-[19px] underline cursor-pointer">
          Contact Us
        </p>
      </div>
      <hr className="border-t-1 border-tsk-primary-dark md:w-4/5 md:mx-auto lg:hidden"></hr>{' '}
      {/* Partner With Us */}
      <div className="flex flex-col gap-6 lg:gap-8 lg:border-r lg:border-tsk-primary-dark lg:pr-10 lg:pl-10">
        <p className="font-extrabold text-2xl md:text-[32px]">Partner With Us</p>
        <p className="font-semibold text-[16px] md:text-[19px]">
          Interested in co-creating or building together? Let&apos;s discuss partnership
          opportunities.
        </p>
        <p className="font-semibold text-[16px] md:text-[19px] underline cursor-pointer">
          Partner With Us
        </p>
      </div>
      <hr className="border-t-1 border-tsk-primary-dark md:w-4/5 md:mx-auto lg:hidden"></hr>
      {/* Support Our Initiatives */}
      <div className="flex flex-col gap-6 lg:pl-10 lg:gap-8">
        <p className="font-extrabold text-2xl md:text-[32px]">Support Our Initiatives</p>
        <p className="font-semibold text-[16px] md:text-[19px]">
          Interested in supporting out initiatives. Get in touch to discuss potential partnerships.
        </p>
        <p className="font-semibold text-[16px] md:text-[19px] underline cursor-pointer">
          Sponsor Us
        </p>
      </div>
    </div>
  );
};
export default JoinUsOptions;
