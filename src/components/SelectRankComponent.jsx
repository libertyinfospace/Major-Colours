import React, { useEffect, useState } from 'react'
import { CiCirclePlus } from "react-icons/ci";
import { useSelector } from 'react-redux';

const SelectRankComponent = ({ onVideoClick }) => {
    const [isSmallScreen, setIsSmallScreen] = useState(false);
    const selectedRank = useSelector(store => store.active.rankCretriaActiveState);
    
    // Add responsive breakpoint detection
    useEffect(() => {
      const handleResize = () => {
        setIsSmallScreen(window.innerWidth < 765);
      };
      
      // Set initial value
      handleResize();
      
      // Add event listener
      window.addEventListener('resize', handleResize);
      
      // Cleanup
      return () => window.removeEventListener('resize', handleResize);
    }, []);

    // Add CSS for width control on small screens
    useEffect(() => {
      const style = document.createElement('style');
      style.innerHTML = `
        @media (max-width: 764px) {
          .select-rank-container {
            min-width: 100%;
            overflow-x: auto;
            padding: 0 !important;
          }
          
          .rank-card {
            min-width: 280px !important;
            width: 100% !important;
          }
        }
      `;
      document.head.appendChild(style);
      return () => document.head.removeChild(style);
    }, []);
    
    const handleDivClick = () => {
      onVideoClick();
    };

  return (
    <div className='flex flex-col gap-3 w-[95%] sm:w-[90%] md:w-[95%] mx-auto select-rank-container'>
      
      <div
        className={`group relative flex items-center w-full h-[14rem] sm:h-[16rem] md:h-[18rem] lg:h-[19.5rem] rounded-xl bg-[#504F4F] border-2 border-dotted border-white px-4 flex-col gap-2 sm:gap-3 justify-center cursor-pointer transition-all duration-300 hover:bg-[#5a5959] hover:shadow-lg rank-card`}
        onClick={handleDivClick}
        style={{ minWidth: isSmallScreen ? '280px' : 'auto' }}
      >
        <CiCirclePlus className='text-[2.5rem] sm:text-[3rem] text-white transition-transform duration-300 ease-in-out group-hover:scale-110' />
        <p className='text-[1.25rem] sm:text-[1.5rem] md:text-[1.8125rem] text-textWhiteColor font-bold text-center px-2 sm:px-4 md:px-6 lg:px-8'>{`SUBMIT A VIDEO FOR THE RANK OF ${selectedRank?.name1 || 'SPEAR'}`}</p>
      </div>
    </div>
  )
}

export default SelectRankComponent
