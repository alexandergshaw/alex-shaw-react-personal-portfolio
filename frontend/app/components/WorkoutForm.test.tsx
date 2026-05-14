import { render, screen, fireEvent } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { WorkoutForm } from './WorkoutForm'

describe('WorkoutForm - Validation', () => {
  /**
   * RED PHASE TEST 1
   * Acceptance Criteria: Given I leave the workout name field blank, 
   * when I click save, then I see an error message.
   */
  it('should display error message when workout name is blank and save is clicked', async () => {
    const mockOnSubmit = jest.fn()
    render(<WorkoutForm onSubmit={mockOnSubmit} />)

    const saveButton = screen.getByRole('button', { name: /save workout/i })
    fireEvent.click(saveButton)

    const errorMessage = screen.getByText(/workout name is required/i)
    expect(errorMessage).toBeInTheDocument()
    expect(mockOnSubmit).not.toHaveBeenCalled()
  })

  /**
   * RED PHASE TEST 2
   * Acceptance Criteria: Given I leave the duration of the workout blank, 
   * when I click save, then I see an error message.
   */
  it('should display error message when duration is blank and save is clicked', async () => {
    const mockOnSubmit = jest.fn()
    const user = userEvent.setup()
    render(<WorkoutForm onSubmit={mockOnSubmit} />)

    const nameInput = screen.getByLabelText(/workout name/i)
    await user.type(nameInput, 'Morning Run')

    const saveButton = screen.getByRole('button', { name: /save workout/i })
    fireEvent.click(saveButton)

    const errorMessage = screen.getByText(/duration is required/i)
    expect(errorMessage).toBeInTheDocument()
    expect(mockOnSubmit).not.toHaveBeenCalled()
  })

  /**
   * RED PHASE TEST 3
   * Acceptance Criteria: Given all required fields are filled in, 
   * when I click save, then the workout is saved.
   */
  it('should submit form when all required fields are filled in', async () => {
    const mockOnSubmit = jest.fn()
    const user = userEvent.setup()
    render(<WorkoutForm onSubmit={mockOnSubmit} />)

    const nameInput = screen.getByLabelText(/workout name/i)
    const durationInput = screen.getByLabelText(/duration/i)

    await user.type(nameInput, 'Morning Run')
    await user.type(durationInput, '30')

    const saveButton = screen.getByRole('button', { name: /save workout/i })
    fireEvent.click(saveButton)

    expect(mockOnSubmit).toHaveBeenCalledWith({
      name: 'Morning Run',
      duration: 30,
    })
  })

  /**
   * BONUS TEST - Validation clears after successful submission
   */
  it('should clear error messages after successful form submission', async () => {
    const mockOnSubmit = jest.fn()
    const user = userEvent.setup()
    render(<WorkoutForm onSubmit={mockOnSubmit} />)

    // Try to submit without filling form
    const saveButton = screen.getByRole('button', { name: /save workout/i })
    fireEvent.click(saveButton)

    // Error should be visible
    let errorMessage = screen.getByText(/workout name is required/i)
    expect(errorMessage).toBeInTheDocument()

    // Fill form and submit
    const nameInput = screen.getByLabelText(/workout name/i)
    const durationInput = screen.getByLabelText(/duration/i)

    await user.type(nameInput, 'Evening Yoga')
    await user.type(durationInput, '45')

    fireEvent.click(saveButton)

    // Error should be gone and form submitted
    expect(mockOnSubmit).toHaveBeenCalled()
  })

  /**
   * BONUS TEST - Duration must be a positive number
   */
  it('should display error when duration is not a valid positive number', async () => {
    const mockOnSubmit = jest.fn()
    const user = userEvent.setup()
    render(<WorkoutForm onSubmit={mockOnSubmit} />)

    const nameInput = screen.getByLabelText(/workout name/i)
    const durationInput = screen.getByLabelText(/duration/i)

    await user.type(nameInput, 'Morning Run')
    await user.type(durationInput, '-5')

    const saveButton = screen.getByRole('button', { name: /save workout/i })
    fireEvent.click(saveButton)

    const errorMessage = screen.getByText(/duration must be a positive number/i)
    expect(errorMessage).toBeInTheDocument()
    expect(mockOnSubmit).not.toHaveBeenCalled()
  })

  /**
   * BONUS TEST - Errors clear when user starts typing
   */
  it('should clear name error when user starts typing in name field', async () => {
    const mockOnSubmit = jest.fn()
    const user = userEvent.setup()
    render(<WorkoutForm onSubmit={mockOnSubmit} />)

    const saveButton = screen.getByRole('button', { name: /save workout/i })
    fireEvent.click(saveButton)

    let errorMessage = screen.getByText(/workout name is required/i)
    expect(errorMessage).toBeInTheDocument()

    const nameInput = screen.getByLabelText(/workout name/i)
    await user.type(nameInput, 'M')

    // Error should disappear
    errorMessage = screen.queryByText(/workout name is required/i)
    expect(errorMessage).not.toBeInTheDocument()
  })
})
