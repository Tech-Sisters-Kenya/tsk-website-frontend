import React from 'react';
import { AnimatedSVG } from './AnimatedSVG';

function HeroSection() {
  return (
    <section className="w-full mt-10 mx-auto text-tsk-primary-dark px-8">
      <div className="bg-tsk-light-2 rounded-3xl px-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          <div>
            <h1 className="font-black font-heading text-3xl mt-8 lg:mt-0 sm:text-6xl leading-[150%]">
              Get Involved
            </h1>
            <p className="font-body text-xl sm:text-2xl mt-8">
              We believe in community and collaboration. <br /> <br /> Whether you join as a member,
              partner, or sponsor, you’ll help us empower women in technology, create opportunities,
              and shape a future where women thrive in every tech sector.
            </p>
          </div>
          <div className="flex justify-center items-center mt-10 w-full">
            <AnimatedSVG />
          </div>
        </div>
        <p className="font-decorative text-4xl pb-4 mt-8 lg:mt-0">
          Empowering Women, Transforming Tech
        </p>
      </div>
    </section>
  );
}

export default HeroSection;
