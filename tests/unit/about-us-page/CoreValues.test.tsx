import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import CoreValues from '@/app/about-us/CoreValues';

// Mock Next.js Image component

interface ImageProps {
  src: string;
  alt: string;
  width: number;
  height: number;
  fill?: boolean;
}

// Mock Next.js Image component
jest.mock('next/image', () => {
  return function MockImage({ src, alt, width, height, fill: _fill }: ImageProps) {
    return <img src={src} alt={alt} width={width} height={height} data-testid="mock-image" />;
  };
});

// Mock SVG imports
jest.mock('@/assets/inclusivity-icon.svg', () => 'inclusivity-icon.svg');
jest.mock('@/assets/community-icon.svg', () => 'community-icon.svg');
jest.mock('@/assets/growth-icon.svg', () => 'growth-icon.svg');
jest.mock('@/assets/empowerment-icon.svg', () => 'empowerment-icon.svg');

describe('CoreValues Component', () => {
  beforeEach(() => {
    render(<CoreValues />);
  });

  it('renders the main heading correctly', () => {
    const heading = screen.getByRole('heading', { level: 2 });
    expect(heading).toBeInTheDocument();
    expect(heading).toHaveTextContent('OUR CORE VALUES');
  });

  it('renders all four core values', () => {
    const values = ['Inclusivity', 'Community', 'Growth', 'Empowerment'];

    values.forEach((value) => {
      const valueHeading = screen.getByRole('heading', { name: value, level: 3 });
      expect(valueHeading).toBeInTheDocument();
    });
  });

  it('renders the correct number of value cards', () => {
    const valueCards = screen.getAllByRole('heading', { level: 3 });
    expect(valueCards).toHaveLength(4);
  });

  it('renders images for each value with correct alt text', () => {
    const images = screen.getAllByTestId('mock-image');
    expect(images).toHaveLength(4);

    const expectedAltTexts = [
      'Inclusivity icon',
      'Community icon',
      'Growth icon',
      'Empowerment icon',
    ];

    images.forEach((image, index) => {
      expect(image).toHaveAttribute('alt', expectedAltTexts[index]);
      expect(image).toHaveAttribute('width', '70');
      expect(image).toHaveAttribute('height', '70');
    });
  });

  it('has correct CSS classes for styling', () => {
    const section = screen.getByText('OUR CORE VALUES').closest('section');
    expect(section).toHaveClass('w-full', 'py-8', 'px-10', 'bg-tsk-primary-dark');

    const heading = screen.getByRole('heading', { level: 2 });
    expect(heading).toHaveClass(
      'text-2xl',
      'md:text-3xl',
      'font-semibold',
      'font-heading',
      'text-tsk-light-1',
      'text-center',
      'mb-12'
    );
  });

  it('uses grid layout for value cards', () => {
    const gridContainer = screen
      .getByRole('heading', { level: 2 })
      .parentElement?.querySelector('.grid');
    expect(gridContainer).toBeInTheDocument();
    expect(gridContainer).toHaveClass('grid', 'grid-cols-2', 'md:grid-cols-4', 'gap-2');
  });

  it('renders value cards with correct structure', () => {
    const valueHeadings = screen.getAllByRole('heading', { level: 3 });

    valueHeadings.forEach((heading) => {
      const parentDiv = heading.parentElement;
      expect(parentDiv).toHaveClass('flex', 'flex-col', 'items-center');
      expect(heading).toHaveClass('text-tsk-light-1', 'text-3xl', 'font-medium', 'font-heading');
    });
  });
});
