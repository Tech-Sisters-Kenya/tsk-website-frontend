'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
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

  return (
    <Link
      href={href}
      className={clsx(
        'transition-all relative',
        'after:absolute after:left-1/2 after:bottom-[-4px] after:transform after:-translate-x-1/2',
        'after:h-[1px] after:w-0 after:bg-[var(--tsk-primary-dark)]',
        'after:transition-all after:duration-300',
        isActive ? 'after:w-[60%]' : 'hover:after:w-[60%]'
      )}
      style={{ color: 'var(--tsk-primary-dark)' }}
      onClick={onClick}
    >
      {children}
    </Link>
  );
};

const navItems = [
  {
    label: 'About',
    children: [
      { href: '/about-us', label: 'About TSK' },
      // { href: '/about-us/meet-the-team', label: 'Our Team' },
      { href: '/about-us/our-story', label: 'Our Story' },
      { href: '/about-us/our-focus-areas', label: 'Focus Areas' },
      { href: '/about-us/our-impact', label: 'Impact So far' },
    ],
  },
  {
    label: 'Get Involved',
    children: [
      { href: '/get-involved', label: 'Get Involved' },
      { href: '/get-involved/partner-with-us', label: 'Partner With Us' },
      { href: '/get-involved/become-a-sponsor', label: 'Sponsor Us' },
      { href: '/join-our-community', label: 'Become a TSK Member' },
    ],
  },
  { href: '/blogs', label: 'Blogs' },
  { href: '/contact', label: 'Contact Us' },
];

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const { isAuthenticated, logout } = useAuthStore();
  const dropdownContainerRef = useRef<HTMLLIElement>(null);

  const closeMenu = useCallback(() => {
    setIsMenuOpen(false);
    setActiveDropdown(null);
  }, []);

  const toggleDropdown = useCallback((label: string) => {
    setActiveDropdown((prev) => (prev === label ? null : label));
  }, []);

  const closeDropdown = useCallback(() => {
    setActiveDropdown(null);
  }, []);

  // Close dropdown on outside click
  useEffect(() => {
    // if (!activeDropdown) return;

    const handleClickOutside = (e: MouseEvent) => {
      if (
        dropdownContainerRef.current &&
        !dropdownContainerRef.current.contains(e.target as Node)
      ) {
        closeDropdown();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [activeDropdown, closeDropdown]);

  return (
    <div className="w-full bg-white fixed z-50 p-0 h-8">
      <nav
        className="fixed w-[calc(100%-4rem)] z-50 flex items-center justify-between px-4 md:px-8 lg:px-16 py-2 rounded-3xl mt-8 mx-auto left-0 right-0"
        style={{ backgroundColor: 'var(--tsk-light-2)' }}
      >
        {/* Logo */}
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

        {/* Hamburger Menu */}
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="md:hidden p-2 focus:outline-none"
          aria-label="Toggle menu"
        >
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              className={clsx(
                'w-6 h-0.5 bg-[var(--tsk-primary-dark)] transition-all',
                i < 2 && 'mb-1.5',
                isMenuOpen &&
                  (i === 0
                    ? 'transform rotate-45 translate-y-2'
                    : i === 1
                      ? 'opacity-0'
                      : 'transform -rotate-45 -translate-y-2')
              )}
            />
          ))}
        </button>

        {/* Desktop Navigation */}
        <ul className="hidden md:flex gap-8 font-semibold text-lg">
          {navItems.map((item, idx) => (
            <li
              key={item.label}
              className="relative"
              ref={
                item.children && idx === navItems.findIndex((i) => i.label === activeDropdown)
                  ? dropdownContainerRef
                  : null
              }
            >
              {item.children ? (
                <>
                  <button
                    onClick={() => toggleDropdown(item.label)}
                    className={clsx(
                      'transition-all relative text-[var(--tsk-primary-dark)] flex items-center gap-1',
                      'after:absolute after:left-1/2 after:bottom-[-4px] after:transform after:-translate-x-1/2',
                      'after:h-[1px] after:w-0 after:bg-[var(--tsk-primary-dark)]',
                      'after:transition-all after:duration-300 hover:after:w-[60%]',
                      activeDropdown === item.label && 'after:w-[60%]'
                    )}
                  >
                    {item.label}
                    <Image
                      src={DownArrow}
                      alt="Toggle dropdown"
                      width={10}
                      height={10}
                      className={clsx(
                        'transform transition-transform',
                        activeDropdown === item.label && 'rotate-180'
                      )}
                    />
                  </button>
                  {activeDropdown === item.label && (
                    <ul className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 bg-white shadow-lg rounded-2xl py-3 px-6 whitespace-nowrap z-50">
                      {item.children.map((child, childIdx) => (
                        <li
                          key={child.href}
                          className={clsx(
                            'text-center hover:bg-[#efd5f8] hover:px-2 hover:py-1 rounded-lg',
                            childIdx < item.children.length - 1 && 'mb-3'
                          )}
                        >
                          <Link
                            href={child.href}
                            className="text-[var(--tsk-primary-dark)]"
                            onClick={closeDropdown}
                          >
                            {child.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  )}
                </>
              ) : (
                <NavLink href={item.href}>{item.label}</NavLink>
              )}
            </li>
          ))}
        </ul>

        {/* Desktop Auth Button */}
        <div className="hidden md:block">
          {isAuthenticated ? (
            <Button variant="secondary" className="px-10 py-2" onClick={logout}>
              <span className="text-lg font-semibold">Logout</span>
            </Button>
          ) : (
            <Link href="/join-our-community">
              <Button variant="primary" className="px-10 py-2">
                <span className="text-lg font-semibold">Become a Tech Sister!</span>
              </Button>
            </Link>
          )}
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden fixed inset-0 z-50 pt-10 bg-white" style={{ top: '5rem' }}>
            <ul className="flex flex-col items-center gap-4 px-4 font-semibold">
              {navItems.map((item) => (
                <li key={item.label} className="py-2 text-2xl w-full">
                  {item.children ? (
                    <div className="w-full">
                      <div
                        className={clsx(
                          'w-full flex items-center justify-center gap-2 font-semibold text-[var(--tsk-primary-dark)] cursor-pointer',
                          'transition-all relative',
                          'after:absolute after:left-1/2 after:bottom-[-4px] after:transform after:-translate-x-1/2',
                          'after:h-[1px] after:w-0 after:bg-[var(--tsk-primary-dark)]',
                          'after:transition-all after:duration-300 hover:after:w-[60%]',
                          activeDropdown === item.label && 'after:w-[60%]'
                        )}
                      >
                        <div
                          className="flex items-center gap-2 w-full justify-center"
                          onClick={() =>
                            setActiveDropdown(activeDropdown === item.label ? null : item.label)
                          }
                        >
                          {item.label}
                          <span className="text-xl">
                            {activeDropdown === item.label ? '−' : '+'}
                          </span>
                        </div>
                      </div>
                      {activeDropdown === item.label && (
                        <ul className="w-full mt-2 text-base">
                          {item.children.map((child) => (
                            <li
                              key={child.href}
                              className="py-2 hover:bg-[#efd5f8] px-4 rounded-lg text-center"
                            >
                              <Link
                                href={child.href}
                                onClick={() => {
                                  closeMenu();
                                  setActiveDropdown(null);
                                }}
                                className="text-[var(--tsk-primary-dark)] block w-full"
                              >
                                {child.label}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  ) : (
                    <div className="text-center">
                      <NavLink href={item.href} onClick={closeMenu}>
                        {item.label}
                      </NavLink>
                    </div>
                  )}
                </li>
              ))}

              <li className="w-full mt-4">
                {isAuthenticated ? (
                  <Button
                    variant="secondary"
                    className="w-full"
                    onClick={() => {
                      logout();
                      closeMenu();
                    }}
                  >
                    Logout
                  </Button>
                ) : (
                  <Link href="/join-our-community">
                    <Button variant="primary" className="w-full">
                      Become A Tech Sister!
                    </Button>
                  </Link>
                )}
              </li>
            </ul>
          </div>
        )}
      </nav>
    </div>
  );
};

export default Navbar;
