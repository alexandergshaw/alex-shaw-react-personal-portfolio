import { render, screen, fireEvent } from '@testing-library/react'
import { useState } from 'react'
import { WorkoutDashboard, Workout } from './WorkoutDashboard'

/**
 * INTEGRATION TEST
 * 
 * This test demonstrates the full user workflow:
 * 1. User sees no workouts message
 * 2. User clicks "Add your first workout"
 * 3. User adds a workout
 * 4. The no workouts message disappears
 * 5. User sees the workout listed
 */

// Mock parent component that manages workout state
function WorkoutDashboardWithAddButton() {
  const [workouts, setWorkouts] = useState<Workout[]>([])

  const handleAddWorkout = () => {
    // Simulate adding a workout
    const newWorkout: Workout = {
      id: '1',
      name: 'Test Workout',
      duration: 30,
      date: new Date(),
    }
    setWorkouts([...workouts, newWorkout])
  }

  return (
    <div>
      <WorkoutDashboard
        workouts={workouts}
        onAddWorkout={handleAddWorkout}
      />
    </div>
  )
}

describe('WorkoutDashboard - Integration Test', () => {
  it('should display empty state initially, then workout after adding', async () => {
    render(<WorkoutDashboardWithAddButton />)

    // Step 1: Verify empty state is shown
    expect(screen.getByText(/no workouts logged/i)).toBeInTheDocument()
    
    // Verify the button with the add prompt is present
    const addButton = screen.getByRole('button', {
      name: /add your first workout/i,
    })
    expect(addButton).toBeInTheDocument()

    // Step 2: Simulate user clicking the add button
    fireEvent.click(addButton)

    // Step 3: Verify the empty state is gone
    expect(screen.queryByText(/no workouts logged/i)).not.toBeInTheDocument()

    // Step 4: Verify the workout is displayed
    expect(screen.getByText(/test workout/i)).toBeInTheDocument()
  })

  it('should handle multiple workouts correctly', async () => {
    render(<WorkoutDashboardWithAddButton />)

    // Add first workout
    let addButton = screen.getByRole('button', {
      name: /add your first workout/i,
    })
    fireEvent.click(addButton)

    expect(screen.getByText(/test workout/i)).toBeInTheDocument()

    // Empty state should not be shown
    expect(screen.queryByText(/no workouts logged/i)).not.toBeInTheDocument()
  })
})
