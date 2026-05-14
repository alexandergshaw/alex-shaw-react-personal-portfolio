'use client'

import { FormEvent, useState, ReactNode } from 'react'

export interface WorkoutFormData {
  name: string
  duration: number
}

interface WorkoutFormProps {
  onSubmit: (data: WorkoutFormData) => void
  onCancel?: () => void
}

interface ValidationErrors {
  name?: string
  duration?: string
}

/**
 * FormField Component
 * 
 * Reusable form input with label and error display.
 */
function FormField({
  id,
  label,
  type = 'text',
  value,
  onChange,
  placeholder,
  error,
  onBlur,
}: {
  id: string
  label: string
  type?: string
  value: string
  onChange: (value: string) => void
  placeholder?: string
  error?: string
  onBlur?: () => void
}): ReactNode {
  return (
    <div>
      <label
        htmlFor={id}
        className="block text-sm font-medium text-gray-700 mb-1"
      >
        {label}
      </label>
      <input
        id={id}
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onBlur={onBlur}
        placeholder={placeholder}
        className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 transition-colors ${
          error
            ? 'border-red-500 focus:ring-red-500 focus:border-red-500'
            : 'border-gray-300'
        }`}
        aria-invalid={!!error}
        aria-describedby={error ? `${id}-error` : undefined}
      />
      {error && (
        <p id={`${id}-error`} className="mt-1 text-sm text-red-600 font-medium">
          {error}
        </p>
      )}
    </div>
  )
}

/**
 * Validation utilities
 */
const validators = {
  name: (value: string): string | undefined => {
    if (!value.trim()) {
      return 'Workout name is required'
    }
    return undefined
  },

  duration: (value: string): string | undefined => {
    if (!value) {
      return 'Duration is required'
    }
    const num = Number(value)
    if (isNaN(num) || num <= 0) {
      return 'Duration must be a positive number'
    }
    return undefined
  },
}

/**
 * WorkoutForm Component
 * 
 * Validates workout form input and prevents saving incomplete entries.
 * Provides real-time feedback by clearing errors as user types.
 * 
 * REFACTOR PHASE - Production-ready implementation
 */
export function WorkoutForm({
  onSubmit,
  onCancel,
}: WorkoutFormProps): ReactNode {
  const [name, setName] = useState('')
  const [duration, setDuration] = useState('')
  const [errors, setErrors] = useState<ValidationErrors>({})
  const [touched, setTouched] = useState<Record<string, boolean>>({})

  /**
   * Validate all form fields
   */
  const validateForm = (): ValidationErrors => {
    const newErrors: ValidationErrors = {}

    const nameError = validators.name(name)
    if (nameError) newErrors.name = nameError

    const durationError = validators.duration(duration)
    if (durationError) newErrors.duration = durationError

    return newErrors
  }

  /**
   * Handle form submission
   */
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const newErrors = validateForm()
    setErrors(newErrors)
    setTouched({ name: true, duration: true })

    // Only submit if no errors
    if (Object.keys(newErrors).length === 0) {
      onSubmit({
        name: name.trim(),
        duration: Number(duration),
      })

      // Clear form after successful submission
      setName('')
      setDuration('')
      setErrors({})
      setTouched({})
    }
  }

  /**
   * Handle name input change with validation
   */
  const handleNameChange = (value: string) => {
    setName(value)

    // Only validate if field has been touched
    if (touched.name && value.trim()) {
      const error = validators.name(value)
      setErrors((prev) => ({ ...prev, name: error }))
    }
  }

  /**
   * Handle duration input change with validation
   */
  const handleDurationChange = (value: string) => {
    setDuration(value)

    // Only validate if field has been touched
    if (touched.duration && value) {
      const error = validators.duration(value)
      setErrors((prev) => ({ ...prev, duration: error }))
    }
  }

  /**
   * Handle field blur to mark as touched
   */
  const handleBlur = (field: string) => {
    setTouched((prev) => ({ ...prev, [field]: true }))
    const newErrors = validateForm()
    setErrors(newErrors)
  }

  /**
   * Reset form to initial state
   */
  const handleReset = () => {
    setName('')
    setDuration('')
    setErrors({})
    setTouched({})
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5 max-w-md">
      <FormField
        id="name"
        label="Workout Name"
        value={name}
        onChange={handleNameChange}
        placeholder="e.g., Morning Run"
        error={errors.name}
        onBlur={() => handleBlur('name')}
      />

      <FormField
        id="duration"
        label="Duration (minutes)"
        type="number"
        value={duration}
        onChange={handleDurationChange}
        placeholder="e.g., 30"
        error={errors.duration}
        onBlur={() => handleBlur('duration')}
      />

      {/* Action Buttons */}
      <div className="flex gap-3 pt-2">
        <button
          type="submit"
          className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-md transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Save Workout
        </button>

        {onCancel && (
          <button
            type="button"
            onClick={onCancel}
            className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold py-2 px-4 rounded-md transition-colors duration-200"
          >
            Cancel
          </button>
        )}

        <button
          type="button"
          onClick={handleReset}
          className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold py-2 px-4 rounded-md transition-colors duration-200 border border-gray-300"
          title="Clear form fields"
        >
          Clear
        </button>
      </div>

      {/* Form state indicator */}
      {Object.keys(errors).length > 0 && (
        <div className="p-3 bg-red-50 border border-red-200 rounded-md">
          <p className="text-sm text-red-700 font-medium">
            Please fix {Object.keys(errors).length} error
            {Object.keys(errors).length > 1 ? 's' : ''}
          </p>
        </div>
      )}
    </form>
  )
}
