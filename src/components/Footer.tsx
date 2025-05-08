'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import clsx from 'clsx';

import Logo from '@/assets/tsk-icon-only-logo.svg';

// Define link types for each section
type FooterLink = {
  href: string;
  label: string;
};

// Footer section component
const FooterSection = ({
  title,
  links,
  linkStyles,
}: {
  title: string;
  links: FooterLink[];
  linkStyles: string;
}) => (
  <div className="flex flex-col items-center md:items-start">
    <h3 className="text-lg font-semibold mb-4" style={{ color: 'var(--tsk-light-1)' }}>
      {title}
    </h3>
    <ul className="space-y-2 text-sm">
      {links.map((link) => (
        <li key={link.href}>
          <Link href={link.href} className={linkStyles}>
            {link.label}
          </Link>
        </li>
      ))}
    </ul>
  </div>
);

const Footer = () => {
  const footerStyles = {
    backgroundColor: 'var(--tsk-primary-dark)',
    color: 'var(--tsk-light-1)',
  };

  const linkStyles = clsx('transition-opacity', 'hover:opacity-80');

  // About Us section links
  const aboutLinks: FooterLink[] = [
    { href: '/contact', label: 'Contact Us' },
    { href: '/team', label: 'The Team' },
    { href: '/faq', label: 'FAQ' },
    { href: '/code-of-conduct', label: 'Code Of Conduct' },
    { href: '/terms', label: 'Terms & Condition' },
    { href: '/privacy', label: 'Privacy Policy' },
  ];

  // Get Involved section links
  const involvedLinks: FooterLink[] = [
    { href: '/become-a-tech-sister', label: 'Become A Tech Sister' },
    { href: '/volunteer', label: 'Volunteer' },
    { href: '/partner', label: 'Partner With Us' },
    { href: '/donate', label: 'Make A Donation' },
  ];

  return (
    <footer className="w-full pt-10 pb-6" style={footerStyles}>
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Logo and Tagline */}
          <div className="flex flex-col items-center">
            <Link href="/" className="flex items-center">
              <Image
                src={Logo}
                alt="Tech Sisters Kenya logo"
                width={50}
                height={25}
                className="mr-2"
              />
              <div
                className="transition-opacity hover:opacity-80"
                style={{ color: 'var(--tsk-light-1)' }}
              >
                {['TECH', 'SISTERS', 'KENYA'].map((text) => (
                  <p key={text} className="text-xs font-bold uppercase">
                    {text}
                  </p>
                ))}
              </div>
            </Link>
            <p className="text-sm mt-4 font-semibold" style={{ color: 'var(--tsk-light-1)' }}>
              Elevating Women in Technology
            </p>
          </div>

          {/* About Us Column */}
          <FooterSection title="About Us" links={aboutLinks} linkStyles={linkStyles} />

          {/* Get Involved Column */}
          <FooterSection title="Get Involved" links={involvedLinks} linkStyles={linkStyles} />
        </div>

        {/* Copyright */}
        <div className="mt-12 text-center text-sm">
          All rights reserved. Tech Sisters Kenya ©2025
        </div>
      </div>
    </footer>
  );
};

export default Footer;
