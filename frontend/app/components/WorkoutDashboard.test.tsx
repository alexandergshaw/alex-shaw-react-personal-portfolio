import { render, screen } from '@testing-library/react'
import { WorkoutDashboard } from './WorkoutDashboard'

describe('WorkoutDashboard - No Workouts Message', () => {
  /**
   * RED PHASE TEST 1
   * Acceptance Criteria: Given I have no workouts logged, when I open the dashboard,
   * I will see a message that says "no workouts logged".
   */
  it('should display "no workouts logged" message when workouts array is empty', () => {
    render(<WorkoutDashboard workouts={[]} />)
    
    const message = screen.getByText(/no workouts logged/i)
    expect(message).toBeInTheDocument()
  })

  /**
   * RED PHASE TEST 2
   * Acceptance Criteria: Given when I see the message, I also see a prompt to add
   * my first workout.
   */
  it('should display a prompt to add first workout when no workouts exist', () => {
    render(<WorkoutDashboard workouts={[]} />)
    
    const prompt = screen.getByText(/add your first workout/i)
    expect(prompt).toBeInTheDocument()
  })

  /**
   * RED PHASE TEST 3
   * Acceptance Criteria: Given I have added a workout, the no workout logged
   * message disappears.
   */
  it('should not display "no workouts logged" message when workouts exist', () => {
    const mockWorkouts = [
      {
        id: '1',
        name: 'Morning Run',
        duration: 30,
        date: new Date(),
      },
    ]
    
    render(<WorkoutDashboard workouts={mockWorkouts} />)
    
    const message = screen.queryByText(/no workouts logged/i)
    expect(message).not.toBeInTheDocument()
  })

  /**
   * BONUS TEST
   * Ensure the prompt is also hidden when workouts exist
   */
  it('should not display the add prompt when workouts exist', () => {
    const mockWorkouts = [
      {
        id: '1',
        name: 'Morning Run',
        duration: 30,
        date: new Date(),
      },
    ]
    
    render(<WorkoutDashboard workouts={mockWorkouts} />)
    
    const prompt = screen.queryByText(/add your first workout/i)
    expect(prompt).not.toBeInTheDocument()
  })
})
