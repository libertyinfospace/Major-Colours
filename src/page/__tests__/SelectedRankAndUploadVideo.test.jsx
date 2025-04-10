import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import { Provider } from 'react-redux'
import configureStore from 'redux-mock-store'
import SelectedRankAndUploadVideo from '../SelectedRankAndUploadVideo'

const mockStore = configureStore([])

describe('SelectedRankAndUploadVideo', () => {
  let store

  beforeEach(() => {
    store = mockStore({
      active: {
        rankCriteriaData: [
          { name: 'Test 1', val1: 'Value 1', val2: 'Value 2' },
          { name: 'Test 2', val1: 'Value 3', val2: 'Value 4' }
        ]
      }
    })
  })

  it('renders without crashing', () => {
    render(
      <Provider store={store}>
        <SelectedRankAndUploadVideo />
      </Provider>
    )
  })

  it('displays the correct title', () => {
    render(
      <Provider store={store}>
        <SelectedRankAndUploadVideo />
      </Provider>
    )
    expect(screen.getByText('CRITERIA')).toBeInTheDocument()
  })

  it('shows sample video modal when clicking sample video button', () => {
    render(
      <Provider store={store}>
        <SelectedRankAndUploadVideo />
      </Provider>
    )
    
    const sampleVideoButton = screen.getByText('Sample Video').closest('div')
    fireEvent.click(sampleVideoButton)
    
    expect(screen.getByText('Sample Video')).toBeInTheDocument()
  })

  it('shows safety guidelines modal when clicking safety guidelines button', () => {
    render(
      <Provider store={store}>
        <SelectedRankAndUploadVideo />
      </Provider>
    )
    
    const guidelinesButton = screen.getByText('Safety Guidelines').closest('div')
    fireEvent.click(guidelinesButton)
    
    expect(screen.getByText('Safety Guidelines')).toBeInTheDocument()
  })

  it('switches between modals correctly', () => {
    render(
      <Provider store={store}>
        <SelectedRankAndUploadVideo />
      </Provider>
    )
    
    // Open sample video modal
    const sampleVideoButton = screen.getByText('Sample Video').closest('div')
    fireEvent.click(sampleVideoButton)
    
    // Switch to guidelines
    const guidelinesButton = screen.getByText('Safety Guidelines').closest('div')
    fireEvent.click(guidelinesButton)
    
    expect(screen.getByText('Safety Guidelines')).toBeInTheDocument()
  })

  it('closes modals correctly', () => {
    render(
      <Provider store={store}>
        <SelectedRankAndUploadVideo />
      </Provider>
    )
    
    // Open sample video modal
    const sampleVideoButton = screen.getByText('Sample Video').closest('div')
    fireEvent.click(sampleVideoButton)
    
    // Close modal
    const closeButton = screen.getByText('×')
    fireEvent.click(closeButton)
    
    expect(screen.queryByText('Sample Video')).not.toBeInTheDocument()
  })

  it('renders rank criteria cards correctly', () => {
    render(
      <Provider store={store}>
        <SelectedRankAndUploadVideo />
      </Provider>
    )
    
    expect(screen.getByText('Test 1')).toBeInTheDocument()
    expect(screen.getByText('Test 2')).toBeInTheDocument()
  })
}) 