'use client';

import React from 'react';
import HeroSection from './HeroSection';
// import MissionVision from './MissionVision';
// import CoreValues from './CoreValues';
// import ValueToTechSisters from './ValueToTechSisters';
// import CallToAction from '@/components/CallToAction';
import WhoWeAre from './WhoWeAre';
import OurStory from './OurStory';
import OurGallery from './OurGallery';
import OurMantra from './OurMantra';
import JoinUsOptions from './JoinUsOptions';

export default function AboutUs() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between">
      <HeroSection />
      <WhoWeAre />
      <OurStory />
      <OurMantra />
      <OurGallery />
      <JoinUsOptions />
      {/* <MissionVision /> */}
      {/* <CoreValues /> */}
      {/* <ValueToTechSisters /> */}
      {/* <CallToAction /> */}
    </main>
  );
}
