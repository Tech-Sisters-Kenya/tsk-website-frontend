import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import MissionVision from '@/app/about-us/MissionVision';

// Mock Next.js Link component

interface LinkProps {
  href: string;
  children: React.ReactNode;
  className?: string;
}

jest.mock('next/link', () => {
  return function MockLink({ href, children, className }: LinkProps) {
    return (
      <a href={href} className={className} data-testid="mock-link">
        {children}
      </a>
    );
  };
});

describe('MissionVision Component', () => {
  beforeEach(() => {
    render(<MissionVision />);
  });

  it('renders the mission section correctly', () => {
    const missionHeading = screen.getByRole('heading', { name: /our mission/i });
    expect(missionHeading).toBeInTheDocument();
    expect(missionHeading).toHaveTextContent('OUR MISSION');
  });

  it('renders the vision section correctly', () => {
    const visionHeading = screen.getByRole('heading', { name: /our vision/i });
    expect(visionHeading).toBeInTheDocument();
    expect(visionHeading).toHaveTextContent('OUR VISION');
  });

  it('renders the mission statement text', () => {
    const missionText = screen.getByText(/To create a supportive and inclusive community/);
    expect(missionText).toBeInTheDocument();
    expect(missionText).toHaveTextContent(
      'To create a supportive and inclusive community where women in tech can grow, network, and find mentorship at every career stage, while prioritizing their well-being.'
    );
  });

  it('renders the vision statement text', () => {
    const visionText = screen.getByText(/A Kenya where women are empowered to excel/);
    expect(visionText).toBeInTheDocument();
    expect(visionText).toHaveTextContent(
      'A Kenya where women are empowered to excel in technology, lead the way in innovation, and drive positive change.'
    );
  });

  it('renders the "Meet The Team" button with correct link', () => {
    const meetTeamButton = screen.getByTestId('mock-link');
    expect(meetTeamButton).toBeInTheDocument();
    expect(meetTeamButton).toHaveAttribute('href', '/meet-the-team');
    expect(meetTeamButton).toHaveTextContent('Meet The Team');
  });

  it('has correct section styling', () => {
    const section = screen.getByText('OUR MISSION').closest('section');
    expect(section).toHaveClass('w-full', 'py-16', 'px-4', 'md:py-32', 'md:px-24');
  });

  it('has correct mission card styling', () => {
    const missionCard = screen
      .getByRole('heading', { name: /our mission/i })
      .closest('.bg-tsk-light-2');
    expect(missionCard).toHaveClass(
      'bg-tsk-light-2',
      'rounded-2xl',
      'p-16',
      'flex',
      'flex-col',
      'items-center',
      'text-center',
      'flex-grow'
    );
  });

  it('has correct vision card styling', () => {
    const visionCard = screen
      .getByRole('heading', { name: /our vision/i })
      .closest('.bg-tsk-light-2');
    expect(visionCard).toHaveClass(
      'bg-tsk-light-2',
      'rounded-2xl',
      'p-16',
      'flex',
      'flex-col',
      'items-center',
      'text-center',
      'flex-grow'
    );
  });

  it('has correct heading styling for both mission and vision', () => {
    const headings = screen.getAllByRole('heading', { level: 2 });

    headings.forEach((heading) => {
      expect(heading).toHaveClass(
        'text-xl',
        'md:text-3xl',
        'font-semibold',
        'font-heading',
        'text-tsk-primary-dark',
        'mb-8'
      );
    });
  });

  it('has correct paragraph styling for both mission and vision', () => {
    const missionText = screen.getByText(/To create a supportive and inclusive community/);
    const visionText = screen.getByText(/A Kenya where women are empowered to excel/);

    [missionText, visionText].forEach((text) => {
      expect(text).toHaveClass('text-lg', 'md:text-3xl', 'text-tsk-primary-dark');
    });
  });

  it('has correct button styling', () => {
    const button = screen.getByTestId('mock-link');
    expect(button).toHaveClass(
      'bg-tsk-primary-dark',
      'text-white',
      'px-8',
      'py-5',
      'rounded-md',
      'hover:bg-tsk-primary',
      'transition-colors',
      'duration-300',
      'text-xl',
      'font-medium'
    );
  });

  it('has decorative separators', () => {
    const section = screen.getByText('OUR MISSION').closest('section');
    const decorativeBars = section?.querySelectorAll('.bg-tsk-primary-dark.rounded-full');
    expect(decorativeBars).toHaveLength(2);

    decorativeBars?.forEach((bar) => {
      expect(bar).toHaveClass('w-full', 'h-4', 'bg-tsk-primary-dark', 'rounded-full');
    });
  });

  it('has responsive layout structure', () => {
    const section = screen.getByText('OUR MISSION').closest('section');
    const flexContainer = section?.querySelector('.flex.flex-col.md\\:flex-row');
    expect(flexContainer).toHaveClass(
      'flex',
      'flex-col',
      'md:flex-row',
      'justify-between',
      'gap-12',
      'relative'
    );
  });

  it('has correct column widths', () => {
    const section = screen.getByText('OUR MISSION').closest('section');
    const columns = section?.querySelectorAll('.md\\:w-1\\/2');
    expect(columns).toHaveLength(2);

    columns?.forEach((column) => {
      expect(column).toHaveClass('md:w-1/2', 'flex', 'flex-col');
    });
  });

  it('centers the meet team button', () => {
    const buttonContainer = screen.getByTestId('mock-link').parentElement;
    expect(buttonContainer).toHaveClass('flex', 'justify-center', 'mt-16');
  });
});
