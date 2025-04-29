import Donate from '@/components/donate';
import Volunteer from '@/components/volunteer';
import React from 'react';

export default function GetInvolved() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <h1 className="text-4xl font-bold">Get Involved</h1>

      <Volunteer />
      <Donate />
    </main>
  );
}
