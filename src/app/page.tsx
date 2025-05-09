import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import CallToAction from '@/components/CallToAction';
import Hero from '@/app/landing-page/Hero';
import WhoWeAre from '@/app/landing-page/WhoWeAre';
import OurReach from '@/app/landing-page/OurReach';

export default function LandingPage() {
  const reachStats = [
    { value: '700+', label: 'Software Developers' },
    { value: '450+', label: 'Data Analysts' },
    { value: '230+', label: 'Cyber Security Enthusiasts' },
    { value: '550+', label: 'Other Tech Fields' },
  ];
  return (
    <main>
      <Navbar />
      <div className="flex min-h-screen flex-col items-center justify-center p-24">
        <Hero />
        <WhoWeAre />
        <OurReach
          title="OUR REACH SO FAR"
          subtitle="A growing community of women building confidence, skills, and careers in tech."
          stats={reachStats}
        />
      </div>
      <CallToAction />
      <Footer />
    </main>
  );
}
