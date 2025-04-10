import React from 'react';
import { useNavigate } from 'react-router-dom';

const VideoUploadFailure = () => {
  const navigate = useNavigate();
  
  const handleRetry = () => {
    // Navigate to register-video page
    navigate('/register-video');
  };

  return (
    <div className="w-full bg-black flex flex-col items-center justify-center">
      <div className="w-full max-w-xs sm:max-w-md md:max-w-lg lg:max-w-2xl mx-auto">
        <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-white uppercase text-center mb-6 sm:mb-8 leading-tight">
          Promotion to the rank of bident has been paused
        </h1>

        <p className="text-[#CCCCCC] text-sm sm:text-base md:text-lg text-center mb-6 sm:mb-8">
          There might be issues with your video submission that need to be addressed. Please review the following concerns and resubmit your video with improved form and safety measures.
        </p>

        <div className="space-y-4 sm:space-y-6">
          {/* Violation Card 1 */}
          <div className="bg-black border-b border-[#FF3C00] pb-4 transition-transform hover:translate-x-1 hover:shadow-md">
            <div className="flex items-start gap-3 sm:gap-4">
              <span className="text-[#FF3C00] text-xl sm:text-2xl flex-shrink-0 mt-1">⚠️</span>
              <div className="flex-1">
                <h2 className="text-[#FF3C00] font-bold text-base sm:text-lg md:text-xl mb-1 sm:mb-2">
                  Lifting Beyond Your Strength Level
                </h2>
                <p className="text-[#CCCCCC] text-sm sm:text-base">
                  Attempting weights far above your capacity.
                </p>
              </div>
            </div>
          </div>

          {/* Violation Card 2 */}
          <div className="bg-black border-b border-[#FF3C00] pb-4 transition-transform hover:translate-x-1 hover:shadow-md">
            <div className="flex items-start gap-3 sm:gap-4">
              <span className="text-[#FF3C00] text-xl sm:text-2xl flex-shrink-0 mt-1">⚠️</span>
              <div className="flex-1">
                <h2 className="text-[#FF3C00] font-bold text-base sm:text-lg md:text-xl mb-1 sm:mb-2">
                  Not Using Safety Equipment
                </h2>
                <p className="text-[#CCCCCC] text-sm sm:text-base">
                  Avoiding belts, wrist wraps, knee sleeves, and spotters when necessary.
                </p>
              </div>
            </div>
          </div>

          {/* Violation Card 3 */}
          <div className="bg-black border-b border-[#FF3C00] pb-4 transition-transform hover:translate-x-1 hover:shadow-md">
            <div className="flex items-start gap-3 sm:gap-4">
              <span className="text-[#FF3C00] text-xl sm:text-2xl flex-shrink-0 mt-1">⚠️</span>
              <div className="flex-1">
                <h2 className="text-[#FF3C00] font-bold text-base sm:text-lg md:text-xl mb-1 sm:mb-2">
                  Ignoring Warm-ups and Mobility Work
                </h2>
                <p className="text-[#CCCCCC] text-sm sm:text-base">
                  Skipping warm-ups and flexibility drills.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 sm:mt-10 md:mt-12 text-center">
          <button
            onClick={handleRetry}
            className="px-6 sm:px-8 py-2 sm:py-3 bg-white text-black font-bold rounded text-sm sm:text-base transition-all duration-300 hover:bg-black hover:text-white hover:border hover:border-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-50 transform hover:scale-105"
          >
            RETRY SUBMISSION
          </button>
        </div>
      </div>
    </div>
  );
};

export default VideoUploadFailure; 