import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import OtpPage from './OtpPage';

// Mock the useNavigate hook
const mockNavigate = vi.fn();
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

// Mock the image import
vi.mock('../assets/img/otpImage.png', () => 'mocked-otp-image-path');

describe('OtpPage', () => {
  const renderOtpPage = () => {
    return render(
      <BrowserRouter>
        <OtpPage />
      </BrowserRouter>
    );
  };

  beforeEach(() => {
    mockNavigate.mockReset();
  });

  it('renders the OTP form correctly', () => {
    renderOtpPage();
    
    expect(screen.getByText('ENTER THE OTP')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Type Your OTP Here')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /submit/i })).toBeInTheDocument();
  });

  it('shows error message when submitting empty form', async () => {
    renderOtpPage();
    
    const submitButton = screen.getByRole('button', { name: /submit/i });
    fireEvent.click(submitButton);
    
    await waitFor(() => {
      expect(screen.getByText('Please enter the OTP')).toBeInTheDocument();
    });
  });

  it('shows error message for incomplete OTP', async () => {
    renderOtpPage();
    
    const input = screen.getByPlaceholderText('Type Your OTP Here');
    fireEvent.change(input, { target: { value: '12345' } });
    
    const submitButton = screen.getByRole('button', { name: /submit/i });
    fireEvent.click(submitButton);
    
    await waitFor(() => {
      expect(screen.getByText('OTP must be 6 digits')).toBeInTheDocument();
    });
  });

  it('handles valid OTP submission correctly', async () => {
    renderOtpPage();
    
    const input = screen.getByPlaceholderText('Type Your OTP Here');
    fireEvent.change(input, { target: { value: '123456' } });
    
    const submitButton = screen.getByRole('button', { name: /submit/i });
    fireEvent.click(submitButton);
    
    await waitFor(() => {
      expect(screen.getByText('VERIFYING...')).toBeInTheDocument();
    });
    
    await waitFor(() => {
      expect(mockNavigate).toHaveBeenCalledWith('/dashboard');
    });
  });

  it('disables submit button while loading', async () => {
    renderOtpPage();
    
    const input = screen.getByPlaceholderText('Type Your OTP Here');
    fireEvent.change(input, { target: { value: '123456' } });
    
    const submitButton = screen.getByRole('button', { name: /submit/i });
    fireEvent.click(submitButton);
    
    await waitFor(() => {
      expect(submitButton).toBeDisabled();
    });
  });

  it('only allows numeric input for OTP', () => {
    renderOtpPage();
    
    const input = screen.getByPlaceholderText('Type Your OTP Here');
    
    // Try to enter non-numeric input
    fireEvent.change(input, { target: { value: 'abc123' } });
    
    // Input should remain empty as non-numeric input is rejected
    expect(input.value).toBe('');
    
    // Try valid numeric input
    fireEvent.change(input, { target: { value: '123456' } });
    expect(input.value).toBe('123456');
  });

  it('renders with two-section layout on large screens', () => {
    // Mock matchMedia to simulate large screen
    window.matchMedia = vi.fn().mockImplementation(query => ({
      matches: query.includes('(min-width: 1024px)'), // true for lg breakpoint
      media: query,
      onchange: null,
      addListener: vi.fn(),
      removeListener: vi.fn(),
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      dispatchEvent: vi.fn(),
    }));
    
    renderOtpPage();
    
    // Check main container has flex layout with responsive classes
    const mainContainer = screen.getByText('ENTER THE OTP').closest('.min-h-screen');
    expect(mainContainer).toHaveClass('flex', 'flex-col', 'lg:flex-row');
    
    // Check form section has responsive width classes
    const formSection = screen.getByText('ENTER THE OTP').closest('section');
    expect(formSection).toHaveClass('w-full', 'lg:w-1/2');
    
    // Check both mobile and desktop copyright footers exist
    const copyrightTexts = screen.getAllByText(/MAJORCOLURS, ALL RIGHTS RESERVED/i);
    expect(copyrightTexts.length).toBe(2);
    
    // Mobile footer should be hidden on large screens
    expect(copyrightTexts[0]).toHaveClass('lg:hidden');
    
    // Desktop footer should be hidden on small screens
    expect(copyrightTexts[1]).toHaveClass('hidden', 'lg:block');
  });
}); 