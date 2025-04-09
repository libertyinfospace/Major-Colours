import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { BrowserRouter, MemoryRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import HomePage from './HomePage';
import activeSlices from '../store/activeSlices';

// Mock the child components to isolate testing
vi.mock('../components/HomeComponent', () => ({
  default: () => <div data-testid="home-component">Home Component Mock</div>
}));

vi.mock('../components/RankCriteriaComponent', () => ({
  default: () => <div data-testid="rank-criteria-component">Rank Criteria Component Mock</div>
}));

// Helper function to create a test store
const createTestStore = () => {
  return configureStore({
    reducer: {
      active: activeSlices
    },
    preloadedState: {
      active: {
        rankCretriaActiveState: null,
        rankCriteriaData: []
      }
    }
  });
};

describe('HomePage', () => {
  const renderHomePage = () => {
    return render(
      <Provider store={createTestStore()}>
        <BrowserRouter>
          <HomePage />
        </BrowserRouter>
      </Provider>
    );
  };

  it('renders main components correctly', () => {
    renderHomePage();
    
    // Check if main components are rendered
    expect(screen.getByTestId('home-component')).toBeInTheDocument();
    expect(screen.getByTestId('rank-criteria-component')).toBeInTheDocument();
    expect(screen.getByText('JOIN')).toBeInTheDocument();
  });

  it('has a link to the register page', () => {
    renderHomePage();
    
    // Check if the JOIN link has the correct "to" prop
    const joinLink = screen.getByText('JOIN');
    expect(joinLink.closest('a')).toHaveAttribute('href', '/register');
  });

  it('applies correct styling to main sections', () => {
    renderHomePage();
    
    // Check if main element has correct classes
    const mainElement = screen.getByRole('main');
    expect(mainElement).toHaveClass('w-full');
    expect(mainElement).toHaveClass('bg-backgroundColor');
    expect(mainElement).toHaveClass('flex');
    expect(mainElement).toHaveClass('font-nunito');
    
    // Check JOIN button styling
    const joinLink = screen.getByText('JOIN');
    expect(joinLink).toHaveClass('border-2');
    expect(joinLink).toHaveClass('text-white');
    expect(joinLink).toHaveClass('font-bold');
  });
}); 