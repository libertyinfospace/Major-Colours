import React, { useEffect, useState } from 'react'
import minusIcon from '../assets/logo/minus.svg'
import addIcon from '../assets/logo/add.svg'

const SafetyGuidelinesModal = ({ onClose, isVisible, onSwitchToVideo }) => {
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
  
  const handleSwitchToVideo = () => {
    onClose()
    onSwitchToVideo()
  }
  
  const safetyGuidelines = [
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
  
  return (
    <>
      {/* Overlay with faster fade animation */}
      <div 
        className={`fixed inset-0 bg-black transition-all duration-300 ease-in-out z-40 ${isVisible ? 'opacity-50' : 'opacity-0'}`}
        onClick={handleClose}
      ></div>
      
      {/* Bottom content container with faster slide-up animation */}
      <div className={`fixed bottom-0 right-0 z-50 overflow-hidden ${isMobile ? 'w-full' : 'w-1/2'}`}>
        <div 
          className={`w-full bg-backgroundColor border-t border-l border-[#484848] shadow-lg transition-all duration-300 ease-out origin-bottom transform ${isVisible ? 'translate-y-0 scale-100 opacity-100' : 'translate-y-full scale-90 opacity-0'}`}
          style={{ transformOrigin: 'bottom center' }}
        >
          <div className="flex flex-col">
            {/* Header with close button */}
            <div 
              className={`flex justify-between items-center p-4 transition-all duration-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'}`}
            >
              <h2 className="text-4xl font-bold text-white tracking-tight">Safety Guidelines</h2>
              <button 
                onClick={handleClose}
                className="bg-red-600 hover:bg-red-700 text-white w-10 h-10 rounded-full shadow-lg transition-colors duration-300 flex items-center justify-center p-0"
                aria-label="Close safety guidelines"
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

            {/* Safety Guidelines content with faster animation */}
            <div 
              className={`px-6 pb-6 transition-all duration-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'}`}
            >
              <div className="space-y-4">
                {safetyGuidelines.map((guideline, index) => (
                  <div key={index} className="space-y-4">
                    <div className="flex items-start gap-3">
                      <div className="w-2 h-2 rounded-full bg-white mt-2"></div>
                      <p className="text-white text-lg">{guideline}</p>
                    </div>
                    {index < safetyGuidelines.length - 1 && (
                      <div className="h-px bg-[#484848] w-full"></div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Bottom buttons with faster animation */}
            <div 
              className={`p-6 transition-all duration-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'}`}
            >
              <div className={`text-xl text-textWhiteColor flex ${isMobile ? 'w-full justify-start' : 'w-[60%] mx-auto justify-evenly'}`}>
                <div 
                  className="flex gap-3 cursor-pointer hover:opacity-80 transition-opacity duration-300 mr-6"
                  onClick={handleSwitchToVideo}
                >
                  <img src={addIcon} alt="View sample video" />
                  <p className={isMobile ? 'text-base' : 'text-xl'}>Sample Video</p>
                </div>
                <div 
                  className="flex gap-3 cursor-pointer hover:opacity-80 transition-opacity duration-300"
                  onClick={handleClose}
                >
                  <img src={minusIcon} alt="Close safety guidelines" />
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

export default SafetyGuidelinesModal 