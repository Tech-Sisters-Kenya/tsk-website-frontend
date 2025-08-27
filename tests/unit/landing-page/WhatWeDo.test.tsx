/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import WhatWeDo from '@/app/landing-page/WhatWeDo';
import '@testing-library/jest-dom';

jest.mock('next/image', () => ({
  __esModule: true,
  default: (props: any) => {
    const { src, alt, ...rest } = props;
    return <img src={src} alt={alt} {...rest} />;
  },
}));

describe('WhatWeDo Component', () => {
  it('renders the section header and description', () => {
    render(<WhatWeDo />);
    expect(screen.getByText('WHAT WE DO')).toBeInTheDocument();
    expect(screen.getByText(/At Tech Sisters, we elevate women/i)).toBeInTheDocument();
  });

  it('renders Initiatives section by default', async () => {
    render(<WhatWeDo />);

    const item = await screen.findByText(/Tech skills Development/i);
    expect(item).toBeInTheDocument();
  });

  it('switches to Events section on click', async () => {
    render(<WhatWeDo />);

    const eventTitles = screen.getAllByText('Our Events');
    fireEvent.click(eventTitles[0]);

    const listItem = await screen.findByText(/Coding Bootcamps/i);
    expect(listItem).toBeInTheDocument();
  });

  it('switches to Community section on click', async () => {
    render(<WhatWeDo />);

    const communityTitles = screen.getAllByText('Our Community');
    fireEvent.click(communityTitles[0]);

    const listItem = await screen.findByText(/300\+ Women & Girls Empowered/i);
    expect(listItem).toBeInTheDocument();
  });

  it('renders the Tech Sisters logo image', () => {
    render(<WhatWeDo />);
    const logo = screen.getByAltText('Tech sisters logo');
    expect(logo).toBeInTheDocument();
    expect(logo).toHaveAttribute('src', '/tsk-logo.png');
  });
});
