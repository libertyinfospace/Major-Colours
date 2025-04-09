import React from 'react';
import { render, screen, act } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import HomeComponent from './HomeComponent';

// Mock the framer-motion module
vi.mock('framer-motion', () => ({
  motion: {
    h1: ({ children, ...props }) => (
      <h1 data-testid="motion-h1" {...props}>
        {children}
      </h1>
    ),
    span: ({ children, ...props }) => (
      <span data-testid="motion-span" {...props}>
        {children}
      </span>
    ),
  },
}));

describe('HomeComponent', () => {
  beforeEach(() => {
    vi.useFakeTimers();
    vi.spyOn(global, 'setTimeout');
    vi.spyOn(global, 'setInterval');
    vi.spyOn(global, 'clearTimeout');
    vi.spyOn(global, 'clearInterval');
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('renders correctly with initial state', () => {
    render(<HomeComponent />);
    
    expect(screen.getByTestId('motion-h1')).toBeInTheDocument();
    expect(screen.getByTestId('motion-h1')).toHaveClass('sm:text-5xl');
    expect(screen.getByTestId('motion-h1')).toHaveClass('md:text-6xl');
    expect(screen.getByTestId('motion-h1')).toHaveClass('text-[30px]');
  });

  it('starts with empty text and begins typing animation', () => {
    render(<HomeComponent />);
    
    // Initially, the text should be empty or just starting to type
    const initialDisplayedText = screen.getByTestId('motion-h1').textContent;
    expect(initialDisplayedText.length).toBeLessThanOrEqual(1);
    
    // After some time, text should start appearing
    act(() => {
      vi.advanceTimersByTime(500);
    });
    
    // Now we should have some text typed
    const displayedTextAfterDelay = screen.getByTestId('motion-h1').textContent;
    expect(displayedTextAfterDelay.length).toBeGreaterThan(0);
  });

  it('completes the first text and starts deleting', () => {
    render(<HomeComponent />);
    
    // Type the complete first text "The Community Of Champions_"
    act(() => {
      // Advance enough for typing the whole first string (at 150ms per character)
      vi.advanceTimersByTime(5000);
    });
    
    // After full typing, should wait before deletion
    expect(setTimeout).toHaveBeenCalledWith(expect.any(Function), 2000);
    
    // Advance timer to start deletion
    act(() => {
      vi.advanceTimersByTime(2500);
    });
    
    // Verify deletion starts
    const displayedTextAfterDeletion = screen.getByTestId('motion-h1').textContent;
    expect(displayedTextAfterDeletion.length).toBeLessThan("The Community Of Champions_".length);
  });

  it('cleans up timers on unmount', () => {
    const { unmount } = render(<HomeComponent />);
    
    unmount();
    
    expect(clearTimeout).toHaveBeenCalled();
    expect(clearInterval).toHaveBeenCalled();
  });
}); 