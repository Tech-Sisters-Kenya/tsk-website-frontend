'use client';

import React from 'react';
import Image from 'next/image';

const WhatWeDo = () => {
  return (
    <div className="w-full md:relative mb-12">
      <div className="bg-white font-body text-center mx-auto pt-8 lg:pb-20 md:max-w-4xl px-3">
        <p className="font-bold text-[30px] md:text-[48px] text-[#45084a]">WHAT WE DO</p>
        <p className="font-medium text-[18px] md:text-[20px] text-[#45084a] mb-10">
          At Tech Sisters, we elevate women in technology. We create safe spaces for learning,
          growth, and connection — helping women step confidently into tech and thrive.
        </p>

        {/* the image section */}
        {/* parent div */}
        <div className="flex flex-col md:flex-row gap-4 justify-center relative">
          {/* Initiatives */}
          <div
            className="bg-[url('/initiative.png')] bg:cover bg-center bg-no-repeat z-10 md:w-[510px] h-[427px] text-white relative rounded-2xl transition-transform duration-300 ease-in-out hover:scale-102 md:hover:scale-105 hover:shadow-lg 
          before:content-['']
            before:absolute
            before:inset-0
            before:block
            before:z-[-5]
            before:bg-[linear-gradient(180deg,_rgba(69,_8,_74,_0.1)_0%,_#45084A_100%)]
            before:rounded-2xl
           "
          >
            <div className="font-semibold absolute top-[20%] md:top-1/4 left-1/2 w-full transform -translate-x-1/2  px-8 pt-20  text-left ">
              <p className="text-[24px] md:text-[30px] text-left pb-2">Initiatives</p>
              <p className="text-[16px] ">
                Programs and projects designed to equip, inspire & support women in tech.{' '}
              </p>
              <ul className="list-disc pl-4 text-[16px]">
                <li>Tech skills Development & workshops</li>
                <li>Laptop & Gadget Donation Program</li>
                <li>Mentorship & Career Guidance</li>
                <li>Mental Wellness Program</li>
              </ul>
            </div>
          </div>

          {/* Stacked cards for our events and our community */}
          <div className="flex flex-col md:flex-row gap-2 ">
            {/* Our events */}
            <div
              className="w-full h-[90px] md:w-[100px] bg-[url('/our-events.png')] bg-cover bg-center bg-no-repeat z-10 md:h-[427px] flex items-center justify-center  md:block text-white relative rounded-2xl  transition-transform duration-300 ease-in-out hover:scale-102 md:hover:scale-105  
          before:content-['']
            before:absolute
            before:inset-0
            before:block
            before:z-[-5]
            before:bg-[linear-gradient(180deg,_rgba(69,_8,_74,_0.1)_0%,_#45084A_100%)]
            before:rounded-2xl
           "
            >
              <p className="font-semibold text-[20px] md:text-[30px] md:rotate-90 md:whitespace-nowrap cursor-pointer md:absolute md:bottom-50 md:origin-bottom-left md:translate-x-[30px]">
                <a
                  href="https://www.linkedin.com/company/tech-sisters-kenya/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Our Events
                </a>
              </p>
            </div>

            {/* Our community */}
            <div
              className=" w-full h-[90px] md:w-[100px] bg-[url('/our-community.png')] bg-cover bg-center bg-no-repeat z-10 md:h-[427px] text-white relative rounded-2xl flex items-center justify-center md:block transition-transform duration-300 ease-in-out hover:scale-102 md:hover:scale-105
          before:content-['']
            before:absolute
            before:inset-0
            before:block
            before:z-[-5]
            before:bg-[linear-gradient(180deg,_rgba(69,_8,_74,_0.1)_0%,_#45084A_100%)]
            before:rounded-2xl
           "
            >
              <p className="font-semibold text-[20px] md:text-[30px] md:rotate-90 md:whitespace-nowrap cursor-pointer md:absolute md:bottom-65 md:origin-bottom-left md:translate-x-[30px]">
                <a
                  href="https://join.slack.com/t/techsisterskenya/shared_invite/zt-340pqucac-4G0cTNQB3TF~VE8ndJBolg"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Our Community
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
      <Image
        src="/tsk-logo.png"
        width={64}
        height={76}
        alt="Tech sisters logo"
        className="hidden lg:block lg:absolute lg:right-0 lg:mr-20"
      />
    </div>
  );
};
export default WhatWeDo;
