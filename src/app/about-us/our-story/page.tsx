import React from 'react';
import Button from '@/components/Button';
import Link from 'next/link';
import Image from 'next/image';
import timeline1 from '@/assets/timeline1.svg';
import timeline2 from '@/assets/timeline2.svg';
import timeline3 from '@/assets/timeline3.svg';
import timeline4 from '@/assets/timeline4.svg';
import timeline5 from '@/assets/timeline5.svg';
import timeline6 from '@/assets/timeline6.svg';
import timeline7 from '@/assets/timeline7.svg';
import timeline8 from '@/assets/timeline8.svg';
import timeline9 from '@/assets/timeline9.svg';
import timeline10 from '@/assets/timeline10.svg';
import timeline11 from '@/assets/timeline11.svg';
import timeline12 from '@/assets/timeline12.svg';
import timeline13 from '@/assets/timeline13.svg';
import timeline14 from '@/assets/timeline14.svg';
import timeline15 from '@/assets/timeline15.svg';
import timeline16 from '@/assets/timeline16.svg';
import valentineImg from '@/assets/valentine-img.svg';
import valeriaImg from '@/assets/valeria-img.svg';
import realizationImg from '@/assets/realization-img.svg';
import tskLogoBg from '@/assets/tsk-logo-bg.svg';

