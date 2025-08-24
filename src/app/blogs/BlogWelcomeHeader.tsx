'use client';

import React from 'react';
import Link from 'next/link';
import { AnimatedBlogPage } from './AnimatedBlogPage';
import { useAuthStore } from '@/stores/useAuthStore';

const BlogWelcomeHeader = () => {
  const { isAuthenticated, user } = useAuthStore();

  const isAdmin = isAuthenticated && user?.role?.includes('admin');

  return (
    <section className="w-full mx-auto text-tsk-primary-dark px-8 mt-8">
      <div className="bg-tsk-light-2 rounded-b-3xl px-14">
        <div className="grid grid-cols-1 lg:grid-cols-2 items-center">
          <div>
            <h1 className="font-black font-heading text-5xl leading-[150%]">Blogs</h1>
            <div className="font-body text-[30px] font-medium mt-8">
              <p>Welcome to the Tech Sisters Kenya blog</p>
              <p> — </p>
              <p>A space created to educate, inspire, and uplift women in tech.</p>
            </div>

            {isAdmin && (
              <div className="mt-8">
                <Link
                  href="/blogs/new"
                  className="inline-block bg-tsk-primary text-white px-6 py-3 rounded-xl font-semibold hover:opacity-90 transition"
                >
                  + Write a Blog
                </Link>
              </div>
            )}
          </div>

          <div className="flex justify-center items-center mt-10 w-full">
            <AnimatedBlogPage />
          </div>
        </div>

        <p className="font-decorative text-4xl mt-10">
          Stories shape us. Knowledge elevates us. Community carries us.
        </p>
      </div>
    </section>
  );
};

export default BlogWelcomeHeader;
