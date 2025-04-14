import React, { useEffect, useState } from 'react'
import { FaTimes } from 'react-icons/fa'
import sizeGuideImage from '../assets/img/Size Guide Image.png'

const SizeGuideModal = ({ onClose, isVisible }) => {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768)
  const [unit, setUnit] = useState('CM') // CM or IN
  
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768)
    }
    
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const handleClose = () => {
    onClose()
  }
  
  // Sizes data with both CM and IN units
  const sizesData = {
    CM: {
      'XXS': { chest: 58, sleeve: 63, length: 70.5, shoulder: 18 },
      'XS': { chest: 59.25, sleeve: 63, length: 71, shoulder: 18.45 },
      'S': { chest: 60.5, sleeve: 63, length: 71.5, shoulder: 18.9 },
      'M': { chest: 62, sleeve: 64, length: 72, shoulder: 19.5 },
      'L': { chest: 64, sleeve: 65, length: 73, shoulder: 20.2 },
      'XL': { chest: 66.5, sleeve: 66, length: 74, shoulder: 21 },
      'XXL': { chest: 69, sleeve: 67, length: 75, shoulder: 21.8 }
    },
    IN: {
      'XXS': { chest: 22.8, sleeve: 24.8, length: 27.8, shoulder: 7.1 },
      'XS': { chest: 23.3, sleeve: 24.8, length: 28, shoulder: 7.3 },
      'S': { chest: 23.8, sleeve: 24.8, length: 28.1, shoulder: 7.4 },
      'M': { chest: 24.4, sleeve: 25.2, length: 28.3, shoulder: 7.7 },
      'L': { chest: 25.2, sleeve: 25.6, length: 28.7, shoulder: 8 },
      'XL': { chest: 26.2, sleeve: 26, length: 29.1, shoulder: 8.3 },
      'XXL': { chest: 27.2, sleeve: 26.4, length: 29.5, shoulder: 8.6 }
    }
  }

  const toggleUnit = () => {
    setUnit(prev => prev === 'CM' ? 'IN' : 'CM')
  }
  
  // Prevent body scroll when modal is open
  useEffect(() => {
    if (isVisible) {
      document.body.classList.add('overflow-hidden');
    } else {
      document.body.classList.remove('overflow-hidden');
    }
    
    return () => {
      document.body.classList.remove('overflow-hidden');
    };
  }, [isVisible]);
  
  if (!isVisible) return null;
  
  return (
    <>
      {/* Overlay with fade animation */}
      <div 
        className="fixed inset-0 bg-black opacity-50 z-[999]"
        onClick={handleClose}
      ></div>
      
      {/* Sidebar Modal - Slides in from the right */}
      <div 
        className="fixed top-0 right-0 bottom-0 z-[1000] h-screen"
        style={{ width: isMobile ? '100%' : '450px' }}
      >
        <div className="h-full flex flex-col bg-[#121212] border-l border-gray-700 shadow-xl overflow-hidden">
          {/* Header with title and close button */}
          <div className="flex justify-between items-center p-3 border-b border-gray-700 bg-[#121212]">
            <h2 className="text-xl font-bold text-white">Size Guide</h2>
            <button 
              onClick={handleClose}
              className="text-gray-400 hover:text-white transition-colors"
              aria-label="Close size guide"
            >
              <FaTimes size={20} />
            </button>
          </div>
          
          {/* Content Area - No Scroll */}
          <div className="p-4 flex flex-col h-[calc(100%-50px)]">
            {/* Grid Layout to fit everything on one screen */}
            <div className="grid grid-rows-[auto_auto_1fr] h-full gap-5">
              {/* Hoodie Illustration - Smaller size */}
              <div className="bg-gray-800/20 rounded-lg p-3">
                <img 
                  src={sizeGuideImage} 
                  alt="Hoodie dimensions illustration"
                  className="w-full h-auto max-h-[28vh] object-contain rounded-lg mx-auto"
                />
              </div>
              
              {/* Model Info & Unit Toggle on the same line */}
              <div className="bg-gray-800/20 rounded-lg p-3">
                <div className="flex flex-wrap justify-between items-center">
                  <p className="text-gray-300 text-sm mr-2">Model: 182cm/73kg (M)</p>
                  
                  {/* Unit Toggle */}
                  <div className="flex items-center bg-gray-800 rounded-full p-1">
                    <button 
                      className={`px-3 py-1 rounded-full text-sm transition-colors ${unit === 'CM' ? 'bg-white text-black' : 'text-gray-300'}`}
                      onClick={() => setUnit('CM')}
                    >
                      CM
                    </button>
                    <button 
                      className={`px-3 py-1 rounded-full text-sm transition-colors ${unit === 'IN' ? 'bg-white text-black' : 'text-gray-300'}`}
                      onClick={() => setUnit('IN')}
                    >
                      IN
                    </button>
                  </div>
                </div>
              </div>
              
              {/* Size Table - Takes remaining space */}
              <div className="bg-gray-800/20 rounded-lg">
                <div className="rounded-lg overflow-hidden border border-gray-600 shadow-lg">
                  {/* Table Header */}
                  <div className="grid grid-cols-5 bg-gray-800 text-white font-semibold text-sm">
                    <div className="p-2.5 text-center border-r border-gray-600">Size</div>
                    <div className="p-2.5 text-center border-r border-gray-600">Chest</div>
                    <div className="p-2.5 text-center border-r border-gray-600">Sleeve</div>
                    <div className="p-2.5 text-center border-r border-gray-600">Length</div>
                    <div className="p-2.5 text-center">Shoulder</div>
                  </div>
                  
                  {/* Table Body */}
                  <div className="text-gray-200 text-sm">
                    {Object.entries(sizesData[unit]).map(([size, measurements], index) => (
                      <div 
                        key={size} 
                        className={`grid grid-cols-5 ${index !== Object.keys(sizesData[unit]).length - 1 ? 'border-b border-gray-600' : ''}`}
                      >
                        <div className="p-2.5 text-center font-medium border-r border-gray-600 bg-gray-700/30">{size}</div>
                        <div className="p-2.5 text-center border-r border-gray-600">{measurements.chest}</div>
                        <div className="p-2.5 text-center border-r border-gray-600">{measurements.sleeve}</div>
                        <div className="p-2.5 text-center border-r border-gray-600">{measurements.length}</div>
                        <div className="p-2.5 text-center">{measurements.shoulder}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default SizeGuideModal 