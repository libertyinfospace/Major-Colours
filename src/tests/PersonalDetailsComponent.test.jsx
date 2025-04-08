import React from 'react'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import PersonalDetailsComponent from '../components/PersonalDetailsComponent'

describe('PersonalDetailsComponent', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders the form with correct initial state', () => {
    render(<PersonalDetailsComponent />);
    
    // Check heading
    expect(screen.getByText('PERSONAL DETAILS')).toBeInTheDocument();
    
    // Check form elements
    expect(screen.getByPlaceholderText('Email')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Password')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Full Name')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Phone Number')).toBeInTheDocument();
    
    // Check radio buttons (gender)
    const genderInputs = screen.getAllByRole('radio');
    expect(genderInputs).toHaveLength(2);
    expect(genderInputs[0]).toHaveAttribute('value', 'male');
    expect(genderInputs[1]).toHaveAttribute('value', 'female');
    expect(genderInputs[0].checked).toBe(true); // Male should be checked by default
    expect(genderInputs[1].checked).toBe(false);
    
    // Check checkboxes
    const receiveNewsCheckbox = screen.getByLabelText(/I Wish To Receive Major Colours News/i);
    const privacyCheckbox = screen.getByLabelText(/I Accept The Privacy Statement/i);
    expect(receiveNewsCheckbox).toBeInTheDocument();
    expect(privacyCheckbox).toBeInTheDocument();
    expect(receiveNewsCheckbox.checked).toBe(false);
    expect(privacyCheckbox.checked).toBe(false);
    
    // Check submit button
    expect(screen.getByRole('button', { name: /Submit/i })).toBeInTheDocument();
  });

  it('shows validation errors when submitting empty form', async () => {
    render(<PersonalDetailsComponent />);
    
    // Submit the form without filling fields
    fireEvent.click(screen.getByRole('button', { name: /Submit/i }));
    
    // Check for error messages
    await waitFor(() => {
      expect(screen.getByText('Email is required')).toBeInTheDocument();
      expect(screen.getByText('Password is required')).toBeInTheDocument();
      expect(screen.getByText('Full name is required')).toBeInTheDocument();
      expect(screen.getByText('Phone number is required')).toBeInTheDocument();
      expect(screen.getByText('You must accept the privacy statement')).toBeInTheDocument();
    });
  });

  it('validates email format correctly', async () => {
    render(<PersonalDetailsComponent />);
    
    // Enter invalid email
    fireEvent.change(screen.getByPlaceholderText('Email'), {
      target: { value: 'invalid-email' }
    });
    
    // Submit form
    fireEvent.click(screen.getByRole('button', { name: /Submit/i }));
    
    // Check for email format error
    await waitFor(() => {
      expect(screen.getByText('Please enter a valid email address')).toBeInTheDocument();
    });
    
    // Correct the email
    fireEvent.change(screen.getByPlaceholderText('Email'), {
      target: { value: 'valid@email.com' }
    });
    
    // Error should disappear
    await waitFor(() => {
      expect(screen.queryByText('Please enter a valid email address')).not.toBeInTheDocument();
    });
  });

  it('validates password length correctly', async () => {
    render(<PersonalDetailsComponent />);
    
    // Enter short password
    fireEvent.change(screen.getByPlaceholderText('Password'), {
      target: { value: 'short' }
    });
    
    // Submit form
    fireEvent.click(screen.getByRole('button', { name: /Submit/i }));
    
    // Check for password length error
    await waitFor(() => {
      expect(screen.getByText('Password must be at least 8 characters')).toBeInTheDocument();
    });
    
    // Enter valid password
    fireEvent.change(screen.getByPlaceholderText('Password'), {
      target: { value: 'validpassword123' }
    });
    
    // Error should disappear
    await waitFor(() => {
      expect(screen.queryByText('Password must be at least 8 characters')).not.toBeInTheDocument();
    });
  });

  it('only allows numbers in phone number field and validates length correctly', async () => {
    render(<PersonalDetailsComponent />);
    
    // Try entering letters (should be filtered out)
    fireEvent.change(screen.getByPlaceholderText('Phone Number'), {
      target: { value: '123abc456' }
    });
    
    // Check that only numbers were stored
    expect(screen.getByPlaceholderText('Phone Number').value).toBe('123456');
    
    // Enter short phone number (less than 10 digits)
    fireEvent.change(screen.getByPlaceholderText('Phone Number'), {
      target: { value: '12345' }
    });
    
    // Submit form
    fireEvent.click(screen.getByRole('button', { name: /Submit/i }));
    
    // Check for phone number length error
    await waitFor(() => {
      expect(screen.getByText('Please enter a valid 10-digit phone number')).toBeInTheDocument();
    });
    
    // Enter valid 10-digit phone number
    fireEvent.change(screen.getByPlaceholderText('Phone Number'), {
      target: { value: '1234567890' }
    });
    
    // Error should disappear
    await waitFor(() => {
      expect(screen.queryByText('Please enter a valid 10-digit phone number')).not.toBeInTheDocument();
    });
    
    // Try entering more than 10 digits (should be limited to 10)
    fireEvent.change(screen.getByPlaceholderText('Phone Number'), {
      target: { value: '12345678901234' }
    });
    
    // Check that it's still limited to 10 digits due to maxLength
    expect(screen.getByPlaceholderText('Phone Number').value.length).toBe(10);
  });

  it('allows toggling checkboxes and radio buttons', () => {
    render(<PersonalDetailsComponent />);
    
    // Get form elements
    const maleRadio = screen.getByLabelText('Male');
    const femaleRadio = screen.getByLabelText('Female');
    const receiveNewsCheckbox = screen.getByLabelText(/I Wish To Receive Major Colours News/i);
    const privacyCheckbox = screen.getByLabelText(/I Accept The Privacy Statement/i);
    
    // Toggle radio button
    fireEvent.click(femaleRadio);
    expect(femaleRadio.checked).toBe(true);
    expect(maleRadio.checked).toBe(false);
    
    // Toggle back
    fireEvent.click(maleRadio);
    expect(maleRadio.checked).toBe(true);
    expect(femaleRadio.checked).toBe(false);
    
    // Toggle checkboxes
    fireEvent.click(receiveNewsCheckbox);
    fireEvent.click(privacyCheckbox);
    expect(receiveNewsCheckbox.checked).toBe(true);
    expect(privacyCheckbox.checked).toBe(true);
    
    // Toggle back
    fireEvent.click(receiveNewsCheckbox);
    expect(receiveNewsCheckbox.checked).toBe(false);
    expect(privacyCheckbox.checked).toBe(true);
  });

  it('shows success message when valid form is submitted', async () => {
    // Mock console.log
    const consoleSpy = vi.spyOn(console, 'log');
    
    render(<PersonalDetailsComponent />);
    
    // Fill in form with valid data
    fireEvent.change(screen.getByPlaceholderText('Email'), {
      target: { value: 'test@example.com' }
    });
    
    fireEvent.change(screen.getByPlaceholderText('Password'), {
      target: { value: 'password123' }
    });
    
    fireEvent.change(screen.getByPlaceholderText('Full Name'), {
      target: { value: 'John Doe' }
    });
    
    fireEvent.change(screen.getByPlaceholderText('Phone Number'), {
      target: { value: '1234567890' }
    });
    
    // Accept privacy
    fireEvent.click(screen.getByLabelText(/I Accept The Privacy Statement/i));
    
    // Submit form
    fireEvent.click(screen.getByRole('button', { name: /Submit/i }));
    
    // Check for submission and success message
    await waitFor(() => {
      expect(screen.getByText('Form submitted successfully!')).toBeInTheDocument();
      expect(consoleSpy).toHaveBeenCalledWith(
        'Form submitted:',
        expect.objectContaining({
          email: 'test@example.com',
          password: 'password123',
          fullName: 'John Doe',
          phoneNumber: '1234567890',
          acceptPrivacy: true
        })
      );
    });
  });
}); 