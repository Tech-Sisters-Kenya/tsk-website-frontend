import React from 'react';
import Hero from '@/app/landing-page/Hero';
import WhoWeAre from '@/app/landing-page/WhoWeAre';
import OurReach from '@/app/landing-page/OurReach';
import WhatWeDo from '@/app/landing-page/WhatWeDo';
import Gallery from '@/app/landing-page/Gallery';
import ExploreBlogs from '@/app/landing-page/ExploreBlogs';
import Testimonials from '@/app/landing-page/Testimonials';
import CallToAction from '@/components/CallToAction';

export default function LandingPage() {
  const reachStats = [
    {
      value: '700+',
      label: (
        <>
          Software
          <br />
          Developers
        </>
      ),
    },
    {
      value: '450+',
      label: (
        <>
          Data
          <br />
          Analysts
        </>
      ),
    },
    {
      value: '230+',
      label: (
        <>
          CyberSecurity
          <br />
          Enthusiasts
        </>
      ),
    },
    {
      value: '550+',
      label: (
        <>
          Other
          <br />
          TechFields
        </>
      ),
    },
  ];
  return (
    <main className="flex min-h-screen flex-col items-center justify-center">
      <Hero />
      <WhoWeAre />
      <OurReach
        title="OUR REACH SO FAR"
        subtitle={
          <>
            A growing community of women building <br />
            confidence, skills, and careers in tech.
          </>
        }
        stats={reachStats}
      />
      <WhatWeDo />
      <Gallery />
      <ExploreBlogs />
      <Testimonials />
      <CallToAction />
    </main>
  );
}
