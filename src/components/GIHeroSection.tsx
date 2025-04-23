import React from 'react';
import Image from 'next/image';

import Navbar from './Navbar';
import HeroImg from '@/assets/GetInvolvedHero.svg';

function GIHeroSection() {
  return (
    <section className="w-full mx-auto text-tsk-primary-dark">
      <div className=" bg-tsk-light-2 rounded-3xl px-12">
        <Navbar />
        <div className="pt-12 grid grid-cols-1 lg:grid-cols-2 items-center">
          <div>
            <h1 className="font-black font-heading text-5xl leading-[150%]">
              Get Involved With Tech Sisters Kenya?
            </h1>
            <p className="font-body text-[32px] mt-8">
              There are so many ways to be part of Tech Sisters Kenya and help us create safe,
              supportive spaces for women in tech.
            </p>
          </div>
          <div className="justify-self-center mt-10">
            <Image src={HeroImg} alt="Get Involved Hero Image" width={500} height={500} />
          </div>
        </div>
        <p className="font-decorative text-4xl mt-12">
          Community is how we turn dreams into action
        </p>
      </div>
    </section>
  );
}

export default GIHeroSection;
