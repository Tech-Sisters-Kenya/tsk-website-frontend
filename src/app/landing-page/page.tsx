import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Button from '@/components/Button';

export default function LandingPage() {
  return (
    <div>
      <Navbar />
      <main className="flex min-h-screen flex-col items-center justify-center p-24">
        <h1 className="text-4xl font-bold">Landing Page</h1>
        <Button variant="primary" className="mt-4">
          Get Started
        </Button>
      </main>
      <Footer />
    </div>
  );
}
