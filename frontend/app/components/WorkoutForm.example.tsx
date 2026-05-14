import { WorkoutForm } from '@/app/components/WorkoutForm'
import { useState } from 'react'

/**
 * Example 1: Basic Form Usage
 * Simple form with submit callback
 */
export function BasicWorkoutFormExample() {
  const handleSubmit = (data: { name: string; duration: number }) => {
    console.log('Workout saved:', data)
    // Call API to save workout
  }

  return (
    <div className="p-4 max-w-md">
      <h2 className="text-xl font-bold mb-4">Add Workout</h2>
      <WorkoutForm onSubmit={handleSubmit} />
    </div>
  )
}

/**
 * Example 2: Form with Cancel Button
 * Form with optional cancel callback
 */
export function WorkoutFormWithCancel() {
  const [isOpen, setIsOpen] = useState(true)

  const handleSubmit = (data: { name: string; duration: number }) => {
    console.log('Workout saved:', data)
    setIsOpen(false)
  }

  const handleCancel = () => {
    console.log('Form cancelled')
    setIsOpen(false)
  }

  if (!isOpen) {
    return <button onClick={() => setIsOpen(true)}>Add Workout</button>
  }

  return (
    <div className="p-4 max-w-md border rounded-lg">
      <h2 className="text-xl font-bold mb-4">Add Workout</h2>
      <WorkoutForm onSubmit={handleSubmit} onCancel={handleCancel} />
    </div>
  )
}

/**
 * Example 3: Form with State Management
 * Demonstrates managing multiple workouts with the form
 */
export function WorkoutListExample() {
  const [workouts, setWorkouts] = useState<
    { id: string; name: string; duration: number }[]
  >([])
  const [showForm, setShowForm] = useState(false)

  const handleSubmit = (data: { name: string; duration: number }) => {
    const newWorkout = {
      id: Date.now().toString(),
      ...data,
    }
    setWorkouts([...workouts, newWorkout])
    setShowForm(false)
  }

  return (
    <div className="p-4 max-w-md">
      <h2 className="text-xl font-bold mb-4">My Workouts</h2>

      {workouts.length === 0 ? (
        <p className="text-gray-600 mb-4">No workouts yet. Add one to get started!</p>
      ) : (
        <div className="mb-4 space-y-2">
          {workouts.map((workout) => (
            <div key={workout.id} className="p-3 bg-blue-50 rounded-lg">
              <p className="font-semibold">{workout.name}</p>
              <p className="text-sm text-gray-600">{workout.duration} minutes</p>
            </div>
          ))}
        </div>
      )}

      {showForm ? (
        <WorkoutForm
          onSubmit={handleSubmit}
          onCancel={() => setShowForm(false)}
        />
      ) : (
        <button
          onClick={() => setShowForm(true)}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-md"
        >
          Add Workout
        </button>
      )}
    </div>
  )
}
