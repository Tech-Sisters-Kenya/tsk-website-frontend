'use client';

import React from 'react';

import { Button } from '@/components/ui/button';
import { Card, CardDescription, CardFooter, CardHeader } from '@/components/ui/card';

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const OurStory = () => {
  return (
    <div className="bg-tsk-light-2 py-8 px-2 mt-10 lg:mt-20 w-full text-center text-tsk-primary-dark">
      <p className="font-bold text-3xl md:text-5xl pb-8 pt-4">
        Our Story <span className="font-decorative">So Far ...</span>
      </p>

      {/* Selection section */}
      <div className="flex w-full flex-col gap-6 text-tsk-primary-dark max-w-5xl mx-auto">
        <Tabs defaultValue="founding-story">
          <TabsList className="my-10 md:mt-10 md:mb-6 flex flex-col md:flex-row w-full items-stretch justify-center gap-2 md:gap-0">
            <TabsTrigger className="font-medium text-lg md:text-2xl flex-1" value="founding-story">
              Our Founding Story
            </TabsTrigger>
            <TabsTrigger className="font-medium text-lg md:text-2xl flex-1" value="focus-areas">
              Our Focus Areas
            </TabsTrigger>
            <TabsTrigger className="font-medium text-lg md:text-2xl flex-1" value="our-impact">
              Our Impact So Far
            </TabsTrigger>
          </TabsList>
          <TabsContent value="founding-story">
            <Card>
              <CardHeader className="pt-8">
                <CardDescription className="font-medium text-[16px] md:text-[20px]">
                  We began with a spark at a bootcamp and grew into Kenya’s largest sisterhood for
                  women in tech. <br></br>
                  Discover the milestones that built our community.
                </CardDescription>
              </CardHeader>

              {/* TODO - Link tp the about subpages */}
              <CardFooter className="">
                <Button className="w-[50%] md:w-[30%] border border-tsk-primary-dark p-6 text-tsk-primary-dark font-extrabold text-[16px] md:text-[20px] mx-auto cursor-pointer hover:text-white hover:bg-tsk-primary-dark hover:border-tsk-primary-dark">
                  Read More
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>
          <TabsContent value="focus-areas">
            <Card>
              <CardHeader className="pt-8">
                <CardDescription className="font-medium text-[16px] md:text-[20px]">
                  From code challenges to mentorship circles, wellness check-ins to speaking on big
                  stages. <br></br>
                  See how we empower Tech sisters across every stage of their journey.
                </CardDescription>
              </CardHeader>

              <CardFooter>
                <Button className="w-[50%] md:w-[30%] border border-tsk-primary-dark p-6 text-tsk-primary-dark font-extrabold text-[16px] md:text-[20px] mx-auto cursor-pointer hover:text-white hover:bg-tsk-primary-dark hover:border-tsk-primary-dark">
                  Read More
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>
          <TabsContent value="our-impact">
            <Card>
              <CardHeader className="pt-8">
                <CardDescription className="font-medium text-[16px] md:text-[20px]">
                  Confidence boosted, careers launched, networks built.<br></br>
                  Explore the numbers and stories behind how Tech Sisters are shaping Kenya&apos;s
                  tech ecosystem.
                </CardDescription>
              </CardHeader>

              <CardFooter>
                <Button className="w-[50%] md:w-[30%] border border-tsk-primary-dark p-6 text-tsk-primary-dark font-extrabold text-[16px] md:text-[20px] mx-auto cursor-pointer hover:text-white hover:bg-tsk-primary-dark hover:border-tsk-primary-dark">
                  Read More
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default OurStory;
