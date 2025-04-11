import React, { useMemo, useCallback, useState, useEffect, useRef } from 'react'
import ProfileHeader from '../components/ProfileHeader'
import PersonalDetailsComponent from '../components/PersonalDetailsComponent'
import SelectRankComponent from '../components/SelectRankComponent'
import RankCriteriaIconComponent from '../components/RankCriteriaIconComponent'
import RankCriteriaLineComponent from '../components/RankCriteriaLineComponent'
import spearIcon from '../assets/logo/Spear-active-icon.svg'
import spearIcon1 from '../assets/logo/Spear-icon-normal.svg'
import bidentIcon from '../assets/logo/Bident-active-icon.svg'
import bidentIcon1 from '../assets/logo/Bident-icon-normal.svg'
import tridentIcon from '../assets/logo/Trident-active-icon.svg'
import tridentIcon1 from '../assets/logo/Trident-icon-normal.svg'
import excalibur from '../assets/logo/Excalibur-active-icon.svg'
import excalibur1 from '../assets/logo/Excalibur-icon-normal.svg'
import dummyData from '../utils/dummyData'
import { useSelector } from 'react-redux'
import RankCriteriaCardComponent from '../components/RankCriteriaCardComponent'
import RankCriteriaOrComponent from '../components/RankCriteriaOrComponent'
import FooterLinkComponent from '../components/FooterLinkComponent'
import addIcon from '../assets/logo/add.svg'
import minusIcon from '../assets/logo/minus.svg'
import SampleVideoModal from '../components/SampleVideoModal'
import SafetyGuidelinesModal from '../components/SafetyGuidelinesModal'
import RegisterVideoSubmission from './RegisterVideoSubmission'

// Define rank icon data outside component to prevent recreation on each render
const rankIconsData = [
  { 
    iconPath: spearIcon, 
    iconPath1: spearIcon1, 
    name1: "SPEAR", 
    name2: "LEVEL 1", 
    altName: "spear level 1"
  },
  { 
    iconPath: bidentIcon, 
    iconPath1: bidentIcon1, 
    name1: "BIDENT", 
    name2: "LEVEL 2", 
    altName: "bident level 1"
  },
  { 
    iconPath: tridentIcon, 
    iconPath1: tridentIcon1, 
    name1: "TRIDENT", 
    name2: "LEVEL 3", 
    altName: "trident level 1"
  },
  { 
    iconPath: excalibur, 
    iconPath1: excalibur1, 
    name1: "EXCALIBUR", 
    name2: "LEVEL 4", 
    altName: "excalibur level 1"
  }
];

// Custom Line component to avoid editing the original RankCriteriaLineComponent
const ConnectingLine = () => (
  <div className="flex items-center justify-center flex-shrink-0">
    <div className="bg-[#484848] h-[2px] relative top-[-20px] w-[60px] xs:w-[70px] sm:w-[90px] md:w-[120px] lg:w-[140px] xl:w-[170px]"></div>
  </div>
);

