import React from 'react';
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import MeetTheTeam from '@/app/meet-the-team/page';

global.fetch = jest.fn();

const mockTeamMembers = [
  { id: '2', user: 'Grace', role: 'Developer', image_url: '/.grace.svg' },
  { id: '3', user: 'Imali', role: 'Designer', image_url: '/.imali.svg' },
];
describe('MeetTheTeam Page', () => {
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
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: false,
    });

    render(<MeetTheTeam />);
    await waitFor(() => screen.getByTestId('meet-the-team-page'));

    // render page but no team members
    expect(screen.getByTestId('team-section')).toBeInTheDocument();
    expect(screen.queryByText('Grace')).not.toBeInTheDocument();
  });
});
