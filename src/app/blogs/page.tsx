import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import BlogWelcomeHeader from '@/components/BlogWelcomeHeader';

export default function BlogsPage() {
  return (
    <div>
      <Navbar />
      <main className="flex min-h-screen flex-col items-center justify-between mx-8">
        <BlogWelcomeHeader />
      </main>

      <Footer />
    </div>
  );
}
