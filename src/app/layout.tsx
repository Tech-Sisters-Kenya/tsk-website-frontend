import React from 'react';
import type { Metadata } from 'next';
import { Geist, Geist_Mono, Square_Peg, Montserrat, League_Spartan } from 'next/font/google';
import './globals.css';

import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Providers from './providers';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

const squarePeg = Square_Peg({
  subsets: ['latin'],
  weight: '400',
  variable: '--font-decorative',
});

const montserrat = Montserrat({
  variable: '--font-body',
  subsets: ['latin'],
});

const leagueSpartan = League_Spartan({
  variable: '--font-heading',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Tech Sisters Kenya',
  description: 'Elevating Women in Tech',
  icons: {
    icon: '/tsk-icon.svg',
    shortcut: '/tsk-icon.svg',
    apple: '/tsk-icon.svg',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${squarePeg.variable} ${montserrat.variable} ${leagueSpartan.variable} antialiased`}
      >
        <Providers>
          <Navbar />
          {children}
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
