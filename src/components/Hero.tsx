import Image from 'next/image';
import Logo from '@/assets/header.svg';
import React from 'react';
import Button from './Button';

export default function Hero() {
  return (
    <section className="w-full max-w-[1200px] mx-auto sm:px-5 md:px-6 lg:px-8 pt-6 sm:pt-10 lg:pt-12">
      <div className=" grid grid-cols-1 lg:grid-cols-2 items-center gap-10 sm:gap-10 md:gap-12 lg:gap-16">
        <div className="flex flex-col gap-5 sm:gap-6 md:gap-8">
          <h1 className="text-3xl font-bold font-heading sm:text-4xl md:text-5xl xl:text-6xl text-tsk-primary-dark">
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
            <Button variant="primary" className="text-foreground font-heading font-bold">
              Join Our Community
            </Button>
            <Button
              variant="secondary"
              className="bg-foreground border font-bold font-heading text-tsk-primary-dark"
            >
              Partner With Us
            </Button>
          </div>
        </div>
        <div className="relative w-full h-[200px] sm:h[250px] md:h-[350px] lg:h-[450px] xl:h-[500px]">
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
