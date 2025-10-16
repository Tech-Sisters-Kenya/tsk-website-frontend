// __TeamMember.test.tsx
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import TeamMember from '@/app/meet-the-team/TeamMember';

// Mock Images
jest.mock('next/image', () => {
  return function MockedImage(props: React.ComponentProps<'img'>) {
    return <img {...props} alt={props.alt || 'mocked-image'} />;
  };
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
  it('applies selected background when isSelected is true', () => {
    render(<TeamMember {...defaultProps} isSelected />);
    const card = screen.getByTestId('team-member');
    expect(card.querySelector('.bg-tsk-light-2')).toBeInTheDocument();
  });

  it('does not call onClick when not a founder', () => {
    const handleClick = jest.fn();
    render(<TeamMember {...defaultProps} onClick={handleClick} />);
    fireEvent.click(screen.getByTestId('team-member'));
    expect(handleClick).not.toHaveBeenCalled();
  });

  it('calls onClick when founder and clicked', () => {
    const handleClick = jest.fn();
    render(<TeamMember {...defaultProps} isFounder onClick={handleClick} />);
    fireEvent.click(screen.getByTestId('team-member'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});
