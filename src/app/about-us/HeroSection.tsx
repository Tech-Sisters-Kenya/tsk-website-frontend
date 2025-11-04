'use client';

import React from 'react';
import HeroImageAnimation from './HeroImageAnimation';

const HeroSection = () => {
  return (
    <section
      role="banner"
      className="p-5 pb-12 pt-32 mb-10 md:mb-20 md:pl-20 md:pr-10 w-full bg-tsk-light-2 rounded-3xl mt-16 -z-10 "
    >
      <div className="w-full mx-auto flex flex-col md:flex-row items-center justify-between ">
        {/* Left column - text content */}
        <div className="md:w-1/2  md:mb-0 ">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold font-heading mb-5 md:mb-10 text-tsk-primary-dark">
            About
            <br />
            Tech Sisters Kenya
          </h1>
          <p className="text-xl md:text-2xl max-w-lg font-medium text-tsk-primary-dark ">
            A sisterhood for women in tech - learning, mentorship, and community
          </p>
        </div>

        {/* Right column - illustration with floating elements */}
        <div className="hidden md:block md:w-1/2 relative md:ml-10 md:-mt-20 mt-10">
          <HeroImageAnimation />
        </div>
      </div>
      <p className="font-decorative text-3xl md:text-4xl text-tsk-primary-dark mt-10 ">
        Empowering Women, Transforming Tech
      </p>
    </section>
  );
};

export default HeroSection;
