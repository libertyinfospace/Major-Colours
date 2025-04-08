import React from 'react'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen } from '@testing-library/react'
import RegisterPage from '../page/RegisterPage'
import { Provider } from 'react-redux'
import { configureStore } from '@reduxjs/toolkit'
import activeSlices from '../store/activeSlices'

// Mock the required components
vi.mock('../components/ProfileHeader', () => ({
  default: () => <div data-testid="profile-header">Header</div>
}))

vi.mock('../components/PersonalDetailsComponent', () => ({
  default: () => <div data-testid="personal-details">Personal Details</div>
}))

vi.mock('../components/SelectRankComponent', () => ({
  default: () => <div data-testid="select-rank">Select Rank</div>
}))

vi.mock('../components/RankCriteriaIconComponent', () => ({
  default: () => <div data-testid="rank-icon">Rank Icon</div>
}))

vi.mock('../components/RankCriteriaCardComponent', () => ({
  default: ({ name, last, widthLen }) => (
    <div 
      data-testid={`rank-card-${name}${last ? `-${last}` : ''}`}
      data-width={widthLen}
    >
      {name} {last}
    </div>
  )
}))

vi.mock('../components/RankCriteriaOrComponent', () => ({
  default: () => <div data-testid="rank-or">OR</div>
}))

vi.mock('../components/FooterLinkComponent', () => ({
  default: () => <div data-testid="footer">Footer</div>
}))

// Mock the assets
vi.mock('../assets/logo/Spear-active-icon.svg', () => ({ default: 'spear-active' }))
vi.mock('../assets/logo/Spear-icon-normal.svg', () => ({ default: 'spear-normal' }))
vi.mock('../assets/logo/Bident-active-icon.svg', () => ({ default: 'bident-active' }))
vi.mock('../assets/logo/Bident-icon-normal.svg', () => ({ default: 'bident-normal' }))
vi.mock('../assets/logo/Trident-active-icon.svg', () => ({ default: 'trident-active' }))
vi.mock('../assets/logo/Trident-icon-normal.svg', () => ({ default: 'trident-normal' }))
vi.mock('../assets/logo/Excalibur-active-icon.svg', () => ({ default: 'excalibur-active' }))
vi.mock('../assets/logo/Excalibur-icon-normal.svg', () => ({ default: 'excalibur-normal' }))
vi.mock('../assets/logo/add.svg', () => ({ default: 'add-icon' }))

// Mock dummyData
vi.mock('../utils/dummyData', () => ({
  default: [
    [{ name: 'test1' }],
    [{ name: 'test2' }],
    [{ name: 'test3' }],
    [{ name: 'test4' }]
  ]
}))

// Helper function to create a test store with customized state
const createTestStore = (rankCriteriaData) => {
  return configureStore({
    reducer: {
      active: activeSlices
    },
    preloadedState: {
      active: {
        rankCretriaActiveState: {
          name1: 'SPEAR',
          name2: 'LEVEL 1'
        },
        rankCriteriaData: rankCriteriaData || [
          { name: 'BENCH', last: 'PRESS', val1: '1 x BW', val2: '0.5 x BW' },
          { name: 'SQUAT', last: '', val1: '1.25 x BW', val2: '0.75 x BW' },
          { name: 'DEAD', last: 'LIFT', val1: '1.5 x BW', val2: '1 x BW' }
        ]
      }
    }
  })
}

describe('Alternating RankCriteriaCardComponent and RankCriteriaOrComponent', () => {
  it('renders RankCriteriaCardComponent and RankCriteriaOrComponent in alternating pattern in a single line', () => {
    render(
      <Provider store={createTestStore()}>
        <RegisterPage />
      </Provider>
    )
    
    // Check that all 3 cards are rendered
    const benchCard = screen.getByTestId('rank-card-BENCH-PRESS')
    const squatCard = screen.getByTestId('rank-card-SQUAT')
    const deadliftCard = screen.getByTestId('rank-card-DEAD-LIFT')
    
    expect(benchCard).toBeInTheDocument()
    expect(squatCard).toBeInTheDocument()
    expect(deadliftCard).toBeInTheDocument()
    
    // Check that the OR components are rendered (should be 2 for 3 cards)
    const orComponents = screen.getAllByTestId('rank-or')
    expect(orComponents).toHaveLength(2)
    
    // Check that everything is inside a flex container
    const flexContainer = benchCard.closest('.flex.items-center.justify-between.w-full')
    expect(flexContainer).toBeInTheDocument()
    
    // Check that each card has a calculated width
    const calculatedWidth = benchCard.getAttribute('data-width')
    expect(calculatedWidth).toBeTruthy()
    expect(calculatedWidth).not.toBe('300px') // Should be recalculated based on container width
  })
  
  it('renders the correct number of OR components (one less than the number of cards)', () => {
    // Create store with 4 criteria items
    const fourCriteriaStore = createTestStore([
      { name: 'BENCH', last: 'PRESS', val1: '1 x BW', val2: '0.5 x BW' },
      { name: 'SQUAT', last: '', val1: '1.25 x BW', val2: '0.75 x BW' },
      { name: 'DEAD', last: 'LIFT', val1: '1.5 x BW', val2: '1 x BW' },
      { name: 'PUSH', last: 'UP', val1: '30', val2: '15' }
    ])
    
    render(
      <Provider store={fourCriteriaStore}>
        <RegisterPage />
      </Provider>
    )
    
    // Check that all 4 cards are rendered
    expect(screen.getByTestId('rank-card-BENCH-PRESS')).toBeInTheDocument()
    expect(screen.getByTestId('rank-card-SQUAT')).toBeInTheDocument()
    expect(screen.getByTestId('rank-card-DEAD-LIFT')).toBeInTheDocument()
    expect(screen.getByTestId('rank-card-PUSH-UP')).toBeInTheDocument()
    
    // Check that the OR components are rendered (should be 3 for 4 cards)
    const orComponents = screen.getAllByTestId('rank-or')
    expect(orComponents).toHaveLength(3)
    
    // Check that cards with 4 items have smaller width than with 3 items
    const fourItemsCardWidth = screen.getByTestId('rank-card-BENCH-PRESS').getAttribute('data-width')
    
    // Render with 3 items to compare
    const { unmount } = render(
      <Provider store={createTestStore()}>
        <RegisterPage />
      </Provider>
    )
    
    // Compare widths
    const threeItemsCardWidth = screen.getAllByTestId('rank-card-BENCH-PRESS')[1].getAttribute('data-width')
    
    // Convert to numbers for comparison
    const fourItemsWidth = parseInt(fourItemsCardWidth)
    const threeItemsWidth = parseInt(threeItemsCardWidth)
    
    expect(fourItemsWidth).toBeLessThan(threeItemsWidth)
    
    unmount()
  })
  
  it('handles empty or null rankCriteriaData gracefully', () => {
    // Create store with empty criteria array
    const emptyStore = createTestStore([])
    
    render(
      <Provider store={emptyStore}>
        <RegisterPage />
      </Provider>
    )
    
    // Verify no rank cards are rendered
    expect(screen.queryByTestId(/rank-card-/)).not.toBeInTheDocument()
    
    // Verify no OR components are rendered
    expect(screen.queryByTestId('rank-or')).not.toBeInTheDocument()
  })
}); 