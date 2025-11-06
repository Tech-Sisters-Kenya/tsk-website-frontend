import React from 'react';
import Form from './Form';
import BrandsSection from '../BrandsSection';
import TopCard from '../TopCard';

export default function PartnerWithUs() {
  return (
    <section className="py-24 px-10 lg:px-28">
      <div className="w-full sm:w-1/2 mx-auto mt-10 ">
        <TopCard />
      </div>

      <div className="text-center mt-12 text-tsk-primary-dark">
        <h1 className="font-black font-heading text-5xl">Partner With Us!</h1>
        <h3 className="font-heading font-bold text-3xl mt-4">
          Great things happen when we build together.
        </h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mt-20 text-tsk-primary-dark">
        <div>
          <h2 className="font-heading font-semibold text-3xl">
            Let&apos;s dream and build, side by side
          </h2>
          <p className="font-body font-medium text-xl mt-4">
            Partnership, to us, is about sharing a journey creating spaces where women in tech can
            grow, connect, and shine and we believe the best things happen when hearts and ideas
            come together 💜
          </p>
          <div className="font-body font-medium text-xl mt-4">
            When you partner with Tech Sisters Kenya, you&apos;re helping us:
            <ul className="list-disc pl-6 mt-4">
              <li>
                <span className="font-bold">Open doors: </span> together we can co-host events, run
                initiatives, and share resources that reach women who need them most.
              </li>
              <li className="mt-4">
                <span className="font-bold">Share knowledge: </span> your expertise and voice can
                spark inspiration, confidence, and new opportunities.
              </li>
              <li className="mt-4">
                <span className="font-bold">Build bridges: </span> with your support, we connect
                communities, ideas, and people who might never have crossed paths otherwise.
              </li>
            </ul>
          </div>
          <div className="font-body font-medium text-xl mt-8">
            And in return, you&apos;ll find:
            <ul className="list-disc pl-6 mt-4">
              <li>
                <span className="font-bold">Shared impact: </span> every initiative we do together
                becomes a story of what&apos;s possible when collaboration leads.
              </li>
              <li className="mt-4">
                <span className="font-bold">A lasting presence: </span> your contribution lives on
                in the programs, events, and lives we touch together.
              </li>
              <li className="mt-4">
                <span className="font-bold">Real connections: </span> with women in tech, mentors,
                and fellow changemakers who believe in the same future you do.
              </li>
            </ul>
          </div>
        </div>
        <div>
          <Form />
        </div>
      </div>

      <div className="mt-12">
        <BrandsSection />
      </div>
    </section>
  );
}
