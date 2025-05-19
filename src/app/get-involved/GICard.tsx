import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

interface GICardProps {
  title: string;
  description: string;
  handle: string;
  icon: string;
  link: string;
  colorKey: {
    bgColor: string;
    linkColor: string;
    borderColor: string;
    hoverColor: string;
  };
}

function GICard({ title, description, icon, handle, link, colorKey }: GICardProps) {
  const { bgColor, linkColor, borderColor, hoverColor } = colorKey;

  return (
    <div className="w-full max-w-xs bg-white z-10 border border-tsk-primary-dark px-4 py-2 rounded-2xl text-center ">
      <div className={`my-12 text-white py-5 rounded-3xl w-[80%] mx-auto relative ${bgColor}`}>
        <p className="text-sm font-semibold">{title}</p>
        <span className="absolute left-0">
          <Image src={icon} alt={`${title} icon`} width={28} height={28} />
        </span>
      </div>
      <div className="font-body">
        <h3 className="font-black text-2xl">{handle}</h3>
        <p className="font-medium">{description}</p>
      </div>
      <div className="mt-12 mb-8">
        <Link
          href={link}
          target="_blank"
          className={`border ${borderColor} ${linkColor} px-3 py-1 rounded-2xl font-semibold ${hoverColor} transition-colors duration-200 ease-in-out`}
        >
          {title === 'TSK Slack Channel' ? 'Join' : 'Follow'}
        </Link>
      </div>
    </div>
  );
}

export default GICard;
