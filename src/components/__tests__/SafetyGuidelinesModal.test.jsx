import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import SafetyGuidelinesModal from '../SafetyGuidelinesModal'

describe('SafetyGuidelinesModal', () => {
  const mockOnClose = jest.fn()
  const mockOnSwitchToVideo = jest.fn()

  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('renders without crashing', () => {
    render(
      <SafetyGuidelinesModal 
        onClose={mockOnClose}
        isVisible={true}
        onSwitchToVideo={mockOnSwitchToVideo}
      />
    )
  })

  it('displays the correct content when visible', () => {
    render(
      <SafetyGuidelinesModal 
        onClose={mockOnClose}
        isVisible={true}
        onSwitchToVideo={mockOnSwitchToVideo}
      />
    )
    
    expect(screen.getByText('Safety Guidelines')).toBeInTheDocument()
    expect(screen.getByText('Sample Video')).toBeInTheDocument()
  })

  it('calls onClose when clicking the close button', () => {
    render(
      <SafetyGuidelinesModal 
        onClose={mockOnClose}
        isVisible={true}
        onSwitchToVideo={mockOnSwitchToVideo}
      />
    )
    
    const closeButton = screen.getByText('×')
    fireEvent.click(closeButton)
    
    expect(mockOnClose).toHaveBeenCalledTimes(1)
  })

  it('calls onSwitchToVideo when clicking the sample video button', () => {
    render(
      <SafetyGuidelinesModal 
        onClose={mockOnClose}
        isVisible={true}
        onSwitchToVideo={mockOnSwitchToVideo}
      />
    )
    
    const videoButton = screen.getByText('Sample Video').closest('div')
    fireEvent.click(videoButton)
    
    expect(mockOnSwitchToVideo).toHaveBeenCalledTimes(1)
  })

  it('calls onClose when clicking the overlay', () => {
    render(
      <SafetyGuidelinesModal 
        onClose={mockOnClose}
        isVisible={true}
        onSwitchToVideo={mockOnSwitchToVideo}
      />
    )
    
    const overlay = screen.getByTestId('modal-overlay')
    fireEvent.click(overlay)
    
    expect(mockOnClose).toHaveBeenCalledTimes(1)
  })

  it('renders all safety guidelines correctly', () => {
    render(
      <SafetyGuidelinesModal 
        onClose={mockOnClose}
        isVisible={true}
        onSwitchToVideo={mockOnSwitchToVideo}
      />
    )
    
    const guidelines = [
      "Always wear appropriate safety gear while performing any activity",
      "Ensure proper ventilation in the workspace",
      "Keep emergency contact numbers readily available",
      "Follow proper lifting techniques to prevent injuries",
      "Maintain a clean and organized work environment",
      "Report any safety hazards immediately",
      "Attend all safety training sessions",
      "Use equipment only after proper training",
      "Follow all posted safety signs and instructions",
      "Take regular breaks to prevent fatigue"
    ]
    
    guidelines.forEach(guideline => {
      expect(screen.getByText(guideline)).toBeInTheDocument()
    })
  })
}) 