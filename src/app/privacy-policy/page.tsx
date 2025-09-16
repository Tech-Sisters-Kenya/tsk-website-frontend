'use client';

import React from 'react';
import Link from 'next/link';

export default function PrivacyPolicy() {
  return (
    <div className="flex flex-col min-h-screen pb-8 md:pb-16 lg:pb-20 container mx-auto text-tsk-primary-dark">
      <h1 className="lg:my-28 mt-12 mb-6 pt-24 md:pt-28 lg:pt-12 lg:mb-6 text-center font-extrabold  text-[22px] md:text-3xl lg:text-5xl">
        PRIVACY POLICY
      </h1>
      <p>
        {' '}
        <span className="font-semibold">Effective Date: </span> Aug 2023
      </p>
      <p>
        At <span className="font-semibold">Tech Sisters Kenya,</span> your privacy is important to
        us. This Privacy Policy outlines how we collect, use, and protect your personal information
        when you use our website or engage with our community.
        <br />
        <br />
        By using our website, you agree to the terms outlined in this policy.
      </p>

      <h2 className="text-[25px] font-bold mt-8">WHO WE ARE</h2>
      <p>
        Tech Sisters Kenya is a community-driven organization committed to empowering women in
        technology through events, mentorship, resources, and collaboration.
        <br />
        <br />
        Our website:{' '}
        <Link
          href={'https://www.techsisterskenya.org'}
          className="font-semibold underline hover:text-tsk-primary"
        >
          https://www.techsisterskenya.org.
        </Link>
      </p>
      <h2 className="text-[25px] font-bold mt-8">WHAT INFORMATION WE COLLECT</h2>
      <p>We may collect the following personal data:</p>
      <ul className="list-disc pl-6">
        <li>Name</li>
        <li>Email address</li>
        <li>
          <span className="font-semibold">Phone number</span> (optional, if provided)
        </li>
        <li>
          <span className="font-semibold">Location</span> (general, like country or city, if
          submitted via forms)
        </li>
        <li>
          <span className="font-semibold">Professional background or interests</span> (when
          registering for events or programs)
        </li>
        <li>
          <span className="font-semibold">Any additional information</span> shared through our
          contact, registration, or feedback forms
        </li>
      </ul>
      <br />
      <p>
        We also collect <span className="font-semibold">non-personal information </span>
        such as:
      </p>
      <ul className="list-disc pl-6">
        <li>Browser type</li>
        <li>Device type</li>
        <li>Referring website</li>
        <li>Pages visited on our site</li>
        <li>General site usage analytics</li>
      </ul>

      <h2 className="text-[25px] font-bold mt-8">HOW WE USE YOUR INFORMATION</h2>
      <p>We use your information to:</p>
      <ul className="list-disc pl-6">
        <li>Communicate with you (e.g., updates, event reminders, community news)</li>
        <li>Respond to your inquiries or feedback</li>
        <li>Manage event registrations and community participation</li>
        <li>Improve our website and user experience</li>
        <li>Share learning and mentorship opportunities</li>
        <li>Ensure a safe and inclusive community experience</li>
      </ul>
      <br />
      <p>
        We <span className="font-semibold">do not</span> sell or rent your data to any third party.
      </p>

      <h2 className="text-[25px] font-bold mt-8">EMAIL & COMMUNICATION PREFERENCES</h2>
      <p>We may send you emails related to:</p>
      <ul className="list-disc pl-6">
        <li>Events and meetups</li>
        <li>Community announcements</li>
        <li>Opportunities or resources relevant to women in tech</li>
      </ul>
      <br />
      <p>
        You can <span className="font-semibold">unsubscribe at any time</span> by following the link
        in our emails or contacting us directly at{' '}
        <span className="font-semibold">techsisterskenya@gmail.com</span>.
      </p>

      <h2 className="text-[25px] font-bold mt-8">DATA PROTECTION</h2>
      <p>
        We take reasonable steps to protect your personal information from unauthorized access,
        disclosure, or misuse. These include:
      </p>
      <ul className="list-disc pl-6">
        <li>Secure hosting providers</li>
        <li>Limited access to data by authorized team members only</li>
        <li>Use of HTTPS on our website</li>
      </ul>

      <h2 className="text-[25px] font-bold mt-8">COOKIES</h2>
      <p>
        Our website may use cookies and similar technologies to improve user experience and analyze
        traffic. You can control or disable cookies through your browser settings.
      </p>

      <h2 className="text-[25px] font-bold mt-8">THIRD-PARTY TOOLS</h2>
      <p>We may use third-party tools like:</p>
      <ul className="list-disc pl-6">
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
        personal data from anyone under this age. If we discover that we have collected data from a
        child, we will delete it immediately.
      </p>

      <h2 className="text-[25px] font-bold mt-8">CHANGES TO THIS POLICY</h2>
      <p>
        We may update this Privacy Policy from time to time. When we do, we’ll revise the “Effective
        Date” at the top and notify users via the website or email if the changes are significant.
      </p>

      <h2 className="text-[25px] font-bold mt-8">CONTACT US</h2>
      <p>
        If you have any questions or concerns about this policy, or wish to request, update, or
        delete your data:
      </p>
      <ul className="list-disc pl-6">
        <li>📧 Email: techsisterskenya@gmail.com</li>
        <li> 📍 Location: Nairobi, Kenya</li>
      </ul>
    </div>
  );
}
