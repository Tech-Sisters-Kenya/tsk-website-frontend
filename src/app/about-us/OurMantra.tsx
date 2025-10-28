'use client';

import React from 'react';
import { Card, CardDescription, CardTitle, CardHeader } from '@/components/ui/card';

const OurMantra = () => {
  return (
    <div className="py-8 mt-10 lg:mt-20 w-screen text-tsk-primary-dark text-center">
      <p className="font-bold text-3xl md:text-5xl pb-8 pt-4">Our Mantra</p>
      <p className="font-medium text-[16px] md:text-[20px] mb-10">
        We are united by the spirit of being
        <br />
        Bold, Loud and Unstoppable
      </p>

      {/* ✅ Responsive grid layout */}
      <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-3 gap-8 px-4 md:px-12 lg:px-20">
        {/* Card 1 */}
        <Card className="bg-tsk-light-2 rounded-2xl">
          <CardHeader className="pt-8">
            <CardTitle className="font-bold text-2xl md:text-4xl pb-4">BOLD</CardTitle>
            <p className="font-decorative text-4xl">We show up!</p>
            <CardDescription className="font-medium text-[16px] md:text-[20px]">
              Whether we’re new to tech or leading change in it, we dare to dream big, break
              barriers, and show up fully as who we are even when it’s uncomfortable.
            </CardDescription>
          </CardHeader>
        </Card>

        {/* Card 2 */}
        <Card className="bg-tsk-light-2 rounded-2xl">
          <CardHeader className="pt-8">
            <CardTitle className="font-bold text-2xl md:text-4xl pb-4">LOUD</CardTitle>
            <p className="font-decorative text-4xl">We own our voices!</p>
            <CardDescription className="font-medium text-[16px] md:text-[20px]">
              In a world that often tells women to shrink or stay silent, we speak up, ask
              questions, share our stories, and advocate for ourselves and each other
              unapologetically.
            </CardDescription>
          </CardHeader>
        </Card>

        {/* Card 3 */}
        <Card className="bg-tsk-light-2 rounded-2xl">
          <CardHeader className="pt-8">
            <CardTitle className="font-bold text-2xl md:text-4xl pb-4">UNSTOPPABLE</CardTitle>
            <p className="font-decorative text-4xl">We keep moving!</p>
            <CardDescription className="font-medium text-[16px] md:text-[20px]">
              Even when things get hard. Even when we’re the only woman in the room. We support each
              other through imposter syndrome, career pivots, rejection, and wins because together,
              we are resilient and cannot be held back.
            </CardDescription>
          </CardHeader>
        </Card>
      </div>
    </div>
  );
};

export default OurMantra;
