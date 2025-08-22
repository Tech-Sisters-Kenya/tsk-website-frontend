import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import TestimonialsCarousel from '@/app/landing-page/Testimonials';

// store the mock API here
const mockEmblaApi = {
  scrollPrev: jest.fn(),
  scrollNext: jest.fn(),
  scrollTo: jest.fn(),
  on: jest.fn(),
  scrollSnapList: () => [0, 1, 2, 3],
  selectedScrollSnap: () => 0,
};

// Mock embla-carousel-react
jest.mock('embla-carousel-react', () => {
  return jest.fn(() => {
    return [jest.fn(), mockEmblaApi];
  });
});

// Mock SVG imports
jest.mock('@/assets/moringa.svg', () => 'moringa.svg');
jest.mock('@/assets/logos_google.svg', () => 'google.svg');
jest.mock('@/assets/image 1.svg', () => 'plugwork.svg');
jest.mock('@/assets/emobilis.svg', () => 'emobilis.svg');
jest.mock('@/assets/payd.svg', () => 'payd.svg');

describe('TestimonialsCarousel', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders heading and description', () => {
    render(<TestimonialsCarousel />);
    expect(screen.getByRole('heading', { name: /Testimonials/i })).toBeInTheDocument();
    expect(screen.getByText(/From gaining skills to finding belonging/i)).toBeInTheDocument();
  });

  it('renders all testimonials', () => {
    render(<TestimonialsCarousel />);
    expect(screen.getByText(/Mary Wanjiku/i)).toBeInTheDocument();
    expect(screen.getByText(/Jacinta Muga/i)).toBeInTheDocument();
    expect(screen.getByText(/Mercy Mwende/i)).toBeInTheDocument();
    expect(screen.getByText(/Sally Kahoro/i)).toBeInTheDocument();
  });

  it('calls scrollPrev when previous button is clicked', () => {
    render(<TestimonialsCarousel />);
    const prevButton = screen.getByRole('button', { name: /Previous testimonial/i });
    fireEvent.click(prevButton);
    expect(mockEmblaApi.scrollPrev).toHaveBeenCalledTimes(1);
  });

  it('calls scrollNext when next button is clicked', () => {
    render(<TestimonialsCarousel />);
    const nextButton = screen.getByRole('button', { name: /Next testimonial/i });
    fireEvent.click(nextButton);
    expect(mockEmblaApi.scrollNext).toHaveBeenCalledTimes(1);
  });

  it('calls scrollTo when a dot is clicked', () => {
    render(<TestimonialsCarousel />);
    const dots = screen.getAllByRole('button', { name: /Go to testimonial/i });
    fireEvent.click(dots[2]);
    expect(mockEmblaApi.scrollTo).toHaveBeenCalledWith(2);
  });
});
