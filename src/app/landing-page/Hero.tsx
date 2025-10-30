'use client';
import React from 'react';
import Button from '../../components/Button';
import AnimatedShapes from './AnimatedShapes';
import Link from 'next/link';

export default function Hero() {
  return (
    <section
      id="hero"
      className="w-full max-w-[1400px] mx-auto mt-40 py-1 sm:py-3 md:py-4 md:px-20"
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 items-center justify-center gap-16 sm:gap-18 md:gap-20 lg:gap-22 xl:gap-24">
        <div className="flex flex-col gap-6 sm:gap-8 justify-center mb-14">
          <h1 className="text-5xl font-bold font-heading sm:text-6xl md:text-7xl xl:text-8xl text-tsk-primary-dark  leading-tight">
            Elevating <br />
            Women In <br />
            Technology
          </h1>
          <p className="text-base font-bold font-body sm:text-lg max-w-[600px] text-tsk-primary-dark md:text-xl py-2 sm:py-3 leading-relaxed">
            Tech Sisters Kenya is a community empowering women in tech through mentorship,
            workshops, and networking opportunities to elevate their skills and support their
            professional growth through community initiatives.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 sm:gap-6">
            <Link href="/join-our-community" className="w-full sm:w-auto sm:flex sm:flex-col">
              <Button
                variant="primary"
                className="text-foreground font-extrabold text-lg sm:text-xl w-full sm:w-auto py-5"
              >
                Become A Tech Sister!
              </Button>
            </Link>
            <Link href="/get-involved" className="w-full sm:w-auto sm:flex sm:flex-col">
              <Button
                variant="secondary"
                className="bg-foreground border border-tsk-primary-dark font-extrabold text-tsk-primary-dark text-lg sm:text-xl w-full sm:w-auto py-5 px-4 sm:px-8 md:px-10 lg:px-12"
              >
                Get Involved
              </Button>
            </Link>
          </div>
        </div>
        <AnimatedShapes />
      </div>
    </section>
  );
}
