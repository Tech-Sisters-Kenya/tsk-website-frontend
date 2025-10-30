/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import TestimonialsCarousel from '@/app/landing-page/Testimonials';
import '@testing-library/jest-dom';

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

// Mock Next.js Image component
jest.mock('next/image', () => ({
  __esModule: true,
  default: (props: {
    alt?: string;
    src: string;
    width?: number;
    height?: number;
    fill?: boolean;
    className?: string;
  }) => {
    const { fill: _fill, width: _width, height: _height, ...imgProps } = props;
    return <img {...imgProps} alt={props.alt || 'image'} />;
  },
}));

// Mock the Button component from shadcn/ui
jest.mock('@/components/ui/button', () => ({
  Button: ({ children, onClick, className, ...props }: any) => (
    <button onClick={onClick} className={className} {...props}>
      {children}
    </button>
  ),
}));

// Mock BrandsSection component
jest.mock('@/app/landing-page/BrandsSection', () => ({
  __esModule: true,
  default: () => <div data-testid="brands-section">BrandsSection</div>,
}));

describe('TestimonialsCarousel', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders heading and description', () => {
    render(<TestimonialsCarousel />);
    expect(screen.getByRole('heading', { name: /Testimonials/i })).toBeInTheDocument();
    expect(screen.getByText(/From building skills to finding sisterhood/i)).toBeInTheDocument();
  });

  it('renders all testimonials with names and roles', () => {
    render(<TestimonialsCarousel />);

    expect(screen.getByText(/Mary Wanjiku/i)).toBeInTheDocument();
    expect(screen.getByText(/-Software Developer-/i)).toBeInTheDocument();

    expect(screen.getByText(/Jacinta Muga/i)).toBeInTheDocument();
    expect(screen.getByText(/-Product Designer-/i)).toBeInTheDocument();

    expect(screen.getByText(/Mercy Mwende/i)).toBeInTheDocument();
    expect(screen.getByText(/-Software Engineer-/i)).toBeInTheDocument();

    expect(screen.getByText(/Sally Kahoro/i)).toBeInTheDocument();
    expect(screen.getByText(/-Web3 Developer-/i)).toBeInTheDocument();
  });

  it('renders all testimonial quotes', () => {
    render(<TestimonialsCarousel />);

    expect(
      screen.getByText(/Being part of Tech Sisters Kenya has been a game-changer/i)
    ).toBeInTheDocument();
    expect(
      screen.getByText(/Joining Tech Sisters Kenya opened doors to opportunities/i)
    ).toBeInTheDocument();
    expect(screen.getByText(/Tech Sisters Kenya is my go-to for learning/i)).toBeInTheDocument();
    expect(
      screen.getByText(/One of my favorite things about Tech Sisters Kenya is the inclusivity/i)
    ).toBeInTheDocument();
  });

  it('renders testimonial avatars', () => {
    render(<TestimonialsCarousel />);
    const avatars = screen.getAllByRole('img', {
      name: /Mary Wanjiku|Jacinta Muga|Mercy Mwende|Sally Kahoro/i,
    });
    expect(avatars.length).toBeGreaterThan(0);
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
    expect(dots).toHaveLength(4); // Should have 4 dots for 4 testimonials
    fireEvent.click(dots[2]);
    expect(mockEmblaApi.scrollTo).toHaveBeenCalledWith(2);
  });

  it('renders navigation dots with correct count', () => {
    render(<TestimonialsCarousel />);
    const dots = screen.getAllByRole('button', { name: /Go to testimonial/i });
    expect(dots).toHaveLength(4);
  });

  it('renders the Tech Sisters logo', () => {
    render(<TestimonialsCarousel />);
    const logo = screen.getByAltText('Tech sisters logo');
    expect(logo).toBeInTheDocument();
    expect(logo).toHaveAttribute('src', '/tsk-logo.png');
  });

  it('renders BrandsSection component', () => {
    render(<TestimonialsCarousel />);
    expect(screen.getByTestId('brands-section')).toBeInTheDocument();
  });

  it('initializes embla carousel on mount', async () => {
    render(<TestimonialsCarousel />);

    await waitFor(() => {
      expect(mockEmblaApi.on).toHaveBeenCalledWith('reInit', expect.any(Function));
      expect(mockEmblaApi.on).toHaveBeenCalledWith('select', expect.any(Function));
    });
  });

  it('applies correct styling classes to carousel container', () => {
    const { container } = render(<TestimonialsCarousel />);
    const testimonialSection = container.querySelector('.bg-tsk-light-2');
    expect(testimonialSection).toBeInTheDocument();
    expect(testimonialSection).toHaveClass('bg-tsk-light-2');
  });
});
