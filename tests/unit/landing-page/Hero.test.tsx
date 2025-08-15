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
      screen.getByText(/Tech Sisters Kenya is a non-profit organization/i)
    ).toBeInTheDocument();
  });

  it('renders Join Our Community button', () => {
    expect(screen.getByRole('button', { name: /join our community/i })).toBeInTheDocument();
  });

  it('renders Partner With Us button', () => {
    expect(screen.getByRole('button', { name: /partner with us/i })).toBeInTheDocument();
  });

  it('renders the AnimatedShapes component', () => {
    expect(screen.getByTestId('animated-shapes')).toBeInTheDocument();
  });
});
