// components/WhoWeAre.tsx
import React from 'react';
import Image1 from '@/assets/whoweare1.svg';
import Image2 from '@/assets/whoweare2.svg';
import Logo from '@/assets/tsk-icon-logo.svg';
import Image from 'next/image';
import BrandsSection from './BrandsSection';
export default function WhoWeAre() {
  return (
    <section className="w-full mt-12 sm:mt-20 md:mt-24 lg:mt-32 bg-foreground py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-10">
        {/*Images section */}
        <div className="relative w-full sm:w-4/5 md:w-3/5 lg:w-2/5 max-w-3xl flex min-h-[300px] h-auto sm:min-h-[400px] lg:min-h-[500px] lg:mx-0 mt-16 sm:mt-24 md:mt-32 mb-1">
          <div className="absolute -top-6 left-0 z-10 w-full rounded-lg lg:-left-[20%] overflow-hidden shadow-lg">
            <Image
              src={Image1}
              alt=""
              width={150}
              height={50}
              className="w-[300px] md:w-[400px] lg:w-[800px] h-auto"
            />
          </div>
          <div className="absolute top-[40%] sm:top-[40%] sm:right-[20%] md:top-[38%] md:-right-[6%] lg:top-[22%] lg:-right-[8%] right-0 z-0 overflow-hidden shadow-lg">
            <Image
              src={Image2}
              alt="group photo"
              width={1200}
              height={800}
              className="w-[300px] md:w-[900px] lg:w-[800px] xl:w-[1100px] h-auto object-cover rounded-lg"
            />
          </div>

          {/* Logo positioned absolutely over the image  */}
          <div className="absolute -top-5 right-8 sm:-top-2 sm:right-16 md:-top-6 md:-right-1 lg:-top-8 lg:right-[8%] z-20">
            <Image
              src={Logo}
              alt=""
              width={60}
              height={60}
              className="w-14 h-14 sm:w-20 sm:h-20 md:h-15 md:w-15 lg:w-18 lg:h-18 object-contain"
            />
          </div>
        </div>
        <div className=" max-w-7xl mx-auto px-4 sm:px-6 lg:px-6">
          <div className="flex flex-col md:flex-row justify-center md:justify-end">
            <div className="w-full md:max-w-3xl">
              <h2 className="text-2xl md:text-4xl sm:text-3xl font-bold text-tsk-primary-dark mb-6 sm:mb-8 text-center md:text-left font-heading">
                WHO WE ARE
              </h2>

              <div className="space-y-4 bg-foreground rounded-lg p-4 sm:p-6 md:p-8 mb-6 max-w-full md:max-w-lg mx-auto md:ml-auto">
                {/* Mission Section */}
                <div className="flex sm:flex-row overflow-hidden rounded-lg border border-tsk-primary-dark shadow-sm">
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
