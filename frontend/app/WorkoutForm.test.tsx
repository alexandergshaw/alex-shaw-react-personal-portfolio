import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import WorkoutForm from '@/app/WorkoutForm';
import { ThemeProvider, createTheme } from '@mui/material';

// Wrap component with theme provider for testing
const renderWithTheme = (component: React.ReactElement) => {
  const theme = createTheme();
  return render(
    <ThemeProvider theme={theme}>
      {component}
    </ThemeProvider>
  );
};

describe('WorkoutForm Validation', () => {
  describe('Acceptance Criteria 1: Empty workout name shows error', () => {
    it('should display error message when leaving workout name blank and clicking save', () => {
      renderWithTheme(<WorkoutForm />);
      
      // Fill in duration but leave name blank
      const durationInput = screen.getByLabelText(/Duration/i);
      fireEvent.change(durationInput, { target: { value: '30' } });
      
      // Click save button
      const saveButton = screen.getByRole('button', { name: /Save Workout/i });
      fireEvent.click(saveButton);
      
      // Check for error message
      expect(screen.getByText('Workout name is required')).toBeInTheDocument();
    });
  });

  describe('Acceptance Criteria 2: Empty duration shows error', () => {
    it('should display error message when leaving duration blank and clicking save', () => {
      renderWithTheme(<WorkoutForm />);
      
      // Fill in name but leave duration blank
      const nameInput = screen.getByLabelText(/Workout Name/i);
      fireEvent.change(nameInput, { target: { value: 'Morning Run' } });
      
      // Click save button
      const saveButton = screen.getByRole('button', { name: /Save Workout/i });
      fireEvent.click(saveButton);
      
      // Check for error message
      expect(screen.getByText('Duration is required')).toBeInTheDocument();
    });
  });

  describe('Acceptance Criteria 3: Form saves when all required fields are filled', () => {
    it('should save the workout when both name and duration are provided', () => {
      renderWithTheme(<WorkoutForm />);
      
      // Fill in both fields
      const nameInput = screen.getByLabelText(/Workout Name/i);
      const durationInput = screen.getByLabelText(/Duration/i);
      
      fireEvent.change(nameInput, { target: { value: 'Morning Run' } });
      fireEvent.change(durationInput, { target: { value: '30' } });
      
      // Click save button
      const saveButton = screen.getByRole('button', { name: /Save Workout/i });
      fireEvent.click(saveButton);
      
      // Check that success message is displayed
      expect(screen.getByText('Workout saved successfully!')).toBeInTheDocument();
      
      // Form should be cleared after saving
      expect(nameInput).toHaveValue('');
      expect(durationInput).toHaveValue('');
    });
  });

  describe('Additional validation scenarios', () => {
    it('should display both errors when both fields are empty', () => {
      renderWithTheme(<WorkoutForm />);
      
      // Click save without filling any fields
      const saveButton = screen.getByRole('button', { name: /Save Workout/i });
      fireEvent.click(saveButton);
      
      // Check for both error messages
      expect(screen.getByText('Workout name is required')).toBeInTheDocument();
      expect(screen.getByText('Duration is required')).toBeInTheDocument();
    });

    it('should clear error messages when user starts typing', async () => {
      const user = userEvent.setup();
      renderWithTheme(<WorkoutForm />);
      
      // Fill in duration but leave name blank, then save to trigger error
      const durationInput = screen.getByLabelText(/Duration/i);
      await user.type(durationInput, '30');
      
      const saveButton = screen.getByRole('button', { name: /Save Workout/i });
      await user.click(saveButton);
      
      // Error should be visible
      expect(screen.getByText('Workout name is required')).toBeInTheDocument();
      
      // Start typing in name field
      const nameInput = screen.getByLabelText(/Workout Name/i);
      await user.type(nameInput, 'Morning Run');
      
      // Error should be cleared
      expect(screen.queryByText('Workout name is required')).not.toBeInTheDocument();
    });
  });
});