const SelectedRankAndUploadVideo = ({ hideHeaderFooter = false }) => {
  const rankCriteriaData = useSelector((state) => state.active?.rankCriteriaData)
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false)
  const [isGuidelinesModalOpen, setIsGuidelinesModalOpen] = useState(false)
  const [activeButton, setActiveButton] = useState(null)
  const [isMobile, setIsMobile] = useState(false)
  const [isTablet, setIsTablet] = useState(false)
  const [isLaptop, setIsLaptop] = useState(false)
  const [isSmallScreen, setIsSmallScreen] = useState(false)
  const [showVideoSubmission, setShowVideoSubmission] = useState(false)
  
  // Refs for scrollable containers
  const rankIconsRef = useRef(null);
  const criteriaCardsRef = useRef(null);
  
  // Enhanced resize effect with more precise breakpoints
  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      setIsMobile(width < 640);
      setIsTablet(width >= 640 && width < 1024);
      setIsLaptop(width >= 1024 && width < 1440);
      setIsSmallScreen(width < 765);
    };
    
    // Set initial value
    handleResize();
    
    // Add event listener
    window.addEventListener('resize', handleResize);
    
    // Cleanup
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Define and apply custom scrolling styles
  useEffect(() => {
    const style = document.createElement('style');
    style.innerHTML = `
      .scrollable-container {
        overflow-x: auto;
        overflow-y: hidden;
        -webkit-overflow-scrolling: touch;
        scroll-behavior: smooth;
        scroll-snap-type: x proximity;
        padding-bottom: 10px;
        width: 100%;
        /* Hide scrollbars by default */
        scrollbar-width: none;
        -ms-overflow-style: none;
      }

      .scrollable-container::-webkit-scrollbar {
        display: none;
      }

      .scrollable-item {
        scroll-snap-align: start;
      }
      
      /* Rank icons row styles */
      .rank-icons-row {
        display: flex;
        align-items: center;
        padding: 0.5rem 0;
        gap: 0.25rem;
      }
      
      /* On large screens, distribute items evenly */
      @media (min-width: 1024px) {
        .rank-icons-row {
          justify-content: space-between;
          width: 100% !important;
          max-width: 100%;
        }
        
        .rank-icon-wrapper {
          flex: 1;
          display: flex;
          justify-content: center;
        }
      }
      
      /* On smaller screens, use scrolling with fixed width */
      @media (max-width: 1023px) {
        .rank-icons-row {
          justify-content: flex-start;
          width: max-content !important;
          min-width: 100%;
        }
      }

      /* Main bordered container responsive styles */
      .main-container {
        width: 100%;
        padding: 1.5rem;
        border-radius: 8px;
        max-width: 1200px;
        margin: 0 auto;
      }

      /* Full width on large screens */
      @media (min-width: 1280px) {
        .main-container {
          width: 90%;
        }
      }

      /* Adjusted width for medium screens */
      @media (min-width: 768px) and (max-width: 1279px) {
        .main-container {
          width: 95%;
        }
      }

      /* Smaller screens get horizontal scroll */
      @media (max-width: 767px) {
        .main-container {
          width: 100%;
          padding: 1rem;
          overflow-x: hidden;
        }
        
        .scrollable-section {
          overflow-x: auto;
          width: 100%;
          white-space: nowrap;
          padding-bottom: 8px;
          /* Hide scrollbar on mobile too */
          scrollbar-width: none;
          -ms-overflow-style: none;
        }
        
        .scrollable-section::-webkit-scrollbar {
          display: none;
        }
      }

      @media (max-width: 640px) {
        .scrollable-container {
          padding-left: 4px;
          padding-right: 4px;
        }
        
        .rank-icons-row, .card-container-inner {
          min-width: max-content !important;
        }
      }
    `;
    document.head.appendChild(style);
    
    return () => document.head.removeChild(style);
  }, []);

  // Add touch scroll handling for better mobile experience
  useEffect(() => {
    const containers = [rankIconsRef.current, criteriaCardsRef.current];
    
    containers.forEach(container => {
      if (!container) return;
      
      let isDown = false;
      let startX;
      let scrollLeft;
      
      const mouseDownHandler = (e) => {
        isDown = true;
        container.style.cursor = 'grabbing';
        startX = e.pageX - container.offsetLeft;
        scrollLeft = container.scrollLeft;
      };
      
      const mouseLeaveHandler = () => {
        isDown = false;
        container.style.cursor = 'grab';
      };
      
      const mouseUpHandler = () => {
        isDown = false;
        container.style.cursor = 'grab';
      };
      
      const mouseMoveHandler = (e) => {
        if (!isDown) return;
        e.preventDefault();
        const x = e.pageX - container.offsetLeft;
        const walk = (x - startX) * 2; // Faster scroll
        container.scrollLeft = scrollLeft - walk;
      };
      
      const touchStartHandler = (e) => {
        isDown = true;
        startX = e.touches[0].pageX - container.offsetLeft;
        scrollLeft = container.scrollLeft;
      };
      
      const touchEndHandler = () => {
        isDown = false;
      };
      
      const touchMoveHandler = (e) => {
        if (!isDown) return;
        const x = e.touches[0].pageX - container.offsetLeft;
        const walk = (x - startX) * 2; // Faster scroll
        container.scrollLeft = scrollLeft - walk;
      };
      
      container.addEventListener('mousedown', mouseDownHandler);
      container.addEventListener('mouseleave', mouseLeaveHandler);
      container.addEventListener('mouseup', mouseUpHandler);
      container.addEventListener('mousemove', mouseMoveHandler);
      
      container.addEventListener('touchstart', touchStartHandler);
      container.addEventListener('touchend', touchEndHandler);
      container.addEventListener('touchmove', touchMoveHandler);
      
      return () => {
        container.removeEventListener('mousedown', mouseDownHandler);
        container.removeEventListener('mouseleave', mouseLeaveHandler);
        container.removeEventListener('mouseup', mouseUpHandler);
        container.removeEventListener('mousemove', mouseMoveHandler);
        
        container.removeEventListener('touchstart', touchStartHandler);
        container.removeEventListener('touchend', touchEndHandler);
        container.removeEventListener('touchmove', touchMoveHandler);
      };
    });
  }, [showVideoSubmission]); // Re-add listeners when content changes

  // Define additional CSS for responsive design - will be added to head
  useEffect(() => {
    const style = document.createElement('style');
    style.innerHTML = `
      /* Custom xs breakpoint styles */
      @media (min-width: 480px) {
        .xs\\:scale-95 {
          transform: scale(0.95);
        }
        .xs\\:w-\\[70px\\] {
          width: 70px;
        }
        .xs\\:gap-2 {
          gap: 0.5rem;
        }
        .xs\\:mx-2 {
          margin-left: 0.5rem;
          margin-right: 0.5rem;
        }
        .xs\\:mt-6 {
          margin-top: 1.5rem;
        }
      }
      
      /* Additional media query for extremely small screens */
      @media (max-width: 360px) {
        .xxs\\:mt-12 {
          margin-top: 3rem !important;
        }
      }
      
      /* Improved smooth scrolling */
      .smooth-scroll {
        scroll-behavior: smooth;
        -webkit-overflow-scrolling: touch;
      }
      
      /* Fix for screens under 765px */
      @media (max-width: 764px) {
        .card-container {
          min-width: 100%;
          overflow-x: auto !important;
          padding: 0 !important;
          touch-action: pan-x !important;
          -ms-touch-action: pan-x !important;
        }
        
        .card-container-inner {
          min-width: 100% !important;
          width: max-content !important;
          padding-bottom: 15px !important;
          touch-action: pan-x !important;
          -ms-touch-action: pan-x !important;
        }
        
        .rank-icons-row {
          min-width: 100% !important;
          width: max-content !important;
          padding-bottom: 15px !important;
          padding-left: 10px !important;
          padding-right: 10px !important;
          touch-action: pan-x !important;
          -ms-touch-action: pan-x !important;
        }
      }
      
      /* Ensure elements stay visible during horizontal scroll */
      .scroll-padding {
        scroll-padding: 1rem;
      }
      
      /* Better touch targets for mobile */
      @media (max-width: 640px) {
        .touch-target {
          min-height: 44px;
          min-width: 44px;
          display: flex;
          align-items: center;
        }
      }
    `;
    document.head.appendChild(style);
    return () => document.head.removeChild(style);
  }, []);

  // Add CSS rule to hide webkit scrollbars (used selectively)
  useEffect(() => {
    // Create a stylesheet for hiding scrollbars
    const style = document.createElement('style');
    style.innerHTML = `
      /* Hide scrollbar for Chrome, Safari and Opera */
      .hide-scrollbar::-webkit-scrollbar {
        display: none;
      }
      
      /* Hide scrollbar for IE, Edge and Firefox */
      .hide-scrollbar {
        -ms-overflow-style: none;  /* IE and Edge */
        scrollbar-width: none;  /* Firefox */
      }
    `;
    document.head.appendChild(style);

    return () => {
      document.head.removeChild(style);
    };
  }, []);

  // Memoize the rank icons to prevent unnecessary re-renders
  const renderRankIcons = useMemo(() => (
    <div className="rank-icons-row">
      <div className="rank-icon-wrapper">
        <div className="flex items-center flex-shrink-0 transform scale-90 xs:scale-95 sm:scale-100 scrollable-item">
          <RankCriteriaIconComponent 
            {...rankIconsData[0]} 
            data={dummyData[0]} 
          />
        </div>
      </div>
      
      <ConnectingLine />
      
      <div className="rank-icon-wrapper">
        <div className="flex items-center flex-shrink-0 transform scale-90 xs:scale-95 sm:scale-100 scrollable-item">
          <RankCriteriaIconComponent 
            {...rankIconsData[1]} 
            data={dummyData[1]} 
          />
        </div>
      </div>
      
      <ConnectingLine />
      
      <div className="rank-icon-wrapper">
        <div className="flex items-center flex-shrink-0 transform scale-90 xs:scale-95 sm:scale-100 scrollable-item">
          <RankCriteriaIconComponent 
            {...rankIconsData[2]} 
            data={dummyData[2]} 
          />
        </div>
      </div>
      
      <ConnectingLine />
      
      <div className="rank-icon-wrapper">
        <div className="flex items-center flex-shrink-0 transform scale-90 xs:scale-95 sm:scale-100 scrollable-item">
          <RankCriteriaIconComponent 
            {...rankIconsData[3]} 
            data={dummyData[3]} 
          />
        </div>
      </div>
    </div>
  ), []);

  // Improved card width calculation for better responsiveness
  const calculateCardWidth = useCallback(() => {
    if (!rankCriteriaData) return '280px';
    
    const totalCards = rankCriteriaData.length;
    
    if (totalCards === 1) return '280px';
    
    // Responsive card width based on screen size
    if (window.innerWidth < 360) return '180px'; // Extra small mobile
    if (window.innerWidth < 480) return '200px'; // Small mobile
    if (window.innerWidth < 640) return '220px'; // Mobile
    if (window.innerWidth < 768) return '240px'; // Large mobile
    if (window.innerWidth < 1024) return '260px'; // Tablet
    return '280px'; // Desktop
  }, [rankCriteriaData]);

  // Add specific CSS rule to completely eliminate scrollbars
  useEffect(() => {
    const style = document.createElement('style');
    style.innerHTML = `
      /* Completely hide all scrollbars in the application */
      .card-container-inner,
      .scrollable-container,
      .scrollable-section,
      .rank-icons-row,
      [class*="scrollable"],
      .custom-scroll-hide {
        -ms-overflow-style: none !important;
        scrollbar-width: none !important;
        overflow-y: hidden !important;
      }
      
      /* Target WebKit browsers */
      .card-container-inner::-webkit-scrollbar,
      .scrollable-container::-webkit-scrollbar,
      .scrollable-section::-webkit-scrollbar,
      .rank-icons-row::-webkit-scrollbar,
      [class*="scrollable"]::-webkit-scrollbar,
      .custom-scroll-hide::-webkit-scrollbar,
      *::-webkit-scrollbar {
        display: none !important;
        width: 0 !important;
        height: 0 !important;
        background: transparent !important;
        visibility: hidden !important;
      }
      
      /* Additional WebKit scrollbar elements */
      *::-webkit-scrollbar-thumb,
      *::-webkit-scrollbar-track,
      *::-webkit-scrollbar-button,
      *::-webkit-scrollbar-corner,
      *::-webkit-scrollbar-track-piece {
        display: none !important;
        width: 0 !important;
        height: 0 !important;
        background: transparent !important;
        visibility: hidden !important;
      }
    `;
    document.head.appendChild(style);
    
    return () => {
      document.head.removeChild(style);
    };
  }, []);

  // Memoize the card rendering function
  const renderCardWithOrComponents = useMemo(() => {
    if (!rankCriteriaData || rankCriteriaData.length === 0) return null;
    
    const cardWidth = calculateCardWidth();
    
    return (
      <div className="w-[95%] sm:w-[90%] md:w-[95%] mx-auto select-rank-container">
        <div 
          ref={criteriaCardsRef} 
          className="flex items-center justify-start pb-4 gap-2 sm:gap-4 card-container-inner custom-scroll-hide"
          style={{ 
            width: isSmallScreen ? 'max-content' : '100%',
            justifyContent: isSmallScreen ? 'flex-start' : 'space-between',
            touchAction: 'pan-x',
            overflowX: isSmallScreen ? 'auto' : 'visible',
            // Force hide scrollbars as inline styles
            msOverflowStyle: 'none',
            scrollbarWidth: 'none'
          }}
        >
          {rankCriteriaData.map((ele, idx) => (
            <React.Fragment key={`container-${idx}`}>
              <div 
                className={`flex-shrink-0 scrollable-item ${!isSmallScreen && 'flex-1'}`}
                style={{ minWidth: isSmallScreen ? cardWidth : 'auto' }}
              >
                <RankCriteriaCardComponent 
                  widthLen={isSmallScreen ? cardWidth : '100%'}
                  heightLen={isMobile ? '180px' : isTablet ? '190px' : '200px'} 
                  key={`card-${idx}`} 
                  {...ele}
                />
              </div>
              
              {idx < rankCriteriaData.length - 1 && (
                <div className="flex-shrink-0 mx-1 sm:mx-2">
                  <RankCriteriaOrComponent key={`or-${idx}`} />
                </div>
              )}
            </React.Fragment>
          ))}
        </div>
      </div>
    );
  }, [rankCriteriaData, calculateCardWidth, isMobile, isTablet, isSmallScreen]);

  // Memoize modal handlers
  const handleSampleVideoClick = useCallback(() => {
    setIsVideoModalOpen(true)
    setIsGuidelinesModalOpen(false)
    setActiveButton('video')
  }, []);

  const handleSafetyGuidelinesClick = useCallback(() => {
    setIsGuidelinesModalOpen(true)
    setIsVideoModalOpen(false)
    setActiveButton('guidelines')
  }, []);

  const handleCloseSampleVideo = useCallback(() => {
    setIsVideoModalOpen(false)
    setActiveButton(null)
  }, []);

  const handleCloseSafetyGuidelines = useCallback(() => {
    setIsGuidelinesModalOpen(false)
    setActiveButton(null)
  }, []);

  const handleSwitchToGuidelines = useCallback(() => {
    setIsGuidelinesModalOpen(true)
    setIsVideoModalOpen(false)
    setActiveButton('guidelines')
  }, []);

  const handleSwitchToVideo = useCallback(() => {
    setIsVideoModalOpen(true)
    setIsGuidelinesModalOpen(false)
    setActiveButton('video')
  }, []);

  const handleVideoSubmissionClick = () => {
    setShowVideoSubmission(true);
  };

  const handleBackToCriteria = () => {
    setShowVideoSubmission(false);
  };

  // Determine the top padding based on whether the header is shown
  const topPaddingClass = hideHeaderFooter ? 'pt-[0.5rem]' : 'pt-[5rem] sm:pt-[6rem] md:pt-[8rem]';

  // Determine section width and padding based on whether it's shown in the ProfilePage or standalone
  const sectionWidthClass = hideHeaderFooter ? 'w-full' : 'lg:w-[95%] xl:w-[85%] 2xl:w-[75%]';
  const containerPaddingClass = hideHeaderFooter ? 'px-0' : 'sm:px-[2rem] md:px-[3rem] lg:px-[5rem] px-[1rem]';

  // Adjust spacing for embedded mode
  const spacingClass = hideHeaderFooter ? 'gap-3 sm:gap-4' : 'gap-8 sm:gap-10 md:gap-12';

  return (
    <div className='w-full relative bg-backgroundColor min-h-screen overflow-x-hidden'>
      {!hideHeaderFooter && <ProfileHeader/>}
      <div className={`${topPaddingClass} pb-[1rem] ${containerPaddingClass} flex flex-col lg:gap-6 gap-8 items-center justify-between w-full`}>
        {/* <PersonalDetailsComponent/> */}
        <section className={`main-container mx-auto flex flex-col ${spacingClass}`}>
          {!showVideoSubmission ? (
            <>
              <div className='w-full mx-auto mt-2 xs:mt-1'>
                <h1 className='text-textWhiteColor w-full text-center pb-2 font-bold text-[1.4rem] sm:text-[1.8rem] md:text-[2.2rem]'>SELECT RANK</h1>
                <div ref={rankIconsRef} className='scrollable-container whitespace-nowrap custom-scroll-hide'
                     style={{ 
                       touchAction: 'pan-x', 
                       overflowX: 'auto', 
                       overflowY: 'hidden',
                       msOverflowStyle: 'none',
                       scrollbarWidth: 'none'
                     }}>
                  {renderRankIcons}
                </div>
              </div>
              
              <SelectRankComponent onVideoClick={handleVideoSubmissionClick}/>
              
              <h2 className='text-[1.4rem] sm:text-[1.8rem] md:text-[2.2rem] text-textWhiteColor text-center font-bold mt-2'>CRITERIA</h2>
              
              <div className='w-full'>
                {renderCardWithOrComponents}
              </div>

              <div className="w-full mx-auto text-sm sm:text-base md:text-lg justify-between sm:justify-evenly text-textWhiteColor flex mt-2 mb-4">
                <div 
                  className="flex gap-2 md:gap-3 cursor-pointer items-center touch-target"
                  onClick={handleSampleVideoClick}
                >
                  <img 
                    src={activeButton === 'video' ? minusIcon : addIcon} 
                    alt={activeButton === 'video' ? "Close sample video" : "Add sample video"} 
                    className="w-[16px] h-[16px] sm:w-[20px] sm:h-[20px]"
                  />
                  <p>Sample Video</p>
                </div>
                <div 
                  className="flex gap-2 md:gap-3 cursor-pointer items-center touch-target"
                  onClick={handleSafetyGuidelinesClick}
                >
                  <img 
                    src={activeButton === 'guidelines' ? minusIcon : addIcon} 
                    alt={activeButton === 'guidelines' ? "Close safety guidelines" : "Add safety guidelines"} 
                    className="w-[16px] h-[16px] sm:w-[20px] sm:h-[20px]"
                  />
                  <p>Safety Guidelines</p>
                </div>
              </div>
            </>
          ) : (
            <RegisterVideoSubmission onBack={handleBackToCriteria} />
          )}
        </section>
      </div>
      {!hideHeaderFooter && <FooterLinkComponent/>}
      
      {/* Sample Video Modal */}
      {isVideoModalOpen && (
        <SampleVideoModal 
          onClose={handleCloseSampleVideo}
          isVisible={isVideoModalOpen}
          onSwitchToGuidelines={handleSwitchToGuidelines}
        />
      )}

      {/* Safety Guidelines Modal */}
      {isGuidelinesModalOpen && (
        <SafetyGuidelinesModal 
          onClose={handleCloseSafetyGuidelines}
          isVisible={isGuidelinesModalOpen}
          onSwitchToVideo={handleSwitchToVideo}
        />
      )}
    </div>
  )
}

export default SelectedRankAndUploadVideo
