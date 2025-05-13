'use client';

import React from 'react';

import Image from 'next/image';
import Button from './Button';

const Gallery = () => {
  // Array of gallery images
  const galleryImages = [
    {
      src: '/data-edition.png',
      alt: 'Gallery data edition photo',
      buttonText: 'Data Edition',
      link: 'https://photos.google.com/share/AF1QipPQOr1vRm_OqpkzEGqCBHeDTJANqUosjZ6SZkL4DEv3LGzZWgrVB-YkpRoK-dr88w?key=XzMwc1I2UENGWENHVTlGVmpTRGJ5bVZBd0dSNE13',
    },
    {
      src: '/software-edition.png',
      alt: 'Software workshop session photo',
      buttonText: 'Software Edition',
      link: 'https://photos.google.com/share/AF1QipPQOr1vRm_OqpkzEGqCBHeDTJANqUosjZ6SZkL4DEv3LGzZWgrVB-YkpRoK-dr88w?key=XzMwc1I2UENGWENHVTlGVmpTRGJ5bVZBd0dSNE13',
    },
    {
      src: '/mental-health-market-day.png',
      alt: 'Mental health & market day edition photo',
      buttonText: 'Mental health & Market Day',
      link: 'https://photos.google.com/share/AF1QipPQOr1vRm_OqpkzEGqCBHeDTJANqUosjZ6SZkL4DEv3LGzZWgrVB-YkpRoK-dr88w?key=XzMwc1I2UENGWENHVTlGVmpTRGJ5bVZBd0dSNE13',
    },
  ];

  return (
    <div className="bg-tsk-light-2 lg:mt-32 w-screen">
      <div className="md:max-w-5xl mx-auto p-4 font-semibold">
        <h3 className=" text-3xl md:text-5xl text-center pb-2 ">Gallery</h3>
        <p className="text-[#45084a] px-10 pb-10 md:px-20 text-center">
          Every picture tells a story — of women finding their voice, building skills, and lifting
          each other higher. These moments are a glimpse into the heart of Tech Sisters Kenya — a
          place where growth meets belonging.
        </p>

        {/* parent container of the gallery section */}
        <div className="flex flex-col gap-4 h-full md:flex-row md:gap-1">
          {/* Loop thru gallery images Parent of the specific gallery image, relative positioned to allow use of fill property */}

          {galleryImages.map((image, index) => (
            <div key={index} className="relative w-full md:w-1/3 h-[500px] md:h-[430px]">
              <Image
                src={image.src}
                alt={image.alt}
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                fill
                className="object-cover rounded-3xl px-2"
              />
              <Button
                variant="secondary"
                className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-tsk-light-2 text-[#45084a] font-semibold py-3 md:w-[70%] lg:w-[50%]"
              >
                <a href={image.link} target="_blank" rel="noopener noreferrer">
                  {' '}
                  {image.buttonText}
                </a>
              </Button>
            </div>
          ))}
        </div>

        <div className="flex justify-center my-10">
          <Button className="font-semibold px-4 py-4">
            <a
              href="http://www.instagram.com/techsisterskenya"
              target="_blank"
              rel="noopener noreferrer"
            >
              View More
            </a>
          </Button>
        </div>
      </div>
    </div>
  );
};
export default Gallery;
