/* eslint-disable react/display-name */
import React, { ReactNode } from 'react';
import { render, screen } from '@testing-library/react';
import ReachSection from '@/app/landing-page/OurReach';
import '@testing-library/jest-dom';

jest.mock('next/image', () => ({
  __esModule: true,
  default: ({ src, alt, ...props }: { src: string; alt?: string }) => (
    <img src={typeof src === 'string' ? src : 'mocked.svg'} alt={alt || 'image'} {...props} />
  ),
}));

jest.mock('react-countup', () => {
  return ({ end }: { end: number }) => <span>{end}+</span>;
});

describe('ReachSection', () => {
  const mockProps = {
    title: 'Our Reach',
    subtitle: <>Empowering women in tech across Africa</>,
    stats: [
      { value: '700+', label: <>Software Developers</> },
      { value: '450+', label: <>Data Analysts</> },
      { value: '230+', label: <>CyberSecurity Enthusiasts</> },
      { value: '550+', label: <>Other TechFields</> },
    ],
  };

  beforeEach(() => {
    render(<ReachSection {...mockProps} />);
  });

  it('renders title and subtitle', () => {
    expect(screen.getByText(/Our Reach/i)).toBeInTheDocument();
    expect(screen.getByText(/Empowering women in tech/i)).toBeInTheDocument();
  });

  it('renders all stat values and labels', () => {
    mockProps.stats.forEach(({ value, label }) => {
      const numericValue = value.replace('+', '');
      expect(screen.getByText(`${numericValue}+`)).toBeInTheDocument();

      // Convert label JSX to text content by rendering in a temporary container
      const container = document.createElement('div');
      render(label as ReactNode, { container });
      expect(screen.getByText(container.textContent!)).toBeInTheDocument();
    });
  });

  it('renders the Get Involved button with correct link', () => {
    const button = screen.getByRole('link', { name: /get involved/i });
    expect(button).toHaveAttribute('href', '/get-involved');
  });

  it('renders the main image and bug image', () => {
    const allImages = screen.getAllByRole('img');
    expect(allImages.length).toBeGreaterThanOrEqual(2);
  });
});
