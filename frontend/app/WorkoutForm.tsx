"use client"; // This tells Next.js that this is a client-side component

import { useState } from 'react';
import {
  Box,
  Button,
  Card,
  CardContent,
  Container,
  TextField,
  Typography,
  Alert,
  Stack,
} from '@mui/material';

interface WorkoutEntry {
  name: string;
  duration: string;
}

interface FormErrors {
  name?: string;
  duration?: string;
}

export default function WorkoutForm() {
  const [formData, setFormData] = useState<WorkoutEntry>({
    name: '',
    duration: '',
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [successMessage, setSuccessMessage] = useState('');

  // Handle input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
    // Clear error for this field when user starts typing
    if (errors[name as keyof FormErrors]) {
      setErrors(prev => ({
        ...prev,
        [name]: undefined,
      }));
    }
  };

  // Validate form
  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    // Validate workout name
    if (!formData.name.trim()) {
      newErrors.name = 'Workout name is required';
    }

    // Validate duration
    if (!formData.duration.trim()) {
      newErrors.duration = 'Duration is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle form submission (save)
  const handleSave = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSuccessMessage('');

    // Validate form
    if (!validateForm()) {
      return;
    }

    // If validation passes, save the workout
    console.log('Saving workout:', formData);
    
    // Clear form
    setFormData({
      name: '',
      duration: '',
    });

    // Show success message
    setSuccessMessage('Workout saved successfully!');
    
    // Clear success message after 3 seconds
    setTimeout(() => {
      setSuccessMessage('');
    }, 3000);
  };

  return (
    <Container maxWidth="sm" sx={{ py: 8 }}>
      <Card sx={{ boxShadow: 3 }}>
        <CardContent sx={{ p: 4 }}>
          <Typography variant="h4" component="h1" gutterBottom sx={{ mb: 3, fontWeight: 'bold' }}>
            Add Workout
          </Typography>

          <Stack spacing={3}>
            {/* Success message */}
            {successMessage && (
              <Alert severity="success">{successMessage}</Alert>
            )}

            {/* Form */}
            <form onSubmit={handleSave}>
              <Stack spacing={3}>
                {/* Workout Name Field */}
                <TextField
                  fullWidth
                  label="Workout Name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  error={!!errors.name}
                  helperText={errors.name}
                  placeholder="e.g., Morning Run"
                  variant="outlined"
                />

                {/* Duration Field */}
                <TextField
                  fullWidth
                  label="Duration (minutes)"
                  name="duration"
                  type="number"
                  value={formData.duration}
                  onChange={handleInputChange}
                  error={!!errors.duration}
                  helperText={errors.duration}
                  placeholder="e.g., 30"
                  variant="outlined"
                />

                {/* Save Button */}
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  size="large"
                  sx={{ mt: 2 }}
                >
                  Save Workout
                </Button>
              </Stack>
            </form>
          </Stack>
        </CardContent>
      </Card>
    </Container>
  );
}
