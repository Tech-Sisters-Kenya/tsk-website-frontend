'use client';

import React from 'react';

export default function CodeOfConduct() {
  return (
    <div className="flex flex-col min-h-screen pb-8 md:pb-16 lg:pb-20 container mx-auto text-tsk-primary-dark">
      <h1 className="lg:my-28 mt-12 mb-6 pt-24 md:pt-28 lg:pt-12 lg:mb-6 text-center font-extrabold  text-[22px] md:text-3xl lg:text-5xl">
        CODE OF CONDUCT
      </h1>
      <h2 className="text-[25px] font-bold">Welcome to Tech Sisters Kenya (TSK)</h2>
      <p>
        {' '}
        We&apos;re a vibrant, inclusive community dedicated to{' '}
        <span className="font-semibold">empowering and uplifting women in tech</span>. This Code of
        Conduct exists to ensure{' '}
        <span className="font-semibold">everyone feels safe, respected, and supported</span> as they
        grow in their tech journeys.
      </p>
      <h2 className="text-[25px] font-bold mt-8">👩🏽‍💻 Behavior Expectations</h2>
      <p>To ensure a welcoming and productive environment, all members are expected to:</p>
      <ul className="list-disc pl-6">
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

      <h3 className="text-[22px] font-semibold mt-6">🚫 Unacceptable Behaviors Include:</h3>
      <ul className="list-disc pl-6">
        <li>Hate speech or discriminatory jokes</li>
        <li>Sexual language, advances, or inappropriate DMs</li>
        <li>Dismissing or mocking someone’s background, accent, or identity</li>
        <li>Repeated disruptions or talking over others</li>
        <li>Sharing private content without consent</li>
        <li>Gatekeeping knowledge or shaming beginner questions</li>
      </ul>

      <h2 className="text-[25px] font-bold mt-8">Our Mantra</h2>
      <p>
        We are <span className="font-semibold">Bold, LOUD,</span> and{' '}
        <span className="font-semibold">UNSTOPPABLE.</span>{' '}
      </p>
      <h3 className="text-[22px] font-semibold mt-4">What it Means to Us</h3>
      <p>
        <span className="font-semibold">Loud:</span> We own our voices. In a world that often tells
        women to shrink or stay silent, we speak up, ask questions, share our stories, and advocate
        for ourselves and each other unapologetically.
      </p>
      <br />
      <p>
        <span className="font-semibold">Bold:</span> We take up space. Whether we&apos;re new to
        tech or leading change in it, we dare to dream big, break barriers, and show up fully as who
        we are even when it&lsquo;s uncomfortable.
      </p>
      <br />
      <p>
        <span className="font-semibold">Unstoppable:</span> We keep moving. Even when things get
        hard. Even when we&apos;re the only woman in the room. We support each other through
        imposter syndrome, career pivots, rejection, and wins because together, we are resilient and
        cannot be held back.
      </p>
      <br />
      <p className="italic">
        This mantra is more than hype: it&apos;s a declaration of{' '}
        <span className="font-semibold">presence, power, and possibility for every</span> Tech
        Sister!{' '}
      </p>

      <h2 className="text-[25px] font-bold mt-8">Reporting Concerns & Community Safety</h2>
      <p>
        If you witness behavior that violates this Code of Conduct, please speak up. We take all
        concerns seriously and will respond appropriately.
      </p>
      <h3 className="text-[22px] font-semibold mt-4">You can report via:</h3>
      <ul className="list-disc pl-6">
        <li>
          <span className="font-semibold">Email: </span>{' '}
          <a href="mailto:techsisterskenya@gmail.com"> 📧 techsisterskenya@gmail.com</a>
        </li>
      </ul>

      <h4 className=" font-semibold mt-6">Confidentiality & Action</h4>
      <p>
        All reports are handled with care and discretion. Only the core team responsible for
        handling community safety will have access to reports. We aim to respond within 3–5 days and
        will keep you informed throughout the process.
      </p>

      <h2 className="text-[25px] font-bold mt-8">Final Note: Building This Together</h2>
      <p>
        This community is built on{' '}
        <span className="font-semibold">trust, collaboration, and respect</span>. If actions that
        violate this Code occur, the leadership team may take steps
      </p>
      <h4 className=" font-semibold mt-6">Handling Violations</h4>
      <p> Depending on the severity and context of the issue, we may respond with:</p>
      <ul className="list-disc pl-6">
        <li>A reminder or clarification of guidelines</li>
        <li>A private conversation to listen and reflect</li>
        <li>A temporary removal from the platform or event</li>
        <li>Permanent removal (for repeated or harmful violations)</li>
      </ul>
      <br />
      <p className="font-semibold">
        Thank you for helping us build a respectful, inclusive, and powerful community of Tech{' '}
      </p>
    </div>
  );
}
