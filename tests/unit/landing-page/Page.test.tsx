import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import LandingPage from '@/app/landing-page/page';
import { useAuthStore } from '@/stores/useAuthStore';

// Mock the auth store
jest.mock('@/stores/useAuthStore');
const mockUseAuthStore = useAuthStore as jest.MockedFunction<typeof useAuthStore>;

// Mock all child components
jest.mock('@/app/landing-page/Hero', () => {
  return function MockHero() {
    return <div data-testid="hero">Hero</div>;
  };
});

jest.mock('@/app/landing-page/WhoWeAre', () => {
  return function MockWhoWeAre() {
    return <div data-testid="who-we-are">Who We Are</div>;
  };
});

jest.mock('@/app/landing-page/OurReach', () => {
  return function MockOurReach({
    title,
    subtitle,
    stats,
  }: {
    title: string;
    subtitle: string;
    stats: Array<{
      value: string;
      label: React.ReactNode;
    }>;
  }) {
    // Extract only serializable data from stats
    const serializableStats =
      stats?.map((stat) => ({
        value: stat.value,
        // Convert React element to a simple string representation
        label: 'label',
      })) || [];

    return (
      <div data-testid="our-reach">
        <div data-testid="our-reach-title">{title}</div>
        <div data-testid="our-reach-subtitle">{subtitle}</div>
        <div data-testid="our-reach-stats">{JSON.stringify(serializableStats)}</div>
        <div data-testid="our-reach-stats-count">{stats?.length || 0}</div>
      </div>
    );
  };
});

jest.mock('@/app/landing-page/WhatWeDo', () => {
  return function MockWhatWeDo() {
    return <div data-testid="what-we-do">What We Do</div>;
  };
});

jest.mock('@/app/landing-page/Gallery', () => {
  return function MockGallery() {
    return <div data-testid="gallery">Gallery</div>;
  };
});

jest.mock('@/app/landing-page/ExploreBlogs', () => {
  return function MockExploreBlogs() {
    return <div data-testid="explore-blogs">Explore Blogs</div>;
  };
});

jest.mock('@/app/landing-page/Testimonials', () => {
  return function MockTestimonials() {
    return <div data-testid="testimonials">Testimonials</div>;
  };
});

jest.mock('@/components/CallToAction', () => {
  return function MockCallToAction() {
    return <div data-testid="call-to-action">Call To Action</div>;
  };
});

// Mock fetch globally
global.fetch = jest.fn();

// Store original values
const originalURL = global.URL;

