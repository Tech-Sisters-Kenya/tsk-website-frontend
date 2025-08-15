/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react/display-name */

import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import LandingPage from '@/app/landing-page/page';

// Mocking individual components
jest.mock('@/app/landing-page/Hero', () => () => <div data-testid="hero" />);
jest.mock('@/app/landing-page/WhoWeAre', () => () => <div data-testid="who-we-are" />);
jest.mock('@/app/landing-page/OurReach', () => () => (
  <div data-testid="our-reach">OUR REACH SO FAR</div>
));
jest.mock('@/app/landing-page/WhatWeDo', () => () => <div data-testid="what-we-do" />);
jest.mock('@/app/landing-page/Gallery', () => () => <div data-testid="gallery" />);
jest.mock('@/app/landing-page/ExploreBlogs', () => () => <div data-testid="explore-blogs" />);
jest.mock('@/app/landing-page/Testimonials', () => () => <div data-testid="testimonials" />);
jest.mock('@/components/CallToAction', () => () => <div data-testid="call-to-action" />);

// Mocking the auth store
const mockSetAuthData = jest.fn();
jest.mock('@/stores/useAuthStore', () => ({
  useAuthStore: () => ({
    setAuthData: mockSetAuthData,
  }),
}));

beforeEach(() => {
  // Simulate token in URL
  delete (window as any).location;
  window.location = new URL('http://localhost/?token=test-token') as any;

  jest.spyOn(window.history, 'replaceState').mockImplementation(() => {});

  // Mock fetch response
  global.fetch = jest.fn(() =>
    Promise.resolve({
      ok: true,
      json: () =>
        Promise.resolve({
          id: '1',
          name: 'Test User',
          email: 'test@example.com',
          role: 'member',
        }),
    })
  ) as jest.Mock;
});

afterEach(() => {
  jest.clearAllMocks();
});

describe('LandingPage', () => {
  it('renders all main sections and sets auth data from token', async () => {
    render(<LandingPage />);

    expect(screen.getByTestId('hero')).toBeInTheDocument();
    expect(screen.getByTestId('who-we-are')).toBeInTheDocument();
    expect(screen.getByTestId('our-reach')).toHaveTextContent('OUR REACH SO FAR');
    expect(screen.getByTestId('what-we-do')).toBeInTheDocument();
    expect(screen.getByTestId('gallery')).toBeInTheDocument();
    expect(screen.getByTestId('explore-blogs')).toBeInTheDocument();
    expect(screen.getByTestId('testimonials')).toBeInTheDocument();
    expect(screen.getByTestId('call-to-action')).toBeInTheDocument();

    await waitFor(() => {
      expect(mockSetAuthData).toHaveBeenCalledWith('test-token', {
        id: '1',
        name: 'Test User',
        email: 'test@example.com',
        role: 'member',
      });
    });
  });
});
