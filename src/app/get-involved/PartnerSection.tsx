import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

function PartnerSection() {
  return (
    <section className="py-24 px-10 md:px-28 grid grid-cols-1 md:grid-cols-2 gap-8">
      <div>
        <h1 className="font-heading font-black text-5xl leading-[150%] text-tsk-primary-dark">
          Partner With Us!
        </h1>
        <p className="font-body font-medium text-xl leading-[150%] text-tsk-primary-dark mt-8">
          Looking to collaborate through programs, mentorships, speaker exchanges, or joint
          initiatives? We welcome aligned partners who want to grow with us.
        </p>
        <Link
          href="/"
          className="mt-16 inline-block bg-tsk-primary-dark text-white font-heading px-6 py-3 rounded-xl font-bold text-xl leading-[150%] hover:opacity-90 transition"
        >
          Propose a Partnership
        </Link>
      </div>

      <div className="flex">
        <div className="relative w-full max-w-md sm:max-w-2xl md:max-w-xl lg:max-w-2xl h-[300px] md:h-[500px] lg:h-[350px]">
          <Image
            src={'/get-involved/partner-img.png'}
            alt="Partner With Us Image"
            fill
            className="object-cover rounded-3xl"
          />
        </div>
      </div>
    </section>
  );
}

export default PartnerSection;
