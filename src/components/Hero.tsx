import Image from 'next/image';
import Logo from '@/assets/header.svg';
import React from 'react';
import Button from './Button';

export default function Hero() {
  return (
    <section className="w-full max-w-[1200px] mx-auto px-5 sm:px-6 lg:px-8 pt-6 sm:pt-10 lg:pt-2">
      <div className=" grid grid-cols-1 lg:grid-cols-2 items-center gap-10 md:gap-12 lg:gap-16">
        <div className="flex flex-col gap-6 sm:gap-8">
          <h1 className="text-4xl font-bold font-heading sm:text-5xl xl:text-6xl text-tsk-primary-dark">
            Elevating <br />
            Women In
            <br /> Technology
          </h1>
          <p className="text-base font-bold font-body sm:text-lg max-w-[600px] text-tsk-primary-dark md:text-xl  py-2 sm:py-3">
            Tech Sisters Kenya is a non-profit organization empowering women in tech through
            mentorship, workshops, and networking opportunities to elevate their skills and support
            their professional growth through community initiatives.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 sm:gap-6">
            <Button variant="primary" className="text-foreground font-bold">
              Join Our Community
            </Button>
            <Button variant="secondary" className="bg-foreground font-bold text-tsk-primary-dark">
              Partner With Us
            </Button>
          </div>
        </div>
        <div className="relative w-full h-[250px] sm:h[350px] md:h-[450px] lg:h-[500px]">
          <Image
            src={Logo}
            alt="header"
            width={500}
            height={400}
            className="rounded-lg object-contain"
          />
        </div>
      </div>
    </section>
  );
}
