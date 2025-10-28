'use client';

import React from 'react';
import HeroSection from './HeroSection';
// import MissionVision from './MissionVision';
// import CoreValues from './CoreValues';
// import ValueToTechSisters from './ValueToTechSisters';
// import CallToAction from '@/components/CallToAction';
import WhoWeAre from './WhoWeAre';
import OurStory from './OurStory';
import Gallery from '../landing-page/Gallery';
import OurMantra from './OurMantra';

export default function AboutUs() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between mx-8">
      <HeroSection />
      <WhoWeAre />
      <OurStory />
      <OurMantra />
      <Gallery />
      {/* <MissionVision /> */}
      {/* <CoreValues /> */}
      {/* <ValueToTechSisters /> */}
      {/* <CallToAction /> */}
    </main>
  );
}
