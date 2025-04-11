import React, { useState, useCallback, useEffect } from 'react'
import maleIcon from '../assets/logo/male.svg'
import femaleIcon from '../assets/logo/female.svg'

const RankCriteriaCardComponent = ({widthLen, heightLen, name, last, val1, val2}) => {
  const [hoveredValue, setHoveredValue] = useState(null)
  const [isSmallScreen, setIsSmallScreen] = useState(false)

  // Add responsive breakpoint detection
  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth < 766);
    };
    
    // Set initial value
    handleResize();
    
    // Add event listener
    window.addEventListener('resize', handleResize);
    
    // Cleanup
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Add testing function to monitor breakpoints and widths
  const testBreakpoints = () => {
    console.log(`Screen width: ${window.innerWidth}px`);
    console.log(`Is small screen: ${isSmallScreen}`);
    console.log(`Card width: ${isSmallScreen ? '250px' : widthLen}`);
  }
  
  useEffect(() => {
    // For testing purposes
    testBreakpoints();
  }, [isSmallScreen, widthLen]);

  const handleClose = useCallback(() => setHoveredValue(null), [])

  // Extract numeric value from val1/val2 if they contain numbers
  const extractNumeric = (val) => {
    const match = val.toString().match(/(\d+)/);
    return match ? parseInt(match[0]) : 0;
  }

  // Weight conversion function (kg to pounds)
  const kgToPounds = (kg) => {
    return (kg * 2.20462).toFixed(0);
  }

  // Set a larger fixed width for small screens to prevent overflow
  const cardWidth = isSmallScreen ? '250px' : widthLen;

  return (
    <div 
      style={{ 
        width: cardWidth, 
        height: heightLen,
        minWidth: isSmallScreen ? '250px' : 'auto' 
      }}
      className='rounded-lg relative flex items-center justify-center bg-[#484848] rank-criteria-card'
    >
      <div className='m-0 flex flex-col gap-0 leading-none text-white items-center'>
        <p className='text-[2.5rem]'>{name}</p>
        <p className='text-[2.5rem]'>{last}</p>
      </div>
      <div 
        className='absolute bottom-0 rounded-b-lg left-0 w-[100%] h-[25px] bg-[#252934]'
      >
        <div className='flex justify-between text-white items-center md:px-4 px-2'>
          <p 
            className='flex items-center cursor-pointer truncate max-w-[45%] text-sm sm:text-base' 
            onMouseEnter={() => setHoveredValue('val1')}
            title={`${val1}`}
          >
            <img src={maleIcon} alt="Male" className='w-4 h-4 mr-1 flex-shrink-0' />{val1}
          </p>
          <p 
            className='flex items-center cursor-pointer truncate max-w-[45%] text-sm sm:text-base'
            onMouseEnter={() => setHoveredValue('val2')}
            title={`${val2}`}
          >
            <img src={femaleIcon} alt="Female" className='w-4 h-4 mr-1 flex-shrink-0' />{val2}
          </p>
        </div>
      </div>

      {hoveredValue && (
        <div 
          className='fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-[9999]'
          onMouseLeave={handleClose}
        >
          <div className='bg-[#1F2937] p-8 rounded-lg w-[90%] max-w-[600px] min-h-[300px] mx-4'>
            <div className='flex justify-between items-center mb-6'>
              <h3 className='text-2xl font-bold text-white flex items-center'>
                {hoveredValue === 'val1' ? (
                  <>
                    <img src={maleIcon} alt="Male" className='w-6 h-6 mr-2' />{val1}
                  </>
                ) : (
                  <>
                    <img src={femaleIcon} alt="Female" className='w-6 h-6 mr-2' />{val2}
                  </>
                )}
              </h3>
              <button 
                onClick={handleClose}
                className='text-white hover:text-gray-200 text-2xl transition-colors duration-200'
              >
                ✕
              </button>
            </div>
            <div className='text-white space-y-4'>
              <p className='text-lg leading-relaxed'>
                {hoveredValue === 'val1' ? (
                  <>
                    Example {extractNumeric(val1)}kg ({kgToPounds(extractNumeric(val1))}lbs) Male with a {name}-{last} of {(extractNumeric(val1) * 0.5).toFixed(0)}kg ({kgToPounds(extractNumeric(val1) * 0.5)}lbs) (0.5 x BW)
                  </>
                ) : (
                  <>
                    Example {extractNumeric(val2)}kg ({kgToPounds(extractNumeric(val2))}lbs) Female with a {name}-{last} of {(extractNumeric(val2) * 0.5).toFixed(0)}kg ({kgToPounds(extractNumeric(val2) * 0.5)}lbs) (0.5 x BW)
                  </>
                )}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default React.memo(RankCriteriaCardComponent)
