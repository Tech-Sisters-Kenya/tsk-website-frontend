import Image from 'next/image';
import React from 'react';

import PartnerImg1 from '/public/get-involved/partner-1.jpg';
import PartnerImg2 from '/public/get-involved/partner-2.jpg';
import PartnerImg3 from '/public/get-involved/partner-3.jpg';
import MailIcon from '/public/get-involved/mail-icon.svg';
import Button from '@/components/Button';

function GIPartnershipSection() {
  return (
    <section className="min-h-screen min-w-full bg-tsk-light-2 flex justify-center items-center p-12">
      <div className="grid grid-cols-1 xl:grid-cols-[1.2fr_0.4fr_0.8fr] 2xl:grid-cols-[1fr_0.4fr_0.8fr]">
        {/* left section text */}
        <div className="bg-tsk-primary-dark xl:row-start-1 xl:col-span-1 xl:mr-8 2xl:mr-12 p-12 rounded-t-3xl">
          <h1 className="font-body text-tsk-light-1 font-semibold text-5xl leading-[150%] mb-8">
            Would You Like To Partner With Us?
          </h1>
          <p className="font-body text-tsk-light-1 font-semibold text-xl">
            Connect with a vibrant pool of talented women in tech and demonstrate your commitment to
            inclusion. Partner with Tech Sisters Kenya to engage with our active and growing
            community.
          </p>
        </div>

        {/* left section images */}
        <div className="max-w-full h-full xl:row-start-2 xl:col-span-2 bg-tsk-primary-dark xl:mr-8 2xl:mr-12 py-12 px-12 2xl:px-0 rounded-b-3xl xl:rounded-tr-3xl">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 place-items-center">
            <div className="w-full 2xl:w-[80%] h-[280px] rounded-3xl bg-white flex items-center justify-center overflow-hidden">
              <Image src={PartnerImg1} alt="partner img" className="object-cover w-full h-full" />
            </div>
            <div className="w-full 2xl:w-[80%] h-[280px] rounded-3xl bg-white flex items-center justify-center overflow-hidden">
              <Image src={PartnerImg2} alt="partner img" className="object-cover w-full h-full" />
            </div>
            <div className="w-full 2xl:w-[80%] h-[280px] rounded-3xl bg-white flex items-center justify-center overflow-hidden">
              <Image src={PartnerImg3} alt="partner img" className="object-cover w-full h-full" />
            </div>
          </div>
        </div>

        {/* right section icon */}
        <div className="bg-white flex items-center justify-end xl:row-start-1 xl:col-span-1 pl-0 xl:pl-4 mt-8 xl:mt-0 xl:mb-8 2xl:mb-12 rounded-t-3xl xl:rounded-l-3xl xl:rounded-tr-none">
          <Image src={MailIcon} alt="email icon" className="w-full" />
        </div>

        {/* right section content */}
        <div className="flex flex-col justify-evenly bg-white xl:row-start-1 xl:col-span-1 row-span-2 rounded-b-3xl xl:rounded-r-3xl xl:rounded-bl-3xl px-8 pb-12 xl:p-4">
          <div className="font-body font-semibold px-4 pt-12">
            <h2 className="text-black text-4xl mb-8">Partnership Inquiry</h2>
            <p className="text-tsk-primary-dark text-xl">
              Ready to collaborate with Tech Sisters Kenya and empower women in tech? Share your
              details below, and we&apos;ll be in touch to explore opportunities.
            </p>
          </div>

          {/* form section */}
          <form className="flex flex-col gap-4 mt-12 xl:mt-32 px-4">
            <input
              type="email"
              placeholder="Email"
              className="bg-tsk-light-2 rounded-3xl py-4 px-6 placeholder:text-[#45084a]"
            />
            <textarea
              placeholder="Write Your Message Here ..."
              rows={5}
              className="bg-tsk-light-2 rounded-3xl py-4 px-6 placeholder:text-[#45084a]"
            />
            <Button
              variant="primary"
              className="w-fit place-self-center px-12 rounded-lg cursor-pointer"
            >
              <span className="font-bold text-xl">Send</span>
            </Button>
          </form>
        </div>
      </div>
    </section>
  );
}

export default GIPartnershipSection;
