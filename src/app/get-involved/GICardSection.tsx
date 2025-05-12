import React from 'react';
import Image from 'next/image';

import GICard from './GICard';
import LinkedInLogo from '@/assets/linkedin-logo.svg';
import SlackLogo from '@/assets/slack-logo.svg';
import InstagramLogo from '@/assets/instagram-logo.svg';
import XLogo from '@/assets/x-logo.svg';
import GICardImg from '@/assets/GICardImg.svg';
import Button from '@/components/Button';
import ConnectorLines from './ConnectorLines';

function GICardSection() {
  return (
    <section className="w-full mx-auto text-tsk-primary-dark mt-12 p-12 flex justify-center">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative">
        {/* first col cards */}
        <div className="flex flex-col gap-6 md:gap-16 items-center order-1">
          <GICard
            cardTitle="LinkedIn"
            bgColor="#7BA2C7"
            icon={LinkedInLogo}
            handle="Conversations"
            description="Vibe with fellow Tech Sisters!"
            linkColor="#007DF2"
          />
          <GICard
            cardTitle="TSK Instagram Handle"
            bgColor="#900E3187"
            icon={InstagramLogo}
            handle="Posts"
            description="See our TSK community!"
            linkColor="#900E31"
          />
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
          <Button variant="primary" className="rounded-lg cursor-pointer">
            <span className="font-bold text-xl">Learn More</span>
          </Button>
        </div>

        {/* connector lines */}
        <ConnectorLines right="22%" top="50%" style="h-[100px] w-[1px] -translate-y-1/2" />
        <ConnectorLines right="10%" top="50%" style="h-[100px] w-[1px] -translate-y-1/2" />
        <ConnectorLines left="50%" bottom="6%" style="w-[60%] h-px -translate-x-1/2" />
        <ConnectorLines left="50%" bottom="18%" style="w-[60%] h-px -translate-x-1/2" />

        {/* second col cards */}
        <div className="flex flex-col gap-6 md:gap-16 items-center order-2 md:order-3">
          <GICard
            cardTitle="TSK Slack Channel"
            bgColor="#0A891B8F"
            icon={SlackLogo}
            handle="Ideas"
            description="Deep tech talks happen here!"
            linkColor="#0A891B"
          />
          <GICard
            cardTitle="TSK X Handle"
            bgColor="#000000B2"
            icon={XLogo}
            handle="Tweets"
            description="Check out our community updates!"
            linkColor="#900E31"
          />
        </div>
      </div>
    </section>
  );
}

export default GICardSection;
