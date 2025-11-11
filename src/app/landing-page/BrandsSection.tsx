'use client';
import React from 'react';
import Image from 'next/image';
import Moringa from '@/assets/moringa.svg';
import Google from '@/assets/logos_google.svg';
import Solutech from '@/assets/solutech.svg';
import eMobilis from '@/assets/emobilis.svg';
import payd from '@/assets/payd.svg';

const brands = [
  { name: 'Google', src: Google },
  { name: 'Moringa', src: Moringa },
  { name: 'Solutech', src: Solutech },
  { name: 'eMobilis', src: eMobilis },
  { name: 'Payd', src: payd },
];

export default function BrandsSection() {
  return (
    <section
      id="brands"
      data-testid="brands-section"
      className="px-6 sm:px-10 md:px-14 lg:px-20 text-foreground py-10"
    >
      <div className="max-w-6xl mx-auto">
        <h4 className="text-[32px] md:text-[32px] lg:text-[36px] text-center font-semibold font-other text-tsk-primary-dark mb-10">
          Our Growth Partners
        </h4>
        <div className="flex flex-row justify-center items-center gap-6 sm:gap-8 md:gap-10 lg:gap-12 flex-wrap">
          {brands.map((brand, index) => (
            <div key={index} className="flex-shrink-0">
              <Image
                src={brand.src}
                alt={`${brand.name} Logo`}
                width={80}
                height={80}
                className="h-16 w-auto object-contain"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
