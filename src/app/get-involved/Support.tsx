import React from 'react';
import Link from 'next/link';

function Support() {
  return (
    <section className="py-20 px-10 md:px-28 grid grid-cols-1 md:grid-cols-2 md:auto-rows-min gap-16">
      <h1 className="text-center md:text-left font-heading font-bold md:font-black text-2xl md:text-5xl leading-[150%] text-tsk-primary-dark md:col-start-1 md:row-start-1">
        Support Our Initiatives!
      </h1>

      <div className="relative w-full h-[300px] md:h-[450px] lg:h-[350px] rounded-3xl overflow-hidden md:col-start-2 md:row-start-1 md:row-span-3">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="377"
          height="377"
          fill="none"
          className="w-full h-full"
          viewBox="0 0 377 377"
          preserveAspectRatio="xMidYMid meet"
        >
          <path
            stroke="#45084A"
            strokeLinejoin="round"
            strokeWidth="10"
            d="M251.333 98.645c0 9.448-3.731 18.521-10.394 25.233-15.338 15.457-30.212 31.573-46.123 46.469-3.646 3.364-9.431 3.242-12.922-.275l-45.836-46.194c-13.855-13.962-13.855-36.504 0-50.466 13.991-14.1 36.784-14.1 50.774 0l1.666 1.679 1.665-1.678a35.758 35.758 0 0 1 50.776-.001 35.82 35.82 0 0 1 10.394 25.233Z"
          />
          <path
            stroke="#45084A"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="10"
            d="m282.75 314.167 60.073-60.074a9.42 9.42 0 0 0 2.76-6.663v-82.493c0-13.013-10.549-23.562-23.562-23.562-13.013 0-23.563 10.549-23.563 23.562v70.688"
          />
          <path
            stroke="#45084A"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="10"
            d="m282.75 251.333 13.479-13.48a7.608 7.608 0 0 0-1.977-12.186l-6.957-3.478a31.418 31.418 0 0 0-36.265 5.884l-14.057 14.058a31.416 31.416 0 0 0-9.202 22.214v49.821M94.25 314.167l-60.073-60.074a9.421 9.421 0 0 1-2.76-6.663v-82.493c0-13.013 10.549-23.562 23.562-23.562 13.013 0 23.563 10.549 23.563 23.562v70.688"
          />
          <path
            stroke="#45084A"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="10"
            d="m94.25 251.333-13.48-13.48a7.61 7.61 0 0 1 1.978-12.186l6.957-3.478a31.418 31.418 0 0 1 36.265 5.884l14.057 14.058a31.416 31.416 0 0 1 9.202 22.214v49.821"
          />
        </svg>
      </div>

      <p className="text-center md:text-left font-body font-medium text-base md:text-xl leading-[150%] text-tsk-primary-dark mt-8 md:mt-6 md:col-start-1 md:row-start-2">
        Looking to sponsor an event, initiative, or the overall work of Tech Sisters Kenya? We are
        grateful for organizations that invest in impact.
      </p>

      <Link
        href="/get-involved/partner-with-us"
        className="self-end justify-self-center md:justify-self-start w-full md:w-fit text-center md:text-left bg-tsk-primary-dark text-white font-heading px-6 py-3 rounded-2xl font-bold text-xl leading-[150%] hover:opacity-90 transition md:col-start-1 md:row-start-3"
      >
        Support Us
      </Link>
    </section>
  );
}

export default Support;
