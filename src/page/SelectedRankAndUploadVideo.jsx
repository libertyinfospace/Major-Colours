import React, { useMemo, useCallback, useState, useEffect } from 'react'
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
        }
        
        .card-container-inner {
          min-width: 500px !important;
          width: max-content !important;
        }
        
        .rank-icons-row {
          min-width: 500px !important;
          width: max-content !important;
        }
      }
      
      /* Ensure elements stay visible during horizontal scroll */
      .scroll-padding {
        scroll-padding: 1rem;
      }
    `;
    document.head.appendChild(style);
    return () => document.head.removeChild(style);
  }, []);

  // Add CSS rule to hide webkit scrollbars
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
    <div className="flex items-center justify-between w-full overflow-x-auto overflow-y-hidden py-2 md:py-4 hide-scrollbar gap-1 xs:gap-2 md:gap-0 rank-icons-row" 
         style={{ WebkitOverflowScrolling: 'touch', scrollSnapType: 'x mandatory' }}>
      <div className="flex items-center flex-shrink-0 transform scale-90 xs:scale-95 sm:scale-100" style={{ scrollSnapAlign: 'start' }}>
        <RankCriteriaIconComponent 
          {...rankIconsData[0]} 
          data={dummyData[0]} 
        />
      </div>
      
      <ConnectingLine />
      
      <div className="flex items-center flex-shrink-0 transform scale-90 xs:scale-95 sm:scale-100" style={{ scrollSnapAlign: 'start' }}>
        <RankCriteriaIconComponent 
          {...rankIconsData[1]} 
          data={dummyData[1]} 
        />
      </div>
      
      <ConnectingLine />
      
      <div className="flex items-center flex-shrink-0 transform scale-90 xs:scale-95 sm:scale-100" style={{ scrollSnapAlign: 'start' }}>
        <RankCriteriaIconComponent 
          {...rankIconsData[2]} 
          data={dummyData[2]} 
        />
      </div>
      
      <ConnectingLine />
      
      <div className="flex items-center flex-shrink-0 transform scale-90 xs:scale-95 sm:scale-100" style={{ scrollSnapAlign: 'start' }}>
        <RankCriteriaIconComponent 
          {...rankIconsData[3]} 
          data={dummyData[3]} 
        />
      </div>
    </div>
  ), []);

  // Improved card width calculation for better responsiveness
  const calculateCardWidth = useCallback(() => {
    if (!rankCriteriaData) return '280px';
    
    const totalCards = rankCriteriaData.length;
    const totalOrComponents = totalCards - 1;
    
    if (totalCards === 1) return '280px';
    
    // For small screens, use fixed widths
    if (isSmallScreen) {
      return '200px';
    }
    
    let containerWidthPx;
    if (isMobile) {
      containerWidthPx = Math.min(280, window.innerWidth * 0.85); // 85% of screen width up to 280px on mobile
    } else if (isTablet) {
      containerWidthPx = Math.min(600, window.innerWidth * 0.8); // 80% of screen width up to 600px on tablet
    } else if (isLaptop) {
      containerWidthPx = Math.min(750, window.innerWidth * 0.75); // 75% of screen width up to 750px on laptop
    } else {
      containerWidthPx = Math.min(950, window.innerWidth * 0.7); // 70% of screen width up to 950px on desktop
    }
    
    const orComponentWidth = isMobile ? 40 : 50;
    const totalGapWidth = (isMobile ? 10 : 20) * (totalCards - 1);
    
    const availableWidthForCards = containerWidthPx - (totalOrComponents * orComponentWidth) - totalGapWidth;
    const cardWidth = Math.floor(availableWidthForCards / totalCards);
    
    return `${Math.max(cardWidth, isMobile ? 160 : 200)}px`;
  }, [rankCriteriaData, isMobile, isTablet, isLaptop, isSmallScreen]);

  // Memoize the card rendering function
  const renderCardWithOrComponents = useMemo(() => {
    if (!rankCriteriaData || rankCriteriaData.length === 0) return null;
    
    const cardWidth = calculateCardWidth();
    
    return (
      <div className="flex items-center justify-start md:justify-between w-full overflow-x-auto overflow-y-hidden pb-4 hide-scrollbar gap-2 sm:gap-4 card-container-inner" 
           style={{ WebkitOverflowScrolling: 'touch', paddingLeft: isMobile ? '0.5rem' : '0', scrollSnapType: 'x mandatory' }}>
        {rankCriteriaData.map((ele, idx) => (
          <React.Fragment key={`container-${idx}`}>
            <div className="flex-shrink-0" style={{ scrollSnapAlign: 'start' }}>
              <RankCriteriaCardComponent 
                widthLen={cardWidth}
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
    );
  }, [rankCriteriaData, calculateCardWidth, isMobile, isTablet]);

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
      <div className={`${topPaddingClass} pb-[1rem] ${containerPaddingClass} flex flex-col lg:gap-6 gap-8 items-center lg:items-start xl:flex-row justify-between w-full`}>
        {/* <PersonalDetailsComponent/> */}
        <section className={`${sectionWidthClass} mx-auto flex flex-col ${spacingClass}`}>
          {!showVideoSubmission ? (
            <>
              <div className='w-full mx-auto mt-2 xs:mt-1 card-container'>
                <h1 className='text-textWhiteColor w-full text-center pb-2 font-bold text-[1.4rem] sm:text-[1.8rem] md:text-[2.2rem]'>SELECT RANK</h1>
                <div className='flex items-center justify-between w-full overflow-x-scroll overflow-y-hidden whitespace-nowrap hide-scrollbar smooth-scroll'
                     style={{ WebkitOverflowScrolling: 'touch', padding: '0.25rem 0' }}>
                      
                  {renderRankIcons}
                </div>
              </div>
              
              <SelectRankComponent onVideoClick={handleVideoSubmissionClick}/>
              
              <h2 className='text-[1.4rem] sm:text-[1.8rem] md:text-[2.2rem] text-textWhiteColor text-center font-bold mt-2'>CRITERIA</h2>
              
              <div className='w-full mx-auto overflow-x-scroll overflow-y-hidden hide-scrollbar smooth-scroll card-container'>
                {renderCardWithOrComponents}
              </div>

              <div className="w-full mx-auto text-sm sm:text-base md:text-lg justify-between sm:justify-evenly text-textWhiteColor flex mt-2 mb-4">
                <div 
                  className="flex gap-2 md:gap-3 cursor-pointer items-center"
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
                  className="flex gap-2 md:gap-3 cursor-pointer items-center"
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
