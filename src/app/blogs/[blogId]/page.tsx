'use client';
import Button from '@/components/Button';
import Image from 'next/image';
import React from 'react';
// import blogs from '@/data/blog-content';
import { notFound, useParams } from 'next/navigation';
import Link from 'next/link';
import { useFetchSingleBlog } from '@/hooks/blog/fetch-single-blog';
import { useFetchBlogs } from '@/hooks/blog/fetch-blogs';
import { useFetchBlogAuthor } from '@/hooks/blog/fetch-blogAuthor';
import DOMPurify from 'dompurify';
import InitialDialog from '../(login)/InitialDialog';

// ✅ Reusable loading state
const LoadingState = () => (
  <div className="flex flex-col items-center justify-center min-h-[300px] text-tsk-primary-dark">
    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-tsk-primary-dark mb-4"></div>
    <p className="text-lg font-medium">Loading blog...</p>
  </div>
);

// ✅ Reusable error state
const ErrorState = ({ message }: { message?: string }) => (
  <div className="flex flex-col items-center justify-center min-h-[300px] text-red-600">
    <Image src="/error-icon.svg" alt="Error" width={50} height={50} />
    <p className="mt-4 font-semibold">Something went wrong</p>
    <p className="text-sm text-gray-500">{message || 'Please try again later.'}</p>
  </div>
);

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
  const blogSlug = params.blogId;

  const blogIdStr = blogSlug ? String(blogSlug) : '';
  const { data: blogData, isLoading, isError, error } = useFetchSingleBlog(blogIdStr);
  const blog = blogData?.data;
  const currentBlogId = blog?.id;

  //fetch blog author details using the authorId from the blog - use in the sidepanel. add currentBlogId to the queryKey to avoid cache issues
  const authorId = blog?.author.name;
  const { data: authorData, isLoading: authorLoading } = useFetchBlogAuthor(
    authorId,
    currentBlogId
  );

  //this is the array of blogposts written by the author
  const authorDataArray = authorData?.data || [];

  //fetch all the blogs to loop over and show under 'More blogs' section
  const { data, isLoading: blogsLoading } = useFetchBlogs();
  const blogs: Blog[] = data?.data || [];

  // Find the current blog post, corrected to match the ids
  // const blog = blogs.find((blog) => String(blog.id) === String(blogId));

  if (!blogSlug || isLoading) {
    return <LoadingState />;
  }

  if (isError) return <ErrorState message={(error as Error)?.message} />;

  if (isError) {
    return <div>Something went wrong loading this blog.</div>;
  }

  if (!blog) return notFound();

  //fetch the blogs and filter to ensure you don't display the already showing blog and slice to display 3 of them for the 'More Blogs' section
  const moreBlogs = blogs.filter((b) => b.slug !== blog.slug).slice(0, 3);

  //filter this array so that the 'recent posts by this author' do not include the current post
  const filteredAuthorBlogs = authorDataArray.filter(
    (excludeBlog: Blog) => excludeBlog.id !== blog.id
  );

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
      <div className="flex flex-col justify-center items-center md:px-20 px-10 md:py-32">
        {/* Main Blog Content */}
        {/* TO BE REMOVED */}
        <InitialDialog />
        {/* TO BE REMOVED */}
        <div className="lg:my-24 my-10 flex flex-col gap-4 ">
          <h1 className="md:text-5xl text-3xl font-heading font-extrabold">{blog.title}</h1>
          {/* <p className="text-gray-600 mb-4">{blog.date}</p> */}
          {blog.image_url && (
            <div className="sm:h-[400px] h-[200px] md:my-14 my-6 w-auto overflow-hidden rounded-2xl">
              {/* make header images dynamic */}
              <Image
                src={blog.image_url}
                alt={blog.title}
                width={1200}
                height={400}
                className="object-cover h-full rounded-2xl place-self-center"
              />
            </div>
          )}
          <div className="flex flex-col lg:flex-row">
            {/* main blog content */}
            <div
              data-testid="blog-content"
              className="prose prose-lg font-body max-w-none text-gray-800 lg:mx-20  mb-10 flex-1"
              dangerouslySetInnerHTML={{ __html: blog.content }}
            />

            {/* side panel with author content & recent posts */}
            <div className="flex flex-col gap-8 md:w-full lg:w-1/4">
              {authorLoading ? (
                <LoadingState />
              ) : (
                <div className="bg-tsk-light-2 p-8 rounded-[20px] md:w-full flex flex-col justify-center items-center">
                  <h1 className="text-xl font-semibold">Author</h1>
                  <div className="flex flex-col justify-center items-center w-[74px] h-[74px] my-2">
                    <Image
                      src={blog.image_url}
                      width={86}
                      height={81}
                      alt="Article author"
                      className="object-cover rounded-full"
                    />
                  </div>
                  <h2 className="font-medium text-[16px] text-tsk-primary-dark">
                    {blog.author.name}
                  </h2>
                  <p className="italic text-[16px] my-2 text-tsk-primary-dark text-center">
                    Mental Health <br></br>Channel Coordinator
                  </p>

                  <hr className="h-[1px] bg-black border-none my-4 w-[50%]" />

                  <div className="flex flex-col gap-2">
                    <label className="flex items-center gap-2">
                      <Image src="/x.svg" alt="twitter icon" width={18} height={18} />
                      <span className="w-4"> - </span>
                      <span className="text-[12px]">{blog.author.name.toLowerCase()}</span>
                    </label>
                    <label className="flex items-center gap-2">
                      <Image src="/linkedin.svg" alt="linkedin icon" width={18} height={18} />{' '}
                      <span className="w-4"> - </span>
                      <span className="text-[12px]">{blog.author.name.toLowerCase()}</span>
                    </label>
                  </div>
                </div>
              )}

              {filteredAuthorBlogs.length > 0 && (
                <div className="bg-tsk-light-2 p-4 rounded-[20px] md:w-full lg:w-[365px] text-tsk-primary-dark font-body py-8 ">
                  <h1 className="text-xl font-extrabold text-center">Recent Posts</h1>
                  <p className="text-center text-[15px] font-light">From Author</p>
                  <hr className="h-[0.5px] w-[25%] bg-black border-none my-4 place-self-center" />
                  <span className="flex flex-col gap-5">
                    {filteredAuthorBlogs.map((blog: Blog) => (
                      <div key={blog.id} className="flex gap-2 ">
                        <Link href={`/blogs/${blog.slug}`} className="cursor-pointer">
                          {blog.image_url && (
                            <div className="h-full w-full">
                              <Image
                                src={blog.image_url}
                                alt={blog.title}
                                width={70}
                                height={65}
                                className="rounded-[15px] w-[70px] h-[65px] overflow-hidden"
                              />
                            </div>
                          )}
                        </Link>
                        <div className="flex flex-col justify-center">
                          <Link href={`/blogs/${blog.slug}`} className="cursor-pointer group">
                            {/* Small screens & large screens: truncated */}
                            <h2 className="font-body font-semibold text-[12px] group-hover:underline block md:hidden lg:block">
                              {blog.title.substring(0, 24)}...
                            </h2>

                            {/* Medium screen only: full text */}
                            <h2 className="font-body font-semibold text-base group-hover:underline hidden md:block lg:hidden">
                              {blog.title}
                            </h2>
                          </Link>

                          <Link href={`/blogs/${blog.slug}`} className="cursor-pointer group">
                            <p
                              data-testid="blog-content"
                              className="italic font-body text-[11px] font-normal group-hover:underline pt-2"
                              dangerouslySetInnerHTML={{
                                __html: DOMPurify.sanitize(blog.extract.substring(0, 120) + '...'),
                              }}
                            />
                          </Link>

                          <p className="font-medium text-[10px] text-tsk-primary-dark uppercase">
                            {formatDate(blog.created_at)}
                          </p>
                        </div>
                      </div>
                    ))}
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* More Blogs Section */}
        <div className="w-full flex flex-col justify-center items-center mt-8">
          <h1 className="font-body text-3xl font-semibold mb-16">More Blogs</h1>
          {blogsLoading ? (
            <LoadingState />
          ) : (
            <div className="w-full grid lg:grid-cols-3 md:grid-cols-2 gap-10">
              {moreBlogs.map((blog) => (
                <div key={blog.id} className="col-span-1 flex flex-col space-y-2">
                  <Link href={`/blogs/${blog.slug}`} className="cursor-pointer">
                    {blog.image_url && (
                      <div className="h-auto">
                        <Image
                          src={blog.image_url}
                          alt={blog.title}
                          width={350}
                          height={220}
                          className="w-full rounded-3xl h-[300px] object-cover overflow-hidden"
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

                  <Link href={`/blogs/${blog.slug}`} className="cursor-pointer group">
                    <h2 className="font-body font-extrabold text-xl group-hover:underline">
                      {blog.title}
                    </h2>
                  </Link>

                  <Link href={`/blogs/${blog.slug}`} className="cursor-pointer group">
                    <p
                      className="italic font-body text-[15px] font-normal group-hover:underline"
                      dangerouslySetInnerHTML={{
                        __html: DOMPurify.sanitize(blog.extract.substring(0, 250)) + '...',
                      }}
                    />
                  </Link>
                </div>
              ))}
            </div>
          )}

          <Link href="/blogs">
            <Button className="mt-10">View All</Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
