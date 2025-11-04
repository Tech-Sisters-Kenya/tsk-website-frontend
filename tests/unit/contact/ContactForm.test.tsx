import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ContactForm from '@/app/contact/ContactForm';

// Helper function to fill form with mock data
const fillFormWithMockData = async (user: ReturnType<typeof userEvent.setup>) => {
  await user.type(screen.getByLabelText(/full name/i), mockFormData.fullName);
  await user.type(screen.getByLabelText(/email address/i), mockFormData.email);
  await user.type(screen.getByLabelText(/organisation\/affiliation/i), mockFormData.organisation);
  await user.selectOptions(screen.getByLabelText(/i am contacting about/i), mockFormData.reason);
  await user.type(screen.getByLabelText(/message/i), mockFormData.message);
};

// API endpoint constant
const API_ENDPOINT = 'https://api.techsisterskenya.org/api/contact';

// Mock form data for reuse
const mockFormData = {
  fullName: 'Jane Doe',
  email: 'jane@example.com',
  organisation: 'Tech Co',
  reason: 'general inquiry',
  message: 'Test message',
};

// Mock the Button component
jest.mock('@/components/Button', () => {
  return function Button({
    children,
    className,
    disabled,
    type,
    onClick,
  }: {
    children?: React.ReactNode;
    className?: string;
    disabled?: boolean;
    type?: 'button' | 'submit' | 'reset';
    onClick?: React.MouseEventHandler<HTMLButtonElement>;
  }) {
    return (
      <button
        className={className}
        disabled={disabled}
        type={type}
        onClick={onClick}
        data-testid="submit-button"
      >
        {children}
      </button>
    );
  };
});

// Mock the SuccessModal component
jest.mock('@/app/contact/SuccessModal', () => {
  return function SuccessModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
    if (!isOpen) return null;
    return (
      <div data-testid="success-modal">
        <button onClick={onClose} data-testid="modal-close-button">
          Close
        </button>
      </div>
    );
  };
});

