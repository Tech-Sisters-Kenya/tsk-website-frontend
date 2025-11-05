'use client';

import React from 'react';

const WhoWeAre = () => {
  return (
    <div className="flex flex-col gap-10 lg:gap-20 lg:flex-row mx-8 xl:py-20">
      <div className="">
        <img className="rounded-2xl" src="/get-involved/partner-img.svg" alt="Who We Are" />
      </div>

      {/* child two */}
      <div className="text-tsk-primary-dark lg:w-[533px] ">
        <p className=" text-xl md:text-2xl font-bold">Who We Are</p>
        <p className="md:text-[20px] font-medium md:leading-[123%] capitalize">
          We are 1,850 (and growing) women in tech, united by the spirit of
        </p>
        {/* Curly text + logo */}
        <div className="flex flex-col items-center ">
          <img
            src="/arrow.svg"
            alt=""
            className="w-16 h-16 md:w-18 md:h-18 lg:w-24 lg:h-24 object-contain "
          />
          <p className="font-decorative text-4xl md:text-6xl">
            Hey Tech Sister !
            <img className="inline w-10 h-10 pl-2 md:w-14 md:h-14" src="/tsk-logo.png" />
          </p>
        </div>

        <p className=" text-xl md:text-2xl font-bold mt-[20px] text-left">What We Do</p>
        <p className="md:text-[20px] font-medium leading-[100%] md:leading-[123%] ">
          We create safe spaces for women in tech to thrive by offering mentorship, skill-building
          workshops, vital industry exposure, and engaging community-led events.
        </p>
      </div>
    </div>
  );
};
export default WhoWeAre;
