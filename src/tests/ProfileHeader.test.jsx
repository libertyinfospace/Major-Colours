import React from 'react'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import ProfileHeader from '../components/ProfileHeader'
import { BrowserRouter } from 'react-router-dom'

// Mock the navigate function
const mockNavigate = vi.fn();
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useNavigate: () => mockNavigate
  };
});

// Mock the logo import
vi.mock('../assets/img/MAJOR COLOURS-LOGO.png', () => 'mocked-logo-path');

describe('ProfileHeader', () => {
  beforeEach(() => {
    mockNavigate.mockReset();
  });

  const renderWithRouter = () => {
    return render(
      <BrowserRouter>
        <ProfileHeader />
      </BrowserRouter>
    );
  };

  it('renders correctly with proper z-index', () => {
    renderWithRouter();
    
    // Check that the logo is rendered
    const logo = screen.getByAltText('Major Colours Logo');
    expect(logo).toBeInTheDocument();
    
    // Check navigation items are present
    expect(screen.getByText('Membership')).toBeInTheDocument();
    expect(screen.getByText('Dressing Room')).toBeInTheDocument();
    
    // Check z-index is applied to the header
    const headerContainer = logo.closest('div');
    expect(headerContainer).toHaveClass('z-50');
    expect(headerContainer).toHaveClass('fixed');
    expect(headerContainer).toHaveClass('top-0');
  });

  it('navigates to home when logo is clicked', () => {
    renderWithRouter();
    
    // Click on the logo
    const logo = screen.getByAltText('Major Colours Logo');
    fireEvent.click(logo);
    
    // Check navigation was called with correct path
    expect(mockNavigate).toHaveBeenCalledWith('/');
  });

  it('navigates to login page when Membership is clicked', () => {
    renderWithRouter();
    
    // Click on Membership
    fireEvent.click(screen.getByText('Membership'));
    
    // Check navigation was called with correct path
    expect(mockNavigate).toHaveBeenCalledWith('/login');
  });

  it('handles navigation for other menu items', () => {
    // Create spy for console.log
    const consoleSpy = vi.spyOn(console, 'log');
    
    renderWithRouter();
    
    // Click on Dressing Room
    fireEvent.click(screen.getByText('Dressing Room'));
    
    // Check console.log was called with the correct message
    expect(consoleSpy).toHaveBeenCalledWith('Navigating to: Dressing Room');
    
    // Check that navigate was not called (since we're using the placeholder function)
    expect(mockNavigate).not.toHaveBeenCalledWith('Dressing Room');
    
    // Clean up
    consoleSpy.mockRestore();
  });
}); 