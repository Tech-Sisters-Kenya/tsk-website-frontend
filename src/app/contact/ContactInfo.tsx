import Image from 'next/image';
import React from 'react';
import email from '@/../public/email.svg';
import call from '@/../public/call.svg';
import instagram from '@/../public/instagram.svg';
import x from '@/../public/x.svg';
import linkedin from '@/../public/linkedin.svg';
import tiktok from '@/../public/tiktok.svg';

const ContactInfo = () => {
  return (
    <div className="w-full flex flex-col gap-4">
      <h1 className="font-semibold text-xl font-body">Contact Information</h1>
      <div className="flex flex-col sm:gap-10 gap-6">
        {/* Email address */}
        <div className="flex items-center gap-4">
          <div className="bg-tsk-primary-dark sm:p-4 p-2 rounded-full">
            <Image src={email} alt="email icon" />
          </div>
          <div>
            <p className="font-body font-semibold sm:text-xl text-lg">Email Address</p>
            <p className="font-body font-medium sm:text-[16px] text-sm underline">
              techsisterskenya@gmail.com
            </p>
          </div>
        </div>
        {/* Phone Number */}
        <div className="flex items-center gap-4">
          <div className="bg-tsk-primary-dark sm:p-4 p-2 rounded-full">
            <Image src={call} alt="phone icon" />
          </div>
          <div>
            <p className="font-body font-semibold sm:text-xl text-lg">Phone Number</p>
            <p className="font-body font-medium sm:text-[16px] text-sm">+25470888799</p>
          </div>
        </div>
      </div>
      {/* Connect With Us */}
      <div className="flex justify-center pl-8 flex-col gap-2 sm:mt-6 mt-4">
        <h1 className="font-body font-semibold text-xl">Connect With Us</h1>
        <div className="flex gap-4">
          <Image src={instagram} alt="instagram icon" />
          <Image src={x} alt="x icon" />
          <Image src={linkedin} alt="linkedin icon" />
          <Image src={tiktok} alt="tiktok icon" className="" />
        </div>
      </div>
    </div>
  );
};

export default ContactInfo;
