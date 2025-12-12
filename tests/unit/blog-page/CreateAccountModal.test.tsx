/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import SignUpModal from '@/components/EmailSignupModal';

const mockOnClose = jest.fn();

// Mock EmailSignupModal so it doesn't block initial render tests
jest.mock('@/components/EmailSignupModal', () => ({
  __esModule: true,
  default: ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) =>
    isOpen ? (
      <div data-testid="email-signup-modal">
        <button onClick={onClose}>Close</button>
      </div>
    ) : null,
}));

describe('SignUpModal', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should not render when isOpen is false', () => {
    render(<SignUpModal isOpen={false} onClose={mockOnClose} />);
    expect(screen.queryByTestId('signup-modal')).not.toBeInTheDocument();
  });

  it('should render initial modal when isOpen is true', () => {
    render(<SignUpModal isOpen={true} onClose={mockOnClose} />);
    expect(screen.getByTestId('signup-modal')).toBeInTheDocument();
    expect(screen.getByTestId('google-button')).toBeInTheDocument();
    expect(screen.getByTestId('email-button')).toBeInTheDocument();
  });

  it('should call onClose when close button is clicked', () => {
    render(<SignUpModal isOpen={true} onClose={mockOnClose} />);

    const closeButton = screen.getByTestId('close-button');
    fireEvent.click(closeButton);

    expect(mockOnClose).toHaveBeenCalledTimes(1);
  });

  it('should redirect to Google OAuth when Google button is clicked', () => {
    render(<SignUpModal isOpen={true} onClose={mockOnClose} />);

    delete (window as any).location;
    (window as any).location = { href: '' };

    const googleButton = screen.getByTestId('google-button');
    fireEvent.click(googleButton);

    expect(window.location.href).toBe('https://api.techsisterskenya.org/api/auth/google/redirect');
  });

  it('should open EmailSignupModal when email button is clicked', async () => {
    render(<SignUpModal isOpen={true} onClose={mockOnClose} />);

    const emailButton = screen.getByTestId('email-button');
    fireEvent.click(emailButton);

    await waitFor(() => {
      expect(screen.getByTestId('email-signup-modal')).toBeInTheDocument();
    });
  });

  it('should close EmailSignupModal when its close button is clicked', async () => {
    render(<SignUpModal isOpen={true} onClose={mockOnClose} />);

    const emailButton = screen.getByTestId('email-button');
    fireEvent.click(emailButton);

    const emailModalClose = await screen.findByText('Close');
    fireEvent.click(emailModalClose);

    await waitFor(() => {
      expect(screen.queryByTestId('email-signup-modal')).not.toBeInTheDocument();
    });
  });
});
