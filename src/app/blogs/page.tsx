import React from 'react';
import BlogWelcomeHeader from '@/components/BlogWelcomeHeader';
import TagSelector from '@/app/blogs/TagSelector';
import Pagination from './Pagination';

export default function BlogsPage() {
  return (
    <main className="flex flex-col justify-center">
      <BlogWelcomeHeader />
      <div className="flex flex-col items-center justify-between mx-8">
        <div className="w-full px-12 text-tsk-primary-dark mt-10">
          <h3 className="font-body text-xl font-bold mb-5">Categories</h3>
          <TagSelector />
        </div>
        <Pagination />
      </div>
    </main>
  );
}
