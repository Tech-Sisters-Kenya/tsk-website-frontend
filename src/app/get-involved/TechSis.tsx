import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

function TechSis() {
  return (
    <section className="py-20 px-10 md:px-28 grid grid-cols-1 md:grid-cols-2 md:auto-rows-min gap-16">
      <h1 className="text-center md:text-left font-heading font-bold md:font-black text-2xl md:text-5xl leading-[150%] text-tsk-primary-dark md:col-start-1 md:row-start-1">
        Become A Tech Sister!
      </h1>

      <div className="relative w-full h-[300px] md:h-[450px] lg:h-[350px] rounded-3xl overflow-hidden md:col-start-2 md:row-start-1 md:row-span-3">
        <Image
          src="/get-involved/techsis-img.png"
          alt="Become a Tech Sisters Image"
          fill
          className="object-cover"
          priority
        />
      </div>

      <p className="text-center md:text-left font-body font-medium text-base md:text-xl leading-[150%] text-tsk-primary-dark mt-8 md:mt-6 md:col-start-1 md:row-start-2">
        Tech Sisters Kenya is more than a community, it’s a movement of women learning, growing, and
        showing up for each other.
      </p>

      <Link
        href="/get-involved/partner-with-us"
        className="self-end justify-self-center md:justify-self-start w-full md:w-fit text-center md:text-left bg-tsk-primary-dark text-white font-heading px-6 py-3 rounded-2xl font-bold text-xl leading-[150%] hover:opacity-90 transition md:col-start-1 md:row-start-3"
      >
        Join Our Community
      </Link>
    </section>
  );
}

export default TechSis;
