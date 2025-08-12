import React from 'react';
import { render, screen } from '@testing-library/react';
import BrandsSection from '@/app/landing-page/BrandsSection';
import '@testing-library/jest-dom';

// Mock Next.js Image component
jest.mock('next/image', () => ({
  __esModule: true,
  default: (props: { alt?: string; src: string; width?: number; height?: number }) => {
    return <img {...props} alt={props.alt || 'brand logo'} />;
  },
}));

// Mock SVG assets
jest.mock('@/assets/moringa.svg', () => 'moringa.svg');
jest.mock('@/assets/logos_google.svg', () => 'logos_google.svg');
jest.mock('@/assets/image 1.svg', () => 'image1.svg');
jest.mock('@/assets/emobilis.svg', () => 'emobilis.svg');
jest.mock('@/assets/payd.svg', () => 'payd.svg');

describe('BrandsSection', () => {
  it('renders heading and brand logos', () => {
    render(<BrandsSection />);

    // Heading check
    expect(screen.getByRole('heading', { name: /brands that believe in us/i })).toBeInTheDocument();

    // Logo images (5 expected)
    const images = screen.getAllByRole('img');
    expect(images).toHaveLength(5);
  });
});
