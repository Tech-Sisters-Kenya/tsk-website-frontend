'use client';

import React from 'react';
import { useCallback, useEffect, useState } from 'react';
import Image from 'next/image';
import Button from '../../components/Button';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import useEmblaCarousel from 'embla-carousel-react';
import gallery1 from '@/assets/gallery1.svg';
import gallery2 from '@/assets/gallery2.svg';
import gallery3 from '@/assets/gallery3.svg';
import gallery4 from '@/assets/gallery4.svg';
import gallery5 from '@/assets/gallery5.svg';
import gallery6 from '@/assets/gallery6.svg';
import gallery7 from '@/assets/gallery7.svg';

const Gallery = () => {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    align: 'start',
    slidesToScroll: 1,
    skipSnaps: false,
    containScroll: 'trimSnaps',
  });
  const [isLoading, setIsLoading] = useState(true);
  const [_selectedIndex, setSelectedIndex] = useState(0);
  const [_scrollSnaps, setScrollSnaps] = useState<number[]>([]);

  useEffect(() => {
    const timeout = setTimeout(() => setIsLoading(false), 1200);
    return () => clearTimeout(timeout);
  }, []);

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  const onInit = useCallback((api: { scrollSnapList: () => number[] }) => {
    setScrollSnaps(api.scrollSnapList());
    setIsLoading(false);
  }, []);

  const onSelect = useCallback((api: { selectedScrollSnap: () => number }) => {
    setSelectedIndex(api.selectedScrollSnap());
  }, []);

  useEffect(() => {
    if (!emblaApi) return;
    onInit(emblaApi);
    onSelect(emblaApi);
    emblaApi.on('reInit', onInit);
    emblaApi.on('select', onSelect);
  }, [emblaApi, onInit, onSelect]);

  const galleryImages = [
    {
      src: gallery1,
      alt: 'Gallery data edition photo',
      buttonText: 'Data Edition',
      link: 'https://photos.google.com/share/AF1QipPQOr1vRm_OqpkzEGqCBHeDTJANqUosjZ6SZkL4DEv3LGzZWgrVB-YkpRoK-dr88w?key=XzMwc1I2UENGWENHVTlGVmpTRGJ5bVZBd0dSNE13',
    },
    {
      src: gallery2,
      alt: 'Software workshop session photo',
      buttonText: 'Software Edition',
      link: 'https://photos.google.com/share/AF1QipPQOr1vRm_OqpkzEGqCBHeDTJANqUosjZ6SZkL4DEv3LGzZWgrVB-YkpRoK-dr88w?key=XzMwc1I2UENGWENHVTlGVmpTRGJ5bVZBd0dSNE13',
    },
    {
      src: gallery3,
      alt: 'Mental health & market day edition photo',
      buttonText: 'Mental health & Market Day',
      link: 'https://photos.google.com/share/AF1QipPQOr1vRm_OqpkzEGqCBHeDTJANqUosjZ6SZkL4DEv3LGzZWgrVB-YkpRoK-dr88w?key=XzMwc1I2UENGWENHVTlGVmpTRGJ5bVZBd0dSNE13',
    },
    {
      src: gallery4,
      alt: 'Mental health & market day edition photo',
      buttonText: 'Mental health & Market Day',
      link: 'https://photos.google.com/share/AF1QipPQOr1vRm_OqpkzEGqCBHeDTJANqUosjZ6SZkL4DEv3LGzZWgrVB-YkpRoK-dr88w?key=XzMwc1I2UENGWENHVTlGVmpTRGJ5bVZBd0dSNE13',
    },

    {
      src: gallery5,
      alt: 'Mental health & market day edition photo',
      buttonText: 'Mental health & Market Day',
      link: 'https://photos.google.com/share/AF1QipPQOr1vRm_OqpkzEGqCBHeDTJANqUosjZ6SZkL4DEv3LGzZWgrVB-YkpRoK-dr88w?key=XzMwc1I2UENGWENHVTlGVmpTRGJ5bVZBd0dSNE13',
    },

    {
      src: gallery6,
      alt: 'Mental health & market day edition photo',
      buttonText: 'Mental health & Market Day',
      link: 'https://photos.google.com/share/AF1QipPQOr1vRm_OqpkzEGqCBHeDTJANqUosjZ6SZkL4DEv3LGzZWgrVB-YkpRoK-dr88w?key=XzMwc1I2UENGWENHVTlGVmpTRGJ5bVZBd0dSNE13',
    },

    {
      src: gallery7,
      alt: 'Mental health & market day edition photo',
      buttonText: 'Mental health & Market Day',
      link: 'https://photos.google.com/share/AF1QipPQOr1vRm_OqpkzEGqCBHeDTJANqUosjZ6SZkL4DEv3LGzZWgrVB-YkpRoK-dr88w?key=XzMwc1I2UENGWENHVTlGVmpTRGJ5bVZBd0dSNE13',
    },
  ];

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <p className="text-gray-500 animate-pulse text-lg">Loading gallery...</p>
      </div>
    );
  }

  return (
    <div className="bg-tsk-light-2 lg:mt-32 w-screen py-12">
      <div className="md:max-w-7xl mx-auto px-6 font-semibold">
        <h3 className="text-3xl md:text-5xl font-semibold font-heading text-center pb-6">
          Our Gallery
        </h3>
        <p className="text-[#45084a] mx-auto px-10 pb-14 md:px-20 text-center">
          Every picture tells a story — of women finding their voice, building skills, and lifting
          each other higher. These moments are a glimpse into the heart of Tech Sisters Kenya — a
          place where growth meets belonging.
        </p>

        <div className="relative max-w-6xl mx-auto">
          <button
            onClick={scrollPrev}
            className="absolute left-[-50px] top-1/2 -translate-y-1/2 z-10 w-10 h-10 border-2 rounded-full border-tsk-primary-dark shadow-lg flex items-center justify-center hover:bg-gray-100 transition-all duration-200 -ml-5"
            aria-label="Previous slide"
          >
            <ChevronLeft className="w-6 h-6 text-[#45084a]" />
          </button>

          {/* FIXED: Proper spacing with padding approach */}
          <div className="overflow-hidden" ref={emblaRef}>
            <div className="flex" style={{ marginLeft: '-24px' }}>
              {galleryImages.map((image, index) => (
                <div
                  key={index}
                  className="flex-[0_0_100%] min-w-0 md:flex-[0_0_calc(33.333%-16px)]"
                  style={{ paddingLeft: '48px' }}
                >
                  <div className="relative w-full h-[400px] md:h-[500px] group">
                    <Image
                      src={image.src}
                      alt={image.alt}
                      sizes="(max-width: 768px) 100vw, 33vw"
                      fill
                      className="object-cover rounded-2xl"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <button
            onClick={scrollNext}
            className="absolute right-[-50px] top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full border-2 border-tsk-primary-dark shadow-lg flex items-center justify-center hover:bg-gray-100 transition-all duration-200"
            aria-label="Next slide"
          >
            <ChevronRight className="w-6 h-6 text-[#45084a]" />
          </button>
        </div>

        <div className="flex justify-center my-10">
          <Button className="text-foreground font-semibold px-4 py-4">
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
