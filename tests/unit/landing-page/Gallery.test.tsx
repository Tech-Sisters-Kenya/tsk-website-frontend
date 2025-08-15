/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import { render, screen } from '@testing-library/react';
import Gallery from '@/app/landing-page/Gallery';
import '@testing-library/jest-dom';

jest.mock('next/image', () => ({
  __esModule: true,
  default: (props: any) => {
    const { alt = '', ...rest } = props;
    return <img alt={alt} {...rest} />;
  },
}));

describe('Gallery Component', () => {
  it('renders the gallery heading and description', () => {
    render(<Gallery />);
    expect(screen.getByText('Gallery')).toBeInTheDocument();
    expect(screen.getByText(/Every picture tells a story/i)).toBeInTheDocument();
  });

  it('renders all gallery images with correct alt texts', () => {
    const altTexts = [
      'Gallery data edition photo',
      'Software workshop session photo',
      'Mental health & market day edition photo',
    ];

    render(<Gallery />);
    altTexts.forEach((alt) => {
      const image = screen.getByAltText(alt);
      expect(image).toBeInTheDocument();
    });
  });

  it('renders all edition buttons with correct text', () => {
    const buttonLabels = ['Data Edition', 'Software Edition', 'Mental health & Market Day'];

    render(<Gallery />);
    buttonLabels.forEach((label) => {
      expect(screen.getByText(label)).toBeInTheDocument();
    });
  });

  it('has a "View More" button that links to Instagram', () => {
    render(<Gallery />);
    const viewMoreLink = screen.getByRole('link', { name: /View More/i });
    expect(viewMoreLink).toBeInTheDocument();
    expect(viewMoreLink).toHaveAttribute('href', 'http://www.instagram.com/techsisterskenya');
  });
});
