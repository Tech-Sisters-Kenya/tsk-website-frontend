'use client';

import React, { useState } from 'react';
import { usePathname } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import clsx from 'clsx';

import Logo from '@/assets/tsk-icon-only-logo.svg';
import Button from './Button';
import DownArrow from '@/assets/down-arrow-icon.svg';
import { useAuthStore } from '@/stores/useAuthStore';

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
    'after:absolute after:left-1/2 after:bottom-[-4px] after:transform after:-translate-x-1/2',
    'after:h-[1px] after:w-0 after:bg-[var(--tsk-primary-dark)]',
    'after:transition-all after:duration-300',
    {
      'after:w-[60%]': isActive,
      'hover:after:w-[60%]': !isActive,
    }
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
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const { isAuthenticated, logout } = useAuthStore();

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
    {
      label: 'About',
      children: [
        { href: '/about-us', label: 'About TSK' },
        { href: '/meet-the-team', label: 'Our Team' },
      ],
    },
    {
      label: 'Get Involved',
      children: [
        { href: '/get-involved', label: 'Partnership' },
        { href: '/get-involved', label: 'Become a TSK Member' },
      ],
    },
    { href: '/blogs', label: 'Blogs' },
  ];

  const handleDropdownToggle = (label: string) => {
    setOpenDropdown((prev) => (prev === label ? null : label));
  };

  const toggleDropdown = (label: string) => {
    setActiveDropdown((prev) => (prev === label ? null : label));
  };

  return (
    <nav
      className="fixed w-[1360px] z-50 flex items-center justify-between px-16 py-2 rounded-3xl m-8"
      style={navStyles}
    >
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

      {/* Hamburger menu button */}
      <div className="md:hidden">
        <button onClick={toggleMenu} className="p-2 focus:outline-none" aria-label="Toggle menu">
          <div className={`w-6 h-0.5 bg-[var(--tsk-primary-dark)] mb-1.5 transition-all ${isMenuOpen ? 'transform rotate-45 translate-y-2' : ''}`} />
          <div className={`w-6 h-0.5 bg-[var(--tsk-primary-dark)] mb-1.5 transition-opacity ${isMenuOpen ? 'opacity-0' : ''}`} />
          <div className={`w-6 h-0.5 bg-[var(--tsk-primary-dark)] transition-all ${isMenuOpen ? 'transform -rotate-45 -translate-y-2' : ''}`} />
        </button>
      </div>

      {/* Desktop Navigation */}
      <ul className="hidden md:flex gap-8 font-semibold text-lg relative">
        {navItems.map((item, idx) => (
          <li key={idx} className="relative group">
            {item.children ? (
              <>
                <button
                  onClick={() => toggleDropdown(item.label)}
                  className={clsx(
                    'transition-all relative text-[var(--tsk-primary-dark)] flex items-center gap-1',
                    'after:absolute after:left-1/2 after:bottom-[-4px] after:transform after:-translate-x-1/2',
                    'after:h-[1px] after:w-0 after:bg-[var(--tsk-primary-dark)]',
                    'after:transition-all after:duration-300',
                    {
                      'after:w-[60%]': activeDropdown === item.label,
                      'hover:after:w-[60%]': activeDropdown !== item.label,
                    }
                  )}
                >
                  {item.label}
                  <span className={`transform transition-transform ${activeDropdown === item.label ? 'rotate-180' : ''}`}>
                    <Image src={DownArrow} alt="Down Arrow Icon" width={10} height={10} />
                  </span>
                </button>
                <ul className={`absolute top-full left-1/2 transform -translate-x-1/2 mt-2 ${activeDropdown === item.label ? 'block' : 'hidden'} bg-white shadow-lg rounded-2xl py-3 px-6 whitespace-nowrap z-50`}>
                  {item.children.map((child, childIdx) => (
                    <li key={`${child.href}-${child.label}`} className={`text-center ${childIdx !== item.children!.length - 1 ? 'mb-3' : ''}`}>
                      <NavLink href={child.href}>{child.label}</NavLink>
                    </li>
                  ))}
                </ul>
              </>
            ) : (
              <NavLink href={item.href}>{item.label}</NavLink>
            )}
          </li>
        ))}
      </ul>

      {/* Desktop Buttons */}
      <div className="hidden md:flex gap-10">
        {!isAuthenticated ? (
          <>
            <Link href="/login">
              <Button variant="secondary" className="px-10 py-2">
                <span className="text-lg font-semibold">Login</span>
              </Button>
            </Link>
            <Link href="/sign-up">
              <Button variant="primary" className="px-10 py-2">
                <span className="text-lg font-semibold">Sign Up</span>
              </Button>
            </Link>
          </>
        ) : (
          <Button variant="secondary" className="px-10 py-2" onClick={logout}>
            <span className="text-lg font-semibold">Logout</span>
          </Button>
        )}
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden fixed inset-0 z-50 pt-20 bg-white" style={{ top: '5rem' }}>
          <ul className="flex flex-col items-center gap-6 p-4 font-semibold">
            {navItems.map((item, idx) => (
              <li key={idx} className="w-full text-left py-2">
                {item.children ? (
                  <>
                    <button
                      className={clsx(
                        'w-full flex justify-between items-center px-4 py-2 font-semibold text-[var(--tsk-primary-dark)]',
                        'transition-all relative',
                        'after:absolute after:left-1/2 after:bottom-[-4px] after:transform after:-translate-x-1/2',
                        'after:h-[1px] after:w-0 after:bg-[var(--tsk-primary-dark)]',
                        'after:transition-all after:duration-300',
                        {
                          'after:w-[60%]': openDropdown === item.label,
                          'hover:after:w-[60%]': openDropdown !== item.label,
                        }
                      )}
                      onClick={() => handleDropdownToggle(item.label)}
                    >
                      {item.label}
                      <span>{openDropdown === item.label ? '−' : '+'}</span>
                    </button>
                    {openDropdown === item.label && (
                      <ul className="pl-8">
                        {item.children.map((child) => (
                          <li key={`${child.href}-${child.label}`} className="py-1">
                            <NavLink href={child.href} onClick={closeMenu}>
                              {child.label}
                            </NavLink>
                          </li>
                        ))}
                      </ul>
                    )}
                  </>
                ) : (
                  <NavLink href={item.href} onClick={closeMenu}>
                    {item.label}
                  </NavLink>
                )}
              </li>
            ))}

            {!isAuthenticated ? (
              <li className="w-full mt-4">
                <Link href="/login">
                  <Button variant="secondary" className="w-full mb-3">
                    Login
                  </Button>
                </Link>
                <Link href="/sign-up">
                  <Button variant="primary" className="w-full">
                    Sign Up
                  </Button>
                </Link>
              </li>
            ) : (
              <li className="w-full mt-4">
                <Button variant="secondary" className="w-full" onClick={() => { logout(); closeMenu(); }}>
                  Logout
                </Button>
              </li>
            )}
          </ul>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
