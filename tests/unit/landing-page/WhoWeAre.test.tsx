import React from 'react';
import { render, screen } from '@testing-library/react';
import WhoWeAre from '@/app/landing-page/WhoWeAre';
import '@testing-library/jest-dom';

// Mock next/image
jest.mock('next/image', () => ({
  __esModule: true,
  default: ({ src, alt }: { src: string; alt?: string }) => (
    <img src={typeof src === 'string' ? src : 'mocked.svg'} alt={alt || 'image'} />
  ),
}));

// Mock SVG assets
jest.mock('@/assets/whoweare1.svg', () => 'whoweare1.svg');
jest.mock('@/assets/whoweare2.svg', () => 'whoweare2.svg');
jest.mock('@/assets/tsk-icon-logo.svg', () => 'logo.svg');
jest.mock('@/assets/inclusivity.svg', () => 'inclusivity.svg');
jest.mock('@/assets/community.svg', () => 'community.svg');
jest.mock('@/assets/growth.svg', () => 'growth.svg');
jest.mock('@/assets/empowerment.svg', () => 'empowerment.svg');

// Mock BrandsSection if it exists as a subcomponent
jest.mock('../landing-page/WhoWeAre.test.tsx', () => {
  const MockBrandsSection = () => <div data-testid="brands-section">Mocked BrandsSection</div>;
  return MockBrandsSection;
});

describe('WhoWeAre Component', () => {
  beforeEach(() => {
    render(<WhoWeAre />);
  });

  it('renders the main heading', () => {
    expect(screen.getByRole('heading', { name: /who we are/i })).toBeInTheDocument();
  });

  it('renders mission and vision labels', () => {
    expect(screen.getByText(/our mission/i)).toBeInTheDocument();
    expect(screen.getByText(/our vision/i)).toBeInTheDocument();
  });

  it('renders mission text content', () => {
    expect(screen.getByText(/To create a supportive and inclusive community/i)).toBeInTheDocument();
  });

  it('renders vision text content', () => {
    expect(screen.getByText(/A Kenya where women are empowered/i)).toBeInTheDocument();
  });

  it('renders all core values', () => {
    expect(screen.getByText(/Inclusivity/i)).toBeInTheDocument();
    expect(screen.getByText(/Community/i)).toBeInTheDocument();
    expect(screen.getByText(/Growth/i)).toBeInTheDocument();
    expect(screen.getByText(/Empowerment/i)).toBeInTheDocument();
  });

  it('renders the BrandsSection subcomponent', () => {
    expect(screen.getByTestId('brands-section')).toBeInTheDocument();
  });

  it('renders at least 3 images', () => {
    const images = screen.getAllByRole('img');
    expect(images.length).toBeGreaterThanOrEqual(3);
  });
});
