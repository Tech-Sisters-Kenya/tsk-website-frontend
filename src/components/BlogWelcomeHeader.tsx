import React from 'react';
import { Square_Peg } from 'next/font/google';
import EclipseSvg from './svg_components/Eclipse';

const squarePeg = Square_Peg({
  weight: '400',
  subsets: ['latin'],
});

const BlogWelcomeHeader = () => {
  return (
    <section className="py-20 px-4 bg-tsk-light-2 rounded-3xl w-full -mt-20 -z-10">
      <div className="flex flex-row items-center justify-center bg-[#F8EBFC] mx-10 rounded-3xl relative h-full">
        {/* left side content */}
        <div className="p-2 md:w-2/3">
          {/* welcome message */}
          <div className="font-medium text-[#45084A] leading-20 ">
            <div className="tracking-widest leading-20 ">
              <h1 className="text-2xl md:text-3xl lg:text-5xl font-bold font-heading mb-6 text-tsk-primary-dark leading-[150%]">
                Blogs
              </h1>
              <div className="text-base md:text-2xl max-w-lg tracking-wide">
                <p>Welcome to the Tech Sisters Kenya blog </p>
                <p> — </p>
                <p className=""> A space created to educate, inspire, and uplift women in tech. </p>
              </div>
            </div>

            {/* tag line */}
            <div className="absolute bottom-0 left-0 px-2">
              <p className={squarePeg.className}>
                <span className="text-3xl">
                  Stories shape us. Knowledge elevates us. Community carries us.
                </span>
              </p>
            </div>
          </div>
        </div>

        {/* right side content */}
        <div className="md:w-1/3 relative min-h-[300px] flex items-center justify-center">
          <EclipseSvg width={120} height={120} className="animate-pulse absolute right-10" />
        </div>
      </div>
    </section>
  );
};

export default BlogWelcomeHeader;
