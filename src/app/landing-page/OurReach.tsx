'use client';
import Image from 'next/image';
import CountUp from 'react-countup';
import React from 'react';
import Button from '../../components/Button';
import imageSrc from '@/assets/Group 633200.svg';
import bug from '@/assets/Bug.svg';
import Logo from '@/assets/tsk-icon-logo.svg';
import Link from 'next/link';
interface ReachSectionProps {
  title: string;
  subtitle: string;
  stats: { value: string; label: string }[];
}

export default function ReachSection({ title, subtitle, stats }: ReachSectionProps) {
  return (
    <section className="bg-tsk-light-2  w-screen py-28 px-10 sm:px-8 lg:px-8 overflow-hidden">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-10">
        {/*left text section */}
        <div className="flex-1 text-center lg:text-left">
          <h2 className="text-3xl md:text-4xl font-bold text-tsk-primary-dark font-heading mb-4">
            {title}
          </h2>
          <p className="text-tsk-primary-dark font-bold font-body max-w-md mb-6">{subtitle}</p>
          {/*horizontal line */}
          <div className="border-t border-tsk-primary-dark w-full max-wsm mx-auto lg:mx-0 mb-6"></div>
          {/* Statistics Section */}
          <div className="flex flex-row sm:flex-row gap-6 mb-6">
            {stats.map((stat, index) => (
              <div key={index}>
                <h3 className="text-2xl font-bold font-body text-tsk-primary-dark">
                  <CountUp
                    end={parseInt(stat.value.replace('+', ''))}
                    duration={2}
                    enableScrollSpy
                  />
                  +
                </h3>
                <p className="text-sm font-bold text-tsk-primary-dark">{stat.label}</p>
              </div>
            ))}
          </div>
          <Link href="/get-involved" className="w-full">
            <Button variant="primary" className="text-foreground font-heading font-bold">
              Get Involved
            </Button>
          </Link>
        </div>

        {/* Right Image */}
        <div className="w-full md:w-1/2 flex justify-start items-center">
          <div className="relative w-full max-w-2xl gap-8">
            <Image src={Logo} alt="logo-left" className="absolute -top-4 -left-2 w-20 h-20 z-1" />
            <Image
              src={bug}
              alt=""
              width={80}
              height={50}
              className="absolute -bottom-6 left--2 w-15 h-15 z-10"
            />
            <Image
              src={imageSrc}
              alt=""
              width={500}
              height={400}
              className="rounded-lg shadow-lg"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
