// components/WhoWeAre.tsx
import React from 'react';
import Image1 from '@/assets/whoweare1.svg';
import Image2 from '@/assets/whoweare2.svg';
import Logo from '@/assets/tsk-icon-logo.svg';
import Image from 'next/image';
import BrandsSection from './BrandsSection';
export default function WhoWeAre() {
  return (
    <section className="w-full mt-16 sm:mt-24 lg:mt-32 bg-foreground py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-12">
        {/*Images section */}
        <div className="relative w-full lg:w-2/5 max-w-4xl flex h-[500px] lg:mx-0 mt-32 mb-1">
          <div className="absolute top-0 left-0 z-10 w-[70%] rounded-lg overflow-hidden shadow-lg sm:block">
            <Image
              src={Image1}
              alt=""
              width={150}
              height={50}
              className="w-[300px] h-auto rounded-lg"
            />
          </div>
          <div className="absolute top-[35%] right-0 z-0 w-[70%] rounded-lg overflow-hidden shadow-lg">
            <Image
              src={Image2}
              alt="group photo"
              width={200}
              height={100}
              className="w-[300px] h-auto rounded-lg"
            />
          </div>
          {/* Logo positioned absolutely over the image  */}
          <div className="absolute -top-5 right-8 sm:-top-5 sm:right-16 z-20">
            <Image
              src={Logo}
              alt=""
              width={60}
              height={60}
              className="w-14 h-14 sm:w-20 sm:h-20 object-contain"
            />
          </div>
        </div>
        <div className="max-w-7xl  mx-auto">
          <div className="flex justify-end">
            <div className="max-w-3xl">
              <h2 className="text-3xl md:text-4xl font-bold text-tsk-primary-dark mb-8 text-center font-heading">
                WHO WE ARE
              </h2>
              {/* Mission Section */}
              <div className="space-y-4 max-w-lg ml-auto bg-foreground rounded-lg p-4 mb-6 ">
                <div className="flex overflow-hidden rounded-lg border border-tsk-primary-dark shadow-sm">
                  <div className="bg-tsk-primary-dark rounded-lg px-4 py-6 flex items-center justify-center w-28">
                    <h3 className="text-xl font-bold text-foreground text-center font-heading">
                      Our Mission
                    </h3>
                  </div>
                  <div className="bg-foreground px-4 py-4">
                    <p className="text-gray-700 text-sm md:text-base text-center font-body">
                      To create a supportive and inclusive community where women in tech can grow,
                      network, and find mentorship at every career stage while prioritizing their
                      well-being.
                    </p>
                  </div>
                </div>

                {/* vision section */}
                <div className="flex overflow-hidden rounded-lg border border-tsk-primary-dark shadow-sm">
                  <div className="bg-tsk-primary-dark rounded-lg px-4 py-6 flex items-center justify-center w-28">
                    <h3 className="text-xl font-bold text-foreground text-center font-heading">
                      Our Vision
                    </h3>
                  </div>
                  <div className="bg-foreground px-4 py-4">
                    <p className="text-gray-700 text-sm md:text-base text-center font-body">
                      A Kenya where women are empowered to excel in technology, lead the way in
                      innovation, and drive positive change.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-wrap justify-center gap-3 lg:justify-start">
            {['Core Values', 'Community', 'Empowerment', 'Inclusivity', 'Growth'].map((value) => (
              <span
                key={value}
                className="border border-tsk-primary-dark text-tsk-primary-dark font-body px-4 py-2 rounded-full text-sm font-medium"
              >
                {value}
              </span>
            ))}
          </div>
        </div>
      </div>
      {/*horizontal line */}
      <div className="border-t border-tsk-primary-dark w-full  mx-auto lg:mx-0 mb-6"></div>
      <BrandsSection />
    </section>
  );
}
