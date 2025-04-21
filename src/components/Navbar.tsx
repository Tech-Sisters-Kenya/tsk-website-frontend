'use client';

import { usePathname } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import clsx from 'clsx';

import Logo from '@/assets/tsk-icon-only-logo.svg';
import Button from './Button';

interface NavLinkProps {
  href: string;
  children: React.ReactNode;
}

const NavLink = ({ href, children }: NavLinkProps) => {
  const pathname = usePathname();
  const isActive = pathname === href;

  const linkStyles = clsx(
    'transition-all relative',
    'after:absolute after:left-0 after:bottom-[-4px]',
    'after:h-[2px] after:w-0 after:bg-[var(--tsk-primary-dark)]',
    'after:transition-all after:duration-300',
    {
      'after:w-full': isActive,
      'hover:after:w-full': !isActive,
    },
  );

  return (
    <Link href={href} className={linkStyles} style={{ color: 'var(--tsk-primary-dark)' }}>
      {children}
    </Link>
  );
};

const Navbar = () => {
  const navStyles = {
    backgroundColor: 'var(--tsk-light-1)',
  };

  const navItems = [
    { href: '/', label: 'Home' },
    { href: '/about', label: 'About' },
    { href: '/events', label: 'Events' },
    { href: '/get-involved', label: 'Get Involved' },
    { href: '/blogs', label: 'Blogs' },
    { href: '/jobs', label: 'Jobs' },
  ];

  return (
    <nav className="flex items-center justify-between px-4 py-1 m-8 rounded-3xl" style={navStyles}>
      <div className="flex items-center">
        <Link href="/" className="flex items-center">
          <Image src={Logo} alt="Tech Sisters Kenya logo" width={50} height={25} className="mr-2" />
          <div
            className="transition-opacity hover:opacity-80"
            style={{ color: 'var(--tsk-primary-dark)' }}
          >
            {['TECH', 'SISTERS', 'KENYA'].map((text) => (
              <p key={text} className="text-xs font-bold uppercase">
                {text}
              </p>
            ))}
          </div>
        </Link>
      </div>

      <ul className="flex gap-8 font-semibold">
        {navItems.map(({ href, label }) => (
          <li key={href}>
            <NavLink href={href}>{label}</NavLink>
          </li>
        ))}
      </ul>

      <div className="flex gap-4">
        <Button variant="secondary">Login</Button>
        <Button variant="primary">Sign Up</Button>
      </div>
    </nav>
  );
};

export default Navbar;
