import React from 'react';
import Card from './Card';
import Form from './Form';

const cardContent = [
  {
    title: 'Ways to partner with us',
    content: [
      {
        name: 'Purpose-Driven Alignment',
        descritpion: 'Show your commitment to diversity and inclusion.',
      },
      {
        name: 'Community Visibility',
        descritpion: 'Reach an engaged network of tech talent.',
      },
      {
        name: 'Meaningful Connections',
        descritpion: 'Meet industry leaders and innovators.',
      },
      {
        name: 'Diverse Talent Access',
        descritpion: 'Engage skilled professionals with fresh perspectives.',
      },
    ],
  },
  {
    title: 'Ways to support',
    content: [
      {
        name: 'Event Sponsorship',
        descritpion: 'Conferences, hackathons, networking nights.',
      },
      {
        name: 'Program Sponsorship',
        descritpion: 'Mentorships, workshops, skills programs.',
      },
      {
        name: 'Custom Partnerships',
        descritpion: 'Tailored to your goals and values.',
      },
    ],
  },
];

export default function PartnerWithUs() {
  return (
    <section className="py-24 px-10 md:px-28">
      <h1 className="mt-14 font-heading font-black text-5xl leading-[150%] text-tsk-primary-dark text-center">
        Become a Tech Sisters Kenya Partner
      </h1>

      <div className="h-[1px] bg-tsk-primary-dark opacity-30 mx-28 mt-14" />

      <div className="flex flex-col items-center mt-14 px-0 md:px-28">
        <div className="text-center font-body text-tsk-primary-dark font-semibold text-2xl leading-[150%] space-y-8">
          <p>Partner with Tech Sisters</p>
          <p>Empower the Next Generation in Tech?</p>
          <p>
            Tech Sisters is a community that empowers ladies in technology through events,
            workshops, mentorship, and networking. Fostering an inclusive and innovative tech
            ecosystem where all talent can thrive.
          </p>
        </div>

        <div className="space-y-12 mt-20">
          <Card cardDetails={cardContent[0]} />
          <Card cardDetails={cardContent[1]} />
        </div>
      </div>

      <Form />
    </section>
  );
}
