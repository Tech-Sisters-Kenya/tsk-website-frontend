'use client';

import React from 'react';

const FocusAreas = () => {
  return (
    <div className="bg-tsk-light-2 py-12 px-4 mt-10 lg:mt-20 w-screen text-center text-tsk-primary-dark lg:pt-20 lg:pb-32 lg:border lg:border-red-500">
      <div className="lg:max-w-4xl mx-auto flex flex-col items-center space-y-10 md:space-y-0 md:flex-row md:justify-center md:items-center md:gap-6 relative ">
        {/* Circle 1 */}
        <div className="flex flex-col items-center gap-2 -translate-y-10">
          <div className="flex items-center justify-center text-white bg-tsk-primary-dark w-[49px] h-[49px] rounded-full">
            1
          </div>
          <p>
            Technical<br></br>Empowerment
          </p>
        </div>
        {/* Divider */}
        <div
          className="hidden md:block absolute bg-tsk-primary-dark opacity-100 w-[139px] h-[5px] top-[42px] left-[188px] rotate-[31.18deg]
  "
        ></div>

        {/* Circle 2 */}
        <div className="flex flex-col items-center translate-y-20 gap-2">
          <div className="flex items-center justify-center text-white bg-tsk-primary-dark w-[49px] h-[49px] rounded-full">
            2
          </div>
          <p>
            Professional Development <br></br>& Mentorship
          </p>
        </div>

        {/* Divider */}
        <div
          className="hidden md:block absolute bg-tsk-primary-dark opacity-100 w-[139px] h-[5px] top-[42px] left-[368px] rotate-[-31.18deg]
  "
        ></div>

        {/* Circle 3 */}
        <div className="flex flex-col items-center -translate-y-6 gap-2">
          <div className="flex items-center justify-center text-white bg-tsk-primary-dark w-[49px] h-[49px] rounded-full">
            3
          </div>

          <p>
            Visibility <br></br>& Representation
          </p>
        </div>

        {/* Divider */}
        <div
          className="hidden md:block absolute bg-tsk-primary-dark opacity-100 w-[139px] h-[5px] top-[42px] right-[188px] rotate-[31.18deg]
  "
        ></div>

        {/* Circle 4 */}
        <div className="flex flex-col items-center translate-y-20 gap-2">
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
