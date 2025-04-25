'use client';

import Button from './Button';
import { CardStack } from '@/ui/card-stack';
import Image from 'next/image';

const ExploreBlogs = () => {
  const blogsArray = [
    {
      title: 'Why Join A Tech Community',
      excerpt: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit...',
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam ...',
      date: '07 March 2025',
      image: '/data-edition.png',
      id: 1,
    },
    {
      title: 'Build Together: Software Edition',
      excerpt: 'Dolore magna aliqua ut enim ad minim adipiscing elit...',
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam ...',
      date: '29 Feb 2025',
      image: '/software-edition.png',
      id: 2,
    },
    {
      title: 'Mental Health & Market Day',
      excerpt: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit...',
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam ...',
      date: '15 Feb 2025',
      image: '/mental-health-market-day.png',
      id: 3,
    },
    {
      title: 'CyberQuest 2025 Series',
      excerpt: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit...',
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam ...',
      date: '19 Feb 2025',
      image: '/mental-health-market-day.png',
      id: 4,
    },
  ];

  const cardsBlogArray = blogsArray.slice(0, 3);

  return (
    <div className="w-full lg:max-w-6xl lg:mx-auto p-6 md:p-24 text-[#45084a]">
      <div className=" text-center">
        <h1 className="font-semibold  text-3xl pb-2 md:text-5xl">EXPLORE OUR BLOGS</h1>
        <p className="italic text-base pb-1">Stories, Lessons & Resources for Tech Sisters Kenya</p>
      </div>

      <div className="flex flex-col lg:flex-row lg:gap-6">
        {/* latest blogs */}
        <div className="lg:w-1/2 mb-12 md:mb-0 pt-12">
          <h3 className="font-bold text-left lg:text-left text-[18px]">Latest blogs</h3>

          {blogsArray.map((blog) => (
            <div key={blog.id} className="flex flex-col gap-3 ">
              <h3 className="font-semibold text-[18px] md:text-[20px] pt-3">{blog.title}</h3>
              <p className="italic text-[18px]">{blog.excerpt}</p>
              <hr className="w-[20%]"></hr>
            </div>
          ))}
          <div className="flex justify-center mt-8 md:my-10">
            <Button className="font-black px-4 py-4 text-[16px] md:text-[20px]">
              <a
                href="http://www.instagram.com/techsisterskenya"
                target="_blank"
                rel="noopener noreferrer"
              >
                Read More
              </a>
            </Button>
          </div>
        </div>
        <hr></hr>
        <div className="hidden lg:block mt-10 mb-12 w-px bg-[#45084a]"></div>
        {/* overlapping images */}
        <div className="w-full md:mt-5 lg:w-1/2 pl-10 relative">
          <h2 className="text-2xl font-bold mt-5">TSK Blogs</h2>
          <div className="w-16 h-1 bg-[#45084a]"></div>
          <div className="relative w-full h-[550px] mt-10 lg:pl-10">
            <CardStack items={cardsBlogArray} />
          </div>
          <Image
            src="/tsk-logo.png"
            width={64}
            height={76}
            alt="Tech sisters logo"
            className="hidden lg:block lg:absolute lg:right-0 lg:-mr-1 lg:top-14 z-50"
          />
        </div>
      </div>
    </div>
  );
};
export default ExploreBlogs;
