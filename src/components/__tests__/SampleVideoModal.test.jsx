import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import SampleVideoModal from '../SampleVideoModal'

describe('SampleVideoModal', () => {
  const mockOnClose = jest.fn()
  const mockOnSwitchToGuidelines = jest.fn()

  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('renders without crashing', () => {
    render(
      <SampleVideoModal 
        onClose={mockOnClose}
        isVisible={true}
        onSwitchToGuidelines={mockOnSwitchToGuidelines}
      />
    )
  })

  it('displays the correct content when visible', () => {
    render(
      <SampleVideoModal 
        onClose={mockOnClose}
        isVisible={true}
        onSwitchToGuidelines={mockOnSwitchToGuidelines}
      />
    )
    
    expect(screen.getByText('Sample Video')).toBeInTheDocument()
    expect(screen.getByText('Safety Guidelines')).toBeInTheDocument()
  })

  it('calls onClose when clicking the close button', () => {
    render(
      <SampleVideoModal 
        onClose={mockOnClose}
        isVisible={true}
        onSwitchToGuidelines={mockOnSwitchToGuidelines}
      />
    )
    
    const closeButton = screen.getByText('×')
    fireEvent.click(closeButton)
    
    expect(mockOnClose).toHaveBeenCalledTimes(1)
  })

  it('calls onSwitchToGuidelines when clicking the guidelines button', () => {
    render(
      <SampleVideoModal 
        onClose={mockOnClose}
        isVisible={true}
        onSwitchToGuidelines={mockOnSwitchToGuidelines}
      />
    )
    
    const guidelinesButton = screen.getByText('Safety Guidelines').closest('div')
    fireEvent.click(guidelinesButton)
    
    expect(mockOnSwitchToGuidelines).toHaveBeenCalledTimes(1)
  })

  it('calls onClose when clicking the overlay', () => {
    render(
      <SampleVideoModal 
        onClose={mockOnClose}
        isVisible={true}
        onSwitchToGuidelines={mockOnSwitchToGuidelines}
      />
    )
    
    const overlay = screen.getByTestId('modal-overlay')
    fireEvent.click(overlay)
    
    expect(mockOnClose).toHaveBeenCalledTimes(1)
  })

  it('renders video element correctly', () => {
    render(
      <SampleVideoModal 
        onClose={mockOnClose}
        isVisible={true}
        onSwitchToGuidelines={mockOnSwitchToGuidelines}
      />
    )
    
    const videoElement = screen.getByTestId('sample-video')
    expect(videoElement).toBeInTheDocument()
    expect(videoElement).toHaveAttribute('controls')
    expect(videoElement).toHaveAttribute('autoPlay')
    expect(videoElement).toHaveAttribute('muted')
  })
}) 