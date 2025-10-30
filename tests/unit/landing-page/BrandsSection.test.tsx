import React from 'react';
import { render, screen } from '@testing-library/react';
import BrandsSection from '@/app/landing-page/BrandsSection';
import '@testing-library/jest-dom';

// Mock Next.js Image component
jest.mock('next/image', () => ({
  __esModule: true,
  default: (props: {
    alt?: string;
    src: string;
    width?: number;
    height?: number;
    fill?: boolean;
  }) => {
    const { fill: _fill, width: _width, height: _height, ...imgProps } = props;
    return <img {...imgProps} alt={props.alt || 'brand logo'} />;
  },
}));

// Mock SVG assets
jest.mock('@/assets/moringa.svg', () => ({
  __esModule: true,
  default: 'moringa.svg',
}));

jest.mock('@/assets/logos_google.svg', () => ({
  __esModule: true,
  default: 'logos_google.svg',
}));

jest.mock('@/assets/solutech.svg', () => ({
  __esModule: true,
  default: 'solutech.svg',
}));

jest.mock('@/assets/emobilis.svg', () => ({
  __esModule: true,
  default: 'emobilis.svg',
}));

jest.mock('@/assets/payd.svg', () => ({
  __esModule: true,
  default: 'payd.svg',
}));

describe('BrandsSection', () => {
  it('renders the section with correct test id', () => {
    render(<BrandsSection />);
    expect(screen.getByTestId('brands-section')).toBeInTheDocument();
  });

  it('renders heading with correct text', () => {
    render(<BrandsSection />);
    expect(screen.getByRole('heading', { name: /our growth partners/i })).toBeInTheDocument();
  });

  it('renders all 5 brand logos', () => {
    render(<BrandsSection />);
    const images = screen.getAllByRole('img');
    expect(images).toHaveLength(5);
  });

  it('renders brand logos with correct alt texts', () => {
    render(<BrandsSection />);

    expect(screen.getByAltText('Google Logo')).toBeInTheDocument();
    expect(screen.getByAltText('Moringa Logo')).toBeInTheDocument();
    expect(screen.getByAltText('Solutech Logo')).toBeInTheDocument();
    expect(screen.getByAltText('eMobilis Logo')).toBeInTheDocument();
    expect(screen.getByAltText('Payd Logo')).toBeInTheDocument();
  });

  it('applies correct styling classes to the section', () => {
    render(<BrandsSection />);
    const section = screen.getByTestId('brands-section');

    expect(section).toHaveClass('px-6');
    expect(section).toHaveClass('py-10');
  });

  it('renders brands in the correct order', () => {
    render(<BrandsSection />);
    const images = screen.getAllByRole('img');

    expect(images[0]).toHaveAttribute('alt', 'Google Logo');
    expect(images[1]).toHaveAttribute('alt', 'Moringa Logo');
    expect(images[2]).toHaveAttribute('alt', 'Solutech Logo');
    expect(images[3]).toHaveAttribute('alt', 'eMobilis Logo');
    expect(images[4]).toHaveAttribute('alt', 'Payd Logo');
  });
});
