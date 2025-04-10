import React from 'react'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import SelectedRankAndUploadVideo from '../page/SelectedRankAndUploadVideo'
import { Provider } from 'react-redux'
import { configureStore } from '@reduxjs/toolkit'
import activeSlices from '../store/activeSlices'

// Mock the images and SVGs
vi.mock('../assets/logo/Spear-active-icon.svg', () => ({
  default: 'mocked-spear-active'
}))
vi.mock('../assets/logo/Spear-icon-normal.svg', () => ({
  default: 'mocked-spear-normal'
}))
vi.mock('../assets/logo/Bident-active-icon.svg', () => ({
  default: 'mocked-bident-active'
}))
vi.mock('../assets/logo/Bident-icon-normal.svg', () => ({
  default: 'mocked-bident-normal'
}))
vi.mock('../assets/logo/Trident-active-icon.svg', () => ({
  default: 'mocked-trident-active'
}))
vi.mock('../assets/logo/Trident-icon-normal.svg', () => ({
  default: 'mocked-trident-normal'
}))
vi.mock('../assets/logo/Excalibur-active-icon.svg', () => ({
  default: 'mocked-excalibur-active'
}))
vi.mock('../assets/logo/Excalibur-icon-normal.svg', () => ({
  default: 'mocked-excalibur-normal'
}))
vi.mock('../assets/logo/add.svg', () => ({
  default: 'mocked-add-icon'
}))

// Mock the components
vi.mock('../components/ProfileHeader', () => ({
  default: () => <div data-testid="profile-header">Profile Header</div>
}))

vi.mock('../components/PersonalDetailsComponent', () => ({
  default: () => <div data-testid="personal-details">Personal Details</div>
}))

vi.mock('../components/SelectRankComponent', () => ({
  default: () => <div data-testid="select-rank">Select Rank</div>
}))

vi.mock('../components/RankCriteriaIconComponent', () => ({
  default: ({ name1, name2 }) => (
    <div data-testid={`rank-icon-${name1}`}>
      {name1} - {name2}
    </div>
  )
}))

vi.mock('../components/RankCriteriaLineComponent', () => ({
  default: () => <div data-testid="rank-line">Line</div>
}))

vi.mock('../components/RankCriteriaCardComponent', () => ({
  default: ({ name, last, val1, val2 }) => (
    <div data-testid={`rank-card-${name}`}>
      <span>{name}</span>
      <span>{last}</span>
      <span>{val1}</span>
      <span>{val2}</span>
    </div>
  )
}))

vi.mock('../components/FooterLinkComponent', () => ({
  default: () => <div data-testid="footer-link">Footer</div>
}))

// Mock the dummy data
vi.mock('../utils/dummyData', () => {
  return {
    default: [
      [
        { name: 'BENCH', last: 'PRESS', val1: '1 x BW', val2: '0.5 x BW' },
        { name: 'SQUAT', last: '', val1: '1.25 x BW', val2: '0.75 x BW' },
        { name: 'DEAD', last: 'LIFT', val1: '1.5 x BW', val2: '1 x BW' }
      ],
      [
        { name: 'BENCH2', last: 'PRESS', val1: '1.25 x BW', val2: '0.75 x BW' }
      ],
      [
        { name: 'BENCH3', last: 'PRESS', val1: '1.5 x BW', val2: '1 x BW' }
      ],
      [
        { name: 'BENCH4', last: 'PRESS', val1: '2 x BW', val2: '1.25 x BW' }
      ]
    ]
  }
})

// Helper function to create a test store with custom initial state
const createTestStore = (customState = {}) => {
  return configureStore({
    reducer: {
      active: activeSlices
    },
    preloadedState: {
      active: {
        rankCretriaActiveState: {
          altName: "spear level 1",
          iconPath: "mocked-spear-active",
          name1: "SPEAR",
          name2: "LEVEL 1",
        },
        rankCriteriaData: [
          { name: 'BENCH', last: 'PRESS', val1: '1 x BW', val2: '0.5 x BW' },
          { name: 'SQUAT', last: '', val1: '1.25 x BW', val2: '0.75 x BW' },
          { name: 'DEAD', last: 'LIFT', val1: '1.5 x BW', val2: '1 x BW' }
        ],
        commingSoonActive: false,
        ...customState
      }
    }
  })
}

