import React from 'react';
import BrandsSection from '../../BrandsSection';
import Card from '../../Card';
import { cardContent } from '../../info';
import { CircleCheck } from 'lucide-react';

function PartnerRegistrationSuccess() {
  return (
    <section className="py-24 px-10 lg:px-28">
      <h1 className="mt-14 font-heading font-bold md:font-black text-[32px] md:text-5xl leading-[100%] md:leading-[150%] text-tsk-primary-dark text-center">
        Become a Tech Sisters Kenya Partner
      </h1>

      <div className="hidden md:block h-[1px] bg-tsk-primary-dark opacity-30 mx-28 mt-14" />

      <div className="flex flex-col items-center mt-14 px-0 md:px-28">
        <div className="text-center font-body text-tsk-primary-dark font-semibold text-[14px] md:text-2xl leading-[150%] space-y-8">
          <p>Partner with Tech Sisters</p>
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

      <div className="px-0 md:px-28 w-full flex flex-col items-center justify-center mt-20">
        <div className="lg:w-2/3 flex flex-col items-center">
          <CircleCheck size={100} color={'#0A891B'} />
          <div className="mt-10 bg-tsk-light-2 px-12 py-8 rounded-2xl text-center font-body text-tsk-primary-dark text-[14px] md:text-xl font-medium leading-[150%]">
            <p>Success! Your information has been submitted.</p>
            <br />
            <p>
              The community admins have received your details and you’ll receive official
              communication from them via email soon.
            </p>
          </div>
        </div>
      </div>

      <div className="mt-12">
        <BrandsSection />
      </div>
    </section>
  );
}

export default PartnerRegistrationSuccess;
