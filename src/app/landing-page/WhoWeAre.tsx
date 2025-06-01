// components/WhoWeAre.tsx
import React from 'react';
import Image1 from '@/assets/whoweare1.svg';
import Image2 from '@/assets/whoweare2.svg';
import Logo from '@/assets/tsk-icon-logo.svg';
import Image from 'next/image';
import BrandsSection from './BrandsSection';
import InclusivityIcon from '@/assets/inclusivity.svg';
import CommunityIcon from '@/assets/community.svg';
import GrowthIcon from '@/assets/growth.svg';
import EmpowermentIcon from '@/assets/empowerment.svg';
import { StaticImageData } from 'next/image';

export default function WhoWeAre() {
  const coreValues = [
    { label: 'Inclusivity', src: InclusivityIcon },
    { label: 'Community', src: CommunityIcon },
    { label: 'Growth', src: GrowthIcon },
    { label: 'Empowerment', src: EmpowermentIcon },
  ];
  return (
    <section className="w-full mt-12 sm:mt-20 md:mt-24 lg:mt-32 bg-foreground py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-6 sm:gap-8 md:gap-10 lg:gap-12">
        {/*Images section */}
        <div className="relative w-full lg:w-2/5 max-w-4xl flex h-[500px] lg:mx-0 mt-32 mb-4">
          <div className=" z-10 overflow-hidden sm:block">
            <Image
              src={Image1}
              alt="image"
              width={150}
              height={50}
              className="absolute -top-10 right-16 w-[440px] sm:w-[300px] md:w-[380px] lg:w-[440px] h-[310px] sm:h-[200px] md:h-[250px] lg:h-[310px] rounded-[20px] sm:rounded-lg md:rounded-xl lg:rounded-[20px]"
            />
          </div>
          <div className="z-0  overflow-hidden">
            <Image
              src={Image2}
              alt="group photo"
              width={200}
              height={100}
              className="absolute bottom-14 left-16 w-[472px] sm:w-[320px] md:w-[400px] lg:w-[472px] h-[227px] sm:h-[150px] md:h-[180px] lg:h-[227px] rounded-lg"
            />
          </div>
          {/* Logo positioned absolutely over the image  */}
          <div className="z-20">
            <Image
              src={Logo}
              alt="logo"
              width={60}
              height={60}
              className="absolute -top-16 -right-1 w-[110px] sm:w-[120px] md:w-[130px] lg:w-[110px] h-[110px] sm:h-[120px] md:h-[130px] lg:h-[140px]"
            />
          </div>
        </div>
        <div className=" max-w-7xl mx-auto px-4 sm:px-6 lg:px-6 mt-10">
          <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-6 flex flex-col md:flex-row justify-start">
            <div className="w-full md:max-w-3xl">
              <h2 className="text-5xl md:text-7xl sm:text-6xl font-semibold text-tsk-primary-dark text-right font-heading pb-6">
                WHO WE ARE
              </h2>

              <div className="ml-16 sm:ml-18 md:ml-20 space-y-6 bg-foreground rounded-lg p-4 sm:p-6 md:p-8 lg:p-10 mb-20 max-w-full md:max-w-lg lg:max-w-xl mx-auto">
                {/* Mission Section */}
                <div className="flex sm:flex-row overflow-hidden rounded-2xl border border-tsk-primary-dark shadow-sm">
                  <div className="bg-tsk-primary-dark rounded-2xl px-2 sm:px-4 md:px-5 flex items-center justify-center w-24 sm:28 md:w-32">
                    <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-foreground text-center font-heading">
                      Our Mission
                    </h3>
                  </div>
                  <div className="bg-foreground px-4 sm:px-5 md:px-7 py-2 sm:py-3 md:py-4">
                    <p className="text-gray-700 text-[14px] sm:text-xm md:text-sm font-semibold font-body leading-snug">
                      <p className="ml-0">To create a supportive and inclusive community</p>
                      <p className="ml-1">where women in tech can grow, network,and</p>
                      <p className="ml-2">find mentorship at every career stage, while</p>
                      <p className="ml-3">prioritizing their well-being.</p>
                    </p>
                  </div>
                </div>

                {/* vision section */}
                <div className="flex sm:flex-row overflow-hidden rounded-2xl border border-tsk-primary-dark shadow-sm">
                  <div className="bg-tsk-primary-dark rounded-2xl px-3 sm:px-4 md:px-5  flex items-center justify-center w-24 sm:28 md:w-32">
                    <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-foreground text-center font-heading">
                      Our Vision
                    </h3>
                  </div>
                  <div className="bg-foreground px-2 sm:px-3 md:px-4 py-2 sm:py-3 md:py-4">
                    <p className="text-gray-700 text-[14px] sm:text-xs md:text-sm text-center font-semibold font-body">
                      A Kenya where women are empowered to excel in technology, lead the way in
                      innovation, and drive positive change.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* Core Values Section */}

          <div className="flex flex-col items-center -mt-10">
            <h3 className="text-base sm:text-sm md:text-lg border border-tsk-primary-dark rounded-full text-tsk-primary-dark mb-6 px-6 py-1  font-body font-semibold text-center">
              Core Values
            </h3>
            <div className="flex flex-row justify-center gap-4 sm:gap-6 md:gap-8 lg:gap-10 mb-14">
              {coreValues.map((value: { label: string; src: StaticImageData }, index: number) => (
                <div key={index} className="flex flex-col items-center">
                  <div className="w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 mb-6">
                    <Image
                      src={value.src}
                      alt={value.label}
                      width={40}
                      height={40}
                      className="text-tsk-primary-dark w-full h-full object-contain"
                    />
                  </div>
                  <p className="text-center font-semibold text-tsk-primary-dark text-sm sm:text-base font-body">
                    {value.label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      {/*horizontal line */}
      <div className="border-t border-tsk-primary-dark w-full  mx-auto lg:mx-0 mb-6"></div>
      <BrandsSection />
    </section>
  );
}
