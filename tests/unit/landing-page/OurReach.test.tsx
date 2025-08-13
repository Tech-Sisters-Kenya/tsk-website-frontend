/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import { render, screen } from '@testing-library/react';
import ReachSection from '@/app/landing-page/OurReach';

// Mock SVG imports
jest.mock('@/assets/Rectangle 99.svg', () => ({
  __esModule: true,
  default: 'mocked-rectangle-svg',
}));

jest.mock('@/assets/Bug.svg', () => ({
  __esModule: true,
  default: 'mocked-bug-svg',
}));

// Mock next/image
jest.mock('next/image', () => ({
  __esModule: true,
  default: (props: any) => {
    return <img {...props} alt={props.alt} />;
  },
}));

// Mock react-countup
jest.mock('react-countup', () => ({
  __esModule: true,
  default: ({ end, children }: { end: number; children?: React.ReactNode }) => (
    <span data-testid="countup">
      {end}+{children}
    </span>
  ),
}));

jest.mock('@/components/Button', () => ({
  __esModule: true,
  default: ({ children, ...props }: { children: React.ReactNode; [key: string]: any }) => (
    <button {...props} data-testid="mock-button">
      {children}
    </button>
  ),
}));

// Mock next/link
jest.mock('next/link', () => ({
  __esModule: true,
  default: ({ children, href }: { children: React.ReactNode; href: string }) => (
    <a href={href} data-testid="next-link">
      {children}
    </a>
  ),
}));

describe('ReachSection Component', () => {
  const defaultProps = {
    title: 'Our Reach',
    subtitle: 'Empowering women through technology across Kenya.',
    stats: [
      { value: '700+', label: 'Software Developers' },
      { value: '450+', label: 'Data Analysts' },
      { value: '230+', label: 'CyberSecurity Enthusiasts' },
      { value: '550+', label: 'Other TechFields' },
    ],
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders title, subtitle, and horizontal line', () => {
    const { container } = render(<ReachSection {...defaultProps} />);
    expect(screen.getByRole('heading', { name: /Our Reach/i })).toBeInTheDocument();
    // Test for the subtitle text
    expect(
      screen.getByText(/Empowering women through technology across Kenya/i)
    ).toBeInTheDocument();

    // Query the horizontal line by class since it doesn't have a separator role
    const horizontalLine = container.querySelector('.border-t.border-tsk-primary-dark');
    expect(horizontalLine).toBeInTheDocument();
    expect(horizontalLine).toHaveClass('border-t');
  });

  it('renders statistics with correct values and labels', () => {
    render(<ReachSection {...defaultProps} />);
    defaultProps.stats.forEach((stat) => {
      const valueElement = screen.getByText(new RegExp(`${parseInt(stat.value)}`));
      expect(valueElement).toBeInTheDocument();
      expect(screen.getByText(stat.label)).toBeInTheDocument();
    });
    expect(screen.getAllByTestId('countup')).toHaveLength(defaultProps.stats.length);
  });

  it('renders CTA button with correct text and link', () => {
    render(<ReachSection {...defaultProps} />);
    const button = screen.getByTestId('mock-button');
    expect(button).toHaveTextContent(/Get Involved/i);
    const link = button.closest('a');
    expect(link).toHaveAttribute('href', '/get-involved');
  });

  it('renders images with correct classes', () => {
    render(<ReachSection {...defaultProps} />);

    // Get all images by alt text
    const images = screen.getAllByAltText('image');

    // Find the main image (Rectangle svg) by src
    const rectangleImage = images.find((img) => img.getAttribute('src') === 'mocked-rectangle-svg');
    expect(rectangleImage).toHaveClass('rounded-lg shadow-lg');

    // Find the bug image by src
    const bugImage = images.find((img) => img.getAttribute('src') === 'mocked-bug-svg');
    expect(bugImage).toHaveClass('w-18 h-18');
  });

  it('renders SVG with correct dimensions', () => {
    const { container } = render(<ReachSection {...defaultProps} />);
    const svg = container.querySelector('svg');
    expect(svg).toBeInTheDocument();
    expect(svg).toHaveAttribute('width', '135');
    expect(svg).toHaveAttribute('height', '163');
  });
});
