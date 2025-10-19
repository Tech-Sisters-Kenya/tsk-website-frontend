import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import CallToAction from '@/components/CallToAction';

// Mock Next.js components
// Define proper types for the mocked components
type ImageProps = {
  src: string;
  alt: string;
  fill?: boolean;
  [key: string]: unknown;
};

type LinkProps = {
  href: string;
  children: React.ReactNode;
  [key: string]: unknown;
};

jest.mock('next/image', () => {
  return function MockedImage({ src, alt, fill: _fill, ...props }: ImageProps) {
    return <img src={src} alt={alt} {...props} />;
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

// Mock the Button component
jest.mock('@/components/Button', () => {
  return function MockedButton({
    variant = 'primary',
    children,
    ...props
  }: { variant?: 'primary' | 'secondary' } & React.ButtonHTMLAttributes<HTMLButtonElement>) {
    return (
      <button data-variant={variant} {...props}>
        {children}
      </button>
    );
  };
});

// Mock SVG imports
jest.mock('@/assets/tsk-icon-only-logo.svg', () => 'mocked-logo.svg');
jest.mock('@/assets/call-to-action.svg', () => 'mocked-cta-image.svg');

describe('CallToAction Component', () => {
  it('renders without crashing', () => {
    render(<CallToAction />);
    expect(screen.getByRole('img', { name: /tech sisters kenya community/i })).toBeInTheDocument();
  });

  it('displays the main background image', () => {
    render(<CallToAction />);

    const bgImage = screen.getByRole('img', { name: /tech sisters kenya community/i });
    expect(bgImage).toBeInTheDocument();
    expect(bgImage).toHaveAttribute('src', 'mocked-cta-image.svg');
    expect(bgImage).toHaveClass('w-full', 'h-full', 'object-cover');
  });

  it('displays the logo image', () => {
    render(<CallToAction />);

    const logo = screen.getByRole('img', { name: /tech sisters kenya logo/i });
    expect(logo).toBeInTheDocument();
    expect(logo).toHaveAttribute('src', 'mocked-logo.svg');
    expect(logo).toHaveAttribute('width', '80');
    expect(logo).toHaveAttribute('height', '40');
  });

  it('displays all required text content', () => {
    render(<CallToAction />);

    expect(screen.getByText("There's a space for you here.")).toBeInTheDocument();

    expect(
      screen.getByText(
        "Tech Sisters is more than a community — it's a movement of women learning, growing, and showing up for each other in tech."
      )
    ).toBeInTheDocument();

    expect(
      screen.getByText(
        "Whether you're just starting out, switching careers, or already in tech — you belong here."
      )
    ).toBeInTheDocument();
  });

  it('renders the call-to-action button with correct properties', () => {
    render(<CallToAction />);

    const button = screen.getByRole('button', { name: /join our community/i });
    expect(button).toBeInTheDocument();
    expect(button).toHaveAttribute('data-variant', 'secondary');

    const buttonText = screen.getByText('Join Our Community');
    expect(buttonText).toHaveClass('font-extrabold');
  });

  it('wraps the button in a link to the join our community page', () => {
    render(<CallToAction />);

    const link = screen.getByRole('link');
    expect(link).toHaveAttribute('href', '/join-our-community');

    // Check that the button is within the link
    const button = screen.getByRole('button', { name: /join our community/i });
    expect(link).toContainElement(button);
  });

  it('applies correct styling structure', () => {
    render(<CallToAction />);

    // Check for main container classes
    const mainContainer = screen
      .getByRole('img', { name: /tech sisters kenya community/i })
      .closest('div');
    expect(mainContainer?.parentElement).toHaveClass(
      'max-w-7xl',
      'mx-auto',
      'overflow-hidden',
      'rounded-3xl',
      'shadow-lg',
      'relative'
    );
  });

  it('has responsive layout classes', () => {
    render(<CallToAction />);

    // The outer container should have responsive padding
    const outerContainer = screen
      .getByRole('img', { name: /tech sisters kenya community/i })
      .closest('div')?.parentElement?.parentElement;
    expect(outerContainer).toHaveClass('w-full', 'py-8', 'px-4', 'md:py-12', 'md:px-6', 'lg:px-8');
  });

  it('applies inline styles to the purple section', () => {
    render(<CallToAction />);

    // Find the purple section by looking for the div with the inline styles
    // In the component, it's the div that contains the logo and has the ctaStyles applied
    const purpleSection = screen.getByText("There's a space for you here.").closest('div');

    expect(purpleSection).toHaveStyle({
      backgroundColor: 'var(--tsk-primary-dark)',
      color: 'var(--tsk-light-1)',
    });
  });

  it('has correct responsive classes for the purple section', () => {
    render(<CallToAction />);

    // Find the purple section by looking for the div with the responsive classes
    const purpleSection = screen.getByText("There's a space for you here.").closest('div');

    expect(purpleSection).toHaveClass(
      'md:absolute',
      'md:top-1/2',
      'md:right-0',
      'md:transform',
      'md:-translate-y-1/2',
      'w-full',
      'md:w-2/5',
      'py-8',
      'px-16',
      'mr-10',
      'rounded-3xl'
    );
  });

  it('centers content appropriately', () => {
    render(<CallToAction />);

    // Check that text paragraphs have center alignment
    const firstText = screen.getByText("There's a space for you here.");
    const secondText = screen.getByText(/tech sisters is more than a community/i);
    const thirdText = screen.getByText(/whether you're just starting/i);

    expect(firstText).toHaveClass('text-center');
    expect(secondText).toHaveClass('text-center');
    expect(thirdText).toHaveClass('text-center');

    // Check that logo container has center flex
    const logoContainer = screen.getByRole('img', {
      name: /tech sisters kenya logo/i,
    }).parentElement;
    expect(logoContainer).toHaveClass('mb-6', 'flex', 'justify-center');

    // Check that button container has center flex
    const buttonContainer = screen.getByRole('button').parentElement?.parentElement;
    expect(buttonContainer).toHaveClass('flex', 'justify-center');
  });

  it('has proper text sizing and spacing', () => {
    render(<CallToAction />);

    // Test the first two paragraphs (mb-6)
    const firstParagraph = screen.getByText("There's a space for you here.");
    const secondParagraph = screen.getByText(
      "Tech Sisters is more than a community — it's a movement of women learning, growing, and showing up for each other in tech."
    );

    expect(firstParagraph).toHaveClass('text-base', 'mb-6', 'text-center');
    expect(secondParagraph).toHaveClass('text-base', 'mb-6', 'text-center');

    // The last paragraph should have different bottom margin (mb-10)
    const lastParagraph = screen.getByText(/whether you're just starting/i);
    expect(lastParagraph).toHaveClass('text-base', 'mb-10', 'text-center');
  });
});
