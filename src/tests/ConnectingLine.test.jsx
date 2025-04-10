import React from 'react'
import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import SelectedRankAndUploadVideo from '../page/SelectedRankAndUploadVideo'
import { Provider } from 'react-redux'
import { configureStore } from '@reduxjs/toolkit'
import activeSlices from '../store/activeSlices'

// Mock the components and assets
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
  default: ({ name1 }) => <div data-testid={`icon-${name1}`}>{name1}</div>
}))

vi.mock('../components/RankCriteriaCardComponent', () => ({
  default: () => <div data-testid="rank-card">Rank Card</div>
}))

vi.mock('../components/FooterLinkComponent', () => ({
  default: () => <div data-testid="footer">Footer</div>
}))

// Mock all SVG imports
vi.mock('../assets/logo/Spear-active-icon.svg', () => ({ default: 'spear-active' }))
vi.mock('../assets/logo/Spear-icon-normal.svg', () => ({ default: 'spear-normal' }))
vi.mock('../assets/logo/Bident-active-icon.svg', () => ({ default: 'bident-active' }))
vi.mock('../assets/logo/Bident-icon-normal.svg', () => ({ default: 'bident-normal' }))
vi.mock('../assets/logo/Trident-active-icon.svg', () => ({ default: 'trident-active' }))
vi.mock('../assets/logo/Trident-icon-normal.svg', () => ({ default: 'trident-normal' }))
vi.mock('../assets/logo/Excalibur-active-icon.svg', () => ({ default: 'excalibur-active' }))
vi.mock('../assets/logo/Excalibur-icon-normal.svg', () => ({ default: 'excalibur-normal' }))
vi.mock('../assets/logo/add.svg', () => ({ default: 'add-icon' }))

// Mock the dummyData
vi.mock('../utils/dummyData', () => ({
  default: [
    [{ name: 'test1' }],
    [{ name: 'test2' }],
    [{ name: 'test3' }],
    [{ name: 'test4' }]
  ]
}))

// Helper function to create a test store
const createTestStore = () => {
  return configureStore({
    reducer: {
      active: activeSlices
    },
    preloadedState: {
      active: {
        rankCretriaActiveState: {
          name1: "SPEAR",
          name2: "LEVEL 1"
        },
        rankCriteriaData: [
          { name: 'BENCH', last: 'PRESS', val1: '1 x BW', val2: '0.5 x BW' }
        ]
      }
    }
  })
}

describe('Connecting Lines in SelectedRankAndUploadVideo', () => {
  it('renders connecting lines with proper styling between icons', () => {
    render(
      <Provider store={createTestStore()}>
        <SelectedRankAndUploadVideo />
      </Provider>
    )
    
    // Check that all four rank icons are rendered
    expect(screen.getByTestId('icon-SPEAR')).toBeInTheDocument()
    expect(screen.getByTestId('icon-BIDENT')).toBeInTheDocument()
    expect(screen.getByTestId('icon-TRIDENT')).toBeInTheDocument()
    expect(screen.getByTestId('icon-EXCALIBUR')).toBeInTheDocument()
    
    // Check that connecting lines have the right classes and styling
    const connectingLines = document.querySelectorAll('.h-\\[3px\\].bg-\\[\\#484848\\].relative.top-\\[-20px\\]')
    expect(connectingLines.length).toBe(3) // We should have 3 connecting lines
    
    // Check the properties of the lines
    connectingLines.forEach(line => {
      expect(line).toHaveClass('flex-grow')
      expect(line).toHaveClass('xl:block')
      expect(line).toHaveClass('hidden')
      
      // Check margin styling
      expect(line.className).toContain('mx-[-10px]')
    })
    
    // Check for flex-shrink-0 and z-10 on the icon containers
    const iconContainers = document.querySelectorAll('.flex-shrink-0.z-10')
    expect(iconContainers.length).toBe(4) // Should have 4 icon containers
  })
}) 