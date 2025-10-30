/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import { render, screen } from '@testing-library/react';
import Hero from '@/app/landing-page/Hero';
import '@testing-library/jest-dom';

// Mock next/link
jest.mock('next/link', () => {
  const MockedLink = ({ children, href }: any) => <a href={href}>{children}</a>;
  MockedLink.displayName = 'MockedLink';
  return MockedLink;
});

jest.mock('@/app/landing-page/AnimatedShapes', () => {
  const MockAnimatedShapes = () => <div data-testid="animated-shapes" />;
  MockAnimatedShapes.displayName = 'MockAnimatedShapes';
  return MockAnimatedShapes;
});

describe('Hero Component', () => {
  beforeEach(() => {
    render(<Hero />);
  });

  it('renders the main heading', () => {
    expect(
      screen.getByRole('heading', { name: /elevating women in technology/i })
    ).toBeInTheDocument();
  });

  it('renders the descriptive paragraph', () => {
    expect(
      screen.getByText(/Tech Sisters Kenya is a community empowering women in tech/i)
    ).toBeInTheDocument();
  });

  it('renders Become A Tech Sister button', () => {
    expect(screen.getByRole('button', { name: /become a tech sister!/i })).toBeInTheDocument();
  });

  it('renders Get Involved button', () => {
    expect(screen.getByRole('button', { name: /get involved/i })).toBeInTheDocument();
  });

  it('renders correct link for Become A Tech Sister button', () => {
    const link = screen.getByRole('link', { name: /become a tech sister!/i });
    expect(link).toHaveAttribute('href', '/join-our-community');
  });

  it('renders correct link for Get Involved button', () => {
    const link = screen.getByRole('link', { name: /get involved/i });
    expect(link).toHaveAttribute('href', '/get-involved');
  });

  it('renders the AnimatedShapes component', () => {
    expect(screen.getByTestId('animated-shapes')).toBeInTheDocument();
  });
});
