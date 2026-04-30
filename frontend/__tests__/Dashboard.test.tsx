import { render, screen } from '@testing-library/react';
import Dashboard from '../components/Dashboard';

describe('Dashboard workout empty state', () => {
  it('shows a no workouts logged message when no workouts are logged', () => {
    render(<Dashboard workouts={[]} onAddWorkout={() => {}} />);

    expect(screen.getByText(/no workouts logged/i)).toBeInTheDocument();
  });

  it('shows a prompt to add the first workout when no workouts are logged', () => {
    render(<Dashboard workouts={[]} onAddWorkout={() => {}} />);

    expect(screen.getByText(/add your first workout/i)).toBeInTheDocument();
  });

  it('hides the no workouts logged message after a workout has been added', () => {
    render(
      <Dashboard
        workouts={[{ id: '1', name: 'Push Ups', date: '2026-04-30' }]}
        onAddWorkout={() => {}}
      />
    );

    expect(screen.queryByText(/no workouts logged/i)).not.toBeInTheDocument();
  });
});
