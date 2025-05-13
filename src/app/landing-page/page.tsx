import React from 'react';
import Hero from '@/app/landing-page/Hero';
import WhoWeAre from '@/app/landing-page/WhoWeAre';
import OurReach from '@/app/landing-page/OurReach';
import WhatWeDo from '@/app/landing-page/WhatWeDo';
import Gallery from '@/components/Gallery';
import ExploreBlogs from '@/app/landing-page/ExploreBlogs';
import Testimonials from '@/app/landing-page/Testimonials';
import testimonialShared from '@/data/testimonialShared.json';

export default function LandingPage() {
  const reachStats = [
    { value: '700+', label: 'Software Developers' },
    { value: '450+', label: 'Data Analysts' },
    { value: '230+', label: 'Cyber Security Enthusiasts' },
    { value: '550+', label: 'Other Tech Fields' },
  ];
  return (
    <main className="flex min-h-screen flex-col items-center justify-center lg:p-24">
      <Hero />
      <WhoWeAre />
      <OurReach
        title="OUR REACH SO FAR"
        subtitle="A growing community of women building confidence, skills, and careers in tech."
        stats={reachStats}
      />
      <WhatWeDo />
      <Gallery />
      <ExploreBlogs />
      <Testimonials slides={testimonialShared} />
    </main>
  );
}
