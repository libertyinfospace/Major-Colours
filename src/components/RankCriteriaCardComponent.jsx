import React, { useState, useCallback } from 'react'
import maleIcon from '../assets/logo/male.svg'
import femaleIcon from '../assets/logo/female.svg'

const RankCriteriaCardComponent = ({widthLen, heightLen, name, last, val1, val2}) => {
  const [isHovered, setIsHovered] = useState(false)

  const handleClose = useCallback(() => setIsHovered(false), [])

  return (
    <div 
      style={{ width: widthLen, height: heightLen }}
      className='rounded-lg relative flex items-center justify-center bg-[#484848]'
    >
      <div className='m-0 flex flex-col gap-0 leading-none text-white items-center'>
        <p className='text-[2.5rem]'>{name}</p>
        <p className='text-[2.5rem]'>{last}</p>
      </div>
      <div 
        className='absolute bottom-0 rounded-b-lg left-0 w-[100%] h-[25px] bg-[#252934] cursor-pointer'
        onMouseEnter={() => setIsHovered(true)}
      >
        <div className='flex justify-between text-white items-center px-4'>
          <p className='flex items-center'><img src={maleIcon} alt="Male" className='w-4 h-4 mr-1' />{val1}</p>
          <p className='flex items-center'><img src={femaleIcon} alt="Female" className='w-4 h-4 mr-1' />{val2}</p>
        </div>
      </div>

      {isHovered && (
        <div 
          className='fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50'
          onMouseLeave={handleClose}
        >
          <div className='bg-[#1F2937] p-8 rounded-lg w-[90%] max-w-[600px] min-h-[300px] mx-4'>
            <div className='flex justify-between items-center mb-6'>
              <h3 className='text-2xl font-bold text-white flex items-center'><img src={maleIcon} alt="Male" className='w-6 h-6 mr-2' />{val1}</h3>
              <button 
                onClick={handleClose}
                className='text-white hover:text-gray-200 text-2xl transition-colors duration-200'
              >
                ✕
              </button>
            </div>
            <div className='text-white space-y-4'>
              <p className='text-lg leading-relaxed'>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
              </p>
              <p className='text-lg leading-relaxed'>
                Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default React.memo(RankCriteriaCardComponent)
