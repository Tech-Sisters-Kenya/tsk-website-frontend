'use client';

import React from 'react';

interface ValueItemProps {
  title: string;
  description: string;
  isReversed?: boolean;
}

// Helper function to safely render HTML content
const createMarkup = (html: string) => {
  return { __html: html };
};

const ValueItem: React.FC<ValueItemProps> = ({ title, description, isReversed = false }) => (
  <div className={`flex flex-col ${isReversed ? 'md:flex-row-reverse' : 'md:flex-row'} my-12`}>
    {/* Title container */}
    <div
      className={`z-10 md:w-1/3 flex items-center ${isReversed ? 'md:justify-end' : 'md:justify-start'}`}
    >
      <div
        className={`bg-tsk-light-2 pb-5 mt-12 w-full ${isReversed ? 'md:rounded-r-xl' : 'md:rounded-l-xl'}`}
      >
        <div className={`bg-white ${isReversed ? 'md:rounded-bl-xl' : 'md:rounded-br-xl'}`}>
          <h3
            className="text-tsk-primary-dark text-xl md:text-2xl font-semibold font-heading text-center"
            dangerouslySetInnerHTML={createMarkup(title)}
          ></h3>
        </div>
      </div>
    </div>

    {/* Background and Description container */}
    <div className={`relative ${isReversed ? 'md:pl-8' : 'md:pr-8'} md:w-2/3`}>
      <div
        className={`absolute top-0 ${isReversed ? 'left-0 md:rounded-l-xl md:rounded-tr-xl' : 'right-0 md:rounded-r-xl md:rounded-tl-xl'} w-full h-full bg-tsk-light-2  -z-10`}
      ></div>
      <div className="p-6 flex items-center relative z-10">
        <p
          className={`text-sm text-tsk-primary-dark md:text-base font-semibold ${isReversed ? 'md:mr-8' : 'md:ml-8'}`}
          dangerouslySetInnerHTML={createMarkup(description)}
        ></p>
      </div>
    </div>
  </div>
);

const ValueToTechSisters = () => {
  const valueItems = [
    {
      title: 'Community <br /> Support',
      description:
        'Our community offers a space for belonging, <br /> collaboration, and collective growth.',
    },
    {
      title: 'Skill <br /> Development',
      description:
        'Focused webinars and practical workshops led by <br /> expert speakers to help you upskill your technical <br /> abilities.',
    },
    {
      title: 'Mentorship',
      description:
        "Real guidance from women who've walked the <br /> path and are here to light yours.",
    },
    {
      title: 'Networking <br /> Opportunities',
      description:
        'We host networking events, industry panels, and <br /> meetups to connect Tech Sisters with professionals <br /> and peers.',
    },
  ];

  return (
    <section className="w-full py-16 px-4 md:px-48">
      <div className="container mx-auto">
        <h2 className="text-2xl md:text-5xl font-semibold font-heading text-tsk-primary-dark text-center my-20">
          Our Value To Tech Sisters
        </h2>

        <div className="space-y-16">
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
