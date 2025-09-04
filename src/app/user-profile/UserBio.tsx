import React from 'react';

const UserBio = () => {
  return (
    <div className="bg-foreground lg:w-[75vw] md:w-[70vw] w-full rounded-2xl px-4 py-8">
      <div className="text-tsk-primary-dark flex flex-col gap-2">
        <h1 className="font-body font-medium sm:text-[20px] text-[18px]">Bio</h1>
        <p className="font-body font-normal sm:text-[17px] text-[15px]">
          Anna is a software engineer passionate about building scalable, user-focused solutions
          that make technology accessible and impactful. With a strong problem-solving mindset and a
          forward-thinking approach, she develops clean, efficient code and collaborates across
          teams to bring ideas to life. She’s committed to continuous learning and creating
          inclusive tech spaces where everyone can thrive.
        </p>
      </div>
    </div>
  );
};

export default UserBio;
