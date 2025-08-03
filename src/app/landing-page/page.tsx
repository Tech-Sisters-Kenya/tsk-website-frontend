'use client';

import React, { useEffect } from 'react';
import Hero from '@/app/landing-page/Hero';
import WhoWeAre from '@/app/landing-page/WhoWeAre';
import OurReach from '@/app/landing-page/OurReach';
import WhatWeDo from '@/app/landing-page/WhatWeDo';
import Gallery from '@/app/landing-page/Gallery';
import ExploreBlogs from '@/app/landing-page/ExploreBlogs';
import Testimonials from '@/app/landing-page/Testimonials';
import CallToAction from '@/components/CallToAction';
import { useAuthStore } from '@/stores/useAuthStore';

export default function LandingPage() {
  const setAuthData = useAuthStore((state) => state.setAuthData);

  useEffect(() => {
    const url = new URL(window.location.href);
    const token = url.searchParams.get('token');

    if (token) {
      url.searchParams.delete('token');
      window.history.replaceState({}, '', url.pathname);

      fetch('https://api.techsisterskenya.org/api/auth/users/current-user', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((res) => {
          if (!res.ok) {
            throw new Error('Failed to fetch user');
          }
          return res.json();
        })
        .then((data) => {
          setAuthData(token, {
            id: data.id,
            name: data.name,
            email: data.email,
            role: data.role,
          });
        })
        .catch((err) => {
          console.error('Auth error:', err);
        });
    }
  }, [setAuthData]);

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
