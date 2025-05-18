'use client';

import React from 'react';
import Image from 'next/image';
import semiCircle from '@/assets/Rectangle 88.svg';
import circle from '@/assets/Ellipse 9.svg';
import cloudShape from '@/assets/cloud-solid 1.svg';
import codeBracket from '@/assets/code-solid 1.svg';
import pillShape from '@/assets/Rectangle 86.svg';
import logo from '@/assets/Layer 1.svg';
import rectangle from '@/assets/Rectangle 85.svg';
import techSister1 from '@/assets/Group 633181.svg';
import techSister2 from '@/assets/IMG_4912 1.svg';
import hello from '@/assets/hello-tsk.svg';
import tsk from '@/assets/tsk-text.svg';
const AnimatedShapes: React.FC = () => {
  return (
    <div className="relative w-full h-[500px] flex flex-col items-center justify-center overflow-hidden">
      <div className="relative flex flex-col items-center gap-6 z-10 sm:-mb-23">
        <div className="relative w-40 h-40 mb-4 sm:w-40 sm:h-40 sm:mb-6 md:w-56 md:h-56 md:mb-8 lg:w-64 lg:h-64 lg:mb-8">
          <Image
            src={techSister1}
            alt="Tech Sister 1"
            width={180}
            height={180}
            className="absolute  -bottom-2 left-6 w-48 h-48 sm:w-16 sm:h-16 sm:-bottom-3 sm:left-[8%] md:-bottom-4 md:left-[16%] md:h-48 md:w-48 lg:-bottom-4 lg:left-[18%] lg:w-48 lg:h-48"
          />
        </div>

        <div className="relative w-72 h-48">
          <Image
            src={techSister2}
            width={220}
            height={220}
            alt="Tech Sister 2"
            className="relative object-contain w-60 h-60 sm:h-30 sm:w-30 md:h-50 md:w-50 lg:h-60 lg:w-60 z-10 bottom-10 left-[6%]"
          />
        </div>

        <div>
          <Image
            src={rectangle}
            alt="rectangle"
            width={250}
            height={168}
            className="absolute left-[50%] -bottom-6 w-[300px] h-[172px] z-0 transform -translate-x-1/2"
          />
        </div>
      </div>

      {/* semi-circle Shape */}
      <div className="absolute left-[14%] top-[15%] w-24 h-24 sm:left-[10%] sm:top-[18%] sm:h-20 sm:w-20 md:left-[30%] md:top-[26%] md:w-24 md:h-24 lg:left-[10%] lg:w-28 lg:h-28 xl:left-[20%] xl:bottom-[30%] xl:w-28 xl:h-28 animate-elasticswing">
        <Image
          src={semiCircle}
          alt="purple semi-circle"
          width={100}
          height={100}
          className="w-full h-full z-10"
        />
      </div>
      {/* Circle Shape */}
      <div className="absolute left-[10%] bottom-[25%]sm:left-[4%] sm:bottom-[20%] sm:w-18 sm:h-18  md:w-20 md:h-20 lg:left-[15%] lg:bottom-[28%] lg:w-22 lg:h-22 xl:left-[20%] xl:bottom-[30%] xl:w-26 xl:h-26 rounded-full opacity-75 md:left-[30%] md:bottom-[36%] animate-zoom">
        <Image
          src={circle}
          alt="pink circle"
          width={80}
          height={80}
          className="w-full h-full rounded-full"
        />
      </div>
      {/* Cloud Shape */}
      <div className="absolute left-[8%] top-[0%] w-32 h-20 sm:left-[6%] sm:-top-[2%] sm:w-24 sm:h-14 md:left-[30%] md:top-[4%] md:w-28 md:h-16 lg:left-[9%] lg:top-[2%] lg:w-32 lg:h-20 xl:left-[10%] xl:top-[2%] xl:w-36 xl:h-24 animate-elasticswing">
        <Image
          src={cloudShape}
          alt="cloud shape"
          width={80}
          height={80}
          className="w-full h-full rounded-[100px]"
        />
      </div>
      {/* Code Bracket */}
      <div className="absolute right-4 top-15 sm:right-[8%] sm:top-[20%] lg:right-[18%] lg:top-[44%] text-tsk-primary-dark text-6xl md:right-[28%] md:top-[40%] z-10">
        <Image src={codeBracket} alt="code bracket" width={50} height={50} className="w-8 h-8" />
      </div>
      {/* Pill Shape */}
      <div className="absolute right-5 z-10 top-6 w-12 h-28 rounded-full md:right-[25%] md:top-[14%] lg:top-[18%] lg:right-[18%] animate-squashstretch">
        <Image
          src={pillShape}
          alt="pill shape"
          width={80}
          height={80}
          className="w-full h-full rounded-full"
        />
      </div>
      {/* Texts */}
      <div className="absolute right-[10%] top-2 sm:top-[8%] px-4 py-2 rounded-full md:right-[25%] md:top-[1%] animate-elasticswing">
        <Image src={hello} alt="text" className="w-full h-full" />
      </div>
      <div className="absolute right-1 top-[40%] sm:right-[1%]  w-40 h-28 px-4 py-2 rounded-full md:right-[24%] md:top-[45%] lg:right-[14%] animate-elasticswing">
        <Image src={tsk} alt="tsk-text" width={128} height={64} className="w-full h-full" />
      </div>
      {/* Logo */}
      <div className="absolute  animate-zoom right-1 bottom-12 w-12 h-12 sm:right-[1%] sm:bottom-[28%] sm:w-10 sm:h-10 md:right-[24%] md:bottom-[26%] md:w-12 md:h-12 lg:bottom-[28%] lg:right-[16%] lg:w-16 lg:h-16 xl:bottom-[30%] xl:w-20 xl:h-20">
        <Image src={logo} alt="Tech Sisters Kenya Logo" width={50} height={30} />
      </div>
    </div>
  );
};

export default AnimatedShapes;
