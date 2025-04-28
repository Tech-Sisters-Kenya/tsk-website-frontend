'use client';

import React from 'react';
import Link from 'next/link';

const MissionVision = () => {
  return (
    <section className="w-full py-16 px-4 md:py-32 md:px-24">
      <div className="container mx-auto">
        <div className="flex flex-col md:flex-row justify-between gap-12 relative">
          {/* Left column with Mission card */}
          <div className="md:w-1/2 flex flex-col">
            <div className="bg-tsk-light-2 rounded-2xl p-16 flex flex-col items-center text-center flex-grow">
              <h2 className="text-xl md:text-3xl font-semibold font-heading text-tsk-primary-dark mb-8">
                OUR MISSION
              </h2>
              <p className="text-lg md:text-3xl text-tsk-primary-dark">
                To create a supportive and inclusive community where women in tech can grow,
                network, and find mentorship at every career stage, while prioritizing their
                well-being.
              </p>
            </div>
            {/* Bottom left decorative separator */}
            <div className="w-full h-4 bg-tsk-primary-dark rounded-full mt-12"></div>
          </div>

          {/* Right column with Vision card */}
          <div className="md:w-1/2 flex flex-col">
            {/* Top right decorative separator */}
            <div className="w-full h-4 bg-tsk-primary-dark rounded-full mb-12"></div>
            <div className="bg-tsk-light-2 rounded-2xl p-16 flex flex-col items-center text-center flex-grow">
              <h2 className="text-xl md:text-3xl font-semibold font-heading text-tsk-primary-dark mb-8">
                OUR VISION
              </h2>
              <p className="text-lg md:text-3xl text-tsk-primary-dark">
                A Kenya where women are empowered to excel in technology, lead the way in
                innovation, and drive positive change.
              </p>
            </div>
          </div>
        </div>

        {/* "Meet The Team" button */}
        <div className="flex justify-center mt-16">
          <Link
            href="/about-us"
            className="bg-tsk-primary-dark text-white px-8 py-5 rounded-md hover:bg-tsk-primary transition-colors duration-300 text-xl font-medium"
          >
            Meet The Team
          </Link>
        </div>
      </div>
    </section>
  );
};

export default MissionVision;
