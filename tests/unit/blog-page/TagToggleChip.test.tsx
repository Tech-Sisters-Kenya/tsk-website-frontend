import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import TagToggleChip from '@/app/blogs/TagToggleChip';

describe('TagToggleChip Component Test', () => {
  it('should toggle on correctly', () => {
    const handleToggle = jest.fn();

    // simulate toggle on
    render(<TagToggleChip label="She Builds" selected={false} onToggle={handleToggle} />);
    const button = screen.getByRole('button', { name: /she builds/i });

    fireEvent.click(button);
    expect(handleToggle).toHaveBeenCalledWith(true);
  });

  it('should toggle off correctly', () => {
    const handleToggle = jest.fn();

    // simulate toggle off
    render(<TagToggleChip label="She Builds" selected={true} onToggle={handleToggle} />);

    const button = screen.getByRole('button', { name: /she builds/i });

    fireEvent.click(button);
    expect(handleToggle).toHaveBeenCalledWith(false);
  });

  it('should apply selected styles when selected', () => {
    const handleToggle = jest.fn();

    render(<TagToggleChip label="She Builds" selected={true} onToggle={handleToggle} />);

    const button = screen.getByRole('button', { name: /she builds/i });

    expect(button).toHaveClass('bg-tsk-primary-dark');
  });
});
