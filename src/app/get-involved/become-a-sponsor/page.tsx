import React from 'react';
import Form from './Form';
import BrandsSection from '../../landing-page/BrandsSection';
import TopCard from '../TopCard';

export default function SponsorUs() {
  return (
    <section className="py-24 px-10 lg:px-20">
      <div className="w-full flex justify-center items-center mx-auto mt-10 ">
        <TopCard />
      </div>

      <div className="text-center mt-12 text-tsk-primary-dark">
        <h1 className="font-black font-heading text-5xl">Support Our Initiatives!</h1>
        <h3 className="font-heading font-bold text-3xl mt-4">
          Your support today shapes tomorrow&apos;s stories.
        </h3>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-12 mt-20 text-tsk-primary-dark">
        <div>
          <h2 className="font-heading font-semibold text-3xl">Let&apos;s grow impact, together</h2>
          <p className="font-body font-medium text-xl mt-4">
            When you support Tech Sisters Kenya, you&apos;re not just funding programs; you&apos;re
            standing beside women who are daring to build, learn, and lead in tech.
          </p>
          <div className="font-body font-medium text-xl mt-4">
            Your support makes room for:
            <ul className="list-disc pl-6 mt-4">
              <li>
                <span className="font-bold">Voices to be heard: </span> Every event, workshop, or
                mentorship circle exists because someone like you chose to back it.
              </li>
              <li className="mt-4">
                <span className="font-bold">Dreams to be built: </span> Your sponsorship helps
                create opportunities for women who might otherwise be left out of the tech story.
              </li>
              <li className="mt-4">
                <span className="font-bold">Communities to thrive: </span> Together, we&apos;re
                shaping a future where women in Kenya and Africa feel seen, supported, and ready to
                shine in the whole Tech Ecosytem.
              </li>
            </ul>
          </div>
          <div className="font-body font-medium text-xl mt-8">
            In return, we make sure people know:
            <ul className="list-disc pl-6 mt-4">
              <li>
                <span className="font-bold">You care - </span> your brand is seen where it matters,
                aligned with inclusion and real change.
              </li>
              <li className="mt-4">
                <span className="font-bold">You belong - </span> you&apos;re part of a movement that
                values connection as much as innovation.
              </li>
              <li className="mt-4">
                <span className="font-bold">You&apos;re remembered - </span> every Tech Sister who
                grows through our programs will carry your support as part of their story.
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
