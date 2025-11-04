'use client';

import Banner from '@/components/Banner';
import React from 'react';

export default function TermsAndConditions() {
  return (
    <div className="flex flex-col min-h-screen pb-8 md:pb-16 lg:pb-20 mx-auto text-tsk-primary-dark">
      <div className="w-full">
        <Banner />
      </div>
      <div className="lg:px-32 md:px-20 sm:px-16 px-10 font-body">
        <h1 className="lg:my-28 mt-12 mb-6 lg:mb-6 text-center font-extrabold  text-2xl md:text-3xl lg:text-[64px]">
          Terms And Conditions
        </h1>

        <p>
          {' '}
          <span className="font-semibold">Last Updated: </span>April 2025
        </p>
        <h2 className="text-lg font-body font-medium mt-8">Welcome to Tech Sisters Kenya (TSK)</h2>
        <p className="my-2">
          By accessing or using our website{' '}
          <span className="font-semibold hover:text-tsk-primary hover:underline hover:cursor-pointer">
            (https://www.techsisterskenya.org)
          </span>
          , participating in our community, or registering for our events and programs, you agree to
          be bound by the following Terms and Conditions. If you do not agree, please do not use our
          website or services.
        </p>
        <h2 className="text-xl font-bold font-body mt-8 mb-2">1. THE PURPOSE OF THE SITE</h2>
        <p>
          Tech Sisters Kenya is a platform aimed at empowering women in tech through events,
          mentorship, learning opportunities, and community engagement. This site is intended for
          educational, networking, and informational purposes only.
        </p>
        <h2 className="text-xl font-bold font-body mt-8 mb-2">2. ACCEPTANCE OF TERMS</h2>
        <p>
          By using our website, forms, or joining our programs or Slack community, you agree to
          these Terms and our Privacy Policy, which together govern your relationship with Tech
          Sisters Kenya.
        </p>
        <h2 className="text-xl font-bold font-body mt-8 mb-2">3. COMMUNITY CONDUCT</h2>
        <p>
          We expect all users and community members to follow our Code of Conduct at all times. You
          agree to:{' '}
        </p>
        <ul className="list-disc pl-6">
          <li>Engage respectfully and professionally</li>
          <li>Avoid discriminatory, offensive, or harmful behaviour</li>
          <li>Refrain from spamming, self-promotion, or any disruptive activity</li>
          <li>Protect the confidentiality and privacy of other members</li>
        </ul>
        <p>
          <br /> We reserve the right to moderate or remove content or users who violate these
          principles.
        </p>
        <h2 className="text-xl font-bold font-body mt-8 mb-2">4. USER SUBMISSIONS</h2>
        <p>
          When you submit content (e.g., through forms, emails, or Slack messages), you grant Tech
          Sisters Kenya the right to use, reproduce, and share that content within the community or
          for promoting community activities — unless you explicitly request otherwise You are
          responsible for ensuring your content:
        </p>
        <ul className="list-disc pl-6">
          <li>Does not violate any third-party rights or laws.</li>
          <li> Is your own or you have rights to share it.</li>
        </ul>
        <h2 className="text-xl font-bold font-body mt-8 mb-2">5. COMMUNICATION</h2>
        <p>
          By providing your contact information, you consent to receive emails or messages related
          to events, mentorship, programs, and opportunities. You may opt out at any time by
          clicking <span className="font-semibold"> “unsubscribe”</span>
          or emailing us at <span className="font-semibold">techsisterskenya@gmail.com</span> .
        </p>
        <h2 className="text-xl font-bold font-body mt-8 mb-2">6. INTELLECTUAL PROPERTY</h2>
        <p>
          All content on this site, including logos, graphics, resources, articles, and materials,
          is the property of Tech Sisters Kenya unless otherwise stated. You may not copy,
          distribute, or use our content without prior permission, except for personal,
          non-commercial use with credit.
        </p>
        <h2 className="text-xl font-bold font-body mt-8 mb-2">7. THIRD-PARTY SERVICES</h2>
        <p>
          Our website or events may reference or integrate third-party platforms (e.g., Google
          Forms, Zoom, Mailchimp). These are governed by their own terms and privacy policies. Tech
          Sisters Kenya is not responsible for any third-party content or practices.
        </p>
        <h2 className="text-xl font-bold font-body mt-8 mb-2">8. DISCLAIMER</h2>
        <p>
          While we aim to provide accurate and helpful content, we cannot guarantee that all
          information is complete or up to date. Participation in any event, program, or mentorship
          is <span className="font-semibold">voluntary</span> and at{' '}
          <span className="font-semibold">your own risk</span> . We are not liable for any outcomes
          resulting from advice, interaction, or content shared within the community.
        </p>
        <h2 className="text-xl font-bold font-body mt-8 mb-2">9. CHANGES TO THIS TERM</h2>
        <p>
          We may update these Terms from time to time to reflect changes in our offerings, laws, or
          practices. You will be notified of significant changes via our website or email.
        </p>
        <h2 className="text-xl font-bold font-body mt-8 mb-2">10. TERMINATION</h2>
        <p>
          We reserve the right to suspend or remove access to our community or services at any time,
          especially in cases of policy violation, harmful behaviour, or misuse of the platform.
        </p>
        <h2 className="text-xl font-bold font-body mt-8 mb-2">11. CONTACT US</h2>
        <p>
          For any questions, concerns, or feedback about these Terms, please contact us at:{' '}
          <span className="font-semibold">techsisterskenya@gmail.com</span>{' '}
        </p>
        <br />
        <h1 className="font-body font-bold text-tsk-primary-dark text-[25px] mt-10">
          Thank You!💜
        </h1>
        <p className="font-semibold flex flex-col gap-4 text-center text-xl font-body mt-10 lg:mt-16 lg:w-2/3 sm:w-4/5 mx-auto">
          <span>
            By being part of Tech Sisters Kenya, you are contributing to a positive, inclusive, and
            empowering community for women in tech.
          </span>
          <span>Let&apos;s continue to build together!</span>
        </p>
      </div>
    </div>
  );
}
