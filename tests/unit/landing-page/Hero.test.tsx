/* eslint-disable react/display-name */

import React from 'react';
import { render, screen } from '@testing-library/react';
import Hero from '@/app/landing-page/Hero';
import '@testing-library/jest-dom';

// Mock next/link for testing
jest.mock('next/link', () => {
  return ({ children, href }: { children: React.ReactNode; href: string }) => (
    <a href={href} data-testid="next-link">
      {children}
    </a>
  );
});

describe('Hero', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    render(<Hero />);
  });

  it('renders heading and paragraph', () => {
    expect(
      screen.getByRole('heading', { name: /elevating women in technology/i })
    ).toBeInTheDocument();

    expect(
      screen.getByText(/Tech Sisters Kenya is a non-profit organization/i)
    ).toBeInTheDocument();
  });

  it('renders heading with correct level', () => {
    const heading = screen.getByRole('heading', {
      name: /elevating women in technology/i,
    });
    expect(heading.tagName).toBe('H1');
  });

  it('renders both CTA buttons with correct text', () => {
    expect(screen.getByRole('button', { name: /Join Our Community/i })).toBeInTheDocument();

    expect(screen.getByRole('button', { name: /Partner With Us/i })).toBeInTheDocument();
  });

  it('buttons link to correct routes', () => {
    const joinButton = screen.getByRole('button', { name: /Join Our Community/i }).closest('a');

    const partnerButton = screen.getByRole('button', { name: /Partner With Us/i }).closest('a');

    expect(joinButton).toHaveAttribute('href', '/get-involved');
    expect(partnerButton).toHaveAttribute('href', '/get-involved');
  });

  it('matches snapshot', () => {
    const { asFragment } = render(<Hero />);
    expect(asFragment()).toMatchSnapshot();
  });
});
