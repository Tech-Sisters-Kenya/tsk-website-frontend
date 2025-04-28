'use client';

import React from 'react';
import Navbar from '@/components/Navbar';
import CallToAction from '@/components/CallToAction';
import Footer from '@/components/Footer';
import HeroSection from './HeroSection';
import MissionVision from './MissionVision';
import CoreValues from './CoreValues';
import ValueToTechSisters from './ValueToTechSisters';

export default function AboutUs() {
  return (
    <div>
      <Navbar />
      <main className="flex min-h-screen flex-col items-center justify-between mx-8">
        <HeroSection />
        <MissionVision />
        <CoreValues />
        <ValueToTechSisters />
      </main>
      <CallToAction />
      <Footer />
    </div>
  );
}
