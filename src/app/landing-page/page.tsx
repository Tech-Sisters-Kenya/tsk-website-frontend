import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import CallToAction from '@/components/CallToAction';
import WhatWeDo from '@/components/WhatWeDo';
import Gallery from '@/components/Gallery';
import ExploreBlogs from '@/components/ExploreBlogs';

export default function LandingPage() {
  return (
    <div>
      <Navbar />
      <main className="flex min-h-screen flex-col items-center justify-center p-24">
        <h1 className="text-4xl font-bold">Landing Page</h1>
      </main>
      <WhatWeDo />
      <Gallery />
      <ExploreBlogs />
      <CallToAction />
      <Footer />
    </div>
  );
}
