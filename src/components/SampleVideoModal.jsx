import React, { useEffect, useState } from 'react'
import minusIcon from '../assets/logo/minus.svg'
import addIcon from '../assets/logo/add.svg'
import sampleVideo from '../assets/video/sample video.mp4'

const SampleVideoModal = ({ onClose, isVisible, onSwitchToGuidelines }) => {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 600)
  
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 600)
    }
    
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const handleClose = () => {
    onClose()
  }
  
  const handleSwitchToGuidelines = () => {
    onClose()
    onSwitchToGuidelines()
  }
  
  return (
    <>
      {/* Overlay with faster fade animation */}
      <div 
        className={`fixed inset-0 bg-black transition-all duration-300 ease-in-out z-40 ${isVisible ? 'opacity-50' : 'opacity-0'}`}
        onClick={handleClose}
        data-testid="modal-overlay"
      ></div>
      
      {/* Bottom content container with faster slide-up animation */}
      <div className={`fixed bottom-0 right-0 z-50 ${isMobile ? 'w-full' : 'w-1/2'}`}>
        <div 
          className={`w-full bg-backgroundColor border-t border-l border-[#484848] shadow-lg transition-all duration-300 ease-out origin-bottom transform ${isVisible ? 'translate-y-0 scale-100 opacity-100' : 'translate-y-full scale-90 opacity-0'}`}
          style={{ transformOrigin: 'bottom center' }}
        >
          <div className="flex flex-col">
            {/* Header with close button */}
            <div 
              className={`flex justify-between items-center p-4 transition-all duration-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'}`}
            >
              <h2 className="text-4xl font-bold text-white tracking-tight">Sample Video</h2>
              <button 
                onClick={handleClose}
                className="bg-red-600 hover:bg-red-700 text-white w-10 h-10 rounded-full shadow-lg transition-colors duration-300 flex items-center justify-center p-0"
                aria-label="Close sample video"
              >
                <svg 
                  width="16" 
                  height="16" 
                  viewBox="0 0 16 16" 
                  fill="none" 
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path 
                    d="M1 1L15 15M1 15L15 1" 
                    stroke="white" 
                    strokeWidth="2" 
                    strokeLinecap="round"
                  />
                </svg>
              </button>
            </div>

            {/* Video container with faster animation */}
            <div 
              className={`px-4 pb-4 transition-all duration-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'}`}
            >
              <div className={`w-full ${isMobile ? 'h-[250px]' : 'h-[400px]'} bg-[#484848] rounded-lg`}>
                <video 
                  className="w-full h-full object-fill"
                  autoPlay
                  loop
                  muted
                  data-testid="sample-video"
                >
                  <source src={sampleVideo} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              </div>
            </div>

            {/* Bottom buttons with faster animation */}
            <div 
              className={`p-6 transition-all duration-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'}`}
            >
              <div className={`text-xl text-textWhiteColor flex ${isMobile ? 'w-full justify-start' : 'w-[60%] mx-auto justify-evenly'}`}>
                <div 
                  className="flex gap-3 cursor-pointer hover:opacity-80 transition-opacity duration-300 mr-6"
                  onClick={handleClose}
                >
                  <img src={minusIcon} alt="Close sample video" />
                  <p className={isMobile ? 'text-base' : 'text-xl'}>Sample Video</p>
                </div>
                <div 
                  className="flex gap-3 cursor-pointer hover:opacity-80 transition-opacity duration-300"
                  onClick={handleSwitchToGuidelines}
                >
                  <img src={addIcon} alt="View safety guidelines" />
                  <p className={isMobile ? 'text-base' : 'text-xl'}>Safety Guidelines</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default SampleVideoModal 