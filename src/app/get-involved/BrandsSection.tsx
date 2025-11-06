import Image from 'next/image';
import React from 'react';

const brands = [
  { name: 'Google', src: '/get-involved/google-icon.svg' },
  { name: 'Moringa', src: '/get-involved/moringa-icon.svg' },
  { name: 'Solutech', src: '/get-involved/solutech-icon.svg' },
  { name: 'eMobilis', src: '/get-involved/emobilis-icon.svg' },
  { name: 'Payd', src: '/get-involved/payd-icon.svg' },
];

function BrandsSection() {
  return (
    <section className="w-full py-12 px-10 md:px-28">
      <h1 className="font-body font-bold text-2xl sm:text-5xl text-center">Our Growth Partners</h1>
      <div className="flex flex-wrap justify-center items-center gap-12 mt-10">
        {brands.map(({ src, name }, index) => (
          <div key={index}>
            <Image src={src} alt={name} width={150} height={100} />
          </div>
        ))}
      </div>
    </section>
  );
}

export default BrandsSection;
