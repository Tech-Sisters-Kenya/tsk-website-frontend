'use client';

import React from 'react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import Link from 'next/link';
import Banner from '@/components/Banner';

export default function Faq() {
  return (
    <div className="flex flex-col justify-center items-center min-h-screen pb-8 md:pb-16 lg:pb-20 text-tsk-primary-dark font-medium">
      <div className="w-full">
        <Banner />
      </div>
      <h1 className="lg:my-28 mt-10 mb-6 lg:mb-6 text-center font-extrabold  text-[22px] md:text-3xl lg:text-[64px] px-8">
        Frequently Asked Questions
      </h1>
      <Accordion
        type="single"
        collapsible
        // defaultValue="item-1"
        className="p-2 md:p-4 w-[95%] sm:w-4/5 flex flex-col gap-4 md:gap-6 px-8"
      >
        <AccordionItem value="item-1" className="border border-[#45084a] rounded-2xl p-2">
          <AccordionTrigger className="font-medium text-xl text-tsk-primary-dark">
            1. What is Tech Sisters Kenya?
          </AccordionTrigger>
          <AccordionContent>
            <p>
              <span className="text-tsk-primary-dark font-bold">Tech Sisters Kenya</span> is a
              community of women in tech dedicated to growth, mentorship, learning, and creating
              impact together. We offer support through workshops, networking, and shared
              opportunities in technology.
            </p>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="item-2" className="border border-[#45084a] rounded-2xl p-2">
          <AccordionTrigger className="font-medium text-xl text-tsk-primary-dark">
            2. Who can join Tech Sisters Kenya?
          </AccordionTrigger>
          <AccordionContent>
            <p>
              Any woman interested in technology - whether you&apos;re a student, professional,
              career switcher, or enthusiast - is welcome to join! We believe everyone has something
              to learn and something to offer.
            </p>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="item-3" className="border border-[#45084a] rounded-2xl p-2">
          <AccordionTrigger className="font-medium text-xl text-tsk-primary-dark">
            3. How do I become a member?
          </AccordionTrigger>
          <AccordionContent>
            <p className="font-medium">
              You can register through our{' '}
              <Link
                href={'/become-a-tech-sister'}
                className="text-tsk-primary-dark font-bold hover:text-tsk-primary underline"
              >
                Become a Tech Sister;
              </Link>{' '}
              member sign up form available on the website. Once submitted, you’ll get access to our
              Slack , WhatsApp Community, events, and updates
            </p>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="item-4" className="border border-[#45084a] rounded-2xl p-2">
          <AccordionTrigger className="font-medium text-xl text-tsk-primary-dark">
            4. Is Tech Sisters Kenya only for developers?
          </AccordionTrigger>
          <AccordionContent>
            <p>
              Not at all! We welcome women from all areas of tech, including product managers,
              designers, data analysts, DevOps, researchers, and more.
            </p>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="item-5" className="border border-[#45084a] rounded-2xl p-2">
          <AccordionTrigger className="font-medium text-xl text-tsk-primary-dark">
            5. How do I sign up as a mentor or mentee?
          </AccordionTrigger>
          <AccordionContent>
            <p>
              When filling out the{' '}
              <Link
                href={'/get-involved'}
                className="text-tsk-primary-dark font-bold hover:text-tsk-primary underline"
              >
                Member Registration Form
              </Link>{' '}
              , indicate whether you&apos;re interested in being a mentor, mentee, or both.
              We&apos;ll use this information to match and support members during mentorship cycles.
            </p>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="item-6" className="border border-[#45084a] rounded-2xl p-2">
          <AccordionTrigger className="font-medium text-xl text-tsk-primary-dark">
            6. Is there a fee to join the community?
          </AccordionTrigger>
          <AccordionContent>
            <p>
              Not at the moment, joining Tech Sisters Kenya is completely free. Our aim is to make
              tech communities more accessible and inclusive for all women.
            </p>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="item-7" className="border border-[#45084a] rounded-2xl p-2">
          <AccordionTrigger className="font-medium text-xl text-tsk-primary-dark">
            7. What kind of events do you host?
          </AccordionTrigger>
          <AccordionContent>
            <p>
              We host technical workshops, soft skills sessions, career talks, and
              community-building events - both online and in-person.
            </p>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="item-8" className="border border-[#45084a] rounded-2xl p-2">
          <AccordionTrigger className="font-medium text-xl text-tsk-primary-dark">
            8. How can I volunteer or support the community?
          </AccordionTrigger>
          <AccordionContent>
            <p>
              You can volunteer as a speaker, mentor, event organizer, or contribute content. Just
              indicate your interest when registering, or reach out to us via email with your
              interest at the {''}
              <Link
                href="mailto:techsisterskenya@gmail.com"
                className="text-tsk-primary-dark font-bold hover:text-tsk-primary underline"
              >
                techsisterskenya@gmail.com
              </Link>
              .
            </p>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="item-9" className="border border-[#45084a] rounded-2xl p-2">
          <AccordionTrigger className="font-medium text-xl text-tsk-primary-dark">
            9. Can I collaborate with Tech Sisters Kenya as a partner or sponsor?
          </AccordionTrigger>
          <AccordionContent>
            <p>
              Yes! We&apos;re open to partnerships that align with our values. Kindly reach out to
              us via our Get Involved Page sections as fit or email us directly at{' '}
              <Link
                href="mailto:techsisterskenya@gmail.com"
                className="text-tsk-primary-dark font-bold hover:text-tsk-primary underline"
              >
                techsisterskenya@gmail.com
              </Link>{' '}
              .
            </p>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="item-10" className="border border-[#45084a] rounded-2xl p-2">
          <AccordionTrigger className="font-medium text-xl text-tsk-primary-dark">
            10. Where can I stay updated about events and announcements?
          </AccordionTrigger>
          <AccordionContent>
            <p className="flex flex-col gap-1">
              <span>
                Once you join, you&apos;ll be added to our Slack community. Follow our #events
                channel for events updates.
              </span>
              <span>You can also follow us on our socials for public updates.</span>
              <span className="mt-2">
                View Our social pages:{' '}
                <Link href="https://linktr.ee/techsisterskenya" className="underline font-bold">
                  https://linktr.ee/techsisterskenya
                </Link>
              </span>
            </p>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="item-11" className="border border-[#45084a] rounded-2xl p-2">
          <AccordionTrigger className="font-medium text-xl text-tsk-primary-dark">
            11. Will event recordings be shared?
          </AccordionTrigger>
          <AccordionContent>
            <p className="flex flex-col gap-1">
              <span>
                No, we currently do not record most of our sessions . We encourage members to attend
                live and take their own notes.
              </span>
              <span>
                However, from time to time, we share resources or slides provided by our speakers in
                the respective Slack channels.
              </span>
            </p>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="item-12" className="border border-[#45084a] rounded-2xl p-2">
          <AccordionTrigger className="font-medium text-xl text-tsk-primary-dark">
            12. How do I join the Tech Sisters Kenya Slack workspace?
          </AccordionTrigger>
          <AccordionContent>
            <p className="flex flex-col gap-1">
              <span>
                The link to join our Slack workspace is attached directly on the registration page -
                no need to wait for a confirmation message.
              </span>
              <span>
                If you experience any issues accessing it, please reach out via our “Contact Us”
                form or email us. .
                <Link
                  href="mailto:techsisterskenya@gmail.com"
                  className="text-tsk-primary-dark font-bold hover:text-tsk-primary underline"
                >
                  techsisterskenya@gmail.com
                </Link>{' '}
              </span>
            </p>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="item-13" className="border border-[#45084a] rounded-2xl p-2">
          <AccordionTrigger className="font-medium text-xl text-tsk-primary-dark">
            13. I&apos;m new to Slack. How should I engage in the channels?
          </AccordionTrigger>
          <AccordionContent>
            <p>We have a simple Slack etiquette:</p>
            <ul className="list-disc pl-6">
              <li>
                Introduce yourself in{' '}
                <span className="text-tsk-primary-dark font-bold">#introductions</span>.
              </li>
              <li>Keep conversations respectful and inclusive. </li>
              <li>
                Use specific channels (e.g.{' '}
                <span className="text-tsk-primary-dark font-bold">#careerpreparation, #events</span>{' '}
                ) for related topics.
              </li>
              <li>Reach out to moderators if unsure where to post.</li>
            </ul>
            <p className="mt-4">
              New members also get a brief Slack welcome guide to help you get started!
            </p>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="item-14" className="border border-[#45084a] rounded-2xl p-2">
          <AccordionTrigger className="font-medium text-xl text-tsk-primary-dark">
            14. How can I update or edit my member information?
          </AccordionTrigger>
          <AccordionContent className="">
            <p>
              We are currently building a member portal for profile edits. For now, if you&apos;d
              like to update your mentor/mentee status or contact info, please reach out to us
              directly via Slack or email.
            </p>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="item-15" className="border border-[#45084a] rounded-2xl p-2">
          <AccordionTrigger className="font-medium text-xl text-tsk-primary-dark">
            15. What should I do if I experience inappropriate behavior or harassment?
          </AccordionTrigger>
          <AccordionContent className="">
            <p className="flex flex-col gap-1">
              <span>
                We take community safety seriously. Please report any concerning behaviour through
                our email{' '}
                <Link href="mailto:techsisterskenya@gmail.com" className="underline font-bold">
                  techsisterskenya@gmail.com
                </Link>{' '}
                or directly to a community manager or your channel lead in the Slack workspace.
              </span>
              <span>
                All reports are handled with confidentiality and proof of case will be required for
                extended action/support.
              </span>
            </p>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="item-16" className="border border-[#45084a] rounded-2xl p-2">
          <AccordionTrigger className="font-medium text-xl text-tsk-primary-dark">
            16. Do I need to attend all events to stay in the community?
          </AccordionTrigger>
          <AccordionContent>
            <p>
              Not at all. You’re free to attend events based on your interest and availability. We
              encourage active participation but understand everyone’s schedules differ.
            </p>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem
          value="item-17"
          className="border border-[#45084a] rounded-2xl p-2 mb-4 md:mb-6 lg:mb-8"
        >
          <AccordionTrigger className="font-medium text-xl text-tsk-primary-dark">
            17. Are there any rules for attending events online or in person?
          </AccordionTrigger>
          <AccordionContent>
            {' '}
            <p>Yes, we expect members to:</p>
            <ul className="list-disc pl-6">
              <li>Join on time</li>
              <li>Mute when not speaking</li>
              <li>Respect the speakers and other participants</li>
              <li>Avoid sharing links or content without context</li>
            </ul>
            <p className="mt-2">
              For in-person events, we&apos;ll also share specific guidelines in advance (e.g.,
              location, safety, accessibility).
            </p>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
}
