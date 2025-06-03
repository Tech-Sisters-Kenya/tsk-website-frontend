import React from 'react';
import Button from '../../components/Button';
import AnimatedShapes from './AnimatedShapes';
import Link from 'next/link';

export default function Hero() {
  return (
    <section className="w-full max-w-[1200px] mx-auto px-5 sm:px-6 lg:px-8  -mt-4 mb-0">
      <div className=" grid grid-cols-1 lg:grid-cols-2 items-center gap-8 md:gap-12 lg:gap-16">
        <div className="flex flex-col gap-6 sm:gap-8 -mt-28">
          <h1 className="text-x6l font-bold font-heading sm:text-7xl xl:text-8xl text-tsk-primary-dark -mt-14">
            Elevating <br />
            Women In
            <br /> Technology
          </h1>
          <p className="text-base font-bold font-body sm:text-lg max-w-[600px] text-tsk-primary-dark md:text-xl  py-2 sm:py-3">
            Tech Sisters Kenya is a non-profit organization empowering women in tech through
            mentorship, workshops, and networking opportunities to elevate their skills and support
            their professional growth through community initiatives.
          </p>
          <div className="flex flex-col sm:flex-row -mr-6">
            <Link href="/get-involved" className="w-full mb-4 sm:mb-2">
              <Button variant="primary" className="text-tsk-light-1 font-bold text-base sm:text-lg">
                Join Our Community
              </Button>
            </Link>
            <Link href="/get-involved" className="w-full">
              <Button
                variant="secondary"
                className="bg-foreground border border-tsk-primary-dark font-bold text-tsk-primary-dark text-base sm:text-lg"
              >
                Partner With Us
              </Button>
            </Link>
          </div>
        </div>
        <AnimatedShapes />
      </div>
    </section>
  );
}