// Helper function to render with Redux provider
const renderWithRedux = (component, store = createTestStore()) => {
  return render(
    <Provider store={store}>
      {component}
    </Provider>
  )
}

describe('SelectedRankAndUploadVideo', () => {
  beforeEach(() => {
    // Reset any runtime handlers
    vi.clearAllMocks()
  })

  it('renders all main components correctly', () => {
    renderWithRedux(<SelectedRankAndUploadVideo />)
    
    // Check that all major components are rendered
    expect(screen.getByTestId('profile-header')).toBeInTheDocument()
    expect(screen.getByTestId('personal-details')).toBeInTheDocument()
    expect(screen.getByTestId('select-rank')).toBeInTheDocument()
    expect(screen.getByText('CRITERIA')).toBeInTheDocument()
    expect(screen.getByTestId('footer-link')).toBeInTheDocument()
    
    // Check rank icons
    expect(screen.getByTestId('rank-icon-SPEAR')).toBeInTheDocument()
    expect(screen.getByTestId('rank-icon-BIDENT')).toBeInTheDocument()
    expect(screen.getByTestId('rank-icon-TRIDENT')).toBeInTheDocument()
    expect(screen.getByTestId('rank-icon-EXCALIBUR')).toBeInTheDocument()
    
    // Check rank cards
    expect(screen.getByTestId('rank-card-BENCH')).toBeInTheDocument()
    expect(screen.getByTestId('rank-card-SQUAT')).toBeInTheDocument()
    expect(screen.getByTestId('rank-card-DEAD')).toBeInTheDocument()
  })

  it('displays the correct number of cards based on the Redux state', () => {
    // Create a store with fewer rank criteria data
    const customStore = createTestStore({
      rankCriteriaData: [
        { name: 'BENCH', last: 'PRESS', val1: '1 x BW', val2: '0.5 x BW' },
        { name: 'SQUAT', last: '', val1: '1.25 x BW', val2: '0.75 x BW' }
      ]
    })
    
    renderWithRedux(<SelectedRankAndUploadVideo />, customStore)
    
    // Should have only 2 rank cards
    const rankCards = screen.getAllByTestId(/rank-card/)
    expect(rankCards).toHaveLength(2)
    
    expect(screen.getByTestId('rank-card-BENCH')).toBeInTheDocument()
    expect(screen.getByTestId('rank-card-SQUAT')).toBeInTheDocument()
    expect(screen.queryByTestId('rank-card-DEAD')).not.toBeInTheDocument()
  })

  it('renders both sample video and safety guidelines links', () => {
    renderWithRedux(<SelectedRankAndUploadVideo />)
    
    // Check the links at the bottom
    expect(screen.getByText('Sample Video')).toBeInTheDocument()
    expect(screen.getByText('Safety Guidelines')).toBeInTheDocument()
    
    // Check for both add icons 
    const addIcons = screen.getAllByAltText(/Add/)
    expect(addIcons).toHaveLength(2)
  })

  it('handles empty rankCriteriaData state gracefully', () => {
    // Create a store with empty rank criteria data
    const customStore = createTestStore({
      rankCriteriaData: null
    })
    
    renderWithRedux(<SelectedRankAndUploadVideo />, customStore)
    
    // Should not crash when rankCriteriaData is null/undefined
    // Should still render the rest of the page
    expect(screen.getByTestId('profile-header')).toBeInTheDocument()
    expect(screen.getByTestId('personal-details')).toBeInTheDocument()
    expect(screen.getByTestId('select-rank')).toBeInTheDocument()
    expect(screen.getByText('CRITERIA')).toBeInTheDocument()
    
    // Should not have any rank cards
    const rankCards = screen.queryAllByTestId(/rank-card/)
    expect(rankCards).toHaveLength(0)
  })
}) 