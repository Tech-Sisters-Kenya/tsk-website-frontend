'use client';
import Button from '@/components/Button';
import Image from 'next/image';
import React from 'react';
// import blogs from '@/data/blog-content';
import { notFound, useParams } from 'next/navigation';
import Link from 'next/link';
import { useFetchSingleBlog } from '@/hooks/blog/fetch-single-blog';
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

export default function BlogPost() {
  const params = useParams();
  const blogId = params.blogId;
  const blogIdStr = blogId ? String(blogId) : '';
  const { data: blogData, isLoading, isError } = useFetchSingleBlog(blogIdStr);
  const blog = blogData?.data;

  //fetch all the blogs
  const { data } = useFetchBlogs();
  const blogs: Blog[] = data?.data || [];

  // Find the current blog post, corrected to match the ids
  // const blog = blogs.find((blog) => String(blog.id) === String(blogId));

  if (!blogId) {
    return <div>Loading...</div>;
  }

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Something went wrong loading this blog.</div>;
  }

  console.log('blog', blog.data);
  if (!blog) return notFound();

  //fetch the blogs and filter to ensure you don't display the already showing blog and slice to display 3 of them for the 'More Blogs' section
  const moreBlogs = blogs.filter((b) => b.id !== blog.id).slice(0, 3);

  // format date
  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return new Intl.DateTimeFormat('en-GB', {
      day: '2-digit',
      month: 'long',
      year: 'numeric',
    }).format(date);
  };

  return (
    <section className="w-full h-full">
      <div className="flex flex-col justify-center items-center md:px-20 px-10">
        {/* Main Blog Content */}
        <div className="lg:my-24 my-10 flex flex-col gap-4">
          <h1 className="md:text-5xl text-3xl font-heading font-extrabold">{blog.title}</h1>
          {/* <p className="text-gray-600 mb-4">{blog.date}</p> */}
          {blog.image && (
            <div className="sm:h-[400px] h-[200px] md:my-14 my-6 w-auto overflow-hidden rounded-2xl">
              <Image
                src={blog.image_url}
                alt={blog.title}
                width={1200}
                height={400}
                className="object-cover h-full rounded-2xl place-self-center"
              />
            </div>
          )}
          <div className="font-body md:text-lg sm:text-base text-sm font-medium text-tsk-primary-dark lg:space-y-10 space-y-8 lg:mx-20">
            {/* 
            there needs to be a well-defined subtitle from the backend as there's only the excerpt and the content */}
            {/* <h2 className="font-extrabold text-xl font-body">
							{blog.subtitle}
						</h2> */}
            {blog.content &&
              blog.content.split('\n\n').map((paragraph: string, id: number) => (
                <p key={id} className="">
                  {paragraph}
                </p>
              ))}
          </div>
        </div>
        {/* More Blogs Section */}
        <div className="w-full flex flex-col justify-center items-center mt-20">
          <h1 className="font-body text-3xl font-semibold mb-16">More Blogs</h1>
          <div className="w-full grid lg:grid-cols-3 md:grid-cols-2 gap-10">
            {moreBlogs.map((blog) => (
              <div key={blog.id} className="col-span-1 flex flex-col space-y-2">
                <Link href={`/blogs/${blog.id}`} className="cursor-pointer">
                  {blog.image_url && (
                    <div className="h-auto">
                      <Image
                        src={blog.image_url}
                        alt={blog.title}
                        width={350}
                        height={220}
                        className="w-full rounded-3xl h-[220px] object-cover overflow-hidden"
                      />
                    </div>
                  )}
                </Link>

                <div className="flex flex-row gap-4 text-[15px] font-body mb-4">
                  <button className="border-[1px] border-tsk-primary-dark rounded-[10px] px-4 font-medium">
                    {blog.category.name}
                  </button>
                  <p className="font-semibold text-tsk-primary-dark">
                    {formatDate(blog.created_at)}
                  </p>
                </div>

                <Link href={`/blogs/${blog.id}`} className="cursor-pointer group">
                  <h2 className="font-body font-extrabold text-xl group-hover:underline">
                    {blog.title}
                  </h2>
                </Link>

                <Link href={`/blogs/${blog.id}`} className="cursor-pointer group">
                  <p className="italic font-body text-[15px] font-normal group-hover:underline">
                    {blog.extract}
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
