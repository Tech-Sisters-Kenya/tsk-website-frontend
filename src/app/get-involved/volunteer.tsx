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
    <section className="md:grid flex justify-center flex-wrap lg:grid-cols-6 grid-cols-none sm:grid-rows-3 grid-flow-row-dense gap-x-4 gap-y-4 py-20 md:mt-20 mt-15 px-16">
      <div className="md:row-span-3 border-2 border-tsk-primary-dark lg:col-span-2 rounded-2xl p-8 space-y-4">
        <h1 className="mt-6 lg:text-5xl sm:text-3xl text-2xl font-semibold leading-8 md:tracking-widest sm:tracking-wide">
          Be A Tech Sisters Kenya Volunteer
        </h1>
        <p className="text-[20px] text-tsk-primary-dark tracking-wider md:font-semibold font-medium">
          Share your skills and empower women in tech. Volunteer in events, mentorship, content
          creation and more at Tech Sisters Kenya.
        </p>

        <Button className="mt-6 md:w-fit w-full">
          <span className="text-2xl font-bold mx-8">Volunteer</span>
        </Button>
      </div>

      <div className="h-[150px] grid col-span-3 row-span-1 border-2 border-tsk-primary-dark rounded-2xl overflow-hidden">
        <Image
          src={volunteer1}
          alt="Someone leading a session"
          className="object-cover h-[150px]"
        />
      </div>

      <div className="h-[150px] border-2 border-tsk-primary-dark rounded-2xl overflow-hidden">
        <Image src={volunteer2} alt="two ladies smiling" className="object-cover h-[150px]" />
      </div>
      <div className="h-[150px] border-2 border-tsk-primary-dark rounded-2xl overflow-hidden">
        <Image src={volunteer3} alt="a group of ladies posing" className="object-cover h-[150px]" />
      </div>
      <div className="md:row-span-2 lg:col-span-3 md:col-span-2 border-2 border-tsk-primary-dark rounded-2xl flex items-center justify-center w-full">
        <Image src={Logo} alt="Tech Sisters Kenya Logo" className="w-sm" />
      </div>
      <div className="h-[150px] border-2 border-tsk-primary-dark rounded-2xl overflow-hidden">
        <Image
          src={volunteer4}
          alt="several individuals in a session"
          className="object-cover h-[150px]"
        />
      </div>
    </section>
  );
}
