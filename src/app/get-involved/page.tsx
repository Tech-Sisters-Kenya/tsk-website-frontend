import React from 'react';
import PartnerSection from './PartnerSection';
import SponsorSection from './SponsorSection';
import BrandsSection from './BrandsSection';

export default function GetInvolved() {
  return (
    <main className="w-full flex flex-col justify-center py-24">
      {/* Partner With Us section */}
      <PartnerSection />

      {/* horizontal line */}
      <div className="h-[1px] bg-tsk-primary-dark opacity-30 mx-28" />

      {/* Sponsor section */}
      <SponsorSection />

      {/* Brands Section */}
      <BrandsSection />
    </main>
  );
}
