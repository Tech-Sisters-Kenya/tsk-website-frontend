import Image from 'next/image';
import React from 'react';

function TopCard() {
  return (
    <div className="bg-tsk-primary-dark rounded-lg w-[calc(100vw_-_500px)] flex flex-col items-center justify-center gap-4 p-8">
      <Image
        src={'/get-involved/top-card-logo.svg'}
        alt="tech sisters logo"
        width={100}
        height={100}
      />
      <h1 className="text-white font-bold text-5xl font-heading">Tech Sisters Kenya</h1>
      <p className="text-white font-heading">Elevating Women in Technology</p>
    </div>
  );
}

export default TopCard;
