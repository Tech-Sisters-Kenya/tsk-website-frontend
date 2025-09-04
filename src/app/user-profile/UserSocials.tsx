import React from 'react';
import linkedin from '@/../public/linkedin.svg';
import slack from '@/../public/slack.svg';
import x from '@/../public/x.svg';
import Image from 'next/image';

const UserSocials = () => {
  return (
    <div className="md:w-2/5 w-full bg-foreground rounded-2xl px-4 py-8">
      <h1 className="">Socials</h1>
      <div className="flex flex-col gap-4">
        <div className="w-full border-[1px] border-tsk-primary-dark rounded-xl grid grid-cols-5 gap-5">
          <span className="col-span-1 bg-tsk-light-1 rounded-l-xl flex items-center overflow-hidden">
            <Image src={linkedin} alt="linkedin icon" className="" />
          </span>
          <p className="col-span-4 mx-2 my-1.5 w-full font-body sm:text-[17px] text-[15px] text-tsk-primary-dark font-normal text-center">
            Jane Doe
          </p>
        </div>

        <div className="w-full border-[1px] border-tsk-primary-dark rounded-xl grid grid-cols-5 gap-5">
          <span className="col-span-1 bg-tsk-light-1 rounded-l-xl flex justify-center items-center overflow-hidden">
            <Image src={x} alt="x icon" />
          </span>
          <p className="col-span-4 mx-2 my-1.5 w-full font-body sm:text-[17px] text-[15px] text-tsk-primary-dark font-normal text-center">
            Jane Doe
          </p>
        </div>
        <div className="w-full border-[1px] border-tsk-primary-dark rounded-xl grid grid-cols-5 gap-5">
          <span className="col-span-1 bg-tsk-light-1 rounded-l-xl flex justify-center items-center overflow-hidden">
            <Image src={slack} alt="slack icon" className="" />
          </span>
          <p className="col-span-4 mx-2 my-1.5 w-full font-body sm:text-[17px] text-[15px] text-tsk-primary-dark font-normal text-center">
            Jane Doe
          </p>
        </div>
      </div>
    </div>
  );
};

export default UserSocials;
