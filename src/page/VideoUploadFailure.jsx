import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import LoginHeaderComponent from '../components/LoginHeaderComponent';

const VideoUploadFailure = () => {
  const navigate = useNavigate();
  const location = useLocation();
  // Get error message from location state or use a default message
  const errorMessage = location.state?.errorMessage || 'Your video upload failed. Please try again.';

  // Handle retry button click
  const handleRetry = () => {
    navigate('/register-video');
  };

  // Handle contact support button click
  const handleContactSupport = () => {
    // This could link to a support page or open an email client
    window.location.href = 'mailto:support@majorcolours.com';
  };

  return (
    <div className='w-[100%] min-h-screen relative bg-black'>
      <LoginHeaderComponent />
      
      <div className='flex flex-col items-center justify-center h-screen px-4'>
        <div className='max-w-2xl w-full bg-zinc-900 rounded-lg p-10 text-center'>
          {/* Error Icon */}
          <div className='w-24 h-24 mx-auto mb-6 rounded-full bg-red-500/10 flex items-center justify-center'>
            <svg className='w-12 h-12 text-red-500' fill='none' viewBox='0 0 24 24' stroke='currentColor'>
              <path 
                strokeLinecap='round' 
                strokeLinejoin='round' 
                strokeWidth={2} 
                d='M6 18L18 6M6 6l12 12' 
              />
            </svg>
          </div>

          {/* Error Title */}
          <h1 className='text-3xl font-bold text-white mb-4'>Video Upload Failed</h1>
          
          {/* Error Message */}
          <p className='text-gray-300 mb-8'>{errorMessage}</p>
          
          {/* Error Details - Common reasons */}
          <div className='bg-zinc-800 rounded-lg p-4 mb-8'>
            <h3 className='text-white font-medium mb-2'>Common reasons for failure:</h3>
            <ul className='text-gray-400 text-left list-disc list-inside space-y-1'>
              <li>Your internet connection was interrupted</li>
              <li>The video file size exceeded our 100MB limit</li>
              <li>The video format is not supported</li>
              <li>Our servers are experiencing high traffic</li>
            </ul>
          </div>

          {/* Action Buttons */}
          <div className='flex flex-col sm:flex-row gap-4 justify-center'>
            <button
              onClick={handleRetry}
              className='px-8 py-3 bg-white text-black rounded font-bold hover:bg-gray-200 transition-colors'
            >
              TRY AGAIN
            </button>
            <button
              onClick={handleContactSupport}
              className='px-8 py-3 border border-gray-600 text-white rounded hover:bg-gray-800 transition-colors'
            >
              CONTACT SUPPORT
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoUploadFailure; 