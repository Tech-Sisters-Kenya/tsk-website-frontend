/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import TestimonialsCarousel from '@/app/landing-page/Testimonials';
import '@testing-library/jest-dom';

// Mocks
const mockScrollTo = jest.fn();
const mockScrollPrev = jest.fn();
const mockScrollNext = jest.fn();

jest.mock('embla-carousel-react', () => {
  return () => [
    jest.fn(),
    {
      scrollPrev: mockScrollPrev,
      scrollNext: mockScrollNext,
      scrollTo: mockScrollTo,
      on: jest.fn(),
      selectedScrollSnap: () => 0,
      scrollSnapList: () => [0, 1, 2, 3],
    },
  ];
});

jest.mock('next/image', () => {
  const ImageMock = (props: any) => <img {...props} alt={props.alt || 'mocked image'} />;
  ImageMock.displayName = 'NextImageMock';
  return ImageMock;
});

jest.mock('@/components/ui/button', () => ({
  Button: ({ children, onClick, ...rest }: any) => (
    <button onClick={onClick} {...rest}>
      {children}
    </button>
  ),
}));

describe('TestimonialsCarousel component', () => {
  it('renders the section heading and description', () => {
    render(<TestimonialsCarousel />);
    expect(screen.getByText('Testimonials')).toBeInTheDocument();
    expect(screen.getByText(/From gaining skills to finding belonging/i)).toBeInTheDocument();
  });

  it('renders multiple testimonials', () => {
    render(<TestimonialsCarousel />);
    expect(screen.getByText(/Mary Wanjiku/)).toBeInTheDocument();
    expect(screen.getByText(/Jacinta Muga/)).toBeInTheDocument();
    expect(screen.getByText(/Mercy Mwende/)).toBeInTheDocument();
    expect(screen.getByText(/Sally Kahoro/)).toBeInTheDocument();
  });

  it('renders avatar images', () => {
    render(<TestimonialsCarousel />);
    const images = screen.getAllByRole('img');
    expect(images.length).toBeGreaterThan(0);
    expect(images[0]).toHaveAttribute('alt', 'Mary Wanjiku');
  });

  it('renders navigation buttons', () => {
    render(<TestimonialsCarousel />);
    expect(screen.getByLabelText('Previous testimonial')).toBeInTheDocument();
    expect(screen.getByLabelText('Next testimonial')).toBeInTheDocument();
  });

  it('renders scroll dots for testimonials', () => {
    render(<TestimonialsCarousel />);
    const dots = screen.getAllByRole('button', { name: /Go to testimonial/i });
    expect(dots.length).toBe(4);
  });

  it('calls scrollTo on dot click', () => {
    render(<TestimonialsCarousel />);
    const dots = screen.getAllByRole('button', { name: /Go to testimonial/i });
    fireEvent.click(dots[2]);
    expect(mockScrollTo).toHaveBeenCalledWith(2);
  });
});
