'use client';

import React from 'react';
import { focusAreas } from '@/data/focusareas';

const WhyFocusAreas = () => {
  return (
    <section className="max-w-5xl mx-auto py-10 space-y-10 text-tsk-primary-dark md:px-10">
      {focusAreas.map((area, index) => (
        <div key={area.id}>
          {/* Flex Container */}
          <div
            className={`flex flex-col md:flex-row items-center my-10 lg:gap-8 md:gap-2 ${
              index % 2 !== 0 ? 'md:flex-row-reverse' : ''
            }`}
          >
            {/* Image + Title */}
            <div className="md:w-1/2">
              <h3
                className={`text-2xl md:text-2xl lg:text-3xl font-bold text-tsk-primary-dark mb-3 text-center`}
              >
                {area.title}
              </h3>
              <img
                src={area.image}
                alt={area.title}
                className="w-full rounded-2xl shadow-md object-cover"
              />
            </div>

            {/* Text Content */}
            <div
              className={`lg:w-[60%] md:w-1/2 text-left space-y-3 ${index % 2 !== 0 ? 'md:text-left' : ''}`}
            >
              <div className="space-y-2 bg-tsk-light-2 p-4 rounded-xl">
                <div>
                  <p className="font-bold text-tsk-primary-dark lg:text-xl md:text-lg">
                    What It Means
                  </p>
                  <p className="font-medium lg:text-xl md:text-lg lg:pb-6 pb-4 ">
                    {area.whatItMeans}
                  </p>
                </div>

                <div>
                  <p className="font-bold text-tsk-primary-dark lg:text-xl md:text-lg">
                    What We Do
                  </p>
                  <p className="font-medium lg:text-xl md:text-lg lg:pb-6 pb-4">{area.whatWeDo}</p>
                </div>

                <div>
                  <p className="font-bold text-tsk-primary-dark lg:text-xl md:text-lg">
                    Why It Matters
                  </p>
                  <p className="font-medium lg:text-xl md:text-lg lg:pb-6 pb-4">
                    {area.whyItMatters}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Divider line (hide on last item) */}
          {index < focusAreas.length - 1 && (
            <hr className="border-t-2 border-tsk-primary-dark opacity-30 my-10 w-full mx-auto" />
          )}
        </div>
      ))}
    </section>
  );
};
export default WhyFocusAreas;
