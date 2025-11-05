import React from 'react';
import PartnerSection from './PartnerSection';
import BrandsSection from '../landing-page/BrandsSection';
import HeroSection from './HeroSection';
import TechSis from './TechSis';
import Support from './Support';

export default function GetInvolved() {
  return (
    <main className="w-full flex flex-col justify-center py-24">
      {/* Hero Section */}
      <HeroSection />

      {/* horizontal line */}
      <div className="h-[1px] bg-tsk-primary-dark opacity-30 mx-28 mt-8" />

      {/* Become a tech sister section */}
      <TechSis />

      {/* horizontal line */}
      <div className="h-[1px] bg-tsk-primary-dark opacity-30 mx-28" />

      {/* Partner With Us section */}
      <PartnerSection />

      {/* horizontal line */}
      <div className="h-[1px] bg-tsk-primary-dark opacity-30 mx-28" />

      {/* Support section */}
      <Support />

      {/* Brands Section */}
      <BrandsSection />
    </main>
  );
}
