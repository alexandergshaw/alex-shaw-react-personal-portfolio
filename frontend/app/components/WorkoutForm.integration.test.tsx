import { render, screen, fireEvent } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { useState } from 'react'
import { WorkoutForm, WorkoutFormData } from './WorkoutForm'

/**
 * INTEGRATION TEST
 * 
 * This test demonstrates the full user workflow:
 * 1. User submits invalid form (empty fields)
 * 2. User sees validation errors
 * 3. User fills form correctly
 * 4. Form submits successfully
 * 5. Form is cleared for next entry
 */

function WorkoutFormWithState() {
  const [workouts, setWorkouts] = useState<WorkoutFormData[]>([])
  const [isFormVisible, setIsFormVisible] = useState(true)

  const handleSubmit = (data: WorkoutFormData) => {
    setWorkouts([...workouts, data])
  }

  return (
    <div className="space-y-4">
      {isFormVisible && (
        <WorkoutForm
          onSubmit={handleSubmit}
          onCancel={() => setIsFormVisible(false)}
        />
      )}

      {workouts.length > 0 && (
        <div className="space-y-2">
          <h3 className="font-bold">Saved Workouts:</h3>
          {workouts.map((w, i) => (
            <div key={i} className="p-2 bg-green-100 rounded">
              {w.name} - {w.duration} min
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

describe('WorkoutForm - Integration Tests', () => {
  it('should handle full workflow: submit invalid -> see errors -> fill valid -> submit', async () => {
    const user = userEvent.setup()
    render(<WorkoutFormWithState />)

    // Step 1: Try to submit empty form
    let saveButton = screen.getByRole('button', { name: /save workout/i })
    fireEvent.click(saveButton)

    // Step 2: Verify errors are shown
    expect(screen.getByText(/workout name is required/i)).toBeInTheDocument()
    expect(screen.getByText(/duration is required/i)).toBeInTheDocument()

    // Step 3: Fill in the form
    const nameInput = screen.getByLabelText(/workout name/i)
    const durationInput = screen.getByLabelText(/duration/i)

    await user.type(nameInput, 'Evening Yoga')
    await user.type(durationInput, '45')

    // Step 4: Submit the form
    saveButton = screen.getByRole('button', { name: /save workout/i })
    fireEvent.click(saveButton)

    // Step 5: Verify successful submission
    expect(screen.getByText(/evening yoga/i)).toBeInTheDocument()
    expect(screen.getByText(/45 min/i)).toBeInTheDocument()
  })

  it('should allow clearing form with Clear button', async () => {
    const user = userEvent.setup()
    render(<WorkoutForm onSubmit={jest.fn()} />)

    const nameInput = screen.getByLabelText(/workout name/i) as HTMLInputElement
    const durationInput = screen.getByLabelText(/duration/i) as HTMLInputElement

    // Fill form
    await user.type(nameInput, 'Morning Run')
    await user.type(durationInput, '30')

    expect(nameInput.value).toBe('Morning Run')
    expect(durationInput.value).toBe('30')

    // Click Clear button
    const clearButton = screen.getByRole('button', { name: /clear/i })
    fireEvent.click(clearButton)

    // Verify form is cleared
    expect(nameInput.value).toBe('')
    expect(durationInput.value).toBe('')
  })

  it('should support optional Cancel button', async () => {
    const mockCancel = jest.fn()
    render(<WorkoutForm onSubmit={jest.fn()} onCancel={mockCancel} />)

    const cancelButton = screen.getByRole('button', { name: /cancel/i })
    fireEvent.click(cancelButton)

    expect(mockCancel).toHaveBeenCalled()
  })

  it('should show error summary when there are validation errors', async () => {
    render(<WorkoutForm onSubmit={jest.fn()} />)

    const saveButton = screen.getByRole('button', { name: /save workout/i })
    fireEvent.click(saveButton)

    // Both errors should exist
    expect(screen.getByText(/workout name is required/i)).toBeInTheDocument()
    expect(screen.getByText(/duration is required/i)).toBeInTheDocument()

    // Error summary should appear
    expect(screen.getByText(/please fix 2 errors/i)).toBeInTheDocument()
  })

  it('should provide real-time validation feedback on blur', async () => {
    const user = userEvent.setup()
    render(<WorkoutForm onSubmit={jest.fn()} />)

    const durationInput = screen.getByLabelText(/duration/i)

    // Focus and blur without entering value
    durationInput.focus()
    await user.tab()

    // Error should appear after blur
    expect(
      screen.getByText(/duration is required/i)
    ).toBeInTheDocument()
  })
})
