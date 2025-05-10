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

const AnimatedShapes: React.FC = () => {
  return (
    <div className="relative w-full h-screen flex flex-col items-center justify-center overflow-hidden">
      <div className="relative flex flex-col items-center gap-8 z-10">
        <div className="relative w-64 h-64 mb-8 ">
          <Image
            src={techSister1}
            alt="Tech Sister 1"
            width={180}
            height={180}
            className="absolute z-10 -bottom-4 left-[20%]"
          />
        </div>

        <div className="relative w-72 h-48">
          <Image
            src={techSister2}
            width={220}
            height={220}
            alt="Tech Sister 2"
            className="relative object-contain z-10 bottom-10 left-[20%]"
          />
        </div>

        <div>
          <Image
            src={rectangle}
            alt="rectangle"
            width={250}
            height={168}
            className="absolute left-[60%] -bottom-6 w-[300px] h-[172px] z-0 transform -translate-x-1/2"
          />
        </div>
      </div>

      {/* semi-circle Shape */}
      <div className="absolute left-[5%] top-[15%] w-32 h-32 md:left-[10%] md:top-[25%] animate-elasticswing">
        <Image
          src={semiCircle}
          alt="purple semi-circle"
          width={100}
          height={100}
          className="w-full h-full"
        />
      </div>
      {/* Circle Shape */}
      <div className="absolute left-[10%] bottom-[25%] w-20 h-20  rounded-full opacity-75 md:left-[20%] md:bottom-[30%] animate-zoom">
        <Image
          src={circle}
          alt="pink circle"
          width={80}
          height={80}
          className="w-full h-full rounded-full"
        />
      </div>
      {/* Cloud Shape */}
      <div className="absolute left-[8%] top-[0%] w-32 h-20 rounded-[100px] md:left-[10%] md:top-[2%] animate-elasticswing">
        <Image
          src={cloudShape}
          alt="cloud shape"
          width={80}
          height={80}
          className="w-full h-full rounded-[100px]"
        />
      </div>
      {/* Code Bracket */}
      <div className="absolute right-[8%] top-[28%] text-tsk-primary-dark text-6xl md:right-[12%] md:top-[40%] z-10">
        <Image src={codeBracket} alt="code bracket" width={50} height={50} className="w-8 h-8" />
      </div>
      {/* Pill Shape */}
      <div className="absolute right-[10%] top-[15%] w-12 h-32 rounded-full md:right-[14%] md:top-[10%] animate-squashstretch">
        <Image
          src={pillShape}
          alt="pill shape"
          width={80}
          height={80}
          className="w-full h-full rounded-full"
        />
      </div>
      {/* Texts */}
      <div className="absolute right-[20%] top-[2%] bg-foreground px-4 py-2 rounded-full md:right-[25%] md:top-[4%] animate-elasticswing">
        <p
          className="text-tsk-primary-dark font-heading font-bold text-base rotate-[-25deg]"
          aria-hidden="true"
        >
          Hello!
        </p>
      </div>
      <div className="absolute right-[3%] top-[40%] bg-foreground px-4 py-2 rounded-full md:right-[8%] md:top-[45%] animate-elasticswing">
        <p
          className="text-tsk-primary-dark text-center font-heading font-bold text-base rotate-[25deg]"
          aria-hidden="true"
        >
          Tech Sisters <br /> Kenya
        </p>
      </div>
      {/* Logo */}
      <div className="absolute right-[0%] bottom-[20%] w-16 h-16 sm:w-16 sm:h-16 md:w-18 md:h-18 md:right-[0%] md:bottom-[25%] animate-zoom">
        <Image src={logo} alt="Tech Sisters Kenya Logo" className="w-full h-full" />
      </div>
    </div>
  );
};

export default AnimatedShapes;
