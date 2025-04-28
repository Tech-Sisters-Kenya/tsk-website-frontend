'use client';

import React from 'react';

const MissionVision = () => {
  return (
    <section className="w-full py-12 px-4">
      <div className="container mx-auto">
        {/* Decorative separator */}
        <div className="w-full max-w-xl mx-auto h-2 bg-tsk-primary-dark rounded-full mb-8"></div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Mission card */}
          <div className="bg-tsk-light-2 rounded-lg p-8 flex flex-col items-center text-center">
            <h2 className="text-xl md:text-2xl font-bold font-heading text-tsk-primary-dark mb-4">
              OUR MISSION
            </h2>
            <p className="text-sm md:text-base">
              To create a supportive and inclusive community where women in tech can grow, network,
              and find mentorship at every career stage, while prioritizing their well-being.
            </p>
          </div>

          {/* Vision card */}
          <div className="bg-tsk-light-2 rounded-lg p-8 flex flex-col items-center text-center">
            <h2 className="text-xl md:text-2xl font-bold font-heading text-tsk-primary-dark mb-4">
              OUR VISION
            </h2>
            <p className="text-sm md:text-base">
              A Kenya where women are empowered to excel in technology, lead the way in innovation,
              and drive positive change.
            </p>
          </div>
        </div>

        {/* "Meet The Team" button */}
        <div className="flex justify-center mt-8">
          <a
            href="/about-us/team"
            className="bg-tsk-primary-dark text-white px-6 py-2 rounded-md hover:bg-tsk-primary transition-colors duration-300 text-sm font-medium"
          >
            Meet The Team
          </a>
        </div>

        {/* Decorative separator */}
        <div className="w-full max-w-xl mx-auto h-2 bg-tsk-primary-dark rounded-full mt-16"></div>
      </div>
    </section>
  );
};

export default MissionVision;
