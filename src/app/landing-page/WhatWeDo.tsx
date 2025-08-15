'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import clsx from 'clsx';

const WhatWeDo = () => {
  const [active, setActive] = useState<'initiatives' | 'events' | 'community'>('initiatives');

  return (
    <div className="w-full md:relative mb-12">
      <div className="bg-white font-body text-center mx-auto pt-8 lg:pb-20 md:max-w-6xl px-3">
        <p className="font-bold text-[30px] md:text-[48px] text-[#45084a]">WHAT WE DO</p>
        <p className="font-medium text-[18px] md:text-[20px] text-[#45084a] mb-10">
          At Tech Sisters, we elevate women in technology. We create safe spaces for learning,
          growth, and connection — helping women step confidently into tech and thrive.
        </p>

        {/* Card layout */}
        <div className="flex flex-col md:flex-row gap-4 justify-center relative transition-all duration-500">
          {/* Initiatives */}
          <div
            onClick={() => setActive('initiatives')}
            className={clsx(
              "cursor-pointer bg-[url('/initiatives.svg')] bg-cover bg-center bg-no-repeat text-white relative rounded-2xl transition-all duration-500 ease-in-out overflow-hidden z-10 before:content-[''] before:absolute before:inset-0 before:block before:z-[-5] before:rounded-2xl before:bg-[linear-gradient(180deg,_rgba(69,_8,_74,_0.1)_0%,_#45084A_100%)]",
              active === 'initiatives'
                ? 'w-full md:w-[60%] h-[427px]'
                : 'w-full md:w-[100px] h-[90px] md:h-[427px]'
            )}
          >
            <div
              className={clsx(
                'font-semibold transition-opacity duration-300 px-8 pt-20 text-left w-full absolute top-[20%] md:top-1/4 left-1/2 transform -translate-x-1/2 ',
                active === 'initiatives' ? 'opacity-100' : 'opacity-0 pointer-events-none'
              )}
            >
              <p className="text-[24px] md:text-[30px] pb-2 font-semibold">Initiatives</p>
              <p className="text-[16px]">
                Programs and projects designed to equip, inspire & support women in tech.
              </p>
              <ul className="list-disc pl-10 text-[16px]">
                <li>Tech skills Development & workshops</li>
                <li>Laptop & Gadget Donation Program</li>
                <li>Mentorship & Career Guidance</li>
                <li>Mental Wellness Program</li>
              </ul>
            </div>

            {/* show the title vertically if the card isnt active */}
            <p
              className={clsx(
                'font-semibold text-[20px] left-1/2 bottom-8 md:text-[30px] md:rotate-90 md:whitespace-nowrap absolute md:bottom-20 md:left-1/2 md:transform -translate-x-1/2 ',
                active === 'initiatives' ? 'opacity-0' : 'opacity-100'
              )}
            >
              Initiatives
            </p>
          </div>

          {/* Our Events */}
          <div
            onClick={() => setActive('events')}
            className={clsx(
              "cursor-pointer bg-[url('/our-events.svg')] bg-cover bg-center bg-no-repeat text-white relative rounded-2xl transition-all duration-500 ease-in-out z-10 before:content-[''] before:absolute before:inset-0 before:block before:z-[-5] before:rounded-2xl before:bg-[linear-gradient(180deg,_rgba(69,_8,_74,_0.1)_0%,_#45084A_100%)]",
              active === 'events'
                ? 'w-full md:w-[60%] h-[427px]'
                : 'w-full md:w-[100px] h-[90px] md:h-[427px]'
            )}
          >
            <div
              className={clsx(
                'font-semibold transition-opacity duration-300 px-8 pt-20 text-left w-full absolute top-[20%] md:top-1/4 left-1/2 transform -translate-x-1/2',
                active === 'events' ? 'opacity-100' : 'opacity-0 pointer-events-none'
              )}
            >
              <p className="text-[24px] md:text-[30px] pb-2 font-semibold">Our Events</p>
              <p className="text-[16px]">Where learning meets connection</p>
              <ul className="list-disc pl-10 text-[16px]">
                <li>Women in Tech Meetups</li>
                <li>Coding Bootcamps</li>
                <li>Tech Career Fairs</li>
                <li>Panel Talks & Webinars</li>
                <li>Community Hangouts</li>
              </ul>
            </div>

            {/* show the title vertically if the card isnt active */}
            <p
              data-testid="tab-events"
              className={clsx(
                'font-semibold text-[20px] left-1/2 bottom-8  md:text-[30px] md:rotate-90 md:whitespace-nowrap absolute md:bottom-20 md:left-1/2 md:transform -translate-x-1/2 ',
                active === 'events' ? 'opacity-0' : 'opacity-100'
              )}
            >
              Our Events
            </p>
          </div>

          {/* Our Community */}
          <div
            onClick={() => setActive('community')}
            className={clsx(
              "cursor-pointer bg-[url('/our-community.svg')] bg-cover bg-center bg-no-repeat text-white relative rounded-2xl transition-all duration-500 ease-in-out overflow-hidden z-10 before:content-[''] before:absolute before:inset-0 before:block before:z-[-5] before:rounded-2xl before:bg-[linear-gradient(180deg,_rgba(69,_8,_74,_0.1)_0%,_#45084A_100%)]",
              active === 'community'
                ? 'w-full md:w-[60%] h-[427px]'
                : 'w-full md:w-[100px] h-[90px] md:h-[427px]'
            )}
          >
            <div
              className={clsx(
                'font-semibold transition-opacity duration-300 px-8 pt-20 text-left w-full absolute top-[20%] md:top-1/4 left-1/2 transform -translate-x-1/2',
                active === 'community' ? 'opacity-100' : 'opacity-0 pointer-events-none'
              )}
            >
              <p className="text-[24px] md:text-[30px] pb-2 font-semibold">Our Community</p>
              <p className="text-[16px]">More than just tech - it is sisterhood.</p>
              <ul className="list-disc pl-10 text-[16px]">
                <li>300+ Women & Girls Empowered</li>
                <li>20+ Mentors & Trainers</li>
                <li>5+ Partner Communities</li>
                <li>Online & In-Person Support</li>
                <li>A Safe Space to Ask, Share, & Grow</li>
              </ul>
            </div>

            {/* show the title vertically if the card isnt active */}
            <p
              className={clsx(
                'font-semibold text-[20px] left-1/2 bottom-8 md:text-[30px] md:rotate-90 md:whitespace-nowrap absolute md:bottom-[120px] md:left-1/2 md:transform -translate-x-1/2 ',
                active === 'community' ? 'opacity-0' : 'opacity-100'
              )}
            >
              Our Community
            </p>
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
