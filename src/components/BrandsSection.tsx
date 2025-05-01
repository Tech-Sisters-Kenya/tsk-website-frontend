import React from 'react';
import Image from 'next/image';
import Moringa from '@/assets/moringa.svg';
import Google from '@/assets/logos_google.svg';
import PlugWork from '@/assets/image 1.svg';
import eMobilis from '@/assets/emobilis.svg';
import payd from '@/assets/payd.svg';

const brands = [
  { name: '', src: Moringa },
  { name: '', src: Google },
  { name: '', src: PlugWork },
  { name: '', src: eMobilis },
  { name: '', src: payd },
];

export default function BrandsSection() {
  return (
    <section>
      <h4 className="text-lg text-center font-bold font-body text-tsk-primary-dark mb-6">
        Brands That Believe In Us
      </h4>
      <div className="flex flex-row justify-center items-center gap-8 ">
        {brands.map((brand, index) => (
          <div key={index}>
            <Image
              key={index}
              src={brand.src}
              alt={`${brand.name} Logo`}
              width={80}
              height={80}
              className="w-[120px] h-auto"
            />
            <p>{brand.name}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
