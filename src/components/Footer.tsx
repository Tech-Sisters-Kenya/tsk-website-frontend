'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import clsx from 'clsx';

import Logo from '@/assets/tsk-icon-only-logo.svg';
import email from '@/../public/email.svg';
import call from '@/../public/call.svg';
import instagram from '@/../public/instagram.svg';
import x from '@/../public/x.svg';
import linkedin from '@/../public/linkedin.svg';
import tiktok from '@/../public/tiktok.svg';

// Define link types for each section
type FooterLink = {
  href: string;
  label: string;
  id?: string; // Added optional id for uniqueness
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
    <h3 className="text-xl font-semibold mb-4" style={{ color: 'var(--tsk-light-1)' }}>
      {title}
    </h3>
    <ul className="space-y-2 text-sm">
      {links.map((link) => (
        <li key={link.id ?? `${link.href}-${link.label}`}>
          <Link href={link.href} className={linkStyles}>
            {link.label}
          </Link>
        </li>
      ))}
    </ul>
  </div>
);

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const footerStyles = {
    backgroundColor: 'var(--tsk-primary-dark)',
    color: 'var(--tsk-light-1)',
  };

  const linkStyles = clsx('transition-opacity', 'hover:opacity-80');
  // Quick Links
  const quickLinks: FooterLink[] = [
    { href: '/about-us', label: 'About Us' },
    { href: '/faq', label: 'FAQ' },
    { href: '/code-of-conduct', label: 'Code Of Conduct' },
    { href: '/terms-and-conditions', label: 'Terms & Conditions' },
    { href: '/privacy-policy', label: 'Privacy Policy' },
  ];

  // Get Involved section links with unique ids
  const involvedLinks: FooterLink[] = [
    { href: '/sign-up', label: 'Become A Tech Sister', id: 'tech-sister' },
    { href: 'get-involved/partner-with-us', label: 'Partner With Us', id: 'partner' },
    { href: 'get-involved/become-a-sponsor', label: 'Sponsor Us', id: 'sponsor' },
  ];

  return (
    <footer className="w-full pt-10 pb-6" style={footerStyles}>
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 xl:grid-cols-5 md:grid-cols-3 sm:grid-cols-2 gap-8">
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
            <p className="text-[13px] mt-4 font-semibold" style={{ color: 'var(--tsk-light-1)' }}>
              Elevating Women in Technology
            </p>
          </div>

          {/* Quick Links Column */}
          <FooterSection title="Quick Links" links={quickLinks} linkStyles={linkStyles} />

          {/* Get Involved Column */}
          <FooterSection title="Get Involved" links={involvedLinks} linkStyles={linkStyles} />
          {/* Contact Info */}
          <div className="flex flex-col items-center md:items-start">
            <h3 className="text-xl font-semibold mb-4 text-tsk-light-1 ">Contact Information</h3>
            <div className="space-y-4">
              <a
                href="mailto: techsisterskenya@gmail.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex gap-2 text-sm"
              >
                <Image src={email} alt="email icon" />
                techsisterskenya@gmail.com
              </a>
              <p className="flex gap-2 text-sm">
                <Image src={call} alt="call icon" />
                +254 708 887 799
              </p>
            </div>
          </div>
          {/* Connect With Us */}
          <div className="flex flex-col items-center">
            <h3 className="text-xl font-semibold mb-4 text-tsk-light-1">Connect With Us</h3>
            <div className="flex gap-4">
              <a
                href="https://www.instagram.com/techsisterskenya"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Image src={instagram} alt="instagram icon" />
              </a>
              <a href="https://x.com/TechSistersKE" target="_blank" rel="noopener noreferrer">
                <Image src={x} alt="x icon" />
              </a>
              <a
                href="https://www.linkedin.com/company/tech-sisters-kenya/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Image src={linkedin} alt="linkedin icon" />
              </a>
              <a
                href="https://linktr.ee/techsisterskenya"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Image src={tiktok} alt="tiktok icon" />
              </a>
            </div>
          </div>
        </div>

        {/* Copyright and credits*/}
        <div>
          <hr className="border-1 w-full border-[#efd5f8] my-12" />
          <div className="flex flex-col gap-8 mt-6 text-center sm:text-[16px] text-sm">
            <p>Designed & developed with 💜 by the Tech Sisters Kenya community.</p>
            <p>All rights reserved. Tech Sisters Kenya &copy; {currentYear}</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
