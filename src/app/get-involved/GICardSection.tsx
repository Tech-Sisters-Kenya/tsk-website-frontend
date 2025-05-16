import React from 'react';
import Image from 'next/image';

import GICard from './GICard';
import LinkedInLogo from '@/assets/linkedin-logo.svg';
import SlackLogo from '@/assets/slack-logo.svg';
import InstagramLogo from '@/assets/instagram-logo.svg';
import XLogo from '@/assets/x-logo.svg';
import GICardImg from '@/assets/GICardImg.svg';
import ConnectorLines from './ConnectorLines';
import Link from 'next/link';

const COLOR_MAP = {
  linkedin: {
    bgColor: 'bg-[#7BA2C7]',
    linkColor: 'text-[#007DF2]',
    borderColor: 'border-[#007DF2]',
    hoverColor: 'hover:bg-[#007DF2] hover:text-white',
  },
  instagram: {
    bgColor: 'bg-[#900E3187]',
    linkColor: 'text-[#900E31]',
    borderColor: 'border-[#900E31]',
    hoverColor: 'hover:bg-[#900E31] hover:text-white',
  },
  slack: {
    bgColor: 'bg-[#0A891B8F]',
    linkColor: 'text-[#0A891B]',
    borderColor: 'border-[#0A891B]',
    hoverColor: 'hover:bg-[#0A891B] hover:text-white',
  },
  x: {
    bgColor: 'bg-[#000000B2]',
    linkColor: 'text-[#900E31]',
    borderColor: 'border-[#900E31]',
    hoverColor: 'hover:bg-[#900E31] hover:text-white',
  },
};

const SOCIAL_MEDIA = [
  {
    title: 'LinkedIn',
    icon: LinkedInLogo,
    link: 'https://www.linkedin.com/company/tech-sisters-kenya/',
    handle: 'Conversations',
    description: 'Vibe with fellow Tech Sisters!',
    colorKey: COLOR_MAP['linkedin'],
  },
  {
    title: 'TSK Instagram Handle',
    icon: InstagramLogo,
    link: 'https://www.instagram.com/techsisterskenya/',
    handle: 'Posts',
    description: 'See our TSK community!',
    colorKey: COLOR_MAP['instagram'],
  },
  {
    title: 'TSK Slack Channel',
    icon: SlackLogo,
    link: 'https://forms.gle/oKQPkaG4QC2vaRUp9',
    handle: 'Ideas',
    description: 'Deep tech talks happen here!',
    colorKey: COLOR_MAP['slack'],
  },
  {
    title: 'TSK X Handle',
    icon: XLogo,
    link: 'https://x.com/TechSistersKE',
    handle: 'Tweets',
    description: 'Check out our community updates!',
    colorKey: COLOR_MAP['x'],
  },
];

function GICardSection() {
  return (
    <section className="w-full mx-auto text-tsk-primary-dark mt-12 p-12 flex justify-center">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative">
        {/* first col cards */}
        <div className="flex flex-col gap-6 md:gap-16 items-center order-1">
          {SOCIAL_MEDIA.slice(0, 2).map((social, index) => (
            <GICard key={index} {...social} />
          ))}
        </div>

        {/* connector lines */}
        <ConnectorLines left="22%" top="50%" style="h-[100px] w-[1px] -translate-y-1/2" />
        <ConnectorLines left="10%" top="50%" style="h-[100px] w-[1px] -translate-y-1/2" />
        <ConnectorLines left="50%" top="6%" style="h-px w-[60%] -translate-x-1/2" />
        <ConnectorLines left="50%" top="18%" style="h-px w-[60%] -translate-x-1/2" />

        {/* image */}
        <div className="relative flex flex-col gap-6 justify-center items-center order-3 md:order-2">
          <div>
            <Image src={GICardImg} alt="Card Image" />
          </div>
          <Link
            href="/about-us"
            className="bg-tsk-primary-dark hover:opacity-80 transition-opacity delay-75 ease-in-out py-2 px-4  text-white rounded-lg cursor-pointer"
          >
            <span className="font-bold text-xl">Learn More</span>
          </Link>
        </div>

        {/* connector lines */}
        <ConnectorLines right="22%" top="50%" style="h-[100px] w-[1px] -translate-y-1/2" />
        <ConnectorLines right="10%" top="50%" style="h-[100px] w-[1px] -translate-y-1/2" />
        <ConnectorLines left="50%" bottom="6%" style="w-[60%] h-px -translate-x-1/2" />
        <ConnectorLines left="50%" bottom="18%" style="w-[60%] h-px -translate-x-1/2" />

        {/* second col cards */}
        <div className="flex flex-col gap-6 md:gap-16 items-center order-2 md:order-3">
          {SOCIAL_MEDIA.slice(2, 4).map((social, index) => (
            <GICard key={index} {...social} />
          ))}
        </div>
      </div>
    </section>
  );
}

export default GICardSection;
