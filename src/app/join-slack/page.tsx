import React from 'react';
import Link from 'next/link';
import Button from '@/components/Button';

const JoinSlack: React.FC = () => {
  return (
    <main className="min-h-screen w-full pt-48 pb-16 bg-white">
      <div className="w-[calc(100%-4rem)] py-16 mx-auto bg-white text-tsk-primary-dark rounded-3xl border border-tsk-primary-dark shadow-sm">
        <div className="text-center space-y-6">
          {/* Header */}
          <h1 className="font-decorative text-6xl mb-8">Join Our Communication Platforms!</h1>

          {/* Description */}
          <div className="font-semibold leading-relaxed mx-auto">
            <p>
              Our main communication channel is Slack. Tap on the button below to join our Slack
              Community Channel.
            </p>
            <p>
              (On joining slack, there&apos;s a form you will fill to be added to Tech Sisters Kenya
              whatsapp community)
            </p>
          </div>

          {/* Join Button */}
          <div className="py-4">
            <Link
              href="https://techsisterskenya.slack.com/join/shared_invite/zt-2kt0n8ndw-zjKuK3OI1ryqOe_g3ENRTQ#/shared-invite/email"
              target="_blank"
            >
              <Button variant="primary" className="w-fit py-4 px-8 text-3xl">
                Join Slack
              </Button>
            </Link>
          </div>

          {/* Bottom Message */}
          <div className="leading-relaxed font-semibold mx-auto pt-4">
            <p>
              We appreciate your time and participation in helping us build a vibrant and inclusive
              community. Together, let&apos;s thrive in the tech industry!
            </p>
          </div>

          {/* Signature */}
          <div className="pt-4 font-semibold">
            <p>Best regards,</p>
            <p>Tech Sisters Kenya Team</p>
          </div>
        </div>
      </div>
    </main>
  );
};

export default JoinSlack;
