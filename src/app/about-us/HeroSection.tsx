'use client';

import React from 'react';
import HeroImageAnimation from './HeroImageAnimation';

const HeroSection = () => {
  return (
    <section
      role="banner"
      className="pb-10 pt-32 pl-20 pr-10 w-full bg-tsk-light-2 rounded-3xl mt-16 -z-10"
    >
      <div className=" mx-8 flex flex-col md:flex-row items-center justify-between">
        {/* Left column - text content */}
        <div className="md:w-1/2 mb-8 md:mb-0">
          <h1 className="text-3xl md:text-3xl lg:text-5xl font-extrabold font-heading mb-20 text-tsk-primary-dark">
            About
            <br />
            <br />
            Tech Sisters Kenya
          </h1>
          <p className="text-xl md:text-2xl max-w-lg font-medium tracking-wide text-tsk-primary-dark text-justify">
            Tech Sisters Kenya is a non-profit organization empowering women in tech through
            mentorship, workshops, and networking to grow skills and careers.
          </p>
        </div>

        {/* Right column - illustration with floating elements */}
        <div className="md:w-1/2 relative ml-10 -mt-20">
          <HeroImageAnimation />
        </div>
      </div>
      <p className="font-decorative text-4xl text-tsk-primary-dark mt-10 -mb-10">
        Empowering Women, Transforming Tech
      </p>
    </section>
  );
};

export default HeroSection;
