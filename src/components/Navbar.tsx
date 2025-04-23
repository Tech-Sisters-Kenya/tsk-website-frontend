'use client';

import Link from 'next/link';
import Button from './Button';

const Navbar = () => {
  return (
    <nav className="w-full flex justify-between items-center px-6 py-4 rounded-md bg-tsk-light-2">
      <div className="text-xl font-bold">TSK</div>
      <ul className="flex gap-6 text-sm font-medium">
        <li>
          <Link href="/">Home</Link>
        </li>
        <li>
          <Link href="/about-us">About</Link>
        </li>
        <li>
          <Link href="/meet-the-team">Meet The Team</Link>{' '}
        </li>
        <li>
          <Link href="/get-involved">Get Involved</Link>{' '}
        </li>
      </ul>
      <div className="flex gap-4">
        <Button variant="secondary" className="mt-4">
          Login
        </Button>
        <Button variant="primary" className="mt-4">
          Sign Up
        </Button>
      </div>
    </nav>
  );
};

export default Navbar;
