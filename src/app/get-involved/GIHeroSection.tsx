import React from 'react';
import { AnimatedGISvg } from '@/app/get-involved/AnimatedGISvg';

function GIHeroSection() {
  return (
    <section className="w-full mx-auto text-tsk-primary-dark px-8 -mt-14 -z-10">
      <div className="bg-tsk-light-2 rounded-b-3xl px-16">
        <div className="pt-20 grid grid-cols-1 lg:grid-cols-2 items-center">
          <div>
            <h1 className="font-black font-heading text-5xl leading-[150%]">
              Get Involved With Tech Sisters Kenya?
            </h1>
            <p className="font-body text-[32px] mt-8">
              There are so many ways to be part of Tech Sisters Kenya and help us create safe,
              supportive spaces for women in tech.
            </p>
          </div>
          <div className="flex justify-center items-center mt-10 w-full">
            <AnimatedGISvg />
          </div>
        </div>
        <p className="font-decorative text-4xl mt-12 md:pl-6">
          Community is how we turn dreams into action
        </p>
      </div>
    </section>
  );
}

export default GIHeroSection;
