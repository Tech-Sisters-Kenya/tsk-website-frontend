'use client';

import React from 'react';
import { Users, Network, TrendingUp, Lightbulb } from 'lucide-react';

interface ValueCardProps {
  icon: React.ReactNode;
  title: string;
}

const ValueCard: React.FC<ValueCardProps> = ({ icon, title }) => (
  <div className="flex flex-col items-center p-6">
    <div className="text-white mb-4">{icon}</div>
    <h3 className="text-white text-lg font-medium font-heading">{title}</h3>
  </div>
);

const CoreValues = () => {
  const values = [
    {
      icon: <Users size={40} />,
      title: 'Inclusivity',
    },
    {
      icon: <Network size={40} />,
      title: 'Community',
    },
    {
      icon: <TrendingUp size={40} />,
      title: 'Growth',
    },
    {
      icon: <Lightbulb size={40} />,
      title: 'Empowerment',
    },
  ];

  return (
    <section className="w-full py-16 px-4 bg-tsk-primary-dark">
      <div className="container mx-auto">
        <h2 className="text-2xl md:text-3xl font-bold font-heading text-white text-center mb-12">
          OUR CORE VALUES
        </h2>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {values.map((value, index) => (
            <ValueCard key={index} icon={value.icon} title={value.title} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default CoreValues;
