import Image from 'next/image';
import React from 'react';

import PartnerImg1 from '@/assets/partner-img-1.svg';
import PartnerImg2 from '@/assets/partner-img-2.svg';
import PartnerImg3 from '@/assets/partner-img-3.svg';
import MailIcon from '@/assets/mail-icon.svg';
import Button from './Button';

function GIPartnershipSection() {
  return (
    <section className="min-h-screen w-full bg-tsk-light-2 flex justify-center items-center p-12">
      <div className="bg-white rounded-2xl shadow-lg flex flex-col md:flex-row w-full max-w-7xl overflow-hidden">
        {/* Left Section */}
        <div className="bg-tsk-primary-dark flex-1 p-8 flex flex-col gap-6">
          <div>
            <h1 className="font-body text-tsk-light-1 font-semibold text-5xl leading-[150%] mb-8">
              Would You Like To Partner With Us?
            </h1>
            <p className="font-body text-tsk-light-1 font-semibold text-xl">
              Connect with a vibrant pool of talented women in tech and demonstrate your commitment
              to inclusion. Partner with Tech Sisters Kenya to engage with our active and growing
              community.
            </p>
          </div>

          {/* Images */}
          <div className="bg-tsk-primary-dark grid grid-cols-1 md:grid-cols-3 gap-4 justify-items-center  mt-6">
            <Image src={PartnerImg1} alt="partner img" />
            <Image src={PartnerImg2} alt="partner img" />
            <Image src={PartnerImg3} alt="partner img" />
          </div>
        </div>

        {/* Right Section */}
        <div className="flex-1 p-8 flex flex-col gap-6">
          <div className="flex flex-col lg:flex-row">
            <Image src={MailIcon} alt="email icon" className="w-1/3 mx-auto lg:mx-0" />

            <div>
              <h2 className="text-black text-center font-body font-semibold text-4xl mb-8">
                Partnership Inquiry
              </h2>
              <p className="font-body px-6 text-center md:text-left font-semibold text-tsk-primary-dark text-xl">
                Ready to collaborate with Tech Sisters Kenya and empower women in tech? Share your
                details below, and we&apos;ll be in touch to explore opportunities.
              </p>
            </div>
          </div>

          {/* Form */}
          <form className="flex flex-col gap-4 mt-4">
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
