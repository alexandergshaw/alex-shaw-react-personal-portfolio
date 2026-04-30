"use client";

export interface Workout {
  id: string;
  name: string;
  date: string;
}

interface DashboardProps {
  workouts: Workout[];
  onAddWorkout: () => void;
}

export default function Dashboard({ workouts, onAddWorkout }: DashboardProps) {
  const hasWorkouts = workouts.length > 0;

  return (
    <div data-testid="dashboard">
      {hasWorkouts ? (
        <div>
          <p>You have {workouts.length} workout{workouts.length === 1 ? '' : 's'} logged.</p>
        </div>
      ) : (
        <div>
          <p>No workouts logged yet.</p>
          <p>Start by adding your first workout.</p>
          <button type="button" onClick={onAddWorkout}>
            Add your first workout
          </button>
        </div>
      )}
    </div>
  );
}
