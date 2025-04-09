import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import RankCriteriaComponent from './RankCriteriaComponent';
import activeSlices from '../store/activeSlices';

// Mock the child components
vi.mock('./RankCriteriaIconComponent', () => ({
  default: ({ name1, name2 }) => (
    <div data-testid={`rank-icon-${name1}`}>
      {name1} {name2}
    </div>
  )
}));

vi.mock('./RankCriteriaLineComponent', () => ({
  default: () => <div data-testid="rank-line">Line Component</div>
}));

vi.mock('./RankCritrieaCardContainerComponent', () => ({
  default: () => <div data-testid="rank-card-container">Card Container</div>
}));

// Mock all SVG assets
vi.mock('../assets/logo/Spear-active-icon.svg', () => 'spear-active');
vi.mock('../assets/logo/Spear-icon-normal.svg', () => 'spear-normal');
vi.mock('../assets/logo/Bident-active-icon.svg', () => 'bident-active');
vi.mock('../assets/logo/Bident-icon-normal.svg', () => 'bident-normal');
vi.mock('../assets/logo/Trident-active-icon.svg', () => 'trident-active');
vi.mock('../assets/logo/Trident-icon-normal.svg', () => 'trident-normal');
vi.mock('../assets/logo/Excalibur-active-icon.svg', () => 'excalibur-active');
vi.mock('../assets/logo/Excalibur-icon-normal.svg', () => 'excalibur-normal');

// Mock dummy data
vi.mock('../utils/dummyData', () => ({
  default: [
    { name: 'Test1', value: 'Value1' },
    { name: 'Test2', value: 'Value2' },
    { name: 'Test3', value: 'Value3' },
    { name: 'Test4', value: 'Value4' }
  ]
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

describe('RankCriteriaComponent', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });
  
  const renderComponent = () => {
    return render(
      <Provider store={createTestStore()}>
        <RankCriteriaComponent />
      </Provider>
    );
  };

  it('renders the component with title correctly', () => {
    renderComponent();
    
    // Check heading elements
    expect(screen.getByText('RANK')).toBeInTheDocument();
    expect(screen.getByText('CRITERIA')).toBeInTheDocument();
  });

  it('renders all rank icons with correct names', () => {
    renderComponent();
    
    // Check each rank icon exists
    expect(screen.getByTestId('rank-icon-SPEAR')).toBeInTheDocument();
    expect(screen.getByTestId('rank-icon-BIDENT')).toBeInTheDocument();
    expect(screen.getByTestId('rank-icon-TRIDENT')).toBeInTheDocument();
    expect(screen.getByTestId('rank-icon-EXCALIBUR')).toBeInTheDocument();
    
    // Check that text content includes level info
    expect(screen.getByTestId('rank-icon-SPEAR').textContent).toContain('LEVEL 1');
    expect(screen.getByTestId('rank-icon-BIDENT').textContent).toContain('LEVEL 2');
    expect(screen.getByTestId('rank-icon-TRIDENT').textContent).toContain('LEVEL 3');
    expect(screen.getByTestId('rank-icon-EXCALIBUR').textContent).toContain('LEVEL 4');
  });

  it('renders connecting lines between rank icons', () => {
    renderComponent();
    
    // Should have 3 connecting lines between 4 icons
    const lines = screen.getAllByTestId('rank-line');
    expect(lines.length).toBe(3);
  });

  it('renders the rank card container component', () => {
    renderComponent();
    
    expect(screen.getByTestId('rank-card-container')).toBeInTheDocument();
  });

  it('has proper accessibility attributes', () => {
    renderComponent();
    
    // The title should be properly linked as a label for the entire section
    const section = screen.getByLabelText('RANK');
    expect(section).toBeInTheDocument();
  });
}); 