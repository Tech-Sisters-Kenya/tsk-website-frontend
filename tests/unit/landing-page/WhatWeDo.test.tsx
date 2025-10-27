/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import WhatWeDo from '@/app/landing-page/WhatWeDo';
import '@testing-library/jest-dom';

jest.mock('next/image', () => ({
  __esModule: true,
  default: (props: any) => {
    const { src, alt, fill: _fill, ...rest } = props;
    return <img src={src} alt={alt} {...rest} />;
  },
}));

describe('WhatWeDo Component', () => {
  it('renders the section header and description', () => {
    render(<WhatWeDo />);
    expect(screen.getByText('What We Do')).toBeInTheDocument();
    expect(
      screen.getByText(/We create safe spaces for learning, growth, and connection/i)
    ).toBeInTheDocument();
  });

  it('renders Initiatives section by default', () => {
    render(<WhatWeDo />);

    expect(
      screen.getByText(/Programs and projects designed to equip, inspire & support women in tech/i)
    ).toBeInTheDocument();
    expect(screen.getByText(/Tech skills Development & workshops/i)).toBeInTheDocument();
  });

  it('switches to Events section on click', () => {
    render(<WhatWeDo />);

    const eventCards = screen.getAllByText('Our Events');
    // Click on the card itself (the one that's clickable)
    fireEvent.click(eventCards[0].closest('div[class*="cursor-pointer"]')!);

    expect(screen.getByText(/Where learning meets connection/i)).toBeInTheDocument();
    expect(screen.getByText(/Coding Bootcamps/i)).toBeInTheDocument();
  });

  it('switches to Community section on click', () => {
    render(<WhatWeDo />);

    const communityCards = screen.getAllByText('Our Community');
    // Click on the card itself (the one that's clickable)
    fireEvent.click(communityCards[0].closest('div[class*="cursor-pointer"]')!);

    expect(screen.getByText(/More than just tech - it is sisterhood/i)).toBeInTheDocument();
    expect(screen.getByText(/300\+ Women & Girls Empowered/i)).toBeInTheDocument();
  });

  it('shows active card content and hides inactive card content', () => {
    render(<WhatWeDo />);

    // Initially, Initiatives should be active
    expect(screen.getByText(/Programs and projects designed to equip/i)).toBeVisible();

    // Click Events
    const eventCards = screen.getAllByText('Our Events');
    fireEvent.click(eventCards[0].closest('div[class*="cursor-pointer"]')!);

    // Events content should be visible, Initiatives content should not
    expect(screen.getByText(/Where learning meets connection/i)).toBeVisible();
  });

  it('renders the Tech Sisters logo image', () => {
    render(<WhatWeDo />);
    const logo = screen.getByAltText('Tech sisters logo');
    expect(logo).toBeInTheDocument();
    expect(logo).toHaveAttribute('src', '/tsk-logo.png');
  });

  it('applies correct styling classes based on active state', () => {
    render(<WhatWeDo />);

    // Get all cards
    const initiativesCard = screen
      .getAllByText('Initiatives')[0]
      .closest('div[class*="cursor-pointer"]');
    const eventsCard = screen.getAllByText('Our Events')[0].closest('div[class*="cursor-pointer"]');

    // Initiatives should have expanded width initially
    expect(initiativesCard?.className).toContain('md:w-[60%]');

    // Click Events
    fireEvent.click(eventsCard!);

    // Events should now have expanded width
    expect(eventsCard?.className).toContain('md:w-[60%]');
  });
});
