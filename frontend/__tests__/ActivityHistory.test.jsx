import React from 'react';
import { render, screen } from '@testing-library/react';
import ActivityHistory from '../components/ActivityHistory';

describe('ActivityHistory Component', () => {
  it('should render the heading', () => {
    render(<ActivityHistory activities={[]} />);
    expect(screen.getByText('Activity History')).toBeInTheDocument();
  });

  it('should render activity items with date and steps', () => {
    const activities = [
      { date: '2024-01-01', steps: 5000 },
      { date: '2024-01-02', steps: 8000 },
    ];
    render(<ActivityHistory activities={activities} />);
    
    expect(screen.getByText('2024-01-01 - 5000 steps')).toBeInTheDocument();
    expect(screen.getByText('2024-01-02 - 8000 steps')).toBeInTheDocument();
  });

  it('should render message when no activities provided', () => {
    render(<ActivityHistory activities={[]} />);
    expect(screen.getByText('No activity recorded yet.')).toBeInTheDocument();
  });

  it('should render ul element', () => {
    render(<ActivityHistory activities={[]} />);
    expect(screen.getByRole('list')).toBeInTheDocument();
  });
});
