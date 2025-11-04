'use client';

import React from 'react';

const FocusAreas = () => {
  return (
    <div className="bg-tsk-light-2 py-12 px-4 md:py-28 mt-10 lg:mt-20 w-screen text-center text-tsk-primary-dark lg:pt-20 lg:pb-32 ">
      <div className="lg:max-w-4xl mx-auto flex flex-col items-center space-y-10 md:space-y-0 md:flex-row md:justify-center md:items-center md:gap-6 relative gap-3">
        {/* Circle 1 */}
        <div className="flex flex-col items-center gap-3 md:-translate-y-10 md:-translate-x-4">
          <div className="flex items-center justify-center text-white bg-tsk-primary-dark w-[49px] h-[49px] rounded-full">
            1
          </div>
          <p>
            Technical<br></br>Empowerment
          </p>
        </div>
        {/* Divider */}
        <div
          className=" md:block md:absolute bg-tsk-primary-dark opacity-100 w-[70px] md:w-[139px] lg:h-[5px] h-[4px] md:top-[42px] lg:left-[168px] md:left-[98px] rotate-[90deg] md:rotate-[31.18deg]
  "
        ></div>

        {/* Circle 2 */}
        <div className="flex flex-col items-center md:translate-y-24 gap-3 md:-translate-x-4 lg:translate-x-0">
          <div className="flex items-center justify-center text-white bg-tsk-primary-dark w-[49px] h-[49px] rounded-full">
            2
          </div>
          <p>
            Professional Development <br></br>& Mentorship
          </p>
        </div>

        {/* Divider */}
        <div
          className=" md:block md:absolute bg-tsk-primary-dark opacity-100 w-[70px] md:w-[139px] lg:h-[5px] md:h-[4px] h-[4px] md:top-[42px] lg:left-[373px] md:left-[283px] rotate-[90deg] md:rotate-[-31.18deg] 
  "
        ></div>

        {/* Circle 3 */}
        <div className="flex flex-col items-center md:-translate-y-10 gap-3">
          <div className="flex items-center justify-center text-white bg-tsk-primary-dark w-[49px] h-[49px] rounded-full">
            3
          </div>

          <p>
            Visibility <br></br>& Representation
          </p>
        </div>

        {/* Divider */}
        <div
          className="md:block md:absolute bg-tsk-primary-dark opacity-100 w-[70px] md:w-[139px] lg:h-[5px] md:h-[4px] h-[3px] md:top-[42px] lg:right-[188px] md:right-[108px] md:rotate-[31.18deg] rotate-[90deg]
  "
        ></div>

        {/* Circle 4 */}
        <div className="flex flex-col items-center  gap-3 md:translate-x-4 md:translate-y-24">
          <div className="flex items-center justify-center text-white bg-tsk-primary-dark w-[49px] h-[49px] rounded-full">
            4
          </div>
          <p>
            Community Wellness<br></br>& Inclusion
          </p>
        </div>
      </div>
    </div>
  );
};

export default FocusAreas;
