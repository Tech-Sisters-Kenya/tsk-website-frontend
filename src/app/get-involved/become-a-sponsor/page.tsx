import React from 'react';
import Card from '../Card';
import Form from './Form';
import BrandsSection from '../BrandsSection';
import { cardContent } from '../info';

export default function SponsorUs() {
  return (
    <section className="py-24 px-10 lg:px-28">
      <h1 className="mt-14 font-heading font-bold md:font-black text-[32px] md:text-5xl leading-[100%] md:leading-[150%] text-tsk-primary-dark text-center">
        Become a Tech Sisters Kenya Sponsor
      </h1>

      <div className="hidden md:block h-[1px] bg-tsk-primary-dark opacity-30 mx-28 mt-14" />

      <div className="flex flex-col items-center mt-14 px-0 md:px-28">
        <div className="text-center font-body text-tsk-primary-dark font-semibold text-[14px] md:text-2xl leading-[150%] space-y-8">
          <p>Sponsor with Tech Sisters</p>
          <p>Empower the Next Generation in Tech?</p>
          <p>
            Tech Sisters is a community that empowers ladies in technology through events,
            workshops, mentorship, and networking. Fostering an inclusive and innovative tech
            ecosystem where all talent can thrive.
          </p>
        </div>

        <div className="space-y-12 mt-20">
          <Card cardDetails={cardContent[0]} />
          <Card cardDetails={cardContent[1]} />
        </div>
      </div>

      <div className="px-0 md:px-28">
        <Form />
      </div>

      <div className="mt-12">
        <BrandsSection />
      </div>
    </section>
  );
}
