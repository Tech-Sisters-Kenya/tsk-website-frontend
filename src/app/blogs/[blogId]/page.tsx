'use client';
import Button from '@/components/Button';
import Image from 'next/image';
import React from 'react';
import blogs from '@/data/blog-content';
import { notFound, useParams } from 'next/navigation';
import Link from 'next/link';

export default function BlogPost() {
  const params = useParams();
  const blogId = params.blogId;

  // Find the current blog post
  const blog = blogs.find((blog) => blog.name === blogId);

  if (!blog) return notFound();

  const moreBlogs = blogs.filter((b) => b.id !== blog.id).slice(0, 3);
  return (
    <section className="w-full h-full">
      <div className="flex flex-col justify-center items-center md:px-20 px-10">
        {/* Main Blog Content */}
        <div className="lg:my-20 my-10 flex flex-col gap-4">
          <h1 className="md:text-5xl text-3xl font-heading font-extrabold">{blog.title}</h1>
          <p className="text-gray-600 mb-4">{blog.date}</p>
          {blog.image && (
            <div className="my-6 w-auto h-auto overflow-hidden rounded-2xl">
              <Image
                src={blog.image}
                alt={blog.name}
                className=" object-cover sm:h-[350px] rounded-2xl place-self-center"
                width={1200}
                height={350}
              />
            </div>
          )}
          <div className="font-body md:text-lg sm:text-base text-sm font-medium text-tsk-primary-dark space-y-4 lg:mx-20">
            {blog.content.map((paragraph, id) => (
              <p key={id} className="">
                {paragraph}
              </p>
            ))}
          </div>
        </div>

        {/* More Blogs Section */}
        <div className="w-full flex flex-col justify-center items-center">
          <h1 className="font-body text-3xl font-semibold mb-8">More Blogs</h1>
          <div className="w-full grid lg:grid-cols-3 md:grid-cols-2 gap-10">
            {moreBlogs.map((blog) => (
              <div key={blog.id} className="col-span-1 flex flex-col space-y-2">
                <Link href={`/blogs/${blog.name}`} className="cursor-pointer">
                  {blog.image && (
                    <div className="h-auto">
                      <Image
                        src={blog.image}
                        alt={blog.name}
                        width={350}
                        height={220}
                        className="w-full rounded-3xl h-[220px] object-cover overflow-hidden"
                      />
                    </div>
                  )}
                </Link>

                <div className="flex flex-row gap-4 text-[15px] font-body mb-4">
                  <button className="border-[1px] border-tsk-primary-dark rounded-[10px] px-4 font-medium">
                    {blog.category}
                  </button>
                  <p className="font-semibold text-tsk-primary-dark">{blog.date}</p>
                </div>

                <Link href={`/blogs/${blog.name}`} className="cursor-pointer group">
                  <h2 className="font-body font-extrabold text-xl group-hover:underline">
                    {blog.title}
                  </h2>
                </Link>

                <Link href={`/blogs/${blog.name}`} className="cursor-pointer group">
                  <p className="italic font-body text-[15px] font-normal group-hover:underline">
                    {blog.content[0].substring(0, 150)}...
                  </p>
                </Link>
              </div>
            ))}
          </div>
          <Link href="/blogs">
            <Button className="mt-10">View All</Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
