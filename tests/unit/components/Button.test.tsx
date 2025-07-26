import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import Button from '@/components/Button';

// Mock clsx since it's used in the component
jest.mock('clsx', () => ({
  __esModule: true,
  default: (
    ...args: Array<
      string | undefined | null | boolean | { [key: string]: boolean | undefined | null }
    >
  ) => args.filter(Boolean).join(' '),
}));

describe('Button Component', () => {
  it('renders with default primary variant', () => {
    render(<Button>Click me</Button>);

    const button = screen.getByRole('button', { name: /click me/i });
    expect(button).toBeInTheDocument();
    expect(button).toHaveClass('px-8', 'py-2', 'border', 'border-1', 'rounded-2xl');
  });

  it('renders with primary variant when explicitly specified', () => {
    render(<Button variant="primary">Primary Button</Button>);

    const button = screen.getByRole('button', { name: /primary button/i });
    expect(button).toBeInTheDocument();
    expect(button).toHaveClass('bg-tsk-primary-dark', 'text-tsk-light-1', 'font-bold');
  });

  it('renders with secondary variant', () => {
    render(<Button variant="secondary">Secondary Button</Button>);

    const button = screen.getByRole('button', { name: /secondary button/i });
    expect(button).toBeInTheDocument();
    expect(button).toHaveClass('bg-tsk-light-2', 'text-tsk-primary-dark', 'font-bold');
  });

  it('applies custom className alongside default styles', () => {
    render(<Button className="custom-class">Custom Button</Button>);

    const button = screen.getByRole('button', { name: /custom button/i });
    expect(button).toHaveClass('custom-class');
    expect(button).toHaveClass('px-8', 'py-2'); // Should still have base styles
  });

  it('handles click events', () => {
    const handleClick = jest.fn();
    render(<Button onClick={handleClick}>Clickable Button</Button>);

    const button = screen.getByRole('button', { name: /clickable button/i });
    fireEvent.click(button);

    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('passes through HTML button attributes', () => {
    render(
      <Button disabled type="submit" data-testid="test-button" aria-label="Test button">
        Button with attributes
      </Button>
    );

    const button = screen.getByTestId('test-button');
    expect(button).toBeDisabled();
    expect(button).toHaveAttribute('type', 'submit');
    expect(button).toHaveAttribute('aria-label', 'Test button');
  });

  it('handles undefined variant gracefully (defaults to primary)', () => {
    render(<Button variant={undefined}>Undefined Variant</Button>);

    const button = screen.getByRole('button', { name: /undefined variant/i });
    expect(button).toHaveClass('bg-tsk-primary-dark', 'text-tsk-light-1');
  });

  it('accepts and renders children correctly', () => {
    render(
      <Button>
        <span>Complex</span> <strong>Children</strong>
      </Button>
    );

    expect(screen.getByText('Complex')).toBeInTheDocument();
    expect(screen.getByText('Children')).toBeInTheDocument();
  });

  it('maintains button semantics and accessibility', () => {
    render(<Button>Accessible Button</Button>);

    const button = screen.getByRole('button');
    expect(button.tagName).toBe('BUTTON');
    expect(button).toBeVisible();
  });

  // Test TypeScript types by ensuring the component accepts correct props
  it('accepts all valid ButtonHTMLAttributes', () => {
    const TestComponent = () => (
      <Button
        id="test-id"
        name="test-name"
        value="test-value"
        autoFocus
        form="test-form"
        formAction="/test"
        formMethod="post"
        formNoValidate
        formTarget="_blank"
        onBlur={() => {}}
        onFocus={() => {}}
        onMouseEnter={() => {}}
        onMouseLeave={() => {}}
      >
        Full Props Button
      </Button>
    );

    render(<TestComponent />);
    const button = screen.getByRole('button', { name: /full props button/i });
    expect(button).toBeInTheDocument();
  });
});
