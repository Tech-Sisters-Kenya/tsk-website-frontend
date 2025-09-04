import React from 'react';

const ProfessionalInfo = () => {
  return (
    <div className="bg-foreground md:w-3/5 w-full rounded-2xl px-4 py-8 font-body">
      <div className="flex flex-col gap-3">
        <h1 className="font-body sm:text-[20px] text-[18px] text-tsk-primary-dark font-medium">
          Occupation(s)
        </h1>
        <span className="flex items-center lg:gap-4 gap-2 sm:pl-4 pl-2">
          <h2 className="font-normal sm:text-[17px] text-[15px]">Software Engineer</h2>
          <p className="font-normal sm:text-[16px] text-[14px] text-[#036A10] bg-[#E1FFE5] px-2 py-0.5 rounded-2xl">
            3 years
          </p>
        </span>
      </div>

      <div className="font-body sm:mt-6 mt-4 flex flex-col sm:gap-4 gap-2 text-tsk-primary-dark">
        <h1 className="opacity-50 font-medium sm:text-[20px] text-[18px]">Skills</h1>
        {/* <ul className="">
          <li></li>
        </ul> */}
        <p className="sm:ml-4 ml-2 bg-[#EBDEF1] w-fit px-3 py-1 rounded-2xl sm:text-[16px] text-[14px] font-medium">
          You have not added skills yet
        </p>
        <p className="sm:pl-4 pl-2 sm:text-[14px] text-[12px] font-medium">
          Go to profiles tab or settings to add skills
        </p>
      </div>
    </div>
  );
};

export default ProfessionalInfo;
