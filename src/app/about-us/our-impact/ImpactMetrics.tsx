'use client';

import React from 'react';
import Image from 'next/image';
import { impactData } from '@/data/our-impact';
import { Button } from '@/components/ui/button';

const ImpactMetrics = () => {
  return (
    <section className="max-w-5xl mx-auto py-10 space-y-20 text-tsk-primary-dark md:px-10">
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
                width={500}
                height={350}
                className="rounded-2xl shadow-lg w-full md:w-[500px]"
              />
            </div>

            {/* Purple box (text section) */}
            <div
              className={`flex flex-col gap-4 justify-center items-center lg:h-[450px] lg:w-[687px] bg-tsk-light-2 p-6 rounded-2xl w-full md:w-1/2 text-center relative z-10 -mt-10 md:mt-0 ${
                index % 2 === 0 ? 'md:-ml-16' : 'md:-mr-16'
              }`}
            >
              <h3 className="lg:text-[40px] md:text-3xl text-2xl font-semibold text-tsk-primary-dark">
                {item.title}
              </h3>

              <div className="flex flex-col gap-4 justify-center lg:my-auto">
                {item.stats.map((stat, i) => (
                  <div key={i}>
                    <p className="font-bold lg:text-[34px] text-lg text-tsk-primary-dark">
                      {stat.value}
                    </p>
                    <p className="font-bold text-[17px]">{stat.description}</p>
                  </div>
                ))}
              </div>

              {item.extra && (
                <div className="mt-6">
                  <p className="font-bold">{item.extra.title}</p>
                  <p>{item.extra.description}</p>
                </div>
              )}
            </div>
          </div>

          {/* Curly divider - only show if NOT the last item */}
          {index < impactData.length - 1 && (
            <div className="flex justify-center my-0 ">
              <Image
                src="/about-us/curly-divider.png"
                alt="curly divider"
                width={120}
                height={169}
                style={{
                  transform: 'rotate(-0.37deg)',
                  opacity: 1,
                  // top: '36.05px',
                  // left: '39.67px',
                }}
                className="relative"
              />
            </div>
          )}
        </React.Fragment>
      ))}

      {/* Impact Report button */}
      <div className="flex justify-center mt-10">
        <Button className="w-[50%] md:w-[30%] border border-tsk-primary-dark p-6 hover:text-tsk-primary-dark font-extrabold text-[16px] md:text-[20px] cursor-pointer hover:bg-white text-white bg-tsk-primary-dark hover:border-tsk-primary-dark rounded-[15px]">
          Impact Report
        </Button>
      </div>
    </section>
  );
};

export default ImpactMetrics;