const OurStory: React.FC = () => {
  const timelineEvents = [
    {
      image: timeline1,
      description:
        'Aug 2023 – Where it began (Met post-bootcamp at a tech event — a spark that inspired the idea for a women-in-tech community).',
    },
    {
      image: timeline2,
      description:
        'Sept 2023 – Mental Health Conversation <strong>Valeria</strong> hosted a space for tech women to hang out and purposely held this presence. (At Achievers Lounge for Techies). <strong>Valentine</strong> joined in, bringing her dream of creating spaces for women in tech.',
    },
    {
      image: timeline3,
      description:
        'Oct 2023 – Official co-founding of <strong>Tech Sisters Kenya (TSK)</strong>, focused on mentorship, growth and holistic empowerment for women in tech.',
    },
    {
      image: timeline4,
      description:
        'Nov 2023 – First Meetup Held our first meetup with <strong>7 attendees</strong>; start of our growing sisterhood.',
    },
    {
      image: timeline5,
      description:
        'Jan 2024 – Visualizing Success Brought together <strong>54 women</strong> to set goals and grow professionally.',
    },
    {
      image: timeline6,
      description:
        'Apr – May 2024 – Mentorship Circle & Coding First <strong>technical mentorship challenge</strong>: 122 signups; 56 active participants.',
    },
    {
      image: timeline7,
      description: 'July – Nov 2024: National presence at conferences and Tech Events.',
    },
    {
      image: timeline8,
      description:
        'July 2024 – Presence at <strong>5 Tech Sisters National Ruby Conference — with an African Ruby community</strong> to increase women participation in Ruby and the conference.',
    },
    {
      image: timeline9,
      description:
        'Dec 2024 – Social & Wellness Events Launched <strong>social and wellness hangouts</strong>, building holistic well-being alongside tech growth, attracting <strong>100+</strong> members.',
    },
    {
      image: timeline10,
      description:
        'Late 2024 – Growth & Recognition Community surpassed <strong>1,600</strong> members and expanded beyond just WhatsApp group to more — a Slack community.',
    },
    {
      image: timeline11,
      description:
        'Jan 2025 – Hosted <strong>Vision Event</strong> with <strong>Google</strong> and <strong>Moringa School</strong>, gathering <strong>84</strong> women for creativity and career growth.',
    },
    {
      image: timeline12,
      description:
        'Feb – Sept 2025 – Continued growth through <strong>webinars and peer mentorship sessions</strong> across Kenya.',
    },
    {
      image: timeline13,
      description:
        'Mar 2025 – Presence at universities supporting young girls to learn about Tech <strong>10 mentorship in JKUAT</strong>.',
    },
    {
      image: timeline14,
      description:
        'Apr 2025 – Invited by <strong>AYA HQ</strong>to join <strong>KILIFI</strong> and <strong>84</strong>ZuAfrque; expanding national partnerships and gained <strong>AYA HQ</strong>AYA HQ recognition for WWEB initiatives.',
    },
    {
      image: timeline15,
      description:
        'Aug 2025 – Partnered with <strong>SoluTech</strong> for the first <strong>Corporate Mentorship Program</strong>, mentoring <strong>15</strong> women.',
    },
    {
      image: timeline16,
      description:
        'Today – <strong>1,850 members</strong>, recognized for its community, initiatives, professional mentorship, and national presence.',
    },
  ];

  return (
    <div className="min-h-screen bg-white mx-8">
      {/* Header */}
      <header className="text-center pt-40 pb-8">
        <h1 className="text-5xl font-bold text-tsk-primary-dark">Our Founding Story</h1>
      </header>

      {/* Meet Valentine Section */}
      <section className="bg-tsk-light-2 px-6 pt-20 md:px-12 rounded-3xl">
        <div className="ml-16">
          <div className="grid md:grid-cols-2 gap-8 pb-8 items-center">
            <div>
              <h2 className="text-5xl font-bold text-tsk-primary-dark mb-2">Meet Valentine</h2>
              <p className="text-tsk-primary-dark font-decorative text-5xl my-12 ml-10">
                The Spark
              </p>

              <h3 className="font-bold text-3xl text-tsk-primary-dark mb-3">
                A Journey of Discovery:
              </h3>
              <ul className="ml-4 font-medium text-lg text-tsk-primary-dark">
                <li>• Former Accountant turned Tech Enthusiast.</li>
                <li>• Discovered coding passion during bootcamp.</li>
                <li>• Felt the need for deeper connection among women in tech.</li>
              </ul>
            </div>
            <div className="-ml-28 -mb-8">
              <div className="flex flex-col md:flex-row">
                <Image
                  src={tskLogoBg}
                  alt="TSK Logo"
                  width={700}
                  height={700}
                  className="-mt-72 ml-8 md:-mt-0 md:-mb-6 md:-ml-12"
                />
                <Image
                  src={valentineImg}
                  alt="Valentine's image"
                  width={700}
                  height={700}
                  className="ml-12"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* The Moment of Realization Section */}
      <section className="py-24 px-6 md:px-12 md:-ml-8">
        <div className="mx-auto">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div className="flex justify-center order-2 md:order-1">
              <div className="flex items-center justify-center">
                <Image src={realizationImg} alt="Realization image" width={300} height={300} />
              </div>
            </div>
            <div className="order-1 md:order-2 md:-ml-16">
              <h2 className="text-5xl font-bold text-tsk-primary-dark mb-2">
                The Moment of Realization
              </h2>
              <p className="text-tsk-primary-dark font-decorative text-7xl mt-6 mb-12">
                Eye-Opening Experiences
              </p>

              <h3 className="font-bold text-tsk-primary-dark mb-3 text-3xl">
                A Journey of Discovery:
              </h3>
              <p className="text-tsk-primary-dark mb-3 font-medium text-lg">
                Tech Lead at Bootcamp, observed less female interactions
                <ul className="ml-4 font-medium text-lg text-tsk-primary-dark">
                  <li>• In her class of 30, only 6 were women</li>
                  <li>
                    • Attended a Google event with 100+ women but still little real connection.
                  </li>
                </ul>{' '}
              </p>
              <p className="text-tsk-primary-dark font-medium text-lg">
                Valentine Realized:
                <br />
                <span className="font-bold text-lg">
                  We need more than just numbers. We need belonging
                </span>
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Meet Valeria Section */}
      <section className="bg-tsk-light-2 px-6 pt-20 md:px-12 rounded-3xl">
        <div className="ml-16">
          <div className="grid md:grid-cols-2 gap-8 pb-8 items-center">
            <div>
              <h2 className="text-5xl font-bold text-tsk-primary-dark mb-2">Meet Valeria</h2>
              <p className="text-tsk-primary-dark font-decorative text-5xl my-12 ml-10">
                A Shared Vision
              </p>

              <h3 className="font-bold text-2xl text-tsk-primary-dark mb-3">
                Crossing Paths At A Google Event
              </h3>
              <ul className="ml-4 font-medium text-lg text-tsk-primary-dark">
                <li>• Valentine meets Valeria both feeling the same loneliness</li>
                <li>• Shared frustration from bootcamp experiences</li>
              </ul>
              <p className="font-bold text-lg text-tsk-primary-dark my-3">
                Sparked a conversation about creating real spaces for women
              </p>
            </div>
            <div className="-ml-28 -mb-24">
              <div className="flex flex-col md:flex-row">
                <Image
                  src={tskLogoBg}
                  alt="TSK Logo"
                  width={700}
                  height={700}
                  className="-mt-72 ml-8 md:-mt-0 md:-mb-6 md:-ml-12"
                />
                <Image
                  src={valeriaImg}
                  alt="Valeria's image"
                  width={480}
                  height={480}
                  className="ml-12 mb-16 "
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action Button */}
      <div className="text-center pt-16 pb-28">
        <Button variant="primary" className="w-fit text-xl">
          Read Our Full Story
        </Button>
      </div>

      {/* Timeline Section */}
      <section className="bg-tsk-light-2 py-12 px-6 md:px-12 -mx-10">
        <div className="max-w-6xl mx-auto pb-12">
          <h2 className="text-4xl font-bold text-tsk-primary-dark text-center mb-12">
            Snapshot Of How Far We&apos;ve Come
          </h2>

          <div className="relative">
            {/* Central vertical line */}
            <div className="absolute left-1/2 top-32 bottom-20 w-[1px] bg-tsk-primary-dark transform -translate-x-1/2 hidden md:block"></div>

            {/* Timeline Items */}
            {timelineEvents.map((event, index) => (
              <div key={index} className="relative mb-4 last:mb-0">
                {/* Mobile Layout - Stack vertically */}
                <div className="md:hidden flex flex-col items-center gap-4">
                  <Image
                    src={event.image}
                    alt={`Timeline event ${index + 1}`}
                    width={120}
                    height={120}
                    className="rounded-lg"
                  />
                  <p
                    className="text-tsk-primary-dark text-sm text-center px-4"
                    dangerouslySetInnerHTML={{ __html: event.description }}
                  ></p>
                </div>

                {/* Desktop Layout - Alternating sides */}
                <div className="hidden md:grid md:grid-cols-2 gap-8 items-center">
                  {index % 2 === 0 ? (
                    <>
                      {/* Image on left, description on right */}
                      <div className="flex justify-end pr-8">
                        <Image
                          src={event.image}
                          alt={`Timeline event ${index + 1}`}
                          width={300}
                          height={300}
                          className="rounded-lg"
                        />
                      </div>
                      <div className="pl-8 pt-12">
                        <p
                          className="text-tsk-primary-dark text-lg font-semibold"
                          dangerouslySetInnerHTML={{ __html: event.description }}
                        ></p>
                      </div>
                    </>
                  ) : (
                    <>
                      {/* Description on left, image on right */}
                      <div className="flex justify-end text-right pr-8 pt-12">
                        <p
                          className="text-tsk-primary-dark text-lg font-semibold"
                          dangerouslySetInnerHTML={{ __html: event.description }}
                        ></p>
                      </div>
                      <div className="pl-8 pt-8">
                        <Image
                          src={event.image}
                          alt={`Timeline event ${index + 1}`}
                          width={300}
                          height={300}
                          className="rounded-lg"
                        />
                      </div>
                    </>
                  )}
                </div>

                {/* Horizontal line with dots on both ends */}
                <div className="hidden md:block absolute left-1/2 top-32 transform -translate-x-1/2 -translate-y-1/2 w-20">
                  {/* Full horizontal line spanning both sides */}
                  <div className="absolute top-1/2 left-0 w-full h-[1px] bg-tsk-primary-dark transform -translate-y-1/2"></div>

                  {/* Left dot */}
                  <div className="absolute left-0 top-1/2 transform -translate-y-1/2">
                    <div className="w-2 h-2 bg-tsk-primary-dark rounded-full"></div>
                  </div>

                  {/* Right dot */}
                  <div className="absolute right-0 top-1/2 transform -translate-y-1/2">
                    <div className="w-2 h-2 bg-tsk-primary-dark rounded-full"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Quote Section */}
      <section className="py-28 px-6">
        <div className="mx-auto text-center">
          <h2 className="text-5xl md:text-8xl font-decorative text-tsk-primary-dark mb-16">
            &quot;If you build the space, you build the spirit.&quot;
          </h2>{' '}
          <Button variant="primary" className="w-fit text-xl">
            <Link href="/get-involved">Get Involved</Link>
          </Button>
        </div>
      </section>
    </div>
  );
};

export default OurStory;
