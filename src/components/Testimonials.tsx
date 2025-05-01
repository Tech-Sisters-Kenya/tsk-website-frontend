'use client';

import { useEffect, useCallback, useRef } from 'react';
import { EmblaOptionsType } from 'embla-carousel';
import { DotButton, useDotButton } from '@/ui/EmblaCarouselDotButton';
import { PrevButton, NextButton, usePrevNextButtons } from '@/ui/EmblaCarouselArrowButtons';
import useEmblaCarousel from 'embla-carousel-react';
import Image from 'next/image';

type SlideData = {
  testimonial: string;
  avatar: string;
  name: string;
  role: string;
};

type PropType = {
  slides: SlideData[];
  options?: EmblaOptionsType;
};

const Testimonials: React.FC<PropType> = (props) => {
  const { slides, options } = props;

  const [emblaRef, emblaApi] = useEmblaCarousel({
    ...options,
    loop: true, //infinite loop
    align: 'center',
    containScroll: 'trimSnaps',
  });

  const autoplayInterval = useRef<NodeJS.Timeout | null>(null);

  // Auto-scroll function
  const autoplay = useCallback(() => {
    if (!emblaApi) return;
    if (emblaApi.canScrollNext()) {
      emblaApi.scrollNext();
    } else {
      emblaApi.scrollTo(0); // loop back to the start
    }
  }, [emblaApi]);

  // Start autoplay
  useEffect(() => {
    if (!emblaApi) return;

    autoplayInterval.current = setInterval(autoplay, 5000); // scroll every 5s

    return () => {
      if (autoplayInterval.current) clearInterval(autoplayInterval.current);
    };
  }, [emblaApi, autoplay]);

  const { selectedIndex, scrollSnaps, onDotButtonClick } = useDotButton(emblaApi);

  const { prevBtnDisabled, nextBtnDisabled, onPrevButtonClick, onNextButtonClick } =
    usePrevNextButtons(emblaApi);
  return (
    <div className=" px-4 py-8 bg-tsk-light-2 text-center text-[#45084a] ">
      <div className="max-w-3xl mx-auto">
        <h3 className="font-bold text-[32px] md:text-[36] ">Testimonials</h3>
        <p className="font-medium text-[20px] px-4 pb-3 md:text-[20px] md:px-20 md:mb-10">
          From gaining skills to finding belonging — here’s what our community has to say.
        </p>

        {/* actual carousel */}
        <div className="mx-auto px-4 py-8 w-[90%] md:w-[75%] bg-white rounded-3xl ">
          <div className="relative">
            <div
              className="overflow-hidden"
              ref={emblaRef}
              // stop autoplay when user hovers
              onMouseEnter={() => clearInterval(autoplayInterval.current!)}
              onMouseLeave={() => {
                autoplayInterval.current = setInterval(autoplay, 5000);
              }}
            >
              <div className="flex">
                {slides.map((testimonial, index) => (
                  <div className="flex-[0_0_100%] min-w-0 text-[#45084a]" key={index}>
                    <div className="px-4 md:px-8 lg:px-14">
                      <p className="text-[19px] italic md:text-[20px] text-center mb-8">
                        {testimonial.testimonial}
                      </p>

                      <div className="flex flex-col items-center justify-center">
                        <Image
                          src="/testimonial-avatar.png"
                          alt={`avatar of ${testimonial.name}`}
                          width={100}
                          height={100}
                          className="w-15 h-15 rounded-[20px] flex-shrink-0"
                        />
                        <p className="text-[18px] font-bold pt-2">{testimonial.name}</p>
                        <p className="">{testimonial.role}</p>
                        <div className="ml-4"></div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Buttons */}

        <div className="lg:flex gap-8 hidden justify-center pt-5">
          <PrevButton onClick={onPrevButtonClick} disabled={prevBtnDisabled} />
          <NextButton onClick={onNextButtonClick} disabled={nextBtnDisabled} />
        </div>

        {/* Dots */}
        <div className="embla__dots flex gap-2 justify-center mt-[1.5rem] lg:hidden">
          {scrollSnaps.map((_, index) => (
            <DotButton
              key={index}
              onClick={() => onDotButtonClick(index)}
              className={`embla__dot ${
                index === selectedIndex
                  ? 'shadow-[inset_0_0_0_0.2rem_var(--text-body)] bg-[#18132c]'
                  : 'bg-[#bababa] '
              } 
							appearance-none touch-manipulation text-decoration-none 
							cursor-pointer p-0 m-0 w-[8px] h-[8px] flex items-center justify-center rounded-full after:content-[''] after:absolute after:shadow-[inset_0_0_0_0.2rem_var(--detail-medium-contrast)] after:w-[1.4rem] after:h-[1.4rem] after:rounded-full after:flex after:items-center`}
            />
          ))}
        </div>

        <Image
          src="/tsk-logo.png"
          width={64}
          height={76}
          alt="Tech sisters logo"
          className=" mx-auto mt-10"
        />
      </div>
    </div>
  );
};
export default Testimonials;