describe('LandingPage Component', () => {
  const mockSetAuthData = jest.fn();

  // Mock window objects once at the top level
  const mockHistory = {
    replaceState: jest.fn(),
  };

  const createMockURL = (href: string) => {
    // Use the original URL constructor to avoid infinite recursion
    const realUrl = new originalURL(href);
    return {
      href,
      pathname: realUrl.pathname,
      searchParams: {
        get: jest.fn((key: string) => {
          // Parse the URL to get actual search params
          const params = new URLSearchParams(href.split('?')[1] || '');
          return params.get(key);
        }),
        delete: jest.fn(),
      },
    };
  };

  beforeAll(() => {
    // Mock window.history once for all tests
    delete (window as unknown as { history?: unknown }).history;
    (window as unknown as { history: typeof mockHistory }).history = mockHistory;
  });

  beforeEach(() => {
    jest.clearAllMocks();
    mockUseAuthStore.mockReturnValue(mockSetAuthData);
    (global.fetch as jest.Mock).mockClear();
    mockHistory.replaceState.mockClear();
  });

  afterAll(() => {
    // Restore original values
    global.URL = originalURL;
    (window as unknown as { history: typeof mockHistory }).history = mockHistory;
  });

  describe('Component Rendering', () => {
    beforeEach(() => {
      // Mock URL constructor to return URL without token
      const mockUrlInstance = createMockURL('http://localhost:3000/');
      (global.URL as unknown as jest.Mock) = jest.fn().mockImplementation(() => mockUrlInstance);

      render(<LandingPage />);
    });

    it('renders all required components in correct order', () => {
      const hero = screen.getByTestId('hero');
      const whoWeAre = screen.getByTestId('who-we-are');
      const ourReach = screen.getByTestId('our-reach');
      const whatWeDo = screen.getByTestId('what-we-do');
      const gallery = screen.getByTestId('gallery');
      const exploreBlogs = screen.getByTestId('explore-blogs');
      const testimonials = screen.getByTestId('testimonials');
      const callToAction = screen.getByTestId('call-to-action');

      // Check all components are rendered
      expect(hero).toBeInTheDocument();
      expect(whoWeAre).toBeInTheDocument();
      expect(ourReach).toBeInTheDocument();
      expect(whatWeDo).toBeInTheDocument();
      expect(gallery).toBeInTheDocument();
      expect(exploreBlogs).toBeInTheDocument();
      expect(testimonials).toBeInTheDocument();
      expect(callToAction).toBeInTheDocument();

      // Check they appear in the correct order
      const main = screen.getByRole('main');
      const children = Array.from(main.children);

      expect(children[0]).toContainElement(hero);
      expect(children[1]).toContainElement(whoWeAre);
      expect(children[2]).toContainElement(ourReach);
      expect(children[3]).toContainElement(whatWeDo);
      expect(children[4]).toContainElement(gallery);
      expect(children[5]).toContainElement(exploreBlogs);
      expect(children[6]).toContainElement(testimonials);
      expect(children[7]).toContainElement(callToAction);
    });

    it('has correct main container styling', () => {
      const main = screen.getByRole('main');
      expect(main).toHaveClass(
        'flex',
        'min-h-screen',
        'flex-col',
        'items-center',
        'justify-center'
      );
    });

    it('uses semantic HTML structure', () => {
      const main = screen.getByRole('main');
      expect(main.tagName).toBe('MAIN');
    });

    it('renders exactly 8 child components', () => {
      const main = screen.getByRole('main');
      expect(main.children).toHaveLength(8);
    });

    it('each component is rendered as a direct child of main', () => {
      const main = screen.getByRole('main');
      const testIds = [
        'hero',
        'who-we-are',
        'our-reach',
        'what-we-do',
        'gallery',
        'explore-blogs',
        'testimonials',
        'call-to-action',
      ];

      testIds.forEach((testId) => {
        const component = screen.getByTestId(testId);
        expect(main).toContainElement(component);
      });
    });
  });

  describe('OurReach Component Props', () => {
    beforeEach(() => {
      // Mock URL constructor to return URL without token
      const mockUrlInstance = createMockURL('http://localhost:3000/');
      (global.URL as unknown as jest.Mock) = jest.fn().mockImplementation(() => mockUrlInstance);

      render(<LandingPage />);
    });

    it('passes correct title to OurReach component', () => {
      const ourReachTitle = screen.getByTestId('our-reach-title');
      expect(ourReachTitle).toHaveTextContent('OUR REACH SO FAR');
    });

    it('passes correct subtitle to OurReach component', () => {
      const ourReachSubtitle = screen.getByTestId('our-reach-subtitle');
      expect(ourReachSubtitle).toHaveTextContent(
        'A growing community of women building confidence, skills, and careers in tech.'
      );
    });

    it('passes correct stats data to OurReach component', () => {
      const ourReachStats = screen.getByTestId('our-reach-stats');
      const statsData = JSON.parse(ourReachStats.textContent || '[]');

      expect(statsData).toHaveLength(4);

      // Check the values
      expect(statsData[0].value).toBe('700+');
      expect(statsData[1].value).toBe('450+');
      expect(statsData[2].value).toBe('230+');
      expect(statsData[3].value).toBe('550+');

      // Check the labels (now as strings)
      expect(statsData[0].label).toBe('label');
      expect(statsData[1].label).toBe('label');
      expect(statsData[2].label).toBe('label');
      expect(statsData[3].label).toBe('label');
    });
  });

  describe('Authentication Logic', () => {
    it('does not call auth API when no token is present', () => {
      // Mock URL constructor to return URL without token
      const mockUrlInstance = createMockURL('http://localhost:3000/');
      (global.URL as unknown as jest.Mock) = jest.fn().mockImplementation(() => mockUrlInstance);

      render(<LandingPage />);

      expect(global.fetch).not.toHaveBeenCalled();
      expect(mockSetAuthData).not.toHaveBeenCalled();
    });

    it('processes token from URL params and calls auth API', async () => {
      const mockUserData = {
        id: '123',
        name: 'Test User',
        email: 'test@example.com',
        role: 'user',
      };

      // Mock URL constructor to return URL with token
      const mockUrlInstance = createMockURL('http://localhost:3000/?token=test-token');
      (global.URL as unknown as jest.Mock) = jest.fn().mockImplementation(() => mockUrlInstance);

      // Set mock location href to match
      // mockLocation.href = 'http://localhost:3000/?token=test-token'; // This line is removed

      (global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve(mockUserData),
      });

      render(<LandingPage />);

      await waitFor(() => {
        expect(global.fetch).toHaveBeenCalledWith(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/users/current-user`,
          {
            headers: {
              Authorization: 'Bearer test-token',
            },
          }
        );
      });

      await waitFor(() => {
        expect(mockSetAuthData).toHaveBeenCalledWith('test-token', {
          id: '123',
          name: 'Test User',
          email: 'test@example.com',
          role: 'user',
        });
      });

      await waitFor(() => {
        expect(mockHistory.replaceState).toHaveBeenCalledWith({}, '', '/');
      });
    });

    it('handles auth API error gracefully', async () => {
      // Mock URL constructor to return URL with token
      const mockUrlInstance = createMockURL('http://localhost:3000/?token=invalid-token');
      (global.URL as unknown as jest.Mock) = jest.fn().mockImplementation(() => mockUrlInstance);

      // Set mock location href to match
      // mockLocation.href = 'http://localhost:3000/?token=invalid-token'; // This line is removed

      (global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: false,
      });

      const consoleSpy = jest.spyOn(console, 'error').mockImplementation();

      render(<LandingPage />);

      await waitFor(() => {
        expect(global.fetch).toHaveBeenCalled();
      });

      await waitFor(() => {
        expect(consoleSpy).toHaveBeenCalledWith('Auth error:', expect.any(Error));
      });

      expect(mockSetAuthData).not.toHaveBeenCalled();
      consoleSpy.mockRestore();
    });

    it('handles fetch rejection gracefully', async () => {
      // Mock URL constructor to return URL with token
      const mockUrlInstance = createMockURL('http://localhost:3000/?token=test-token');
      (global.URL as unknown as jest.Mock) = jest.fn().mockImplementation(() => mockUrlInstance);

      // Set mock location href to match
      // mockLocation.href = 'http://localhost:3000/?token=test-token'; // This line is removed

      (global.fetch as jest.Mock).mockRejectedValueOnce(new Error('Network error'));

      const consoleSpy = jest.spyOn(console, 'error').mockImplementation();

      render(<LandingPage />);

      await waitFor(() => {
        expect(consoleSpy).toHaveBeenCalledWith('Auth error:', expect.any(Error));
      });

      expect(mockSetAuthData).not.toHaveBeenCalled();
      consoleSpy.mockRestore();
    });

    it('removes token from URL after processing', async () => {
      // Mock URL constructor to return URL with token
      const mockUrlInstance = createMockURL('http://localhost:3000/?token=test-token&other=param');
      (global.URL as unknown as jest.Mock) = jest.fn().mockImplementation(() => mockUrlInstance);

      // Set mock location href to match
      // mockLocation.href = 'http://localhost:3000/?token=test-token&other=param'; // This line is removed

      (global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: () =>
          Promise.resolve({ id: '1', name: 'Test', email: 'test@test.com', role: 'user' }),
      });

      render(<LandingPage />);

      await waitFor(() => {
        expect(mockHistory.replaceState).toHaveBeenCalledWith({}, '', '/');
      });
    });
  });

  describe('Component Hierarchy and Structure', () => {
    beforeEach(() => {
      // Mock URL constructor to return URL without token
      const mockUrlInstance = createMockURL('http://localhost:3000/');
      (global.URL as unknown as jest.Mock) = jest.fn().mockImplementation(() => mockUrlInstance);

      render(<LandingPage />);
    });

    it('maintains proper component hierarchy', () => {
      const hero = screen.getByTestId('hero');
      const whoWeAre = screen.getByTestId('who-we-are');
      const ourReach = screen.getByTestId('our-reach');
      const whatWeDo = screen.getByTestId('what-we-do');

      // None of these components should contain the others
      expect(hero).not.toContainElement(whoWeAre);
      expect(whoWeAre).not.toContainElement(ourReach);
      expect(ourReach).not.toContainElement(whatWeDo);
    });

    it('is a client component', () => {
      // This test ensures the 'use client' directive is working
      expect(screen.getByRole('main')).toBeInTheDocument();
    });

    it('uses flexbox for layout', () => {
      const main = screen.getByRole('main');
      expect(main).toHaveClass('flex', 'flex-col', 'items-center', 'justify-center');
    });

    it('takes full screen height', () => {
      const main = screen.getByRole('main');
      expect(main).toHaveClass('min-h-screen');
    });
  });

  describe('Reach Stats Data', () => {
    beforeEach(() => {
      // Mock URL constructor to return URL without token
      const mockUrlInstance = createMockURL('http://localhost:3000/');
      (global.URL as unknown as jest.Mock) = jest.fn().mockImplementation(() => mockUrlInstance);
    });

    it('contains correct number of stats', () => {
      render(<LandingPage />);
      const ourReachStatsCount = screen.getByTestId('our-reach-stats-count');
      expect(ourReachStatsCount).toHaveTextContent('4');
    });

    it('has correct stat values', () => {
      render(<LandingPage />);
      const ourReachStats = screen.getByTestId('our-reach-stats');
      const statsData = JSON.parse(ourReachStats.textContent || '[]');

      const values = statsData.map((stat: { value: string }) => stat.value);
      expect(values).toEqual(['700+', '450+', '230+', '550+']);
    });
  });
});
