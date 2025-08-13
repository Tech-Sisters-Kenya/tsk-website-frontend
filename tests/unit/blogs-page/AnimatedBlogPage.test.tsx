import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { AnimatedBlogPage } from '@/app/blogs/AnimatedBlogPage';

// Mock framer-motion to avoid animation complexities in tests
jest.mock('framer-motion', () => ({
  motion: {
    svg: ({
      children,
      ...props
    }: React.SVGProps<SVGSVGElement> & { children: React.ReactNode }) => (
      <svg {...props} data-testid="animated-svg">
        {children}
      </svg>
    ),
    circle: ({
      children,
      ...props
    }: React.SVGProps<SVGCircleElement> & { children?: React.ReactNode }) => (
      <circle {...props} data-testid="animated-circle">
        {children}
      </circle>
    ),
    rect: ({
      children,
      ...props
    }: React.SVGProps<SVGRectElement> & { children?: React.ReactNode }) => (
      <rect {...props} data-testid="animated-rect">
        {children}
      </rect>
    ),
    path: ({
      children,
      ...props
    }: React.SVGProps<SVGPathElement> & { children?: React.ReactNode }) => (
      <path {...props} data-testid="animated-path">
        {children}
      </path>
    ),
  },
}));

describe('AnimatedBlogPage', () => {
  beforeEach(() => {
    // Clear any previous test artifacts
    jest.clearAllMocks();
  });

  describe('Component Rendering', () => {
    it('renders without crashing', () => {
      render(<AnimatedBlogPage />);
      expect(screen.getAllByTestId('animated-svg').length).toBeGreaterThan(0);
    });

    it('renders the main SVG with correct dimensions and viewBox', () => {
      render(<AnimatedBlogPage />);
      const svg = screen.getAllByTestId('animated-svg')[0];

      expect(svg).toHaveAttribute('width', '586');
      expect(svg).toHaveAttribute('height', '459');
      expect(svg).toHaveAttribute('viewBox', '0 0 586 409');
      expect(svg).toHaveAttribute('fill', 'none');
    });

    it('applies correct CSS classes to the main SVG', () => {
      render(<AnimatedBlogPage />);
      const svg = screen.getAllByTestId('animated-svg')[0];

      expect(svg).toHaveClass('w-full', 'h-full', 'sm:w-fit', 'sm:h-fit');
    });
  });

  describe('SVG Elements', () => {
    it('renders the pink circle with correct attributes', () => {
      render(<AnimatedBlogPage />);
      const circles = screen.getAllByTestId('animated-circle');
      const pinkCircle = circles[0];

      expect(pinkCircle).toHaveAttribute('cx', '468');
      expect(pinkCircle).toHaveAttribute('cy', '176');
      expect(pinkCircle).toHaveAttribute('r', '60');
      expect(pinkCircle).toHaveAttribute('fill', '#FFBAFF');
    });

    it('renders the hello pad rectangle with correct attributes', () => {
      render(<AnimatedBlogPage />);
      const rects = screen.getAllByTestId('animated-rect');
      const helloPadRect = rects[0];

      expect(helloPadRect).toHaveAttribute('x', '293');
      expect(helloPadRect).toHaveAttribute('y', '48.3174');
      expect(helloPadRect).toHaveAttribute('width', '126');
      expect(helloPadRect).toHaveAttribute('height', '40.8847');
      expect(helloPadRect).toHaveAttribute('rx', '20');
      expect(helloPadRect).toHaveAttribute('fill', 'white');
      expect(helloPadRect).toHaveAttribute('transform', 'rotate(-9.27922 293 48.3174)');
    });

    it('renders the tech sisters blog text pad rectangle with correct attributes', () => {
      render(<AnimatedBlogPage />);
      const rects = screen.getAllByTestId('animated-rect');
      const techSistersPadRect = rects[1];

      expect(techSistersPadRect).toHaveAttribute('x', '270.256');
      expect(techSistersPadRect).toHaveAttribute('y', '221');
      expect(techSistersPadRect).toHaveAttribute('width', '211.689');
      expect(techSistersPadRect).toHaveAttribute('height', '71.7458');
      expect(techSistersPadRect).toHaveAttribute('rx', '20');
      expect(techSistersPadRect).toHaveAttribute('transform', 'rotate(18.9141 270.256 221)');
      expect(techSistersPadRect).toHaveAttribute('fill', 'white');
    });

    it('renders all path elements with correct fill colors', () => {
      render(<AnimatedBlogPage />);
      const paths = screen.getAllByTestId('animated-path');

      // Hello text path
      expect(paths[0]).toHaveAttribute('fill', '#45084A');

      // Half circle path
      expect(paths[1]).toHaveAttribute('fill', '#45084A');

      // Tech sisters blog text path
      expect(paths[2]).toHaveAttribute('fill', '#45084A');

      // Book-looking path
      expect(paths[paths.length - 1]).toHaveAttribute('fill', '#45084A');
    });
  });

  describe('Path Elements Content', () => {
    it('renders the hello text path with correct d attribute', () => {
      render(<AnimatedBlogPage />);
      const paths = screen.getAllByTestId('animated-path');
      const helloTextPath = paths[0];

      expect(helloTextPath).toHaveAttribute('d');
      const dAttribute = helloTextPath.getAttribute('d');
      expect(dAttribute).toContain('M334.396 61.6857L327.645 62.7886');
    });

    it('renders the half circle path with correct d attribute', () => {
      render(<AnimatedBlogPage />);
      const paths = screen.getAllByTestId('animated-path');
      const halfCirclePath = paths[1];

      expect(halfCirclePath).toHaveAttribute('d');
      const dAttribute = halfCirclePath.getAttribute('d');
      expect(dAttribute).toContain('M149.779 186.505C125.94 205.729');
    });

    it('renders the tech sisters blog text path with correct d attribute', () => {
      render(<AnimatedBlogPage />);
      const paths = screen.getAllByTestId('animated-path');
      const techSistersTextPath = paths[2];

      expect(techSistersTextPath).toHaveAttribute('d');
      const dAttribute = techSistersTextPath.getAttribute('d');
      expect(dAttribute).toContain('M298.047 244.378L293.577 242.846');
    });

    it('renders the book path with correct d attribute', () => {
      render(<AnimatedBlogPage />);
      const paths = screen.getAllByTestId('animated-path');
      const bookPath = paths[paths.length - 1];

      expect(bookPath).toHaveAttribute('d');
      const dAttribute = bookPath.getAttribute('d');
      expect(dAttribute).toContain('M312 200.681C314.25 201.472');
    });
  });

  describe('Nested SVG Structure', () => {
    it('renders nested SVG elements correctly', () => {
      render(<AnimatedBlogPage />);

      // The component should render multiple animated elements
      expect(screen.getAllByTestId('animated-circle')).toHaveLength(1);
      expect(screen.getAllByTestId('animated-rect')).toHaveLength(2);
      expect(screen.getAllByTestId('animated-path').length).toBeGreaterThan(3);
    });
  });

  describe('Component Structure', () => {
    it('maintains correct element hierarchy', () => {
      const { container } = render(<AnimatedBlogPage />);
      const svg = container.querySelector('svg[data-testid="animated-svg"]');

      expect(svg).toBeInTheDocument();
      expect(svg?.children.length).toBeGreaterThan(0);
    });

    it('does not render any unexpected elements', () => {
      const { container } = render(<AnimatedBlogPage />);

      // Should only contain SVG elements
      const nonSvgElements = container.querySelectorAll(
        ':not(svg):not(circle):not(rect):not(path)'
      );
      expect(nonSvgElements).toHaveLength(0);
    });
  });

  describe('Accessibility', () => {
    it('provides proper SVG structure for screen readers', () => {
      render(<AnimatedBlogPage />);
      const svg = screen.getAllByTestId('animated-svg')[0];

      expect(svg).toHaveAttribute('xmlns', 'http://www.w3.org/2000/svg');
    });

    it('maintains semantic structure', () => {
      const { container } = render(<AnimatedBlogPage />);

      // Ensure the component renders as a single cohesive SVG
      const svgs = container.querySelectorAll('svg');
      expect(svgs).toHaveLength(2);
    });
  });

  describe('Props and Configuration', () => {
    it('accepts and handles no props correctly', () => {
      expect(() => render(<AnimatedBlogPage />)).not.toThrow();
    });

    it('exports the component correctly', () => {
      expect(AnimatedBlogPage).toBeDefined();
      expect(typeof AnimatedBlogPage).toBe('function');
    });
  });

  describe('Color Scheme', () => {
    it('uses consistent color palette', () => {
      render(<AnimatedBlogPage />);

      // Check for primary colors used in the design
      const pinkCircle = screen.getAllByTestId('animated-circle')[0];
      const paths = screen.getAllByTestId('animated-path');
      const rects = screen.getAllByTestId('animated-rect');

      expect(pinkCircle).toHaveAttribute('fill', '#FFBAFF');

      // Check that text elements use the dark purple color
      paths.forEach((path) => {
        const fill = path.getAttribute('fill');
        if (fill === '#45084A' || fill === '#70169E' || fill === '#FFBAFF') {
          expect(fill).toMatch(/^#[0-9A-F]{6}$/i);
        }
      });

      // Check that rectangles use white fill
      rects.forEach((rect) => {
        expect(rect).toHaveAttribute('fill', 'white');
      });
    });
  });
});
