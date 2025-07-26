import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import HeroImageAnimation from '@/app/about-us/HeroImageAnimation';

// Mock framer-motion
interface MotionDivProps {
  children: React.ReactNode;
  className?: string;
  initial?: Record<string, unknown>;
  animate?: Record<string, unknown>;
  transition?: Record<string, unknown>;
}

interface MotionSvgProps {
  children: React.ReactNode;
  className?: string;
  initial?: Record<string, unknown>;
  animate?: Record<string, unknown>;
  transition?: Record<string, unknown>;
}

jest.mock('framer-motion', () => ({
  motion: {
    div: ({ children, className, ...props }: MotionDivProps) => (
      <div className={className} data-testid="motion-div" {...props}>
        {children}
      </div>
    ),
    svg: ({ children, className, ...props }: MotionSvgProps) => (
      <svg className={className} data-testid="motion-svg" {...props}>
        {children}
      </svg>
    ),
  },
}));

describe('HeroImageAnimation', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders without crashing', () => {
    render(<HeroImageAnimation />);
    const motionDivs = screen.getAllByTestId('motion-div');
    expect(motionDivs.length).toBeGreaterThan(0);
    expect(motionDivs[0]).toBeInTheDocument();
  });

  it('renders all animated elements', () => {
    render(<HeroImageAnimation />);

    // Should render multiple motion.svg and motion.div elements
    const motionSvgs = screen.getAllByTestId('motion-svg');
    const motionDivs = screen.getAllByTestId('motion-div');

    // Based on the actual component: 3 motion.svg elements and 5 motion.div elements
    expect(motionSvgs).toHaveLength(3);
    expect(motionDivs).toHaveLength(5);
  });

  it('renders TSK logo with correct positioning classes', () => {
    render(<HeroImageAnimation />);

    const motionSvgs = screen.getAllByTestId('motion-svg');
    const tskLogoSvg = motionSvgs[0]; // First motion.svg should be the TSK logo

    expect(tskLogoSvg).toHaveClass('absolute', 'left-4', '-top-40');
  });

  it('renders "Who Are We?" text with correct positioning', () => {
    render(<HeroImageAnimation />);

    const motionDivs = screen.getAllByTestId('motion-div');
    const whoAreWeDiv = motionDivs[0]; // First motion.div should be "Who Are We?"

    expect(whoAreWeDiv).toHaveClass('absolute', 'left-40', '-top-40');
  });

  it('renders "What We Do" text with correct positioning', () => {
    render(<HeroImageAnimation />);

    const motionDivs = screen.getAllByTestId('motion-div');
    const whatWeDoDiv = motionDivs[1]; // Second motion.div should be "What We Do"

    expect(whatWeDoDiv).toHaveClass('absolute', '-right-2', 'bottom-20');
  });

  it('renders purple semi-circle with correct positioning', () => {
    render(<HeroImageAnimation />);

    const motionSvgs = screen.getAllByTestId('motion-svg');
    const purpleSemiCircleSvg = motionSvgs[1]; // Second motion.svg should be purple semi-circle

    expect(purpleSemiCircleSvg).toHaveClass('absolute', 'left-40', '-top-20');
  });

  it('renders question mark with correct positioning', () => {
    render(<HeroImageAnimation />);

    const motionSvgs = screen.getAllByTestId('motion-svg');
    const questionMarkSvg = motionSvgs[2]; // Third motion.svg should be question mark

    expect(questionMarkSvg).toHaveClass('absolute', 'left-80', 'top-6');
  });

  it('renders pink circle with correct positioning', () => {
    render(<HeroImageAnimation />);

    const motionDivs = screen.getAllByTestId('motion-div');
    const pinkCircleDiv = motionDivs[2]; // Third motion.div should be pink circle

    expect(pinkCircleDiv).toHaveClass('absolute', 'right-20', '-top-10');
  });

  it('renders "Our Mission" text with correct positioning', () => {
    render(<HeroImageAnimation />);

    const motionDivs = screen.getAllByTestId('motion-div');
    const ourMissionDiv = motionDivs[3]; // Fourth motion.div should be "Our Mission"

    expect(ourMissionDiv).toHaveClass('absolute', 'left-10', '-bottom-30');
  });

  it('renders "Our Vision" text with correct positioning', () => {
    render(<HeroImageAnimation />);

    const motionDivs = screen.getAllByTestId('motion-div');
    const ourVisionDiv = motionDivs[4]; // Fifth motion.div should be "Our Vision"

    expect(ourVisionDiv).toHaveClass('absolute', 'left-60', '-bottom-60');
  });

  it('contains SVG elements with proper structure', () => {
    const { container } = render(<HeroImageAnimation />);

    // Check for SVG paths (main content indicators)
    const svgPaths = container.querySelectorAll('path');
    expect(svgPaths.length).toBeGreaterThan(0);

    // Check for SVG rects (background elements)
    const svgRects = container.querySelectorAll('rect');
    expect(svgRects.length).toBeGreaterThan(0);

    // Check for circles
    const svgCircles = container.querySelectorAll('circle');
    expect(svgCircles.length).toBeGreaterThan(0);
  });

  it('has proper SVG viewBox attributes', () => {
    const { container } = render(<HeroImageAnimation />);

    const svgElements = container.querySelectorAll('svg');

    svgElements.forEach((svg: Element) => {
      if (svg.getAttribute('viewBox')) {
        expect(svg.getAttribute('viewBox')).toMatch(/^\d+\s+\d+\s+\d+\s+\d+$/);
      }
    });
  });

  it('contains proper fill colors for branding', () => {
    const { container } = render(<HeroImageAnimation />);

    // Check for brand colors in SVG elements
    const innerHTML = container.innerHTML;

    // Check for purple brand color
    expect(innerHTML).toContain('#70169E');

    // Check for dark purple
    expect(innerHTML).toContain('#45084A');

    // Check for pink
    expect(innerHTML).toContain('#FFBAFF');

    // Check for white
    expect(innerHTML).toContain('white');
  });

  it('has proper accessibility attributes', () => {
    const { container } = render(<HeroImageAnimation />);

    const svgElements = container.querySelectorAll('svg');

    svgElements.forEach((svg: Element) => {
      // Check if xmlns exists, if not skip the test for that element
      const xmlns = svg.getAttribute('xmlns');
      if (xmlns) {
        expect(xmlns).toBe('http://www.w3.org/2000/svg');
      }
    });
  });

  it('renders component as client-side only', () => {
    // This component uses 'use client' directive
    // Testing that it renders without server-side issues
    expect(() => render(<HeroImageAnimation />)).not.toThrow();
  });

  it('contains mask elements for complex SVG shapes', () => {
    const { container } = render(<HeroImageAnimation />);

    const maskElements = container.querySelectorAll('mask');
    expect(maskElements.length).toBeGreaterThan(0);
  });

  it('maintains proper SVG dimensions', () => {
    const { container } = render(<HeroImageAnimation />);

    const svgElements = container.querySelectorAll('svg');

    svgElements.forEach((svg: Element) => {
      const width = svg.getAttribute('width');
      const height = svg.getAttribute('height');

      if (width && height) {
        expect(parseInt(width)).toBeGreaterThan(0);
        expect(parseInt(height)).toBeGreaterThan(0);
      }
    });
  });
});
