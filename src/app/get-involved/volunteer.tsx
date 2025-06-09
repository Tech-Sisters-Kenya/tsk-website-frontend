'use client';
import React from 'react';

import Image from 'next/image';
import Button from '../../components/Button';
import volunteer1 from '../../../public/volunteer1.png';
import volunteer2 from '../../../public/volunteer2.png';
import volunteer3 from '../../../public/volunteer3.png';
import volunteer4 from '../../../public/volunteer4.png';
import Logo from '../../../public/TSK Primary Logo 2.svg';

export default function Volunteer() {
  return (
    <section className="md:grid lg:grid-cols-6 grid-cols-none sm:grid-rows-3 grid-flow-row-dense gap-x-4 gap-y-4 space-y-4 py-20 md:mt-20 mt-15 px-16">
      <div className="font-body md:row-span-3 border-2 border-tsk-primary-dark lg:col-span-2 rounded-2xl sm:p-8 p-4 space-y-4">
        <h1 className="2xl:mt-4 mt-2 md:text-5xl text-3xl font-semibold 2xl:leading-[1.3] lg:leading-[1.18] lg:[word-spacing:0.9rem]">
          Be A Tech Sisters Kenya Volunteer
        </h1>
        <p className="md:text-[20px] text-lg text-tsk-primary-dark lg:tracking-wider tracking-wide font-semibold md:leading-[1.8] leading-[1.2] lg:[word-spacing:0.4rem] pb-4">
          Share your skills and empower women in tech. Volunteer in events, mentorship, content
          creation and more at Tech Sisters Kenya.
        </p>

        <Button className="sm:w-fit w-full py-4">
          <span className="text-[20px] font-black">Volunteer</span>
        </Button>
      </div>

      <div className="h-[169px] col-span-3 row-span-1 border-2 border-tsk-primary-dark rounded-2xl overflow-hidden">
        <Image
          src={volunteer1}
          alt="Someone leading a session"
          className="object-cover h-full w-full"
        />
      </div>

      <div className="h-[169px] border-2 border-tsk-primary-dark rounded-2xl overflow-hidden">
        <Image src={volunteer2} alt="two ladies smiling" className="object-cover h-full w-full" />
      </div>
      <div className="h-[169px] border-2 border-tsk-primary-dark rounded-2xl overflow-hidden">
        <Image
          src={volunteer3}
          alt="a group of ladies posing"
          className="object-cover h-full w-full"
        />
      </div>
      <div className="md:row-span-2 lg:col-span-3 md:col-span-2 border-2 border-tsk-primary-dark rounded-2xl flex justify-center items-center w-full">
        <Image src={Logo} alt="Tech Sisters Kenya Logo" className="w-sm px-5" />
      </div>
      <div className="grid-flow-row h-[169px] border-2 border-tsk-primary-dark rounded-2xl overflow-hidden">
        <Image
          src={volunteer4}
          alt="several individuals in a session"
          className="object-cover w-full h-full"
        />
      </div>
    </section>
  );
}
