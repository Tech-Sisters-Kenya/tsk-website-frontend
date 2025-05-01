'use client';
import Image from 'next/image';
import donate from '../../public/donate-svgrepo-com 1.svg';
import money from '../../public/money-svgrepo-com 1.svg';
import Button from './Button';
import { useState } from 'react';

export default function Donate() {
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<string | null>(null);
  const [selectedAmount, setSelectedAmount] = useState<string | null>(null);
  const [customAmount, setCustomAmount] = useState('');

  return (
    <section className="h-full w-screen space-y-6 bg-[#F8EBFC]">
      <div className="bg-[#480A69] grid lg:grid-cols-2 grid-cols-1 gap-4 p-8 rounded-2xl md:mx-25 sm:mx-10 mx-8 mt-10">
        <div className="space-y-4">
          <h4 className="text-[#F8EBFC] font-bold text-4xl md:tracking-wide">
            Donate To Our Community
          </h4>
          <p className="text-[#F8EBFC] text-[20px]">
            Your donation empowers the next generation of women in tech. Every contribution helps us
            break barriers, build skills, and create opportunities.
          </p>
        </div>
        <div className="flex justify-center items-center">
          <Image src={donate} alt="donate icon" className="" />
        </div>
      </div>

      <div className="grid lg:grid-cols-4 grid-cols-1 gap-10 bg-white p-4 md:mx-25 sm:mx-10 mx-8 ps-10 rounded-2xl">
        <div className="flex flex-col justify-center col-span-1 gap-2 lg:border-r-1 px-3 border-[#480A69]">
          <Image src={money} alt="money icon" className="place-self-center" />
          <h1 className="sm:text-[20px] text-[18px] font-semibold text-center">
            Monetary donations
          </h1>
          <p className="text-[#480A69] sm:font-semibold  sm:text-center">
            Help us fund programs, events, and scholarships for young women in tech.
          </p>
        </div>

        <form className="lg:pl-4 col-span-3 flex flex-col justify-center gap-4">
          <span className="flex items-center flex-wrap w-full gap-8">
            <input
              type="text"
              placeholder="Name"
              className="bg-[#F8EBFC] rounded-2xl p-2 placeholder-[#480A69] focus:outline-none sm:w-2/5 w-full"
            />
            <input
              type="email"
              placeholder="Email"
              className="bg-[#F8EBFC] rounded-2xl p-2 placeholder-[#480A69] focus:outline-none sm:w-2/5 w-full"
            />
          </span>

          <span>
            <input type="radio" name="anonymous" /> Anonymous
          </span>

          <span className="w-full flex items-center flex-wrap gap-5">
            {['KES 500', 'KES 1000', 'KES 2000', 'KES 5000'].map((amount) => (
              <label key={amount} className="text-[#480A69]">
                <input
                  type="radio"
                  name="donationAmount"
                  checked={selectedAmount === amount}
                  onChange={() => {
                    setSelectedAmount(amount);
                    setCustomAmount('');
                  }}
                  className="mr-2"
                />
                {amount}
              </label>
            ))}

            <label className="text-[#480A69]">
              <input
                type="text"
                name="customAmount"
                placeholder="Other"
                value={customAmount}
                onFocus={() => setSelectedAmount(null)}
                onChange={(e) => setCustomAmount(e.target.value)}
                className="bg-[#F8EBFC] rounded-2xl p-2 placeholder-[#480A69] placeholder:text-center focus:outline-none sm:w-[10rem]"
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
                      ? 'bg-[#480A69] text-white'
                      : 'bg-[#F8EBFC] text-[#480A69]'
                  }`}
                />
              ))}
            </label>
          </span>
          <Button className="p-5 w-6/7">
            <span className="text-[16px] font-semibold my-4">Submit Donation</span>
          </Button>
        </form>
      </div>

      <div className="lg:top-16 top-10 flex flex-row justify-center items-center gap-4 lg:gap-0 flex-wrap w-full relative font-semibold md:px-12 sm:px-8 px-5">
        <div className="border-1 bg-white border-[#480A69] rounded-2xl flex flex-col items-center justify-center pb-10 pt-6 md:px-20 px-14 font-semibold text-[20px] lg:z-10 overflow-hidden">
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

        <div className="bg-[#F8EBFC] border-3 border-[#480A69] rounded-2xl text-[20px] p-6 lg:-ml-15 lg:z-20">
          <h1 className="pb-2"> We would love to connect with you!</h1>
          <p>You Can Reach Us At:</p>
          <ul className="flex flex-col gap-2">
            <li>Phone/WhatsApp: +254 xxx xxx xxx</li>
            <li>Email: hello@techsisters.org</li>
          </ul>
          <p className="py-2">Or</p>
          <span>
            Fill In This{' '}
            <a
              href=""
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-[#480A69] border-1 py-1 px-2 rounded-2xl"
            >
              Google Form
            </a>{' '}
          </span>
        </div>
      </div>
    </section>
  );
}
