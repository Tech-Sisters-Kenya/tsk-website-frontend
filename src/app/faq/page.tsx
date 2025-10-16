'use client';

import React from 'react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import Link from 'next/link';

export default function faq() {
  return (
    <div className="flex flex-col justify-center items-center min-h-screen pb-8 md:pb-16 lg:pb-20">
      <h1 className="lg:my-28 mt-12 mb-6 pt-24 md:pt-28 lg:pt-12 lg:mb-6 text-center font-extrabold  text-[22px] md:text-3xl lg:text-5xl">
        FREQUENTLY ASKED QUESTIONS
      </h1>
      <Accordion
        type="single"
        collapsible
        // defaultValue="item-1"
        className="p-2 md:p-4 w-[95%] md:w-[90%] lg:w-[60%] flex flex-col gap-4 md:gap-6"
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
            <p>
              You can register through our Member Registration Form available on the website through
              the{' '}
              <Link
                href={'/get-involved'}
                className="text-tsk-primary-dark font-bold hover:text-tsk-primary "
              >
                &apos;Get Involved&apos;
              </Link>{' '}
              page. Once submitted, you&apos;ll get access to our Slack community, events, and
              updates.
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
                className="text-tsk-primary-dark font-bold hover:text-tsk-primary "
              >
                &apos;Member Registration Form&apos;
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
              No, joining{' '}
              <span className="text-tsk-primary-dark font-bold">Tech Sisters Kenya</span> is
              completely free. Our aim is to make tech communities more accessible and inclusive for
              all women.
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
              indicate your interest when registering, or reach out to us via the{' '}
              <Link
                href={'/get-involved'}
                className="text-tsk-primary-dark font-bold hover:text-tsk-primary "
              >
                &apos;Volunteer Interest Form page&apos;
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
              Yes! We’re open to partnerships that align with our values. Kindly reach out to us via
              our{' '}
              <Link
                href={'/get-involved'}
                className="text-tsk-primary-dark font-bold hover:text-tsk-primary "
              >
                Partnership Form
              </Link>{' '}
              or email us directly at techsisterskenya@gmail.com. .
            </p>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="item-10" className="border border-[#45084a] rounded-2xl p-2">
          <AccordionTrigger className="font-medium text-xl text-tsk-primary-dark">
            10. Where can I stay updated about events and announcements?
          </AccordionTrigger>
          <AccordionContent>
            <p>
              Once you join, you&apos;ll be added to our{' '}
              <Link
                href="https://linktr.ee/techsisterskenya"
                className="text-tsk-primary-dark font-bold hover:text-tsk-primary "
              >
                <span className="text-tsk-primary-dark font-bold">Slack community</span>
              </Link>
              . Follow our #events channel for events updates. You can also follow us on our socials
              for public updates. View Our social pages on our{' '}
              <Link
                href="https://linktr.ee/techsisterskenya"
                className="text-tsk-primary-dark font-bold hover:text-tsk-primary "
              >
                Linktree.
              </Link>{' '}
            </p>
          </AccordionContent>
        </AccordionItem>

        <h1 className="lg:my-12 md:pt-12 pt-10 text-center font-extrabold text-2xl md:text-3xl lg:text-5xl">
          TECH-RELATED FAQS
        </h1>

        <AccordionItem value="item-11" className="border border-[#45084a] rounded-2xl p-2">
          <AccordionTrigger className="font-medium text-xl text-tsk-primary-dark">
            1. Will event recordings be shared?
          </AccordionTrigger>
          <AccordionContent>
            <p>
              No, we currently do{' '}
              <span className="text-tsk-primary-dark font-bold">
                not record most of our sessions
              </span>
              . We encourage members to attend live and take their own notes. However, from time to
              time, we share resources or slides provided by our speakers in the respective Slack
              channels.
            </p>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="item-12" className="border border-[#45084a] rounded-2xl p-2">
          <AccordionTrigger className="font-medium text-xl text-tsk-primary-dark">
            2. How do I join the Tech Sisters Kenya Slack workspace?
          </AccordionTrigger>
          <AccordionContent>
            <p>
              The link to join our Slack workspace is{' '}
              <span className="text-tsk-primary-dark font-bold">
                attached directly on the registration page
              </span>{' '}
              - no need to wait for a confirmation message. If you experience any issues accessing
              it, please reach out via our{' '}
              <Link
                href={'/contact'}
                className="text-tsk-primary-dark font-bold hover:text-tsk-primary "
              >
                “Contact Us”
              </Link>{' '}
              form or email us. .
            </p>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="item-13" className="border border-[#45084a] rounded-2xl p-2">
          <AccordionTrigger className="font-medium text-xl text-tsk-primary-dark">
            3. I&apos;m new to Slack. How should I engage in the channels?
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
            4. How can I update or edit my member information?
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
            5. What should I do if I experience inappropriate behavior or harassment?
          </AccordionTrigger>
          <AccordionContent className="">
            <p>
              We take community safety seriously. Please report any concerning behavior through our{' '}
              <span className="text-tsk-primary-dark font-bold">
                Code of Conduct Reporting Form
              </span>{' '}
              or directly to a moderator in the Slack workspace. All reports are handled with
              confidentiality.
            </p>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="item-16" className="border border-[#45084a] rounded-2xl p-2">
          <AccordionTrigger className="font-medium text-xl text-tsk-primary-dark">
            6. Do I need to attend all events to stay in the community?
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
            7. Are there any rules for attending events online or in person?
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
