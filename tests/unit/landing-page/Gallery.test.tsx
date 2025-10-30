/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import Gallery from '@/app/landing-page/Gallery';
import '@testing-library/jest-dom';

// Store mock API
const mockEmblaApi = {
  scrollPrev: jest.fn(),
  scrollNext: jest.fn(),
  scrollTo: jest.fn(),
  on: jest.fn(),
  scrollSnapList: () => [0, 1, 2, 3],
  selectedScrollSnap: () => 0,
};

// Mock embla-carousel-react (only once!)
jest.mock('embla-carousel-react', () => ({
  __esModule: true,
  default: () => [
    (node: any) => node, // emblaRef
    mockEmblaApi,
  ],
}));

// Mock Next.js Image component
jest.mock('next/image', () => ({
  __esModule: true,
  default: (props: any) => {
    const { alt = '', fill: _fill, sizes: _sizes, ...rest } = props;
    return <img alt={alt} {...rest} />;
  },
}));

// Mock the custom Button component
jest.mock('@/components/Button', () => ({
  __esModule: true,
  default: ({ children, className }: { children: React.ReactNode; className?: string }) => (
    <button className={className} data-testid="custom-button">
      {children}
    </button>
  ),
}));

describe('Gallery Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.runOnlyPendingTimers();
    jest.useRealTimers();
  });

  it('renders loading state initially', () => {
    render(<Gallery />);
    expect(screen.getByText(/Loading gallery/i)).toBeInTheDocument();
  });

  it('renders the gallery title and description after loading', async () => {
    render(<Gallery />);

    // Fast-forward past loading timeout (1200ms)
    jest.advanceTimersByTime(1200);

    await waitFor(() => {
      expect(screen.getByText(/Our Gallery/i)).toBeInTheDocument();
      expect(
        screen.getByText(/Every picture tells a story — of women finding their voice/i)
      ).toBeInTheDocument();
    });
  });

  it('renders all gallery images after loading', async () => {
    render(<Gallery />);

    jest.advanceTimersByTime(1200);

    await waitFor(() => {
      // 4 gallery images + 4 TSK logo overlays = 8 images
      const images = screen.getAllByRole('img');
      expect(images.length).toBe(8);
    });
  });

  it('renders gallery images with correct alt texts', async () => {
    render(<Gallery />);

    jest.advanceTimersByTime(1200);

    await waitFor(() => {
      expect(screen.getByAltText('Gallery data edition photo')).toBeInTheDocument();
      expect(screen.getByAltText('Software workshop session photo')).toBeInTheDocument();
      const mentalHealthImages = screen.getAllByAltText('Mental health & market day edition photo');
      expect(mentalHealthImages).toHaveLength(2);
    });
  });

  it('renders TSK logo overlays', async () => {
    render(<Gallery />);

    jest.advanceTimersByTime(1200);

    await waitFor(() => {
      const logos = screen.getAllByAltText('TSK Logo');
      expect(logos).toHaveLength(4);
    });
  });

  it('renders next and previous buttons', async () => {
    render(<Gallery />);

    jest.advanceTimersByTime(1200);

    await waitFor(() => {
      expect(screen.getByLabelText(/Previous slide/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/Next slide/i)).toBeInTheDocument();
    });
  });

  it('calls scrollPrev when previous button is clicked', async () => {
    render(<Gallery />);

    jest.advanceTimersByTime(1200);

    await waitFor(() => {
      const prevButton = screen.getByLabelText(/Previous slide/i);
      fireEvent.click(prevButton);
      expect(mockEmblaApi.scrollPrev).toHaveBeenCalledTimes(1);
    });
  });

  it('calls scrollNext when next button is clicked', async () => {
    render(<Gallery />);

    jest.advanceTimersByTime(1200);

    await waitFor(() => {
      const nextButton = screen.getByLabelText(/Next slide/i);
      fireEvent.click(nextButton);
      expect(mockEmblaApi.scrollNext).toHaveBeenCalledTimes(1);
    });
  });

  it('renders a "View More" button linking to Instagram', async () => {
    render(<Gallery />);

    jest.advanceTimersByTime(1200);

    await waitFor(() => {
      const link = screen.getByRole('link', { name: /View More/i });
      expect(link).toBeInTheDocument();
      expect(link).toHaveAttribute('href', 'http://www.instagram.com/techsisterskenya');
      expect(link).toHaveAttribute('target', '_blank');
      expect(link).toHaveAttribute('rel', 'noopener noreferrer');
    });
  });

  it('initializes embla carousel on mount', async () => {
    render(<Gallery />);

    jest.advanceTimersByTime(1200);

    await waitFor(() => {
      expect(mockEmblaApi.on).toHaveBeenCalledWith('reInit', expect.any(Function));
      expect(mockEmblaApi.on).toHaveBeenCalledWith('select', expect.any(Function));
    });
  });

  it('applies correct background color to gallery section', async () => {
    const { container } = render(<Gallery />);

    jest.advanceTimersByTime(1200);

    await waitFor(() => {
      const gallerySection = container.querySelector('.bg-tsk-light-2');
      expect(gallerySection).toBeInTheDocument();
    });
  });
});
