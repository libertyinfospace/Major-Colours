import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import RankCriteriaIconComponent from '../components/RankCriteriaIconComponent';

// Mock the redux store
const mockStore = configureStore([]);

// Mock scrollTo
global.scrollTo = jest.fn();

// Mock document.querySelectorAll
document.querySelectorAll = jest.fn().mockImplementation((selector) => {
  if (selector === '[data-rank="SPEAR"]') {
    return [{
      getBoundingClientRect: () => ({
        top: 100,
      })
    }];
  }
  if (selector === '[data-rank="BIDENT"]') {
    return [{
      getBoundingClientRect: () => ({
        top: 200,
      })
    }];
  }
  return [];
});

// Mock the querySelector for header height
document.querySelector = jest.fn().mockImplementation(() => ({
  offsetHeight: 100
}));

// Mock window properties
Object.defineProperty(window, 'pageYOffset', {
  value: 0,
  writable: true
});

// Mock setTimeout
jest.useFakeTimers();

describe('RankCriteriaIconComponent', () => {
  let store;
  
  const spearProps = {
    iconPath: '/spear-active.svg',
    iconPath1: '/spear-normal.svg',
    data: { id: 'spear-data' },
    name1: 'SPEAR',
    name2: 'LEVEL 1',
    altName: 'spear level 1'
  };
  
  const bidentProps = {
    iconPath: '/bident-active.svg',
    iconPath1: '/bident-normal.svg',
    data: { id: 'bident-data' },
    name1: 'BIDENT',
    name2: 'LEVEL 2',
    altName: 'bident level 2'
  };
  
  beforeEach(() => {
    // Initialize the store with a known state
    store = mockStore({
      active: {
        rankCretriaActiveState: null
      }
    });
    
    // Clear mock function calls
    jest.clearAllMocks();
  });
  
  test('renders with inactive state initially', () => {
    render(
      <Provider store={store}>
        <RankCriteriaIconComponent {...spearProps} />
      </Provider>
    );
    
    // Check that the component renders with inactive style
    const iconContainer = screen.getByRole('img', { name: /spear level 1/i }).parentElement;
    expect(iconContainer).toHaveClass('bg-[#484848]');
    expect(iconContainer).not.toHaveClass('bg-white');
  });
  
  test('displays the correct rank name and level', () => {
    render(
      <Provider store={store}>
        <RankCriteriaIconComponent {...spearProps} />
      </Provider>
    );
    
    expect(screen.getByText('SPEAR')).toBeInTheDocument();
    expect(screen.getByText('LEVEL 1')).toBeInTheDocument();
  });
  
  test('dispatches actions and scrolls when clicked', async () => {
    render(
      <Provider store={store}>
        <RankCriteriaIconComponent {...spearProps} />
      </Provider>
    );
    
    // Click the rank icon
    fireEvent.click(screen.getByRole('img', { name: /spear level 1/i }));
    
    // First, the clear action should be dispatched
    expect(store.getActions()[0]).toEqual({
      type: 'rankInfoActiveState',
      payload: {
        iconPath: null,
        name1: null,
        name2: null,
        altName: null
      }
    });
    
    // Run the first setTimeout
    jest.advanceTimersByTime(5);
    
    // Then, the set active action should be dispatched
    expect(store.getActions()[1]).toEqual({
      type: 'rankInfoActiveState',
      payload: spearProps
    });
    
    // And the data action should be dispatched
    expect(store.getActions()[2]).toEqual({
      type: 'rankCriteriaData',
      payload: spearProps.data
    });
    
    // Run the second setTimeout
    jest.advanceTimersByTime(50);
    
    // The scrollTo function should be called
    expect(window.scrollTo).toHaveBeenCalledWith({
      top: expect.any(Number),
      behavior: 'smooth'
    });
  });
  
  test('ensures only the clicked rank is highlighted when multiple ranks are present', async () => {
    // Set initial store state with SPEAR active
    store = mockStore({
      active: {
        rankCretriaActiveState: spearProps
      }
    });
    
    const { rerender } = render(
      <Provider store={store}>
        <div>
          <RankCriteriaIconComponent {...spearProps} />
          <RankCriteriaIconComponent {...bidentProps} />
        </div>
      </Provider>
    );
    
    // Verify SPEAR is active initially
    const spearIcon = screen.getByRole('img', { name: /spear level 1/i }).parentElement;
    const bidentIcon = screen.getByRole('img', { name: /bident level 2/i }).parentElement;
    
    expect(spearIcon).toHaveClass('bg-white');
    expect(bidentIcon).not.toHaveClass('bg-white');
    
    // Click BIDENT
    fireEvent.click(screen.getByRole('img', { name: /bident level 2/i }));
    
    // Reset the store to simulate both ranks being active (which shouldn't happen)
    store = mockStore({
      active: {
        rankCretriaActiveState: bidentProps
      }
    });
    
    // Re-render with updated store
    rerender(
      <Provider store={store}>
        <div>
          <RankCriteriaIconComponent {...spearProps} />
          <RankCriteriaIconComponent {...bidentProps} />
        </div>
      </Provider>
    );
    
    // Now BIDENT should be active and SPEAR inactive
    expect(screen.getByRole('img', { name: /spear level 1/i }).parentElement).not.toHaveClass('bg-white');
    expect(screen.getByRole('img', { name: /bident level 2/i }).parentElement).toHaveClass('bg-white');
  });
  
  test('applies proper styling for active vs inactive ranks', () => {
    // Set store with active BIDENT
    store = mockStore({
      active: {
        rankCretriaActiveState: bidentProps
      }
    });
    
    render(
      <Provider store={store}>
        <div>
          <RankCriteriaIconComponent {...spearProps} />
          <RankCriteriaIconComponent {...bidentProps} />
        </div>
      </Provider>
    );
    
    // Check SPEAR (inactive) styling
    const spearContainer = screen.getByRole('img', { name: /spear level 1/i }).parentElement;
    expect(spearContainer).toHaveClass('bg-[#484848]');
    expect(spearContainer).not.toHaveClass('bg-white');
    expect(screen.getByText('SPEAR')).toHaveClass('text-textColor');
    expect(screen.getByText('SPEAR')).not.toHaveClass('text-white');
    
    // Check BIDENT (active) styling
    const bidentContainer = screen.getByRole('img', { name: /bident level 2/i }).parentElement;
    expect(bidentContainer).toHaveClass('bg-white');
    expect(bidentContainer).not.toHaveClass('bg-[#484848]');
    expect(screen.getByText('BIDENT')).toHaveClass('text-white');
    expect(screen.getByText('BIDENT')).not.toHaveClass('text-textColor');
  });
}); 