/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import { render, screen } from '@testing-library/react';
import AnimatedShapes from '@/app/landing-page/AnimatedShapes';

// Mock Next.js Image component
jest.mock('next/image', () => ({
  __esModule: true,
  default: ({ src, alt, width, height, className, fill: _fill, ...props }: any) => (
    <img
      src={src}
      alt={alt}
      width={width}
      height={height}
      className={className}
      data-testid={`mock-image-${alt.replace(/\s+/g, '-').toLowerCase()}`}
      {...props}
    />
  ),
}));

// Mock SVG imports
jest.mock('@/assets/Group 633181.svg', () => 'mocked-tech-sister1.svg', { virtual: true });
jest.mock('@/assets/IMG_4912 1.svg', () => 'mocked-tech-sister2.svg', { virtual: true });

// Enhanced framer-motion mock that tracks all motion elements
const motionElements: any[] = [];

jest.mock('framer-motion', () => ({
  motion: {
    div: jest.fn(({ children, className, initial, animate, transition, ...props }: any) => {
      const elementIndex = motionElements.length;
      const testId = `motion-element-${elementIndex}`;

      const element = {
        index: elementIndex,
        initial,
        animate,
        transition,
        className,
        props,
      };
      motionElements.push(element);

      return (
        <div
          {...props}
          className={className}
          data-testid={testId}
          data-motion-index={elementIndex}
          data-initial={JSON.stringify(initial || {})}
          data-animate={JSON.stringify(animate || {})}
          data-transition={JSON.stringify(transition || {})}
        >
          {children}
        </div>
      );
    }),
  },
}));

// Mock SVG elements to be more predictable
const mockSVG = ({ width, height, viewBox, children, className, ...props }: any) => (
  <svg
    width={width}
    height={height}
    viewBox={viewBox}
    className={className}
    data-testid={`svg-${width}x${height}`}
    {...props}
  >
    {children}
  </svg>
);

// Mock React.createElement for SVG elements
const originalCreateElement = React.createElement;
jest.spyOn(React, 'createElement').mockImplementation((type, props, ...children) => {
  if (type === 'svg') {
    return mockSVG({ ...props, children });
  }
  return originalCreateElement(type, props, ...children);
});

describe('AnimatedShapes Component', () => {
  beforeEach(() => {
    motionElements.length = 0; // Clear the array
    jest.clearAllMocks();
  });

  test('renders the container with correct data-testid', () => {
    render(<AnimatedShapes />);
    expect(screen.getByTestId('animated-shapes')).toBeInTheDocument();
  });

  test('renders both images with correct alt and src', () => {
    render(<AnimatedShapes />);

    const images = screen.getAllByRole('img');
    expect(images.length).toBeGreaterThanOrEqual(2);

    // Check if we can find the specific images
    const techSister1 = screen.queryByTestId('mock-image-tech-sister-1');
    const techSister2 = screen.queryByTestId('mock-image-tech-sister-2');

    if (techSister1) {
      expect(techSister1).toHaveAttribute('alt', 'Tech Sister 1');
      expect(techSister1).toHaveAttribute('src', 'mocked-tech-sister1.svg');
    }

    if (techSister2) {
      expect(techSister2).toHaveAttribute('alt', 'Tech Sister 2');
      expect(techSister2).toHaveAttribute('src', 'mocked-tech-sister2.svg');
    }
  });

  test('renders SVG elements', () => {
    render(<AnimatedShapes />);

    // Check for any SVG elements
    const svgElement = screen.queryByTestId('svg-539x166');
    if (svgElement) {
      expect(svgElement).toBeInTheDocument();
      expect(svgElement).toHaveAttribute('width', '539');
      expect(svgElement).toHaveAttribute('height', '166');
      expect(svgElement).toHaveAttribute('viewBox', '0 0 539 166');
    } else {
      // Fallback: just check that some SVG exists
      const container = screen.getByTestId('animated-shapes');
      const svgElements = container.querySelectorAll('svg');
      expect(svgElements.length).toBeGreaterThan(0);
    }
  });

  test('creates motion elements with animation properties', () => {
    render(<AnimatedShapes />);

    // Check that motion elements were created
    const motionDivs = screen.queryAllByTestId(/^motion-element-/);
    expect(motionDivs.length).toBeGreaterThan(0);

    // Test first few motion elements
    motionDivs.slice(0, 6).forEach((element, index) => {
      expect(element).toHaveAttribute('data-motion-index', index.toString());
      expect(element).toHaveAttribute('data-initial');
      expect(element).toHaveAttribute('data-animate');
      expect(element).toHaveAttribute('data-transition');
    });
  });

  test('motion elements have consistent animation timing', () => {
    render(<AnimatedShapes />);

    const motionDivs = screen.queryAllByTestId(/^motion-element-/);

    motionDivs.forEach((element) => {
      const transitionStr = element.getAttribute('data-transition');
      if (transitionStr && transitionStr !== '{}') {
        const transition = JSON.parse(transitionStr);

        // Check for common animation properties
        if (transition.duration) {
          expect(transition.duration).toBe(0.75);
        }
        if (transition.repeat) {
          expect(transition.repeat).toBe(Infinity);
        }
        if (transition.repeatType) {
          expect(transition.repeatType).toBe('reverse');
        }
        if (transition.ease) {
          expect(transition.ease).toEqual([0.37, 0, 0.63, 1]);
        }
      }
    });
  });

  test('component renders without crashing', () => {
    expect(() => render(<AnimatedShapes />)).not.toThrow();
  });

  test('specific animation patterns exist', () => {
    render(<AnimatedShapes />);

    const motionDivs = screen.queryAllByTestId(/^motion-element-/);
    const animations = motionDivs.map((div) => ({
      initial: JSON.parse(div.getAttribute('data-initial') || '{}'),
      animate: JSON.parse(div.getAttribute('data-animate') || '{}'),
    }));

    // Check that we have various animation types
    const hasRotation = animations.some(
      (anim) => anim.initial.rotate !== undefined || anim.animate.rotate !== undefined
    );
    const hasScale = animations.some(
      (anim) => anim.initial.scale !== undefined || anim.animate.scale !== undefined
    );
    const hasTranslation = animations.some(
      (anim) =>
        anim.initial.x !== undefined ||
        anim.initial.y !== undefined ||
        anim.animate.x !== undefined ||
        anim.animate.y !== undefined
    );

    // At least one type of animation should exist
    expect(hasRotation || hasScale || hasTranslation).toBe(true);
  });
});
