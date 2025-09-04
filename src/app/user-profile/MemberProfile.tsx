import React from 'react';

const MemberProfile = () => {
  return (
    <div className="flex flex-col gap-2">
      <h1 className="font-body font-medium text-black sm:text-[16px] text-[14px]">
        Tech Sister Profile
      </h1>
      <p className="font-body bg-[#EBDEF1] w-fit px-3 py-1 rounded-2xl sm:text-[16px] text-[14px] font-medium text-tsk-primary-dark">
        You have not have access to this section since you are not a Tech Sister.
      </p>
    </div>
  );
};

export default MemberProfile;
