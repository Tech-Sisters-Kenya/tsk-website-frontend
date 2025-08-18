'use client';
import React from 'react';
import Image from 'next/image';
import Moringa from '@/assets/moringa.svg';
import Google from '@/assets/logos_google.svg';
import PlugWork from '@/assets/image 1.svg';
import eMobilis from '@/assets/emobilis.svg';
import payd from '@/assets/payd.svg';

const brands = [
  { name: 'Moringa', src: Moringa },
  { name: 'Google', src: Google },
  { name: 'PlugWork', src: PlugWork },
  { name: 'eMobilis', src: eMobilis },
  { name: 'Payd', src: payd },
];

export default function BrandsSection() {
  return (
    <section id="brands" className="px-4 sm:px-6 md:px-8 lg:px-10 text-foreground py-10">
      <h4 className="text-lg text-center font-bold font-body text-tsk-primary-dark mb-12">
        Brands That Believe In Us
      </h4>
      <div className="flex flex-row justify-center items-center gap-4 sm:gap-6 md:gap-8 lg:gap-12 flex-wrap">
        {brands.map((brand, index) => (
          <div key={index} className="flex-shrink-0">
            <Image
              src={brand.src}
              alt={`${brand.name} Logo`}
              width={100}
              height={60}
              className="h-12 w-auto object-contain"
            />
          </div>
        ))}
      </div>
    </section>
  );
}
