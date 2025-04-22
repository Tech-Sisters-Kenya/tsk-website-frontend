import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Hero from '@/components/Hero';
import WhoWeAre from '@/components/WhoWeAre';
import OurReach from '@/components/OurReach';

export default function LandingPage() {
  const reachStats = [
    { value: '700+', label: 'Software Developers' },
    { value: '450+', label: 'Data Analysts' },
    { value: '230+', label: 'Cyber Security Enthusiasts' },
    { value: '550+', label: 'Other Tech Fields' },
  ];
  return (
    <div>
      <Navbar />
      <main className="flex min-h-screen flex-col items-center justify-center p-24">
        <Hero />
        <WhoWeAre />
        <OurReach
          title="OUR REACH SO FAR"
          subtitle="A growing community of women building confidence, skills, and careers in tech."
          stats={reachStats}
        />
      </main>
      <Footer />
    </div>
  );
}
