import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import SuccessModal from '@/app/contact/SuccessModal';

jest.mock('@/components/Button', () => {
  return function Button(props: React.ComponentProps<'button'>) {
    const { children, className, onClick } = props;
    return (
      <button className={className} onClick={onClick}>
        {children}
      </button>
    );
  };
});

describe('SuccessModal', () => {
  const mockOnClose = jest.fn();

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('does not render when isOpen is false', () => {
    render(<SuccessModal isOpen={false} onClose={mockOnClose} />);
    expect(screen.queryByText(/thanks for reaching out/i)).not.toBeInTheDocument();
  });

  it('renders when isOpen is true', () => {
    render(<SuccessModal isOpen={true} onClose={mockOnClose} />);
    expect(screen.getByText(/thanks for reaching out/i)).toBeInTheDocument();
  });

  it('displays success message', () => {
    render(<SuccessModal isOpen={true} onClose={mockOnClose} />);
    expect(screen.getByText(/your message has been sent successfully/i)).toBeInTheDocument();
  });

  it('calls onClose when Done button is clicked', async () => {
    const user = userEvent.setup();
    render(<SuccessModal isOpen={true} onClose={mockOnClose} />);

    const doneButton = screen.getByRole('button', { name: /done/i });
    await user.click(doneButton);

    expect(mockOnClose).toHaveBeenCalledTimes(1);
  });

  it('calls onClose when backdrop is clicked', () => {
    const { container } = render(<SuccessModal isOpen={true} onClose={mockOnClose} />);

    const backdrop = container.querySelector('.bg-black\\/40');
    fireEvent.click(backdrop as Element);

    expect(mockOnClose).toHaveBeenCalledTimes(1);
  });

  it('has proper modal structure', () => {
    const { container } = render(<SuccessModal isOpen={true} onClose={mockOnClose} />);

    expect(container.querySelector('.fixed.inset-0')).toBeInTheDocument();
    expect(container.querySelector('.bg-white.rounded-2xl')).toBeInTheDocument();
  });

  it('renders Done button', () => {
    render(<SuccessModal isOpen={true} onClose={mockOnClose} />);
    expect(screen.getByRole('button', { name: /done/i })).toBeInTheDocument();
  });
});
