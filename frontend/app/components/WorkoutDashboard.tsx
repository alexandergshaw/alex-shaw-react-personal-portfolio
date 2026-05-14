'use client'

import { ReactNode } from 'react'

export interface Workout {
  id: string
  name: string
  duration: number
  date: Date
}

interface WorkoutDashboardProps {
  workouts: Workout[]
  onAddWorkout?: () => void
}

/**
 * EmptyStateCard Component
 * 
 * Displays an empty state with a message and optional call-to-action.
 * Extracted for better component reusability and testability.
 */
function EmptyStateCard({ onAddWorkout }: { onAddWorkout?: () => void }) {
  return (
    <div className="flex flex-col items-center justify-center py-12 px-4">
      <div className="text-center max-w-md">
        {/* Icon */}
        <div className="mb-6 text-5xl">🏋️</div>

        {/* Main Message */}
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          No workouts logged
        </h2>

        {/* Prompt */}
        <p className="text-gray-600 text-base mb-6 leading-relaxed">
          Add your first workout to get started on your fitness journey!
        </p>

        {/* Optional Call-to-Action Button */}
        {onAddWorkout && (
          <button
            onClick={onAddWorkout}
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-lg transition-colors duration-200"
            aria-label="Add your first workout"
          >
            Add Your First Workout
          </button>
        )}
      </div>
    </div>
  )
}

/**
 * WorkoutCard Component
 * 
 * Displays individual workout information in a card format.
 */
function WorkoutCard({ workout }: { workout: Workout }) {
  return (
    <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow duration-200">
      <h3 className="text-lg font-semibold text-gray-900 mb-2">
        {workout.name}
      </h3>
      <div className="flex items-center gap-6 text-gray-600">
        <span className="flex items-center gap-2">
          <span className="text-xl">⏱️</span>
          {workout.duration} minutes
        </span>
        <span className="flex items-center gap-2">
          <span className="text-xl">📅</span>
          {workout.date.toLocaleDateString(undefined, {
            weekday: 'short',
            year: 'numeric',
            month: 'short',
            day: 'numeric',
          })}
        </span>
      </div>
    </div>
  )
}

/**
 * WorkoutDashboard Component
 * 
 * Displays a dashboard showing logged workouts.
 * When no workouts exist, shows an empty state with a message and prompt to add the first workout.
 * 
 * REFACTOR PHASE - Production-ready implementation with improved UX and maintainability
 */
export function WorkoutDashboard({
  workouts,
  onAddWorkout,
}: WorkoutDashboardProps): ReactNode {
  const hasWorkouts = workouts.length > 0

  if (!hasWorkouts) {
    return <EmptyStateCard onAddWorkout={onAddWorkout} />
  }

  return (
    <div className="space-y-4">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Your Workouts</h2>
        <p className="text-gray-600 mt-1">
          You have logged {workouts.length} workout{workouts.length !== 1 ? 's' : ''}
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {workouts.map((workout) => (
          <WorkoutCard key={workout.id} workout={workout} />
        ))}
      </div>
    </div>
  )
}
