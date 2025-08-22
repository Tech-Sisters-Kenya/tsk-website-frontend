import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import HeroSection from '@/app/about-us/HeroSection';

// Mock the HeroImageAnimation component
jest.mock('@/app/about-us/HeroImageAnimation', () => {
  return function MockHeroImageAnimation() {
    return <div data-testid="hero-image-animation">Hero Image Animation</div>;
  };
});

describe('HeroSection Component', () => {
  beforeEach(() => {
    render(<HeroSection />);
  });

  it('renders the main heading correctly', () => {
    const heading = screen.getByRole('heading', { level: 1 });
    expect(heading).toBeInTheDocument();
    expect(heading).toHaveTextContent(/About.*Tech Sisters Kenya/);
  });

  it('renders the descriptive paragraph', () => {
    const description = screen.getByText(/Tech Sisters Kenya is a non-profit organization/);
    expect(description).toBeInTheDocument();
    expect(description).toHaveTextContent(
      'Tech Sisters Kenya is a non-profit organization empowering women in tech through mentorship, workshops, and networking to grow skills and careers.'
    );
  });

  it('renders the HeroImageAnimation component', () => {
    const heroImageComponent = screen.getByTestId('hero-image-animation');
    expect(heroImageComponent).toBeInTheDocument();
  });

  it('has correct section styling', () => {
    const section = screen.getByRole('banner');
    expect(section).toHaveClass(
      'pb-10',
      'pt-32',
      'pl-20',
      'pr-10',
      'w-full',
      'bg-tsk-light-2',
      'rounded-3xl',
      'mt-16',
      '-z-10'
    );
  });

  it('has correct heading styling', () => {
    const heading = screen.getByRole('heading', { level: 1 });
    expect(heading).toHaveClass(
      'text-3xl',
      'md:text-3xl',
      'lg:text-5xl',
      'font-extrabold',
      'font-heading',
      'mb-20',
      'text-tsk-primary-dark'
    );
  });

  it('has correct paragraph styling', () => {
    const paragraph = screen.getByText(/Tech Sisters Kenya is a non-profit organization/);
    expect(paragraph).toHaveClass(
      'text-xl',
      'md:text-2xl',
      'max-w-lg',
      'font-medium',
      'tracking-wide',
      'text-tsk-primary-dark',
      'text-justify'
    );
  });

  it('has responsive layout structure', () => {
    const container = screen.getByRole('banner').querySelector('.mx-8');
    expect(container).toHaveClass(
      'flex',
      'flex-col',
      'md:flex-row',
      'items-center',
      'justify-between'
    );
  });

  it('text content is in left column', () => {
    const textContainer = screen.getByRole('heading').parentElement;
    expect(textContainer).toHaveClass('md:w-1/2', 'mb-8', 'md:mb-0');
  });

  it('image container is in right column with correct positioning', () => {
    const imageContainer = screen.getByTestId('hero-image-animation').parentElement;
    expect(imageContainer).toHaveClass('md:w-1/2', 'relative', 'ml-10', '-mt-20');
  });

  it('renders semantic HTML structure correctly', () => {
    const section = screen.getByRole('banner');
    expect(section.tagName).toBe('SECTION');

    const heading = screen.getByRole('heading', { level: 1 });
    expect(heading.tagName).toBe('H1');

    const paragraph = screen.getByText(/Tech Sisters Kenya is a non-profit organization/);
    expect(paragraph.tagName).toBe('P');
  });
});
