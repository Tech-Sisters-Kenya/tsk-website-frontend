'use client';

import React from 'react';
import Image from 'next/image';
import donate from '../../../public/donate-svgrepo-com 1.svg';
import money from '../../../public/money-svgrepo-com 1.svg';
import email from '../../../public/Vector.svg';
import Button from '../../components/Button';
import { useState } from 'react';

export default function Donate() {
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<string | null>(null);
  const [selectedAmount, setSelectedAmount] = useState<string | null>(null);
  const [customAmount, setCustomAmount] = useState('');

  return (
    <section className="h-full space-y-6 bg-tsk-light-2 px-12 pt-12 mb-20">
      <div className="bg-tsk-primary-dark grid lg:grid-cols-2 grid-cols-1 gap-4 p-8 rounded-2xl mt-10">
        <div className="space-y-4">
          <h4 className="text-tsk-light-2 font-bold text-4xl md:tracking-wide">
            Donate To Our Community
          </h4>
          <p className="text-tsk-light-2 text-[20px]">
            Your donation empowers the next generation of women in tech. Every contribution helps us
            break barriers, build skills, and create opportunities.
          </p>
        </div>
        <div className="flex justify-center items-center">
          <Image src={donate} alt="donate icon" className="" />
        </div>
      </div>

      <div className="w-full flex justify-around flex-wrap gap-10 bg-white p-4 xl:pr-28 px-6 rounded-2xl">
        <div className="xl:w-1/5 w-full flex flex-col justify-center gap-2 px-3 border-tsk-primary-dark">
          <Image src={money} alt="money icon" className="place-self-center" />
          <h1 className="sm:text-[20px] text-[18px] font-semibold text-center">
            Monetary donations
          </h1>
          <p className="text-tsk-primary-dark sm:font-semibold  sm:text-center">
            Help us fund programs, events, and scholarships for young women in tech.
          </p>
        </div>

        <div className="xl:block hidden w-[1px] bg-tsk-primary-dark xl:-ml-20" />

        <form className="flex flex-col justify-center gap-4">
          <span className="flex justify-between flex-wrap w-full gap-4">
            <input
              type="text"
              placeholder="Name"
              className="bg-tsk-light-2 rounded-2xl py-2 px-4 placeholder-tsk-primary-dark focus:outline-none sm:w-[45%] w-full"
            />
            <input
              type="email"
              placeholder="Email"
              className="bg-tsk-light-2 rounded-2xl p-2  px-4 placeholder-tsk-primary-dark focus:outline-none sm:w-[45%] w-full"
            />
          </span>

          <span>
            <input type="radio" name="anonymous" className="accent-tsk-primary-dark" /> Anonymous
          </span>

          <span className="w-full flex items-center flex-wrap gap-5">
            {['KES 500', 'KES 1000', 'KES 2000', 'KES 5000'].map((amount) => (
              <label key={amount} className="text-tsk-primary-dark">
                <input
                  type="radio"
                  name="donationAmount"
                  checked={selectedAmount === amount}
                  onChange={() => {
                    setSelectedAmount(amount);
                    setCustomAmount('');
                  }}
                  className="mr-2 accent-tsk-primary-dark"
                />
                {amount}
              </label>
            ))}

            <label className="text-tsk-primary-dark">
              <input
                type="text"
                name="customAmount"
                placeholder="Other"
                value={customAmount}
                onFocus={() => setSelectedAmount(null)}
                onChange={(e) => setCustomAmount(e.target.value)}
                className="bg-tsk-light-2 rounded-2xl p-2 placeholder-tsk-primary-dark placeholder:text-center focus:outline-none sm:w-[10rem]"
              />
            </label>
          </span>

          <span className="space-y-2">
            <h1>Choose payment method</h1>
            <label className="flex items-center flex-wrap gap-4">
              {['M-Pesa', 'PayPal', 'Bank Transfer'].map((method) => (
                <input
                  key={method}
                  type="button"
                  value={method}
                  onClick={() => setSelectedPaymentMethod(method)}
                  className={`${'px-5 py-2 rounded-2xl font-bold cursor-pointer transition-all'} ${
                    selectedPaymentMethod === method
                      ? 'bg-tsk-primary-dark text-white'
                      : 'bg-tsk-light-2 text-tsk-primary-dark'
                  }`}
                />
              ))}
            </label>
          </span>
          <Button className="p-5 w-5/7">
            <span className="text-[16px] font-semibold my-4">Submit Donation</span>
          </Button>
        </form>
      </div>

      <div className="lg:top-16 top-10 flex flex-row justify-center items-center gap-4 lg:gap-0 flex-wrap w-full relative font-semibold md:px-12 sm:px-8 px-5">
        <div className="border-[1px] border-tsk-primary-dark bg-foreground rounded-2xl flex flex-col items-center justify-center pb-10 pt-6 md:px-20 px-14 font-semibold text-[20px] overflow-hidden lg:z-10">
          <h1 className="pb-5 text-center">Contact Us About Your Donation</h1>
          <p>Are you looking to donate:</p>
          <ul className="list-disc sm:place-items-center">
            <li>Laptops and gadgets?</li>
            <li>Books or learning materials?</li>
            <li>Mentorship or training time?</li>
            <li>Tech event spaces or workshops?</li>
            <li>Software licenses or online courses?</li>
          </ul>
        </div>

        <div className="border-[2px] border-tsk-primary-dark text-tsk-primary-dark bg-tsk-light-2 rounded-2xl text-[20px] p-6 px-16 lg:z-20 lg:-ml-16 flex flex-col items-center justify-center">
          <h1 className="pb-4 font-decorative font-light text-3xl">
            {' '}
            We would love to connect with you!
          </h1>
          <Image src={email} alt="email icon" className="" />
          <p>You Can Reach Us At:</p>
          <ul className="flex flex-col gap-2">
            <li>Email: hello@techsisters.org</li>
          </ul>
          <p className="py-2">Or</p>
          <span>
            Fill In This{' '}
            <a
              href=""
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-tsk-primary-dark border-[1px] border-tsk-primary-dark bg-foreground py-1 px-4 rounded-2xl"
            >
              Google Form
            </a>{' '}
          </span>
        </div>
      </div>
    </section>
  );
}
