import React from 'react';
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import MeetTheTeam from '@/app/meet-the-team/page';
import TeamMember from '@/app/meet-the-team/TeamMember';

global.fetch = jest.fn();

// Mock Images
jest.mock('next/image', () => {
  return function MockedImage(props: React.ComponentProps<'img'> & { fill?: boolean }) {
    const { fill: _fill, ...imgProps } = props;
    return <img {...imgProps} alt={props.alt || 'mocked-image'} />;
  };
});

const mockTeamMembers = [
  { id: '2', user: 'Grace', role: 'Developer', image_url: '/.grace.svg' },
  { id: '3', user: 'Imali', role: 'Designer', image_url: '/.imali.svg' },
];

describe('MeetTheTeam Page and TeamMember Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('shows loading state initially', async () => {
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve({ data: mockTeamMembers }),
    });

    render(<MeetTheTeam />);
    expect(await screen.findByTestId('loading-state')).toBeInTheDocument();
  });

  it('renders header, founder and co-founder', async () => {
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve({ data: mockTeamMembers }),
    });

    render(<MeetTheTeam />);
    await waitFor(() => screen.getByTestId('meet-the-team-page'));

    //Header
    expect(screen.getByTestId('header-section')).toBeInTheDocument();
    expect(screen.getByText(/Meet The Team/i)).toBeInTheDocument();

    //Founder/ Co-Founder section
    expect(screen.getByTestId('founder-section')).toBeInTheDocument();
    expect(screen.getByText('Founder')).toBeInTheDocument();
    expect(screen.getByText('Co-Founder')).toBeInTheDocument();
  });

  it('opens and closes founder bio popup', async () => {
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve({ data: mockTeamMembers }),
    });

    render(<MeetTheTeam />);
    await waitFor(() => screen.getByTestId('founder-section'));

    //click founder card
    const founderCard = screen.getByText('Founder');
    fireEvent.click(founderCard);

    // Popup should open
    expect(await screen.findByTestId('founder-bio-popup')).toBeInTheDocument();

    // close popup
    fireEvent.click(screen.getByTestId('close-bio-btn'));
    await waitFor(() => expect(screen.queryByTestId('founder-bio-popup')).not.toBeInTheDocument());
  });
  it('renders API-fetched team members (excluding founders)', async () => {
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve({ data: mockTeamMembers }),
    });

    render(<MeetTheTeam />);
    const teamSection = await screen.findByTestId('team-section');

    expect(teamSection).toBeInTheDocument();
    expect(screen.getByText('Grace')).toBeInTheDocument();
    expect(screen.getByText('Imali')).toBeInTheDocument();
  });
  it('handles API failure gracefully', async () => {
    // Suppress console.error for this test
    const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => {});

    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: false,
    });

    render(<MeetTheTeam />);
    await waitFor(() => screen.getByTestId('meet-the-team-page'));

    // render page but no team members
    expect(screen.getByTestId('team-section')).toBeInTheDocument();
    expect(screen.queryByText('Grace')).not.toBeInTheDocument();

    // Restore console.error
    consoleSpy.mockRestore();
  });

  describe('TeamMember Component', () => {
    const defaultProps = {
      id: '1',
      user: 'Grace',
      role: 'Developer',
      image_url: '/test-image.svg',
    };

    it('renders team member with name and role', () => {
      render(<TeamMember {...defaultProps} />);

      expect(screen.getByTestId('team-member-user')).toHaveTextContent('Grace');
      expect(screen.getByTestId('team-member-role')).toHaveTextContent('Developer');
      expect(screen.getByRole('img')).toHaveAttribute('src', '/test-image.svg');
    });

    it('renders "unnamed" when user is null', () => {
      render(<TeamMember {...defaultProps} user={null} />);
      expect(screen.getByTestId('team-member-user')).toHaveTextContent('Unnamed');
    });

    it('renders "unnamed" when user is undefined', () => {
      render(<TeamMember {...defaultProps} user={undefined as unknown as string | null} />);
      expect(screen.getByTestId('team-member-user')).toHaveTextContent('Unnamed');
    });

    it('renders "unnamed" when user is empty string', () => {
      render(<TeamMember {...defaultProps} user="" />);
      expect(screen.getByTestId('team-member-user')).toHaveTextContent('Unnamed');
    });

    it('renders role correctly', () => {
      render(<TeamMember {...defaultProps} role="Designer" />);
      expect(screen.getByTestId('team-member-role')).toHaveTextContent('Designer');
    });

    it('renders image with correct attributes', () => {
      render(<TeamMember {...defaultProps} />);
      const image = screen.getByRole('img');
      expect(image).toHaveAttribute('src', '/test-image.svg');
      expect(image).toHaveAttribute('alt', 'Grace');
    });
  });
});
