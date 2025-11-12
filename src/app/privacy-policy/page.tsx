'use client';

import React from 'react';
import Link from 'next/link';
import Banner from '@/components/Banner';

export default function PrivacyPolicy() {
  return (
    <div className="flex flex-col min-h-screen pb-8 md:pb-16 lg:pb-20 mx-auto text-tsk-primary-dark font-body font-medium">
      <div className="w-full">
        <Banner />
      </div>
      <div className="lg:px-32 md:px-24 sm:px-20 px-10">
        <h1 className="lg:my-28 mt-12 mb-6 lg:mb-6 text-center font-extrabold  text-4xl md:text-5xl lg:text-[64px]">
          Privacy Policy
        </h1>
        <p className="my-4">
          {' '}
          <span className="font-semibold">Last Updated: </span> Aug 2023
        </p>
        <p className="flex flex-col gap-2">
          <span>
            At Tech Sisters Kenya, your privacy is important to us. This Privacy Policy outlines how
            we collect, use, and protect your personal information when you use our website or
            engage with our community.
          </span>
          <span>By using our website, you agree to the terms outlined in this policy.</span>
        </p>

        <h2 className="text-[25px] font-bold mt-8 mb-2">WHO WE ARE</h2>
        <p className="my-2 flex flex-col gap-2">
          <span>
            Tech Sisters Kenya is a community-driven organization committed to empowering women in
            technology through events, mentorship, resources, and collaboration.
          </span>
          <span>
            Our website:{' '}
            <Link
              href="https://www.techsisterskenya.org"
              className="font-semibold underline hover:text-tsk-primary"
            >
              https://www.techsisterskenya.org.
            </Link>
          </span>
        </p>
        <h2 className="text-[25px] font-bold mt-8 mb-2">WHAT INFORMATION WE COLLECT</h2>
        <p className="my-2">We may collect the following personal data:</p>
        <ul className="list-disc pl-6 flex flex-col gap-2 font-semibold">
          <li>Name</li>
          <li>Email address</li>
          <li>Phone number (optional, if provided)</li>
          <li>Location (general, like country or city, if submitted via forms)</li>
          <li>Professional background or interests (when registering for events or programs)</li>
          <li>
            Any additional information shared through our contact, registration, or feedback forms
          </li>
        </ul>
        <br />
        <p className="my-2">
          We also collect <span className="font-semibold">non-personal information </span>
          such as:
        </p>
        <ul className="list-disc pl-6 flex flex-col gap-2">
          <li>Browser type</li>
          <li>Device type</li>
          <li>Referring website</li>
          <li>Pages visited on our site</li>
          <li>General site usage analytics</li>
        </ul>

        <h2 className="text-[25px] font-bold sm:mt-12 mt-8">HOW WE USE YOUR INFORMATION</h2>
        <p className="my-2">We use your information to:</p>
        <ul className="list-disc pl-6 flex flex-col gap-2">
          <li>Communicate with you (e.g., updates, event reminders, community news)</li>
          <li>Respond to your inquiries or feedback</li>
          <li>Manage event registrations and community participation</li>
          <li>Improve our website and user experience</li>
          <li>Share learning and mentorship opportunities</li>
          <li>Ensure a safe and inclusive community experience</li>
        </ul>
        <br />
        <p>
          We <span className="font-semibold">do not</span> sell or rent your data to any third
          party.
        </p>

        <h2 className="text-[25px] font-bold sm:mt-12 mt-8">EMAIL & COMMUNICATION PREFERENCES</h2>
        <p className="my-2">We may send you emails related to:</p>
        <ul className="list-disc pl-6 flex flex-col gap-2">
          <li>Events and meetups</li>
          <li>Community announcements</li>
          <li>Opportunities or resources relevant to women in tech</li>
        </ul>
        <br />
        <p>
          You can <span className="font-semibold">unsubscribe at any time</span> by following the
          link in our emails or contacting us directly at{' '}
          <span className="font-semibold">techsisterskenya@gmail.com</span>.
        </p>

        <h2 className="text-[25px] font-bold sm:mt-12 mt-8">DATA PROTECTION</h2>
        <p className="my-2">
          We take reasonable steps to protect your personal information from unauthorized access,
          disclosure, or misuse. These include:
        </p>
        <ul className="list-disc pl-6 flex flex-col gap-2">
          <li>Secure hosting providers</li>
          <li>Limited access to data by authorized team members only</li>
          <li>Use of HTTPS on our website</li>
        </ul>

        <h2 className="text-[25px] font-bold sm:mt-12 mt-8">COOKIES</h2>
        <p className="my-2">
          Our website may use cookies and similar technologies to improve user experience and
          analyze traffic. You can control or disable cookies through your browser settings.
        </p>

        <h2 className="text-[25px] font-bold sm:mt-12 mt-8">THIRD-PARTY TOOLS</h2>
        <p className="my-2">We may use third-party tools like:</p>
        <ul className="list-disc pl-6 flex flex-col gap-2">
          <li>Google Forms or Typeform (for registrations)</li>
          <li>Mailchimp or ConvertKit (for email newsletters)</li>
          <li>Google Analytics (for understanding site traffic)</li>
        </ul>
        <br />
        <p>
          These services have their own privacy policies which you can review on their respective
          websites.
        </p>

        <h2 className="text-[25px] font-bold mt-8">CHILDREN&apos;S PRIVACY</h2>
        <p>
          Our website is not intended for children under the age of 13. We do not knowingly collect
          personal data from anyone under this age. If we discover that we have collected data from
          a child, we will delete it immediately.
        </p>

        <h2 className="text-[25px] font-bold sm:mt-12 mt-8">CHANGES TO THIS POLICY</h2>
        <p className="my-2">
          We may update this Privacy Policy from time to time. When we do, we&apos;ll revise the
          “Effective Date” at the top and notify users via the website or email if the changes are
          significant.
        </p>

        <h2 className="text-[25px] font-bold sm:mt-12 mt-8">CONTACT US</h2>
        <p className="my-2">
          If you have any questions or concerns about this policy, or wish to request, update, or
          delete your data:
        </p>
        <ul className="flex flex-col gap-2">
          <li>
            <span className="font-bold">Email:</span>{' '}
            <Link href="mailto:echsisterskenya@gmail.com" className="underline">
              techsisterskenya@gmail.com
            </Link>
          </li>
          <li>
            <span className="font-bold">Location:</span> Nairobi, Kenya
          </li>
        </ul>
      </div>
    </div>
  );
}
