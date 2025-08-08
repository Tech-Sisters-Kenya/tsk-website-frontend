/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import { render, screen } from '@testing-library/react';
import AnimatedShapes from '@/app/landing-page/AnimatedShapes';
import '@testing-library/jest-dom';

// Mock next/image
jest.mock('next/image', () => ({
  __esModule: true,
  default: (props: { src: string | { src: string }; alt: string }) => {
    const imageSrc = typeof props.src === 'string' ? props.src : props.src.src;
    return <img src={imageSrc} alt={props.alt} />;
  },
}));

// Mock SVG imports
jest.mock('@/assets/tech-sister1.svg', () => 'mocked-tech-sister1.svg');
jest.mock('@/assets/tech-sister2.svg', () => 'mocked-tech-sister2.svg');
jest.mock('@/assets/logo-white.svg', () => 'mocked-logo-white.svg');

// Mock framer-motion
jest.mock('framer-motion', () => {
  const actualFramerMotion = jest.requireActual('framer-motion');
  return {
    ...actualFramerMotion,
    motion: {
      div: ({ initial, animate, transition, children, ...rest }: any) => (
        <div
          {...rest}
          data-initial={JSON.stringify(initial)}
          data-animate={JSON.stringify(animate)}
          data-transition={JSON.stringify(transition)}
        >
          {children}
        </div>
      ),
    },
  };
});

describe('AnimatedShapes component', () => {
  beforeEach(() => {
    render(<AnimatedShapes />);
  });

  test('renders the container', () => {
    expect(screen.getByTestId('animated-shapes')).toBeInTheDocument();
  });

  test('renders both images with correct alt and src', () => {
    const images = screen.getAllByRole('img');
    expect(images.length).toBeGreaterThanOrEqual(2);

    expect(images[0]).toHaveAttribute('alt', 'Tech Sister 1');
    expect(images[0]).toHaveAttribute('src', 'mocked-tech-sister1.svg');

    expect(images[1]).toHaveAttribute('alt', 'Tech Sister 2');
    expect(images[1]).toHaveAttribute('src', 'mocked-tech-sister2.svg');
  });

  test('renders all SVG elements with correct test IDs', () => {
    expect(screen.getByTestId('svg-rect')).toBeInTheDocument();
    expect(screen.getByTestId('svg-logo')).toBeInTheDocument();
    expect(screen.getByTestId('svg-pill')).toBeInTheDocument();
    expect(screen.getByTestId('svg-triangle')).toBeInTheDocument();
    expect(screen.getByTestId('svg-semi-circle')).toBeInTheDocument();
  });

  test('checks animation props for svg-semi-circle', () => {
    const semiCircle = screen.getByTestId('svg-semi-circle').parentElement!;
    const initial = JSON.parse(semiCircle.getAttribute('data-initial') || '{}');
    const animate = JSON.parse(semiCircle.getAttribute('data-animate') || '{}');
    const transition = JSON.parse(semiCircle.getAttribute('data-transition') || '{}');

    expect(initial).toEqual({ rotate: 5, x: 0, y: 0 });
    expect(animate).toEqual({ rotate: -5, x: 10, y: 10 });
    expect(transition).toEqual({ repeat: Infinity, repeatType: 'reverse', duration: 2 });
  });

  test('checks animation props for svg-triangle', () => {
    const triangle = screen.getByTestId('svg-triangle').parentElement!;
    const initial = JSON.parse(triangle.getAttribute('data-initial') || '{}');
    const animate = JSON.parse(triangle.getAttribute('data-animate') || '{}');
    const transition = JSON.parse(triangle.getAttribute('data-transition') || '{}');

    expect(initial).toEqual({ rotate: -5, x: 0, y: 0 });
    expect(animate).toEqual({ rotate: 5, x: -10, y: -10 });
    expect(transition).toEqual({ repeat: Infinity, repeatType: 'reverse', duration: 2 });
  });

  test('renders logo SVG with correct src and alt', () => {
    const logo = screen.getByTestId('svg-logo');
    expect(logo).toBeInTheDocument();
    expect(logo).toHaveAttribute('alt', 'Tech Sisters Logo');
    expect(logo).toHaveAttribute('src', 'mocked-logo-white.svg');
  });

  test('optionally checks viewBox or styles of an SVG (e.g., rect)', () => {
    const rect = screen.getByTestId('svg-rect');
    expect(rect).toBeInTheDocument();
  });
});
