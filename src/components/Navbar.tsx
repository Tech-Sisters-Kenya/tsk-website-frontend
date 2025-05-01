'use client';

import { useState } from 'react';
import { usePathname } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import clsx from 'clsx';

import Logo from '@/assets/tsk-icon-only-logo.svg';
import Button from './Button';

interface NavLinkProps {
  href: string;
  children: React.ReactNode;
  onClick?: () => void;
}

const NavLink = ({ href, children, onClick }: NavLinkProps) => {
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
    <Link
      href={href}
      className={linkStyles}
      style={{ color: 'var(--tsk-primary-dark)' }}
      onClick={onClick}
    >
      {children}
    </Link>
  );
};

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const navStyles = {
    backgroundColor: 'var(--tsk-light-2)',
  };

  const navItems = [
    { href: '/', label: 'Home' },
    { href: '/about-us', label: 'About' },
    { href: '/events', label: 'Events' },
    { href: '/get-involved', label: 'Get Involved' },
    { href: '/blogs', label: 'Blogs' },
    { href: '/jobs', label: 'Jobs' },
  ];

  return (
    <nav className="flex items-center justify-between px-4 py-1 rounded-3xl m-8" style={navStyles}>
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

      {/* Hamburger menu button - visible on mobile */}
      <div className="md:hidden">
        <button onClick={toggleMenu} className="p-2 focus:outline-none" aria-label="Toggle menu">
          <div
            className={`w-6 h-0.5 bg-[var(--tsk-primary-dark)] mb-1.5 transition-all ${isMenuOpen ? 'transform rotate-45 translate-y-2' : ''}`}
          ></div>
          <div
            className={`w-6 h-0.5 bg-[var(--tsk-primary-dark)] mb-1.5 transition-opacity ${isMenuOpen ? 'opacity-0' : ''}`}
          ></div>
          <div
            className={`w-6 h-0.5 bg-[var(--tsk-primary-dark)] transition-all ${isMenuOpen ? 'transform -rotate-45 -translate-y-2' : ''}`}
          ></div>
        </button>
      </div>

      {/* Desktop Navigation - hidden on mobile */}
      <ul className="hidden md:flex gap-8 font-semibold">
        {navItems.map(({ href, label }) => (
          <li key={href}>
            <NavLink href={href}>{label}</NavLink>
          </li>
        ))}
      </ul>

      {/* Desktop Buttons - hidden on mobile */}
      <div className="hidden md:flex gap-4">
        <Button variant="secondary">Login</Button>
        <Button variant="primary">Sign Up</Button>
      </div>

      {/* Mobile Menu - conditionally rendered */}
      {isMenuOpen && (
        <div className="md:hidden fixed inset-0 z-50 pt-20 bg-white" style={{ top: '5rem' }}>
          <ul className="flex flex-col items-center gap-6 p-4 font-semibold">
            {navItems.map(({ href, label }) => (
              <li key={href} className="w-full text-center py-2">
                <NavLink href={href} onClick={closeMenu}>
                  {label}
                </NavLink>
              </li>
            ))}
            <li className="w-full mt-4">
              <Button variant="secondary" className="w-full mb-3">
                Login
              </Button>
              <Button variant="primary" className="w-full">
                Sign Up
              </Button>
            </li>
          </ul>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
