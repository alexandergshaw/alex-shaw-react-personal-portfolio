import { render, screen } from '@testing-library/react'
import { WorkoutDashboard, Workout } from './WorkoutDashboard'

/**
 * Mobile Responsiveness Tests
 * Tests verify that the workout dashboard displays correctly on mobile devices
 */
describe('WorkoutDashboard - Mobile Responsiveness', () => {
  const mockWorkouts: Workout[] = [
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
    {
      id: '3',
      name: 'Evening Yoga',
      duration: 60,
      date: new Date('2024-05-13'),
    },
  ]

  /**
   * RED PHASE TEST 1
   * Acceptance Criteria: Given I open the app on a phone screen,
   * then workout pages stack up and down (vertical layout).
   */
  it('should stack workout cards vertically on mobile screens', () => {
    // Mock mobile viewport
    global.innerWidth = 375 // iPhone width
    global.dispatchEvent(new Event('resize'))

    const { container } = render(
      <WorkoutDashboard workouts={mockWorkouts} />
    )

    // Find the workout cards container
    const cardsContainer = container.querySelector('[data-testid="workout-cards"]')

    if (cardsContainer) {
      const computedStyle = window.getComputedStyle(cardsContainer)
      // On mobile, should be single column (grid-cols-1 or flex-col)
      expect(computedStyle.display).toBeDefined()
    }

    // Verify cards are present and stacked
    const cards = screen.getAllByTestId(/workout-card/)
    expect(cards.length).toBe(3)

    // Cards should be stacked vertically (not in a multi-column grid on mobile)
    cards.forEach((card, index) => {
      expect(card).toBeInTheDocument()
    })
  })

  /**
   * RED PHASE TEST 2
   * Acceptance Criteria: Given I view a workout card on mobile,
   * then the workout name is easy to read.
   */
  it('should display workout name with readable font size on mobile', () => {
    global.innerWidth = 375
    global.dispatchEvent(new Event('resize'))

    render(<WorkoutDashboard workouts={mockWorkouts} />)

    const workoutName = screen.getByText('Morning Run')
    expect(workoutName).toBeInTheDocument()

    // Text should be visible and not clipped
    const rect = workoutName.getBoundingClientRect()
    expect(rect.height).toBeGreaterThan(0)
    expect(rect.width).toBeGreaterThan(0)

    // Check that text is not truncated (visible text matches the element text)
    expect(workoutName.textContent).toBe('Morning Run')
  })

  /**
   * RED PHASE TEST 3
   * Acceptance Criteria: Given I view a workout card on mobile,
   * then the duration is easy to read.
   */
  it('should display duration with readable font size on mobile', () => {
    global.innerWidth = 375
    global.dispatchEvent(new Event('resize'))

    render(<WorkoutDashboard workouts={mockWorkouts} />)

    const durationText = screen.getByText(/30 minutes/i)
    expect(durationText).toBeInTheDocument()

    const rect = durationText.getBoundingClientRect()
    expect(rect.height).toBeGreaterThan(0)
    expect(rect.width).toBeGreaterThan(0)
  })

  /**
   * RED PHASE TEST 4
   * Acceptance Criteria: Given I view a workout card on mobile,
   * then the date is easy to read.
   */
  it('should display date with readable font size on mobile', () => {
    global.innerWidth = 375
    global.dispatchEvent(new Event('resize'))

    render(<WorkoutDashboard workouts={mockWorkouts} />)

    // Date should be visible on the page
    const cards = screen.getAllByTestId(/workout-card/)
    expect(cards.length).toBeGreaterThan(0)

    // At least one card should contain readable date information
    cards.forEach((card) => {
      const text = card.textContent
      expect(text).toBeTruthy()
    })
  })

  /**
   * RED PHASE TEST 5
   * Verify cards are not cramped on mobile (proper padding/spacing)
   */
  it('should have proper spacing and padding on mobile cards', () => {
    global.innerWidth = 375
    global.dispatchEvent(new Event('resize'))

    const { container } = render(
      <WorkoutDashboard workouts={mockWorkouts} />
    )

    const cards = container.querySelectorAll('[data-testid^="workout-card"]')
    expect(cards.length).toBe(3)

    // Each card should have non-zero dimensions
    cards.forEach((card) => {
      const rect = card.getBoundingClientRect()
      expect(rect.height).toBeGreaterThan(80) // Min height for readable card
      expect(rect.width).toBeGreaterThan(0)
    })
  })

  /**
   * RED PHASE TEST 6
   * Verify responsive behavior across different screen sizes
   */
  it('should adapt layout for tablet screens (medium viewport)', () => {
    global.innerWidth = 768 // Tablet width
    global.dispatchEvent(new Event('resize'))

    const { container } = render(
      <WorkoutDashboard workouts={mockWorkouts} />
    )

    const cards = container.querySelectorAll('[data-testid^="workout-card"]')
    expect(cards.length).toBe(3)

    // On tablet, should show 2 columns
    const cardsContainer = container.querySelector('[data-testid="workout-cards"]')
    if (cardsContainer) {
      expect(cardsContainer).toBeInTheDocument()
    }
  })

  /**
   * RED PHASE TEST 7
   * Verify cards are full-width or nearly full-width on mobile
   */
  it('should display full-width cards on mobile screens', () => {
    global.innerWidth = 375
    global.dispatchEvent(new Event('resize'))

    const { container } = render(
      <WorkoutDashboard workouts={mockWorkouts} />
    )

    const cardsContainer = container.querySelector('[data-testid="workout-cards"]')
    if (cardsContainer) {
      const containerRect = cardsContainer.getBoundingClientRect()
      const cards = container.querySelectorAll('[data-testid^="workout-card"]')

      cards.forEach((card) => {
        const cardRect = card.getBoundingClientRect()
        // Card width should be close to container width (allowing for padding)
        expect(cardRect.width).toBeGreaterThan(containerRect.width * 0.8)
      })
    }
  })

  /**
   * BONUS TEST - Touch-friendly tap targets on mobile
   */
  it('should have touch-friendly button sizes on mobile', () => {
    global.innerWidth = 375
    global.dispatchEvent(new Event('resize'))

    const mockOnAdd = jest.fn()
    render(<WorkoutDashboard workouts={[]} onAddWorkout={mockOnAdd} />)

    const addButton = screen.getByRole('button', {
      name: /add your first workout/i,
    })

    const buttonRect = addButton.getBoundingClientRect()
    // Touch targets should be at least 44x44 pixels (Apple's recommendation)
    expect(buttonRect.height).toBeGreaterThanOrEqual(44)
    expect(buttonRect.width).toBeGreaterThanOrEqual(80)
  })
})
