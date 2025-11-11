'use client';

import React from 'react';
import Image from 'next/image';
import { impactData } from '@/data/our-impact';
import { Button } from '@/components/ui/button';

const ImpactMetrics = () => {
  return (
    <section className="mx-auto lg:mx-12 py-10 text-tsk-primary-dark md:px-20">
      {impactData.map((item, index) => (
        <React.Fragment key={item.id}>
          {/* Main content block */}
          <div
            className={`relative flex flex-col items-center md:flex-row gap-8 ${
              index % 2 === 0 ? '' : 'md:flex-row-reverse'
            }`}
          >
            {/* Image container */}
            <div className="relative z-20">
              <Image
                src={item.image}
                alt={item.title}
                width={600}
                height={375}
                className="rounded-2xl shadow-lg"
              />
            </div>

            {/* Purple box (text section) */}
            <div
              className={`flex flex-col gap-4 justify-center items-center lg:h-[470px] lg:w-[687px] bg-tsk-light-2 p-6 rounded-2xl w-full md:w-1/2 text-center relative z-10 -mt-10 md:mt-0 ${
                index % 2 === 0 ? 'md:-ml-32' : 'md:-mr-32'
              }`}
            >
              <div className="flex flex-col gap-12 justify-center lg:my-auto">
                <p className="lg:text-4xl md:text-3xl text-2xl font-semibold text-tsk-primary-dark">
                  {item.title}
                </p>
                {item.stats.map((stat, i) => (
                  <div key={i}>
                    <p className="font-bold lg:text-3xl text-lg text-tsk-primary-dark">
                      {stat.value}
                    </p>
                    <p className="font-bold text-[17px]">{stat.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Curly divider - only show if NOT the last item */}
          {index < impactData.length - 1 && (
            <div className="flex justify-center my-0 ">
              <Image
                src="/about-us/curly-divider.svg"
                alt="curly divider"
                width={250}
                height={400}
                style={{
                  transform: index === 0 ? 'rotate(-0.37deg)' : 'rotate(-0.37deg) scaleX(-1)',
                  opacity: 1,
                }}
                className="relative"
              />
            </div>
          )}
        </React.Fragment>
      ))}

      {/* Impact Report button */}
      <div className="flex justify-center mt-16 mb-4">
        <Button className="w-fit border border-tsk-primary-dark p-6 hover:text-tsk-primary-dark font-extrabold text-base md:text-lg cursor-pointer hover:bg-white text-white bg-tsk-primary-dark hover:border-tsk-primary-dark rounded-[15px]">
          Impact Report
        </Button>
      </div>
    </section>
  );
};

export default ImpactMetrics;
