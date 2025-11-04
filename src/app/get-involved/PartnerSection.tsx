import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

function PartnerSection() {
  return (
    <section className="w-full py-24 px-10 md:px-28 grid grid-cols-1 md:grid-cols-2 md:auto-rows-min gap-16">
      <h1 className="text-center md:text-left font-heading font-bold md:font-black text-3xl md:text-5xl leading-[150%] text-tsk-primary-dark md:col-start-2 md:row-start-1">
        Partner With Us!
      </h1>

      <div className="relative w-full h-[300px] md:h-[450px] lg:h-[350px] rounded-3xl overflow-hidden md:col-start-1 md:row-start-1 md:row-span-3">
        <Image
          src="/get-involved/partner-img.png"
          alt="Partner With Us Image"
          fill
          className="object-cover"
          priority
        />
      </div>

      <p className="text-center md:text-left font-body font-medium text-base md:text-xl leading-[150%] text-tsk-primary-dark mt-8 md:mt-6 md:col-start-2 md:row-start-2">
        Looking to collaborate through programs, mentorships, speaker exchanges, or joint
        initiatives? We welcome aligned partners who want to grow with us
      </p>

      <Link
        href="/get-involved/partner-with-us"
        className="self-end justify-self-center md:justify-self-start w-full md:w-fit text-center md:text-left bg-tsk-primary-dark text-white font-heading px-6 py-3 rounded-2xl font-bold text-xl leading-[150%] hover:opacity-90 transition md:col-start-2 md:row-start-3"
      >
        Propose a Partnership
      </Link>
    </section>
  );
}

export default PartnerSection;
