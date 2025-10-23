/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import { render, screen } from '@testing-library/react';
import WhoWeAre from '@/app/landing-page/WhoWeAre';
import '@testing-library/jest-dom';

// Mock assets

jest.mock('@/assets/whoweare1.svg', () => 'whoweare1.svg');
jest.mock('@/assets/whoweare2.svg', () => 'whoweare2.svg');
jest.mock('@/assets/tsk-icon-logo.svg', () => 'logo.svg');
jest.mock('@/assets/inclusivity.svg', () => 'inclusivity.svg');
jest.mock('@/assets/community.svg', () => 'community.svg');
jest.mock('@/assets/growth.svg', () => 'growth.svg');
jest.mock('@/assets/empowerment.svg', () => 'empowerment.svg');

jest.mock('next/image', () => {
  const NextImage = (props: any) => {
    const { fill: _fill, ...imgProps } = props;
    return <img {...imgProps} alt={props.alt ?? 'mocked image'} />;
  };
  NextImage.displayName = 'NextImageMock';
  return {
    __esModule: true,
    default: NextImage,
  };
});

describe('WhoWeAre Component', () => {
  beforeEach(() => {
    render(<WhoWeAre />);
  });

  it('renders the section heading', () => {
    expect(screen.getByRole('heading', { name: /who we are/i })).toBeInTheDocument();
  });

  it('renders the mission section', () => {
    expect(screen.getByRole('heading', { name: /our mission/i })).toBeInTheDocument();
    expect(screen.getByText(/to create a supportive and inclusive community/i)).toBeInTheDocument();
  });

  it('renders the vision section', () => {
    expect(screen.getByRole('heading', { name: /our vision/i })).toBeInTheDocument();
    expect(screen.getByText(/a kenya where women are empowered to excel/i)).toBeInTheDocument();
  });

  it('renders core values section with all labels', () => {
    const coreValueLabels = ['Inclusivity', 'Community', 'Growth', 'Empowerment'];
    coreValueLabels.forEach((label) => {
      expect(screen.getByText(label)).toBeInTheDocument();
    });
  });

  it('renders images with correct alt text', () => {
    expect(screen.getByAltText(/image/i)).toBeInTheDocument();
    expect(screen.getByAltText(/group photo/i)).toBeInTheDocument();
    expect(screen.getByAltText(/logo/i)).toBeInTheDocument();
  });
});
