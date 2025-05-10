'use client';

import React from 'react';
import HeroImageAnimation from './HeroImageAnimation';

const HeroSection = () => {
  return (
    <section className="py-20 px-4 bg-tsk-light-2 rounded-3xl w-full -mt-20 -z-10">
      <div className="container mx-auto flex flex-col md:flex-row items-center justify-between">
        {/* Left column - text content */}
        <div className="md:w-1/2 mb-8 md:mb-0">
          <h1 className="text-2xl md:text-3xl lg:text-5xl font-bold font-heading mb-6 text-tsk-primary-dark">
            About
            <br />
            Tech Sisters Kenya
          </h1>
          <p className="text-base md:text-2xl max-w-lg tracking-wide">
            Tech Sisters Kenya is a non-profit organization empowering women in tech through
            mentorship, workshops, and networking opportunities, to elevate their skills and support
            their professional growth through community initiatives
          </p>
        </div>

        {/* Right column - illustration with floating elements */}
        <div className="md:w-1/2 relative">
          <HeroImageAnimation />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
