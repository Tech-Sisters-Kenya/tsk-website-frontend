import React from 'react';
import ProfessionalInfo from './ProfessionalInfo';
import UserBio from './UserBio';
import MemberProfile from './MemberProfile';
import Button from '@/components/Button';
import UserSocials from './UserSocials';

const ProfileDetails = () => {
  return (
    <section className="flex flex-col gap-4 justify-between mt-36 mb-10">
      <div className="flex flex-col gap-4">
        <h1 className="text-[16px] font-body text-black">Your Profile</h1>
        <div className="w-full flex gap-4 md:flex-nowrap flex-wrap">
          <ProfessionalInfo />
          <UserSocials />
        </div>
        <UserBio />
        <MemberProfile />
      </div>
      <div className="lg:mt-20 md:mt-16 sm:mt-12 mt-10">
        <Button className="text-foreground">Become a Tech Sister</Button>
      </div>
    </section>
  );
};

export default ProfileDetails;
