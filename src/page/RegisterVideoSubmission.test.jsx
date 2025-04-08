import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import RegisterVideoSubmission from './RegisterVideoSubmission';

// Mock the useNavigate hook
const mockNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate,
}));

describe('RegisterVideoSubmission', () => {
  const renderComponent = () => {
    return render(
      <BrowserRouter>
        <RegisterVideoSubmission />
      </BrowserRouter>
    );
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders the video submission form correctly', () => {
    renderComponent();
    
    expect(screen.getByText('Video Submission')).toBeInTheDocument();
    expect(screen.getByText('Drag and drop your video here')).toBeInTheDocument();
    expect(screen.getByText('or click to browse files')).toBeInTheDocument();
    expect(screen.getByText('Maximum file size: 100MB')).toBeInTheDocument();
  });

  it('shows error when submitting without selecting a file', async () => {
    renderComponent();
    
    const submitButton = screen.getByText('Submit Video');
    fireEvent.click(submitButton);
    
    await waitFor(() => {
      expect(screen.getByText('Please select a video file')).toBeInTheDocument();
    });
  });

  it('shows error when uploading invalid file type', async () => {
    renderComponent();
    
    const file = new File(['test'], 'test.txt', { type: 'text/plain' });
    const input = screen.getByTestId('file-input');
    
    fireEvent.change(input, { target: { files: [file] } });
    
    await waitFor(() => {
      expect(screen.getByText('Please upload a valid video file')).toBeInTheDocument();
    });
  });

  it('shows error when uploading file larger than 100MB', async () => {
    renderComponent();
    
    const file = new File(['test'], 'test.mp4', { type: 'video/mp4' });
    Object.defineProperty(file, 'size', { value: 101 * 1024 * 1024 });
    
    const input = screen.getByTestId('file-input');
    fireEvent.change(input, { target: { files: [file] } });
    
    await waitFor(() => {
      expect(screen.getByText('Video file size should be less than 100MB')).toBeInTheDocument();
    });
  });

  it('handles successful file upload', async () => {
    renderComponent();
    
    const file = new File(['test'], 'test.mp4', { type: 'video/mp4' });
    const input = screen.getByTestId('file-input');
    
    fireEvent.change(input, { target: { files: [file] } });
    
    const submitButton = screen.getByText('Submit Video');
    fireEvent.click(submitButton);
    
    await waitFor(() => {
      expect(screen.getByText('Uploading...')).toBeInTheDocument();
    });
    
    await waitFor(() => {
      expect(mockNavigate).toHaveBeenCalledWith('/success');
    });
  });

  it('handles drag and drop functionality', async () => {
    renderComponent();
    
    const dropZone = screen.getByText('Drag and drop your video here').parentElement;
    const file = new File(['test'], 'test.mp4', { type: 'video/mp4' });
    
    fireEvent.dragOver(dropZone);
    fireEvent.drop(dropZone, {
      dataTransfer: {
        files: [file],
      },
    });
    
    await waitFor(() => {
      expect(screen.getByTestId('video-preview')).toBeInTheDocument();
    });
  });

  it('allows removing selected file', async () => {
    renderComponent();
    
    const file = new File(['test'], 'test.mp4', { type: 'video/mp4' });
    const input = screen.getByTestId('file-input');
    
    fireEvent.change(input, { target: { files: [file] } });
    
    const removeButton = screen.getByText('×');
    fireEvent.click(removeButton);
    
    await waitFor(() => {
      expect(screen.getByText('Drag and drop your video here')).toBeInTheDocument();
    });
  });
}); 