import React from 'react'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import ForgotPasswordPage from '../page/ForgotPasswordPage'

// Mock the useNavigate hook
const mockNavigate = vi.fn()
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom')
  return {
    ...actual,
    useNavigate: () => mockNavigate
  }
})

// Mock the image import
vi.mock('../assets/img/resetImage.png', () => 'mocked-image-path')

// Helper function to render component with router
const renderWithRouter = (component) => {
  return render(
    <BrowserRouter>
      {component}
    </BrowserRouter>
  )
}

// Mock window.matchMedia for responsive testing
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: vi.fn().mockImplementation(query => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(),
    removeListener: vi.fn(),
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })),
});

describe('ForgotPasswordPage', () => {
  beforeEach(() => {
    mockNavigate.mockReset()
  })

  it('renders correctly with two-section layout', () => {
    renderWithRouter(<ForgotPasswordPage />)
    
    // Check main container has flex layout
    const mainContainer = screen.getByRole('form').closest('.min-h-screen')
    expect(mainContainer).toHaveClass('flex', 'flex-col', 'lg:flex-row')
    
    // Check title is present
    expect(screen.getByText('RESET PASSWORD')).toBeInTheDocument()
    
    // Check input field is present
    expect(screen.getByPlaceholderText('Email Address')).toBeInTheDocument()
    
    // Check button is present
    expect(screen.getByText('CONTINUE')).toBeInTheDocument()
    
    // Check instructions text is present
    expect(screen.getByText(/We will send you an email with instructions/i)).toBeInTheDocument()
    
    // Check copyright exists in both mobile and desktop versions
    const copyrightTexts = screen.getAllByText(/MAJORCOLURS, ALL RIGHTS RESERVED/i)
    expect(copyrightTexts.length).toBe(2)
  })

  it('shows error for empty email submission', async () => {
    renderWithRouter(<ForgotPasswordPage />)
    
    // Find and click the continue button
    const continueButton = screen.getByText('CONTINUE')
    fireEvent.click(continueButton)
    
    // Check error message appears
    expect(screen.getByText('Email is required')).toBeInTheDocument()
    
    // Verify navigate wasn't called
    expect(mockNavigate).not.toHaveBeenCalled()
  })

  it('shows error for invalid email format', async () => {
    renderWithRouter(<ForgotPasswordPage />)
    
    // Find input and enter invalid email
    const emailInput = screen.getByPlaceholderText('Email Address')
    fireEvent.change(emailInput, { target: { value: 'invalid-email' } })
    
    // Find and click the continue button
    const continueButton = screen.getByText('CONTINUE')
    fireEvent.click(continueButton)
    
    // Check error message appears
    expect(screen.getByText('Please enter a valid email address')).toBeInTheDocument()
    
    // Verify navigate wasn't called
    expect(mockNavigate).not.toHaveBeenCalled()
  })

  it('navigates to new password page on valid submission', async () => {
    renderWithRouter(<ForgotPasswordPage />)
    
    // Find input and enter valid email
    const emailInput = screen.getByPlaceholderText('Email Address')
    fireEvent.change(emailInput, { target: { value: 'test@example.com' } })
    
    // Find and click the continue button
    const continueButton = screen.getByText('CONTINUE')
    fireEvent.click(continueButton)
    
    // Verify navigate was called with correct path
    expect(mockNavigate).toHaveBeenCalledWith('/newPassword')
  })

  it('updates email state when typing', () => {
    renderWithRouter(<ForgotPasswordPage />)
    
    // Find input and enter email
    const emailInput = screen.getByPlaceholderText('Email Address')
    fireEvent.change(emailInput, { target: { value: 'test@example.com' } })
    
    // Verify input value was updated
    expect(emailInput.value).toBe('test@example.com')
  })
  
  it('has proper two-column layout on large screens', () => {
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
    
    renderWithRouter(<ForgotPasswordPage />)
    
    // Form section should be half width on large screens
    const formSection = screen.getByRole('form').closest('section')
    expect(formSection).toHaveClass('lg:w-1/2')
    
    // Desktop footer should be visible
    const desktopFooter = screen.getAllByText(/MAJORCOLURS, ALL RIGHTS RESERVED/i)[1]
    expect(desktopFooter).toHaveClass('hidden', 'lg:block')
  })
}) 