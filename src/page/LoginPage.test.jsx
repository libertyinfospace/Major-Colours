import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import LoginPage from './LoginPage';

// Mock the useNavigate hook
const mockNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate,
}));

describe('LoginPage', () => {
  const renderLoginPage = () => {
    return render(
      <BrowserRouter>
        <LoginPage />
      </BrowserRouter>
    );
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders the login form correctly', () => {
    renderLoginPage();
    
    expect(screen.getByText('WELCOME BACK')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Email Or Mobile Number')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /get otp/i })).toBeInTheDocument();
  });

  it('shows error message when submitting empty form', async () => {
    renderLoginPage();
    
    const submitButton = screen.getByRole('button', { name: /get otp/i });
    fireEvent.click(submitButton);
    
    await waitFor(() => {
      expect(screen.getByText('Please enter your email or phone number')).toBeInTheDocument();
    });
  });

  it('shows error message for invalid email format', async () => {
    renderLoginPage();
    
    const input = screen.getByPlaceholderText('Email Or Mobile Number');
    fireEvent.change(input, { target: { value: 'invalid-email' } });
    
    const submitButton = screen.getByRole('button', { name: /get otp/i });
    fireEvent.click(submitButton);
    
    await waitFor(() => {
      expect(screen.getByText('Please enter a valid email address')).toBeInTheDocument();
    });
  });

  it('shows error message for invalid phone number format', async () => {
    renderLoginPage();
    
    const input = screen.getByPlaceholderText('Email Or Mobile Number');
    fireEvent.change(input, { target: { value: '12345' } });
    
    const submitButton = screen.getByRole('button', { name: /get otp/i });
    fireEvent.click(submitButton);
    
    await waitFor(() => {
      expect(screen.getByText('Please enter a valid 10-digit phone number')).toBeInTheDocument();
    });
  });

  it('handles valid email submission correctly', async () => {
    renderLoginPage();
    
    const input = screen.getByPlaceholderText('Email Or Mobile Number');
    fireEvent.change(input, { target: { value: 'test@example.com' } });
    
    const submitButton = screen.getByRole('button', { name: /get otp/i });
    fireEvent.click(submitButton);
    
    await waitFor(() => {
      expect(screen.getByText('SENDING OTP...')).toBeInTheDocument();
    });
    
    await waitFor(() => {
      expect(mockNavigate).toHaveBeenCalledWith('/otp');
    });
  });

  it('handles valid phone number submission correctly', async () => {
    renderLoginPage();
    
    const input = screen.getByPlaceholderText('Email Or Mobile Number');
    fireEvent.change(input, { target: { value: '1234567890' } });
    
    const submitButton = screen.getByRole('button', { name: /get otp/i });
    fireEvent.click(submitButton);
    
    await waitFor(() => {
      expect(screen.getByText('SENDING OTP...')).toBeInTheDocument();
    });
    
    await waitFor(() => {
      expect(mockNavigate).toHaveBeenCalledWith('/otp');
    });
  });

  it('disables submit button while loading', async () => {
    renderLoginPage();
    
    const input = screen.getByPlaceholderText('Email Or Mobile Number');
    fireEvent.change(input, { target: { value: 'test@example.com' } });
    
    const submitButton = screen.getByRole('button', { name: /get otp/i });
    fireEvent.click(submitButton);
    
    await waitFor(() => {
      expect(submitButton).toBeDisabled();
    });
  });
}); 