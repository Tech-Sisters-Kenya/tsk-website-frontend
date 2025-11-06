'use client';

import React from 'react';
// import Image from 'next/image';
// import InclusivityIcon from '@/assets/inclusivity-icon.svg';
// import CommunityIcon from '@/assets/community-icon.svg';
// import GrowthIcon from '@/assets/growth-icon.svg';
// import EmpowermentIcon from '@/assets/empowerment-icon.svg';

// interface ValueCardProps {
//   icon: string;
//   title: string;
// }

// const ValueCard: React.FC<ValueCardProps> = ({ icon, title }) => (
//   <div className="flex flex-col items-center">
//     <div className="text-tsk-light-1 mb-4">
//       <Image src={icon} alt={`${title} icon`} width={70} height={70} />
//     </div>

//     <h3 className="text-tsk-light-1 text-3xl font-medium font-heading">{title}</h3>
//   </div>
// );

const CoreValues = () => {
  // const values = [
  //   {
  //     icon: InclusivityIcon,
  //     title: 'Inclusivity',
  //   },
  //   {
  //     icon: CommunityIcon,
  //     title: 'Community',
  //   },
  //   {
  //     icon: GrowthIcon,
  //     title: 'Growth',
  //   },
  //   {
  //     icon: EmpowermentIcon,
  //     title: 'Empowerment',
  //   },
  // ];

  return (
    <section className="w-full py-8 px-10 bg-tsk-primary-dark">
      <div className="container mx-auto">
        <h2 className="text-2xl md:text-3xl font-semibold font-heading text-tsk-light-1 text-center mb-12">
          OUR CORE VALUES
        </h2>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
          {/* {values.map((value, index) => (
            <ValueCard key={index} icon={value.icon} title={value.title} />
          ))} */}
        </div>
      </div>
    </section>
  );
};

export default CoreValues;
