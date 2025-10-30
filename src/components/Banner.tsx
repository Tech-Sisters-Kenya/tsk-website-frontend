import Image from 'next/image';
import React from 'react';
import tskIcon from '@/../public/tsk-icon.svg';

const Banner = () => {
  return (
    <div className="w-full sm:mt-40 mt-32 px-8">
      <div className="sm:w-4/5 bg-tsk-primary-dark mx-auto rounded-md flex flex-col justify-center items-center gap-2 py-3 px-4 pb-6">
        <div className="p-1 bg-gray-200 mt-10 rounded-full">
          <div className="p-0.5 bg-tsk-primary-dark rounded-full">
            <Image
              src={tskIcon}
              alt="tsk logo"
              width={50}
              height={50}
              className="w-[74px] h-[74px] bg-white p-1 rounded-full"
            />
          </div>
        </div>
        <div className="mx-auto">
          <h1 className="text-white lg:text-[64px] md:text-6xl sm:text-4xl text-3xl font-bold font-heading text-center">
            Tech Sisters Kenya
          </h1>
          <h2 className="text-white text-center font-body font-medium sm:text-lg text-base">
            Elevating Women in Technology
          </h2>
        </div>
      </div>
    </div>
  );
};

export default Banner;
