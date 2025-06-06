import React from 'react';
import { AnimatedBlogPage } from '../../components/svg_components/AnimatedBlogPage';

const BlogWelcomeHeader = () => {
  return (
    <section className="w-full  mx-auto text-tsk-primary-dark px-8 -mt-14 -z-10">
      <div className=" bg-tsk-light-2 rounded-b-3xl px-16">
        <div className="pt-20 grid grid-cols-1 lg:grid-cols-2 items-center">
          <div>
            <h1 className="font-black font-heading text-5xl leading-[150%]">Blogs</h1>
            <div className="font-body text-[32px] mt-8">
              <p>Welcome to the Tech Sisters Kenya blog </p>
              <p> — </p>
              <p className=""> A space created to educate, inspire, and uplift women in tech. </p>
            </div>
          </div>
          <div className="flex justify-center items-center w-full">
            <AnimatedBlogPage />
          </div>
        </div>
        <p className="font-decorative text-4xl">
          Stories shape us. Knowledge elevates us. Community carries us.
        </p>
      </div>
    </section>
  );
};

export default BlogWelcomeHeader;
