import Image from 'next/image';
import React from 'react';

const brands = [
  { name: 'Moringa', src: '/get-involved/moringa-icon.svg' },
  { name: 'Google', src: '/get-involved/google-icon.svg' },
  { name: 'PlugWork', src: '/get-involved/plug-n-work-icon.svg' },
  { name: 'eMobilis', src: '/get-involved/emobilis-icon.svg' },
  { name: 'Payd', src: '/get-involved/payd-icon.svg' },
];

function BrandsSection() {
  return (
    <section className="w-full py-12 px-10 md:px-28">
      <h1 className="font-body font-bold text-xl text-center">
        Brands that believe in our vision and goal
      </h1>
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
