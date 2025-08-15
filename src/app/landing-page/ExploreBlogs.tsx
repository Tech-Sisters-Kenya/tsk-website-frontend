'use client';

import React from 'react';
import Button from '../../components/Button';
import { CardStack } from '@/ui/card-stack';
import Image from 'next/image';
import Link from 'next/link';
import { useFetchBlogs } from '@/hooks/blog/fetch-blogs';

interface Blog {
  id: string;
  slug: string;
  title: string;
  content: string;
  image_url: string;
  extract: string;
  status: string;
  is_featured: boolean;
  author: {
    id: string;
    name: string;
    email: string;
  };
  category: {
    id: string;
    name: string;
  };
  created_at: string;
  updated_at: string;
}

const ExploreBlogs = () => {
  const { data } = useFetchBlogs();

  const blogs: Blog[] = data?.data || [];

  const cardsBlogArray = blogs?.slice(0, 3).map((blog, index) => ({
    id: Number(blog.id) || index, // Fallback to index if conversion fails
    title: blog.title,
    description: blog.extract,
    date: new Date(blog.created_at).toLocaleDateString(),
    image_url: blog.image_url,
    headerImage: '/blog-header-in-cardstack.svg',
    blogLink: `/blogs/${blog.slug}`,
  }));

  return (
    <div className=" w-full lg:max-w-7xl lg:mx-auto px-6 pt-6  md:px-24 md:pt-24  text-[#45084a] ">
      <div>
        <h1 className="font-semibold  text-3xl pb-2 md:text-5xl">EXPLORE OUR BLOGS</h1>
        <p className="italic text-base pb-1">Stories, Lessons & Resources for Tech Sisters Kenya</p>
      </div>

      <div className="flex flex-col lg:flex-row lg:gap-6 ">
        {/* latest blogs */}
        <div className="lg:w-1/2 mb-12 md:mb-0 pt-8 ">
          <h3 className="font-bold text-left lg:text-left text-[20px]">Latest blogs</h3>

          {blogs.map((blog) => (
            <div key={blog.id} data-testid="blog-card" className="flex flex-col gap-3 ">
              <Link href={`/blogs/${blog.slug}`}>
                <h3 className="font-semibold text-[18px] md:text-[20px] pt-3 hover:underline cursor-pointer">
                  {blog.title}
                </h3>
              </Link>
              <p className="italic text-[18px]">{blog.extract.slice(0, 55)}...</p>
              <hr className="w-[20%]"></hr>
            </div>
          ))}
          <div className="flex justify-center mt-8 md:mt-10  pb-6">
            <Button className="font-black px-4 py-4 text-[16px] md:text-[17x]">
              <Link href="/blogs">Read More</Link>
            </Button>
          </div>
        </div>
        <hr></hr>
        {/* the empty div below is the div for the vertical line between the blog section on large screens only */}
        <div className="hidden lg:block mt-10 mb-12 w-px bg-[#45084a] "></div>
        {/* overlapping images */}
        <div className="w-full md:mt-5 lg:w-1/2 pl-10 lg:pb-20 relative overflow-hidden z-10 ">
          <div className="relative w-full h-[550px] mt-10 lg:mt-20 lg:pl-10">
            <CardStack items={cardsBlogArray} />
          </div>
          <Image
            src="/tsk-logo.png"
            width={64}
            height={76}
            alt="Tech sisters logo"
            className="hidden lg:block lg:absolute lg:right-0 lg:-mr-1 lg:top-10 z-50"
          />
        </div>
      </div>
    </div>
  );
};
export default ExploreBlogs;
