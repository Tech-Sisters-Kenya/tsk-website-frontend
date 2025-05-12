import React from 'react';
import BlogWelcomeHeader from '@/components/BlogWelcomeHeader';
import TagSelector from '../../components/TagSelector';

export default function BlogsPage() {
  return (
    <main className="flex flex-col items-center justify-between mx-8">
      <BlogWelcomeHeader />

      <div className="w-full px-12 text-tsk-primary-dark mt-10">
        <h3 className="font-body text-xl font-bold mb-5">Categories</h3>
        <TagSelector />
      </div>
    </main>
  );
}
