import React from 'react'
import minusIcon from '../assets/logo/minus.svg'
import addIcon from '../assets/logo/add.svg'
import sampleVideo from '../assets/video/sample video.mp4'

const SampleVideoModal = ({ onClose, isVisible, onSwitchToGuidelines }) => {
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
      ></div>
      
      {/* Bottom content container with faster slide-up animation */}
      <div className="fixed bottom-0 right-0 w-1/2 z-50 overflow-hidden">
        <div 
          className={`w-full bg-backgroundColor border-t border-l border-[#484848] shadow-lg transition-all duration-300 ease-out origin-bottom transform ${isVisible ? 'translate-y-0 scale-100 opacity-100' : 'translate-y-full scale-90 opacity-0'}`}
          style={{ transformOrigin: 'bottom center' }}
        >
          <div className="flex flex-col">
            {/* Header with close button */}
            <div 
              className={`flex justify-end p-4 transition-all duration-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'}`}
            >
              <button 
                onClick={handleClose}
                className="text-white text-xl font-bold hover:text-gray-300 transition-colors duration-300"
              >
                ×
              </button>
            </div>

            {/* Video container with faster animation */}
            <div 
              className={`h-[400px] p-4 transition-all duration-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'}`}
            >
              <div className="w-full h-full bg-[#484848] rounded-lg overflow-hidden">
                <video 
                  className="w-full h-full object-contain"
                  controls
                  autoPlay
                  muted
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
              <div className="w-[60%] mx-auto text-xl justify-evenly text-textWhiteColor flex">
                <div 
                  className="flex gap-3 cursor-pointer hover:opacity-80 transition-opacity duration-300"
                  onClick={handleClose}
                >
                  <img src={minusIcon} alt="Close sample video" />
                  <p>Sample Video</p>
                </div>
                <div 
                  className="flex gap-3 cursor-pointer hover:opacity-80 transition-opacity duration-300"
                  onClick={handleSwitchToGuidelines}
                >
                  <img src={addIcon} alt="View safety guidelines" />
                  <p>Safety Guidelines</p>
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