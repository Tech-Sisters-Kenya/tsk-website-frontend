'use client';

import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';

import Image from 'next/image';
import image1 from '../../../public/about-us/image-1-scroll.png';
import image2 from '../../../public/about-us/image-2-scroll.png';
import image3 from '../../../public/about-us/image-3-scroll.png';
import image4 from '../../../public/about-us/image-4-scroll.png';
import image5 from '../../../public/about-us/image-5-scroll.png';

import Button from '@/components/Button';

const OurGallery = () => {
  const photoArray = [image1, image2, image3, image4, image5];
  return (
    <div className="bg-tsk-light-2 py-8 px-2 mt-10 lg:pt-16 lg:mt-32 w-full">
      <div className="md:max-w-5xl mx-auto p-4 font-semibold">
        <h3 className=" text-3xl md:text-5xl text-center pb-2 ">Gallery</h3>
        <p className="text-[#45084a] px-10 pb-10 md:px-20 text-center">
          Every picture tells a story — of women finding their voice, building skills, and lifting
          each other higher. These moments are a glimpse into the heart of Tech Sisters Kenya — a
          place where growth meets belonging.
        </p>

        <Carousel
          opts={{
            align: 'start',
          }}
          className="w-full relative overflow-visible"
        >
          <CarouselContent className="-ml-1">
            {photoArray.map((image, index) => (
              <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
                <div className="p-1">
                  <Card>
                    <CardContent className="flex items-center justify-center">
                      <Image
                        src={image}
                        alt={`About us image ${index + 1}`}
                        className="rounded-xl object-cover"
                        width={600}
                        height={400}
                      />
                    </CardContent>
                  </Card>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="-left-2 md:-left-4" />
          <CarouselNext className="-right-2 md:-right-4" />
        </Carousel>

        <div className="flex justify-center mt-8">
          <Button className="px-4 py-4 font-extrabold text-[20px]">
            <a
              href="https://photos.google.com/share/AF1QipPE1ug0qCjR7CGbQspvzZ2qpG6UZUOIltvz08KHmfx2L4eA9N9C02oW6TxZiF4Tug?pli=1&key=VDNoNnVvNVZTZEFUV0VTYnU5SVloVXVmMzl6QmtR"
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
export default OurGallery;
