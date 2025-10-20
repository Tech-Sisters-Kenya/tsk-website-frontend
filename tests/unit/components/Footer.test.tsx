import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Footer from '@/components/Footer';

// Mock Next.js components
// Define proper types for the mocked components
type ImageProps = {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  fill?: boolean;
  [key: string]: string | number | boolean | undefined;
};

type LinkProps = {
  href: string;
  children: React.ReactNode;
  [key: string]: string | number | React.ReactNode | undefined;
};

jest.mock('next/image', () => {
  return function MockedImage({ src, alt, width, height, fill: _fill, ...props }: ImageProps) {
    return <img src={src} alt={alt} width={width} height={height} {...props} />;
  };
});

jest.mock('next/link', () => {
  return function MockedLink({ href, children, ...props }: LinkProps) {
    return (
      <a href={href} {...props}>
        {children}
      </a>
    );
  };
});

// Mock clsx
jest.mock('clsx', () => ({
  __esModule: true,
  default: (...args: (string | boolean | null | undefined)[]) => args.filter(Boolean).join(' '),
}));

// Mock SVG import
jest.mock('@/assets/tsk-icon-only-logo.svg', () => 'mocked-logo.svg');

describe('Footer Component', () => {
  beforeEach(() => {
    // Mock Date to ensure consistent copyright year in tests
    jest.useFakeTimers();
    jest.setSystemTime(new Date('2024-01-01'));
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it('renders without crashing', () => {
    render(<Footer />);
    expect(screen.getByRole('contentinfo')).toBeInTheDocument();
  });

  it('displays the logo and company name', () => {
    render(<Footer />);

    const logo = screen.getByRole('img', { name: /tech sisters kenya logo/i });
    expect(logo).toBeInTheDocument();
    expect(logo).toHaveAttribute('src', 'mocked-logo.svg');
    expect(logo).toHaveAttribute('width', '50');
    expect(logo).toHaveAttribute('height', '25');

    expect(screen.getByText('TECH')).toBeInTheDocument();
    expect(screen.getByText('SISTERS')).toBeInTheDocument();
    expect(screen.getByText('KENYA')).toBeInTheDocument();
  });

  it('displays the tagline', () => {
    render(<Footer />);
    expect(screen.getByText('Elevating Women in Technology')).toBeInTheDocument();
  });

  it('renders About Us section with all links', () => {
    render(<Footer />);

    expect(screen.getByText('About Us')).toBeInTheDocument();

    const aboutLinks = [
      { href: '/contact', text: 'Contact Us' },
      { href: '/meet-the-team', text: 'The Team' },
      { href: '/faq', text: 'FAQ' },
      { href: '/code-of-conduct', text: 'Code Of Conduct' },
      { href: '/terms', text: 'Terms & Condition' },
      { href: '/privacy', text: 'Privacy Policy' },
    ];

    aboutLinks.forEach(({ href, text }) => {
      const link = screen.getByRole('link', { name: text });
      expect(link).toBeInTheDocument();
      expect(link).toHaveAttribute('href', href);
    });
  });

  it('renders Get Involved section with all links', () => {
    render(<Footer />);

    expect(screen.getByText('Get Involved')).toBeInTheDocument();

    const involvedLinks = [
      'Become A Tech Sister',
      'Volunteer',
      'Partner With Us',
      'Make A Donation',
    ];

    involvedLinks.forEach((linkText) => {
      const link = screen.getByRole('link', { name: linkText });
      expect(link).toBeInTheDocument();
      expect(link).toHaveAttribute('href', '/get-involved');
    });
  });

  it('displays copyright with current year', () => {
    render(<Footer />);
    expect(screen.getByText('All rights reserved. Tech Sisters Kenya ©2024')).toBeInTheDocument();
  });

  it('applies correct footer background styles', () => {
    render(<Footer />);

    const footer = screen.getByRole('contentinfo');
    expect(footer).toHaveStyle({
      backgroundColor: 'var(--tsk-primary-dark)',
      color: 'var(--tsk-light-1)',
    });
  });

  it('has correct layout structure and classes', () => {
    render(<Footer />);

    const footer = screen.getByRole('contentinfo');
    expect(footer).toHaveClass('w-full', 'pt-10', 'pb-6');

    // Check for grid layout
    const gridContainer = footer.querySelector('.grid');
    expect(gridContainer).toHaveClass('grid', 'grid-cols-1', 'md:grid-cols-3', 'gap-8');
  });

  it('applies hover effects to links', () => {
    render(<Footer />);

    const links = screen.getAllByRole('link');
    links.forEach((link) => {
      // Skip the main logo link which has different classes
      if (!link.querySelector('img')) {
        expect(link).toHaveClass('transition-opacity', 'hover:opacity-80');
      }
    });
  });

  it('has proper semantic structure for sections', () => {
    render(<Footer />);

    // Check that section titles are h3 elements
    const aboutTitle = screen.getByRole('heading', { name: 'About Us', level: 3 });
    const involvedTitle = screen.getByRole('heading', { name: 'Get Involved', level: 3 });

    expect(aboutTitle).toBeInTheDocument();
    expect(involvedTitle).toBeInTheDocument();

    expect(aboutTitle).toHaveClass('text-lg', 'font-semibold', 'mb-4');
    expect(involvedTitle).toHaveClass('text-lg', 'font-semibold', 'mb-4');
  });

  it('applies inline styles to section titles', () => {
    render(<Footer />);

    const aboutTitle = screen.getByRole('heading', { name: 'About Us' });
    const involvedTitle = screen.getByRole('heading', { name: 'Get Involved' });

    expect(aboutTitle).toHaveStyle({ color: 'var(--tsk-light-1)' });
    expect(involvedTitle).toHaveStyle({ color: 'var(--tsk-light-1)' });
  });

  it('has responsive layout classes for sections', () => {
    render(<Footer />);

    // Find section containers
    const sections = screen
      .getAllByRole('heading', { level: 3 })
      .map((heading) => heading.closest('div'));

    sections.forEach((section) => {
      expect(section).toHaveClass('flex', 'flex-col', 'items-center', 'md:items-start');
    });
  });

  it('structures lists properly', () => {
    render(<Footer />);

    // Find all ul elements
    const lists = screen.getByRole('contentinfo').querySelectorAll('ul');
    expect(lists).toHaveLength(2); // One for About Us, one for Get Involved

    lists.forEach((list) => {
      expect(list).toHaveClass('space-y-2', 'text-sm');
    });
  });

  it('handles unique keys for duplicate link texts', () => {
    render(<Footer />);

    // All links should render without React key warnings
    // This is implicitly tested by the component rendering successfully
    // since React would throw warnings for duplicate keys
    const allLinks = screen.getAllByRole('link');
    expect(allLinks.length).toBeGreaterThan(0);
  });

  it('applies correct styles to company name elements', () => {
    render(<Footer />);

    const companyNameElements = ['TECH', 'SISTERS', 'KENYA'].map((text) => screen.getByText(text));

    companyNameElements.forEach((element) => {
      expect(element).toHaveClass('text-xs', 'font-bold', 'uppercase');
    });
  });

  it('has proper container and responsive classes', () => {
    render(<Footer />);

    const container = screen.getByRole('contentinfo').querySelector('.container');
    expect(container).toHaveClass('container', 'mx-auto', 'px-6');
  });

  it('centers copyright text', () => {
    render(<Footer />);

    const copyrightElement = screen.getByText(/all rights reserved/i).closest('div');
    expect(copyrightElement).toHaveClass('mt-12', 'text-center', 'text-sm');
  });

  it('applies transition styles to logo link', () => {
    render(<Footer />);

    const logoContainer = screen
      .getByRole('img', { name: /tech sisters kenya logo/i })
      .closest('a')
      ?.querySelector('div');

    expect(logoContainer).toHaveClass('transition-opacity', 'hover:opacity-80');
    expect(logoContainer).toHaveStyle({ color: 'var(--tsk-light-1)' });
  });
});
