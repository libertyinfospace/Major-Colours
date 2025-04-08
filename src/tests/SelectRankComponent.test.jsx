import React from 'react'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import SelectRankComponent from '../components/SelectRankComponent'
import { Provider } from 'react-redux'
import { configureStore } from '@reduxjs/toolkit'
import activeSlices from '../store/activeSlices'

// Mock react-icons
vi.mock('react-icons/ci', () => ({
  CiCirclePlus: () => <div data-testid="plus-icon">Plus Icon</div>
}))

vi.mock('react-icons/fa', () => ({
  FaTimesCircle: (props) => (
    <div 
      data-testid="remove-icon" 
      onClick={props.onClick}
      className={props.className}>
      Remove Icon
    </div>
  )
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
          name2: "LEVEL 1",
          altName: "spear level 1",
          iconPath: "mock-path"
        }
      }
    }
  })
}

// Helper function to render with Redux
const renderWithRedux = (component) => {
  return render(
    <Provider store={createTestStore()}>
      {component}
    </Provider>
  )
}

describe('SelectRankComponent', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    
    // Mock URL.createObjectURL and URL.revokeObjectURL
    global.URL.createObjectURL = vi.fn(() => 'mock-video-url')
    global.URL.revokeObjectURL = vi.fn()
  })

  it('renders correctly with initial state', () => {
    renderWithRedux(<SelectRankComponent />)
    
    // Check heading
    expect(screen.getByText('SELECT RANK')).toBeInTheDocument()
    
    // Check plus icon is visible
    expect(screen.getByTestId('plus-icon')).toBeInTheDocument()
    
    // Check submit text is visible with correct rank name
    expect(screen.getByText(/SUBMIT A VIDEO FOR THE RANK OF SPEAR/i)).toBeInTheDocument()
    
    // Check file input exists
    const fileInput = document.querySelector('input[type="file"]')
    expect(fileInput).toBeInTheDocument()
    expect(fileInput).toHaveAttribute('accept', 'video/*')
    
    // Container should have gap and justify-center classes when no video
    const container = screen.getByText(/SUBMIT A VIDEO FOR THE RANK OF SPEAR/i).closest('div')
    expect(container).toHaveClass('gap-3')
    expect(container).toHaveClass('justify-center')
  })

  it('shows video preview when file is selected', async () => {
    renderWithRedux(<SelectRankComponent />)
    
    // Create a mock file
    const file = new File(['dummy content'], 'test-video.mp4', { type: 'video/mp4' })
    
    // Get the file input
    const fileInput = document.querySelector('input[type="file"]')
    
    // Simulate file selection
    fireEvent.change(fileInput, { target: { files: [file] } })
    
    // Check that URL.createObjectURL was called with the file
    expect(global.URL.createObjectURL).toHaveBeenCalledWith(file)
    
    // Video player should now be visible
    const videoElement = screen.getByText('Your browser does not support the video tag.').closest('video')
    expect(videoElement).toBeInTheDocument()
    expect(videoElement).toHaveAttribute('src', 'mock-video-url')
    expect(videoElement).toHaveClass('w-full')
    expect(videoElement).toHaveClass('h-full')
    expect(videoElement).toHaveClass('object-contain')
    
    // Container should have p-0 and overflow-hidden classes when video is shown
    const container = videoElement.closest('.flex.items-center.w-\\[57\\.625rem\\]')
    expect(container).toHaveClass('p-0')
    expect(container).toHaveClass('overflow-hidden')
    
    // Remove icon should be visible
    expect(screen.getByTestId('remove-icon')).toBeInTheDocument()
    
    // Plus icon and submit text should not be visible
    expect(screen.queryByTestId('plus-icon')).not.toBeInTheDocument()
    expect(screen.queryByText(/SUBMIT A VIDEO FOR THE RANK OF SPEAR/i)).not.toBeInTheDocument()
  })

  it('removes video when remove icon is clicked', async () => {
    renderWithRedux(<SelectRankComponent />)
    
    // Step 1: Add a file
    const file = new File(['dummy content'], 'test-video.mp4', { type: 'video/mp4' })
    const fileInput = document.querySelector('input[type="file"]')
    fireEvent.change(fileInput, { target: { files: [file] } })
    
    // Step 2: Verify video is displayed
    const videoElement = screen.getByText('Your browser does not support the video tag.').closest('video')
    expect(videoElement).toBeInTheDocument()
    
    // Step 3: Click remove icon
    fireEvent.click(screen.getByTestId('remove-icon'))
    
    // Step 4: Verify video is removed
    await waitFor(() => {
      // URL.revokeObjectURL should have been called
      expect(global.URL.revokeObjectURL).toHaveBeenCalledWith('mock-video-url')
      
      // Video should no longer be present
      expect(screen.queryByText('Your browser does not support the video tag.')).not.toBeInTheDocument()
      
      // Plus icon and text should be back
      expect(screen.getByTestId('plus-icon')).toBeInTheDocument()
      expect(screen.getByText(/SUBMIT A VIDEO FOR THE RANK OF SPEAR/i)).toBeInTheDocument()
      
      // Container should have gap and justify-center classes again
      const container = screen.getByText(/SUBMIT A VIDEO FOR THE RANK OF SPEAR/i).closest('div')
      expect(container).toHaveClass('gap-3')
      expect(container).toHaveClass('justify-center')
    })
  })

  it('validates video file type', async () => {
    // Mock window.alert
    const alertMock = vi.spyOn(window, 'alert').mockImplementation(() => {})
    
    renderWithRedux(<SelectRankComponent />)
    
    // Create a mock non-video file
    const file = new File(['dummy content'], 'test-file.pdf', { type: 'application/pdf' })
    
    // Get the file input
    const fileInput = document.querySelector('input[type="file"]')
    
    // Simulate file selection
    fireEvent.change(fileInput, { target: { files: [file] } })
    
    // Alert should have been called with the error message
    expect(alertMock).toHaveBeenCalledWith('Please select a valid video file')
    
    // Video element should not be present
    expect(screen.queryByText('Your browser does not support the video tag.')).not.toBeInTheDocument()
    
    // Plus icon and submit text should still be visible
    expect(screen.getByTestId('plus-icon')).toBeInTheDocument()
    expect(screen.getByText(/SUBMIT A VIDEO FOR THE RANK OF SPEAR/i)).toBeInTheDocument()
    
    // Cleanup
    alertMock.mockRestore()
  })
}) 