describe('ContactForm', () => {
  const user = userEvent.setup();

  beforeEach(() => {
    global.fetch = jest.fn();
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  describe('Form Rendering', () => {
    it('renders all form fields with correct attributes', () => {
      render(<ContactForm />);

      // Required fields
      const requiredFields = [
        { label: /full name/i, type: 'text' },
        { label: /email address/i, type: 'email' },
        { label: /i am contacting about/i, type: 'select' },
        { label: /message/i, type: 'textarea' },
      ];

      requiredFields.forEach(({ label, type }) => {
        const element = screen.getByLabelText(label);
        expect(element).toBeInTheDocument();
        expect(element).toBeRequired();
        if (type !== 'select' && type !== 'textarea') {
          expect(element).toHaveAttribute('type', type);
        }
      });

      // Optional fields
      const orgField = screen.getByLabelText(/organisation\/affiliation/i);
      expect(orgField).toBeInTheDocument();
      expect(orgField).not.toBeRequired();

      // Submit button
      const submitButton = screen.getByTestId('submit-button');
      expect(submitButton).toBeInTheDocument();
      expect(submitButton).toHaveAttribute('type', 'submit');
    });

    it('updates form fields when user types', async () => {
      const user = userEvent.setup();
      render(<ContactForm />);

      const nameInput = screen.getByLabelText(/full name/i);
      const emailInput = screen.getByLabelText(/email address/i);
      const orgInput = screen.getByLabelText(/organisation\/affiliation/i);
      const messageInput = screen.getByLabelText(/message/i);

      await user.type(nameInput, 'Jane Doe');
      await user.type(emailInput, 'jane@example.com');
      await user.type(orgInput, 'Tech Co');
      await user.type(messageInput, 'Test message');

      expect(nameInput).toHaveValue('Jane Doe');
      expect(emailInput).toHaveValue('jane@example.com');
      expect(orgInput).toHaveValue('Tech Co');
      expect(messageInput).toHaveValue('Test message');
    });

    it('handles dropdown selection', async () => {
      const user = userEvent.setup();
      render(<ContactForm />);

      const dropdown = screen.getByLabelText(/i am contacting about/i);
      await user.selectOptions(dropdown, 'general inquiry');

      expect(dropdown).toHaveValue('general inquiry');
    });

    it('submits form successfully and shows success modal', async () => {
      const user = userEvent.setup();
      const mockResponse = { success: true };
      (global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: async () => mockResponse,
      });

      render(<ContactForm />);

      await user.type(screen.getByLabelText(/full name/i), 'Jane Doe');
      await user.type(screen.getByLabelText(/email address/i), 'jane@example.com');
      await user.type(screen.getByLabelText(/organisation\/affiliation/i), 'Tech Co');
      await user.selectOptions(screen.getByLabelText(/i am contacting about/i), 'general inquiry');
      await user.type(screen.getByLabelText(/message/i), 'Test message');

      const submitButton = screen.getByRole('button', { name: /submit/i });
      await user.click(submitButton);

      await waitFor(() => {
        expect(global.fetch).toHaveBeenCalledWith(API_ENDPOINT, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            full_name: mockFormData.fullName,
            organisation: mockFormData.organisation,
            email: mockFormData.email,
            reason: mockFormData.reason,
            message: mockFormData.message,
          }),
        });
        expect(screen.getByTestId('success-modal')).toBeInTheDocument();
      });
    });

    describe('Form Submission States', () => {
      it('displays and manages loading state correctly', async () => {
        (global.fetch as jest.Mock).mockImplementation(
          () =>
            new Promise((resolve) =>
              setTimeout(() => resolve({ ok: true, json: async () => ({}) }), 100)
            )
        );

        render(<ContactForm />);
        await fillFormWithMockData(user);

        const submitButton = screen.getByTestId('submit-button');
        await user.click(submitButton);

        expect(screen.getByText(/submitting/i)).toBeInTheDocument();
        expect(submitButton).toBeDisabled();

        await waitFor(() => {
          expect(submitButton).not.toBeDisabled();
          expect(screen.queryByText(/submitting/i)).not.toBeInTheDocument();
        });
      });

      it('handles and displays submission errors appropriately', async () => {
        const errorMessage = 'Failed to submit form';
        (global.fetch as jest.Mock).mockRejectedValueOnce(new Error(errorMessage));

        render(<ContactForm />);
        await fillFormWithMockData(user);

        await user.click(screen.getByTestId('submit-button'));

        await waitFor(() => {
          expect(screen.getByText(new RegExp(errorMessage, 'i'))).toBeInTheDocument();
        });
      });

      it('clears error message when user starts typing', async () => {
        (global.fetch as jest.Mock).mockRejectedValueOnce(new Error('Failed to submit'));

        render(<ContactForm />);
        await fillFormWithMockData(user);

        await user.click(screen.getByTestId('submit-button'));

        await waitFor(() => {
          expect(screen.getByText(/failed to submit/i)).toBeInTheDocument();
        });

        await user.type(screen.getByLabelText(/full name/i), ' Updated');
        expect(screen.queryByText(/failed to submit/i)).not.toBeInTheDocument();
      });
    });

    describe('Form Reset and Success Modal', () => {
      it('resets form after successful submission and modal close', async () => {
        (global.fetch as jest.Mock).mockResolvedValueOnce({
          ok: true,
          json: async () => ({}),
        });

        render(<ContactForm />);
        await fillFormWithMockData(user);

        await user.click(screen.getByTestId('submit-button'));

        await waitFor(() => {
          expect(screen.getByTestId('success-modal')).toBeInTheDocument();
        });

        await user.click(screen.getByTestId('modal-close-button'));

        // Verify form reset
        const formFields = [
          screen.getByLabelText(/full name/i),
          screen.getByLabelText(/email address/i),
          screen.getByLabelText(/organisation\/affiliation/i),
          screen.getByLabelText(/i am contacting about/i),
          screen.getByLabelText(/message/i),
        ] as HTMLInputElement[];

        formFields.forEach((field) => {
          expect(field.value).toBe('');
        });
      });
    });

    describe('Form Validation', () => {
      it('validates all required fields before submission', async () => {
        render(<ContactForm />);

        // Try to submit empty form
        await user.click(screen.getByTestId('submit-button'));

        const requiredFields = [
          screen.getByLabelText(/full name/i),
          screen.getByLabelText(/email address/i),
          screen.getByLabelText(/i am contacting about/i),
          screen.getByLabelText(/message/i),
        ];

        requiredFields.forEach((field) => {
          expect(field).toBeRequired();
          expect(field).toBeInvalid();
        });

        // Organisation field should be optional
        const orgField = screen.getByLabelText(/organisation\/affiliation/i);
        expect(orgField).not.toBeRequired();
      });

      it('validates email format', async () => {
        render(<ContactForm />);
        const emailInput = screen.getByLabelText(/email address/i);

        await user.type(emailInput, 'invalid-email');
        await user.click(screen.getByTestId('submit-button'));

        expect(emailInput).toBeInvalid();

        await user.clear(emailInput);
        await user.type(emailInput, 'valid@email.com');

        expect(emailInput).toBeValid();
      });
    });
  });
});
