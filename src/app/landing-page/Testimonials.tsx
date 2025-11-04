'use client';

import React from 'react';
import { SetStateAction, useCallback, useEffect, useState } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import BrandsSection from './BrandsSection';

const testimonials = [
  {
    testimonial:
      "'Being part of Tech Sisters Kenya has been a game-changer for me. The mentorship I've received has given me the confidence to tackle new challenges at work.'",
    avatar: '/testimonial-avatar-1',
    name: 'Mary Wanjiku',
    role: '-Software Developer-',
  },
  {
    testimonial:
      "'Joining Tech Sisters Kenya opened doors to opportunities and friendships I never imagined. It's a vibrant and empowering space for women in the Kenyan tech industry.'",
    avatar: '/testimonial-avatar',
    name: 'Jacinta Muga',
    role: '-Product Designer-',
  },
  {
    testimonial:
      "'Tech Sisters Kenya is my go-to for learning and connecting with other women in tech. The workshops are practical, and the community is so encouraging!'",
    name: 'Mercy Mwende',
    role: '-Software Engineer-',
  },
  {
    testimonial:
      "'One of my favorite things about Tech Sisters Kenya is the inclusivity, and diversity of all things tech - ranging from mental health to career growth and tech culture.'",
    name: 'Sally Kahoro',
    role: '-Web3 Developer-',
  },
];

export default function TestimonialsCarousel() {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    align: 'center',
  });
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [scrollSnaps, setScrollSnaps] = useState<number[]>([]);

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  const scrollTo = useCallback(
    (index: number) => {
      if (emblaApi) emblaApi.scrollTo(index);
    },
    [emblaApi]
  );

  const onInit = useCallback((emblaApi: { scrollSnapList: () => SetStateAction<number[]> }) => {
    setScrollSnaps(emblaApi.scrollSnapList());
  }, []);

  const onSelect = useCallback((emblaApi: { selectedScrollSnap: () => SetStateAction<number> }) => {
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, []);

  useEffect(() => {
    if (!emblaApi) return;

    onInit(emblaApi);
    onSelect(emblaApi);
    emblaApi.on('reInit', onInit);
    emblaApi.on('select', onSelect);
  }, [emblaApi, onInit, onSelect]);
  return (
    <>
      <div className="relative overflow-hidden z-10 px-6 sm:px-10 md:px-14 lg:px-12 py-8 bg-tsk-light-2 text-center text-[#45084a] w-screen mb-14">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <h3 className="font-bold text-[32px] md:text-[36] lg:text-[48px]">Testimonials</h3>
          <p className="font-medium text-[20px] px-4 pb-3 md:text-[20px] lg:text-[24px] md:px-20 md:mb-10">
            From building skills to finding sisterhood — this is what being a Tech Sister feels
            like.
          </p>

          {/* Carousel */}
          <div className="mx-auto px-4 py-6 w-[70%] md:w-[60%] lg:w-full bg-white rounded-3xl relative z-10">
            <div className="overflow-hidden" ref={emblaRef}>
              <div className="flex">
                {testimonials.map((testimonial, index) => (
                  <div key={index} className="flex-[0_0_100%] min-w-0 px-4">
                    <div className="px-4 md:px-8 lg:px-10">
                      <p className="text-[17px] italic md:text-[16px] text-center mb-6 font-body text-tsk-primary-dark">
                        {testimonial.testimonial}
                      </p>

                      <div className="flex flex-col items-center">
                        <div className="flex flex-col items-center justify-center">
                          <Image
                            src="/testimonial-avatar.png"
                            alt={testimonial.name}
                            width={80}
                            height={80}
                            className="w-15 h-15 rounded-[20px] flex-shrink-0"
                          />
                          <p className="text-[16px] font-bold pt-2">{testimonial.name}</p>
                          <p className="">{testimonial.role}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Navigation */}
          <div className="flex items-center justify-center gap-16 mt-12">
            <Button
              variant="outline"
              size="icon"
              onClick={scrollPrev}
              className="hidden lg:flex w-8 h-8 rounded-full border-2 border-[#45084a] text-[#45084a] hover:bg-[#a848c7] hover:text-white hover:border-none transition-all duration-200 hover:scale-110"
            >
              <ChevronLeft className="w-5 h-5" />
              <span className="sr-only">Previous testimonial</span>
            </Button>

            {/* Dots */}
            <div className="flex gap-2 lg:hidden">
              {scrollSnaps.map((_, index) => (
                <button
                  key={index}
                  onClick={() => scrollTo(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-200 hover:scale-125 ${
                    index === selectedIndex ? 'bg-[#6f169e]' : 'bg-[#efd5f8] hover:bg-[#a848c7]'
                  }`}
                  aria-label={`Go to testimonial ${index + 1}`}
                />
              ))}
            </div>

            <Button
              variant="outline"
              size="icon"
              onClick={scrollNext}
              className="hidden lg:flex w-8 h-8 rounded-full border-2 border-[#45084a] text-[#45084a] hover:bg-[#a848c7] hover:text-white hover:border-none transition-all duration-200 hover:scale-110"
            >
              <ChevronRight className="w-5 h-5" />
              <span className="sr-only">Next testimonial</span>
            </Button>
          </div>
          <div className="absolute bottom-0 left-0 w-66 h-66 opacity-20 pointer-events-none hidden lg:block">
            <Image
              src="/tsk-logo.png"
              width={400}
              height={420}
              alt="Tech sisters logo"
              className="object-contain"
            />
          </div>
        </div>
      </div>
      <BrandsSection />
    </>
  );
}
