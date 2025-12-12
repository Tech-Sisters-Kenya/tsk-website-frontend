/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import EmailSignupModal from '@/components/EmailSignupModal';

jest.mock('next/image', () => ({
  __esModule: true,
  default: (props: any) => {
    const { src, alt, ...rest } = props;
    return <img {...rest} src={src} alt={alt} />;
  },
}));
// Mock the SVG imports
jest.mock('@/assets/tsk-icon-logo.svg', () => '/mock-logo.svg');
jest.mock('@/assets/user.svg', () => '/mock-user.svg');
jest.mock('@/assets/useremail.svg', () => '/mock-email.svg');

// eslint-disable-next-line react/display-name
jest.mock(
  '@/components/EmailVerificationModal',
  () =>
    ({ fullName, email, isOpen, onClose }: any) => {
      if (!isOpen) return null;
      return (
        <div data-testid="email-verification-modal">
          <span>
            Verify Email for {fullName} ({email})
          </span>
          <button onClick={onClose}>Close Verification</button>
        </div>
      );
    }
);

describe('EmailSignupModal', () => {
  const mockOnClose = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should not render when isOpen is false', () => {
    render(<EmailSignupModal isOpen={false} onClose={mockOnClose} />);
    expect(screen.queryByText('Sign up with Email')).not.toBeInTheDocument();
  });

  it('should render when isOpen is true', () => {
    render(<EmailSignupModal isOpen={true} onClose={mockOnClose} />);
    expect(screen.getByText('Sign up with Email')).toBeInTheDocument();
    expect(screen.getByAltText('Logo')).toBeInTheDocument();
    expect(screen.getByText('Close')).toBeInTheDocument();
  });

  it('should call onClose when close button is clicked', () => {
    render(<EmailSignupModal isOpen={true} onClose={mockOnClose} />);
    const closeButton = screen.getByText('Close').closest('button')!;
    fireEvent.click(closeButton);
    expect(mockOnClose).toHaveBeenCalledTimes(1);
  });

  it('should show alert if fields are empty on submit', () => {
    render(<EmailSignupModal isOpen={true} onClose={mockOnClose} />);
    window.alert = jest.fn();
    const createButton = screen.getByText('Create Account');
    fireEvent.click(createButton);
    expect(window.alert).toHaveBeenCalledWith('Please fill in all fields');
  });

  it('should show alert if email is invalid', () => {
    render(<EmailSignupModal isOpen={true} onClose={mockOnClose} />);
    window.alert = jest.fn();
    fireEvent.change(screen.getByPlaceholderText('Enter your full name'), {
      target: { value: 'John Doe' },
    });
    fireEvent.change(screen.getByPlaceholderText('Enter your email'), {
      target: { value: 'invalidemail' },
    });
    fireEvent.click(screen.getByText('Create Account'));
    expect(window.alert).toHaveBeenCalledWith('Please enter a valid email');
  });

  it('should open EmailVerificationModal on valid submission', async () => {
    render(<EmailSignupModal isOpen={true} onClose={mockOnClose} />);
    fireEvent.change(screen.getByPlaceholderText('Enter your full name'), {
      target: { value: 'John Doe' },
    });
    fireEvent.change(screen.getByPlaceholderText('Enter your email'), {
      target: { value: 'john@example.com' },
    });
    fireEvent.click(screen.getByText('Create Account'));

    await waitFor(() => {
      expect(screen.getByTestId('email-verification-modal')).toBeInTheDocument();
      expect(screen.getByText(/Verify Email for John Doe/)).toBeInTheDocument();
    });
  });

  it('should close EmailVerificationModal when its close button is clicked', async () => {
    render(<EmailSignupModal isOpen={true} onClose={mockOnClose} />);
    fireEvent.change(screen.getByPlaceholderText('Enter your full name'), {
      target: { value: 'John Doe' },
    });
    fireEvent.change(screen.getByPlaceholderText('Enter your email'), {
      target: { value: 'john@example.com' },
    });
    fireEvent.click(screen.getByText('Create Account'));

    const closeVerificationButton = await screen.findByText('Close Verification');
    fireEvent.click(closeVerificationButton);

    await waitFor(() => {
      expect(screen.queryByTestId('email-verification-modal')).not.toBeInTheDocument();
    });
  });

  it('should render footer links', () => {
    render(<EmailSignupModal isOpen={true} onClose={mockOnClose} />);
    expect(screen.getByText('Already have an account?')).toBeInTheDocument();
    expect(screen.getByText('Log in')).toHaveAttribute('href', '/login');
    expect(screen.getByText('Terms and Conditions')).toBeInTheDocument();
    expect(screen.getByText('Privacy Policy')).toBeInTheDocument();
  });
});
