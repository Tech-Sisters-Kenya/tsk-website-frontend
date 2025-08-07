/* eslint-disable @typescript-eslint/no-explicit-any */

import React, { ReactNode } from 'react';
import { render, screen } from '@testing-library/react';
import AnimatedShapes from '@/app/landing-page/AnimatedShapes';
import '@testing-library/jest-dom';

type MotionDivProps = {
  children: ReactNode;
  className?: string;
  initial?: object;
  animate?: object;
  transition?: object;
  [key: string]: any;
};

// Mock next/image
jest.mock('next/image', () => ({
  __esModule: true,
  default: ({
    src,
    alt,
    width,
    height,
    className,
  }: {
    src: any;
    alt: string;
    width?: number | string;
    height?: number | string;
    className?: string;
  }) => <img src={src.src || src} alt={alt} width={width} height={height} className={className} />,
}));

// Mock SVG imports
jest.mock('@/assets/Group 633181.svg', () => 'mocked-tech-sister1.svg');
jest.mock('@/assets/IMG_4912 1.svg', () => 'mocked-tech-sister2.svg');

// Mock Framer Motion to avoid animation rendering issues
jest.mock('framer-motion', () => ({
  motion: {
    div: ({ children, className, initial, animate, transition, ...props }: MotionDivProps) => (
      <div
        className={className}
        data-initial={JSON.stringify(initial)}
        data-animate={JSON.stringify(animate)}
        data-transition={JSON.stringify(transition)}
        {...props}
      >
        {children}
      </div>
    ),
  },
}));

describe('AnimatedShapes Component', () => {
  beforeEach(() => {
    render(<AnimatedShapes />);
  });

  test('renders container without crashing', () => {
    const container = screen.getByTestId('animated-shapes-container');
    expect(container).toBeInTheDocument();
  });

  test('renders the correct number of images', () => {
    const images = screen.getAllByRole('img');
    expect(images).toHaveLength(2);
    expect(images[0]).toHaveAttribute('alt', 'Tech Sister 1');
    expect(images[1]).toHaveAttribute('alt', 'Tech Sister 2');
  });

  test('renders expected SVG elements', () => {
    expect(screen.getByTestId('svg-rect')).toBeInTheDocument();
    expect(screen.getByTestId('svg-semi-circle')).toBeInTheDocument();
    expect(screen.getByTestId('svg-circle')).toBeInTheDocument();
    expect(screen.getByTestId('svg-cloud')).toBeInTheDocument();
    expect(screen.getByTestId('svg-code-bracket')).toBeInTheDocument();
    expect(screen.getByTestId('svg-pill')).toBeInTheDocument();
    expect(screen.getByTestId('svg-logo')).toBeInTheDocument();
  });

  test('semi-circle has correct animation props', () => {
    const semiCircle = screen.getByTestId('svg-semi-circle').parentElement;
    expect(semiCircle).toHaveAttribute('data-initial', JSON.stringify({ rotate: 5, x: 0, y: 0 }));
    expect(semiCircle).toHaveAttribute('data-animate', JSON.stringify({ rotate: 25, x: 0, y: 0 }));
    expect(semiCircle).toHaveAttribute(
      'data-transition',
      JSON.stringify({
        duration: 0.75,
        repeat: Infinity,
        repeatDelay: 0.65,
        repeatType: 'reverse',
        ease: [0.37, 0, 0.63, 1],
      })
    );
  });

  test('circle has correct animation props', () => {
    const circle = screen.getByTestId('svg-circle').parentElement;
    expect(circle).toHaveAttribute('data-initial', JSON.stringify({ x: 0, y: 0, scale: 1.2 }));
    expect(circle).toHaveAttribute('data-animate', JSON.stringify({ x: 20, y: 20, scale: 0.8 }));
    expect(circle).toHaveAttribute(
      'data-transition',
      JSON.stringify({
        duration: 0.75,
        repeat: Infinity,
        repeatDelay: 0.65,
        repeatType: 'reverse',
        ease: [0.37, 0, 0.63, 1],
      })
    );
  });

  test('logo SVG has correct dimensions', () => {
    const logo = screen.getByTestId('svg-logo');
    expect(logo).toHaveAttribute('width', '63');
    expect(logo).toHaveAttribute('height', '84');
  });
});
