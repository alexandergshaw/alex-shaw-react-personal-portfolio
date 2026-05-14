import { WorkoutDashboard } from '@/app/components/WorkoutDashboard'

/**
 * Example usage of the WorkoutDashboard component
 * 
 * This demonstrates how to use the WorkoutDashboard component
 * with and without workouts.
 */

export function DashboardExample() {
  // Example with no workouts - displays empty state
  return <WorkoutDashboard workouts={[]} />
}

export function DashboardWithWorkouts() {
  // Example with workouts - displays the list
  const sampleWorkouts = [
    {
      id: '1',
      name: 'Morning Run',
      duration: 30,
      date: new Date('2024-05-13'),
    },
    {
      id: '2',
      name: 'Weight Lifting',
      duration: 45,
      date: new Date('2024-05-13'),
    },
  ]

  const handleAddWorkout = () => {
    console.log('Add workout clicked')
    // Navigate to add workout form or open modal
  }

  return (
    <WorkoutDashboard
      workouts={sampleWorkouts}
      onAddWorkout={handleAddWorkout}
    />
  )
}
