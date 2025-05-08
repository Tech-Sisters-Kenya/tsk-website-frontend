'use client';

import React from 'react';

interface ValueItemProps {
  title: string;
  description: string;
  isReversed?: boolean;
}

const ValueItem: React.FC<ValueItemProps> = ({ title, description, isReversed = false }) => (
  <div className={`flex flex-col ${isReversed ? 'md:flex-row-reverse' : 'md:flex-row'} my-6 gap-4`}>
    <div className="md:w-1/3 flex items-center justify-center">
      <h3 className="text-tsk-primary-dark text-xl md:text-2xl font-bold font-heading text-center md:text-left">
        {title}
      </h3>
    </div>
    <div className="md:w-2/3 bg-tsk-light-2 p-6 rounded-lg">
      <p className="text-sm md:text-base">{description}</p>
    </div>
  </div>
);

const ValueToTechSisters = () => {
  const valueItems = [
    {
      title: 'Community Support',
      description:
        'Our community offers a space for belonging, collaboration, and collective growth.',
    },
    {
      title: 'Skill Development',
      description:
        'Focused webinars and practical workshops led by expert speakers to help you upskill your technical abilities.',
    },
    {
      title: 'Mentorship',
      description: "Real guidance from women who've walked the path and are here to light yours.",
    },
    {
      title: 'Networking Opportunities',
      description:
        'We host networking events, industry panels, and meetups to connect Tech Sisters with professionals and peers.',
    },
  ];

  return (
    <section className="w-full py-16 px-4">
      <div className="container mx-auto">
        <h2 className="text-2xl md:text-3xl font-bold font-heading text-tsk-primary-dark text-center mb-12">
          Our Value To Tech Sisters
        </h2>

        <div className="space-y-8">
          {valueItems.map((item, index) => (
            <ValueItem
              key={index}
              title={item.title}
              description={item.description}
              isReversed={index % 2 !== 0}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ValueToTechSisters;
