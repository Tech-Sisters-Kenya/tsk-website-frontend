'use client';

import Link from 'next/link';

const Navbar = () => {
  return (
    <nav className="w-full flex justify-between items-center px-6 py-4 shadow-md bg-white">
      <div className="text-xl font-bold">TSK</div>
      <ul className="flex gap-6 text-sm font-medium">
        <li>
          <Link href="/">Home</Link>
        </li>
        <li>
          <Link href="/about">About</Link>
        </li>
        <li>
          <Link href="/contact">Contact</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
