'use client';

import Banner from '@/components/Banner';
import Link from 'next/link';
import React from 'react';

export default function CodeOfConduct() {
  return (
    <div className="flex flex-col min-h-screen pb-8 md:pb-16 lg:pb-20 mx-auto text-tsk-primary-dark font-body">
      <div className="w-full">
        <Banner />
      </div>
      <div className="px-8 md:px-20">
        <h1 className="lg:my-28 mt-12 mb-6 lg:mb-6 text-center font-extrabold  text-[22px] md:text-3xl lg:text-[64px]">
          Code Of Conduct
        </h1>
        <p className="my-2">
          <span className="font-bold">Last Updated:</span> 31st Aug 2025
        </p>
        <h2 className="text-[25px]">
          Welcome to <span className="font-bold">Tech Sisters Kenya (TSK)!</span>{' '}
        </h2>
        <p className="my-2">
          {' '}
          We&apos;re a vibrant, inclusive community dedicated to{' '}
          <span className="font-semibold">empowering and uplifting women in tech</span>. This Code
          of Conduct exists to ensure{' '}
          <span className="font-semibold">everyone feels safe, respected, and supported</span> as
          they grow in their tech journeys.
        </p>
        <h2 className="text-xl font-bold mt-4 font-body text-tsk-primary-dark">
          Behavior Expectations
        </h2>
        <p className="my-2">
          To ensure a welcoming and productive environment, all members are expected to:
        </p>
        <ul className="list-disc pl-8 flex flex-col gap-2">
          <li>
            {' '}
            <span className="font-semibold">Be Kind & Respectful:</span> No harassment, bullying, or
            discriminatory language.
          </li>
          <li>
            {' '}
            <span className="font-semibold">Engage Constructively:</span> Share feedback with tact.
            Critique ideas, not people.
          </li>
          <li>
            {' '}
            <span className="font-semibold">Respect Boundaries:</span>
            Respect Boundaries: Ask for consent, especially before private conversations or
            collaboration.
          </li>
          <li>
            {' '}
            <span className="font-semibold"> Be Inclusive:</span>
            Make space for others in conversations and avoid cliques or exclusionary behavior.
          </li>
          <li>
            {' '}
            <span className="font-semibold">Act with Integrity:</span> Be honest and accountable.
            Represent TSK with professionalism.
          </li>
          <li>
            {' '}
            <span className="font-semibold">Support Growth:</span>Support Growth: Mentor, guide, and
            uplift — especially newer members in tech.
          </li>
        </ul>

        <h3 className="text-xl font-bold mt-8 font-body text-tsk-primary-dark">
          {' '}
          Unacceptable Behaviors Include:
        </h3>
        <ul className="list-disc pl-8 flex flex-col gap-2 my-2">
          <li>Hate speech or discriminatory jokes</li>
          <li>Sexual language, advances, or inappropriate DMs</li>
          <li>Dismissing or mocking someone’s background, accent, or identity</li>
          <li>Repeated disruptions or talking over others</li>
          <li>Sharing private content without consent</li>
          <li>Gatekeeping knowledge or shaming beginner questions</li>
        </ul>

        <h2 className="text-xl font-bold mt-8 my-2 font-body text-tsk-primary-dark">
          Reporting Concerns & Community Safety
        </h2>
        <p className="flex flex-col gap-2">
          <span>If you witness behavior that violates this Code of Conduct, please speak up.</span>
          <span>We take all concerns seriously and will respond appropriately.</span>
        </p>
        <h3 className="text-[22px] font-semibold mt-4">You can report via:</h3>
        <ul className="list-disc pl-6">
          <li>
            <span className="font-medium">Email: </span>{' '}
            <Link href="mailto:techsisterskenya@gmail.com" className="underline font-bold">
              {' '}
              techsisterskenya@gmail.com
            </Link>
          </li>
        </ul>

        <h4 className="text-xl font-bold mt-8 font-body text-tsk-primary-dark my-2">
          Confidentiality & Action
        </h4>
        <p>
          All reports are handled with care and discretion. Only the core team responsible for
          handling community safety will have access to reports. We aim to respond within 3–5 days
          and will keep you informed throughout the process.
        </p>

        <h2 className="text-xl font-bold mt-8 font-body my-2">
          Final Note: Building This Together
        </h2>
        <p>
          This community is built on{' '}
          <span className="font-semibold">trust, collaboration, and respect</span>. If actions that
          violate this Code occur, the leadership team may take steps
        </p>
        <h4 className="font-body text-xl font-bold mt-8 my-2">Handling Violations</h4>
        <p> Depending on the severity and context of the issue, we may respond with:</p>
        <ul className="list-disc pl-8 flex flex-col gap-2 my-2">
          <li>A reminder or clarification of guidelines</li>
          <li>A private conversation to listen and reflect</li>
          <li>A temporary removal from the platform or event</li>
          <li>Permanent removal (for repeated or harmful violations)</li>
        </ul>
        <br />
        <p className="mt-4 font-semibold font-body sm:text-2xl text-xl text-center xl:w-2/3 sm:w-4/5 mx-auto">
          Thank you for helping us build a respectful, inclusive, and powerful community of Tech
          Sisters!
        </p>
      </div>
    </div>
  );
}
