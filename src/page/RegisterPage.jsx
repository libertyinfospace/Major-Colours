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
    <div className="bg-[#484848] h-[2px] relative top-[-20px] w-[100px] md:w-[120px] lg:w-[140px] xl:w-[170px]"></div>
  </div>
);

const RegisterPage = () => {
  const rankCriteriaData = useSelector((state) => state.active?.rankCriteriaData)
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false)
  const [isGuidelinesModalOpen, setIsGuidelinesModalOpen] = useState(false)
  const [activeButton, setActiveButton] = useState(null)
  const [isMobile, setIsMobile] = useState(false)
  const [isTablet, setIsTablet] = useState(false)
  const [isLaptop, setIsLaptop] = useState(false)
  const [showVideoSubmission, setShowVideoSubmission] = useState(false)
  
  // Effect to handle window resize for responsive design
  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      setIsMobile(width < 768);
      setIsTablet(width >= 768 && width < 1024);
      setIsLaptop(width >= 1024 && width < 1440);
    };
    
    // Set initial value
    handleResize();
    
    // Add event listener
    window.addEventListener('resize', handleResize);
    
    // Cleanup
    return () => window.removeEventListener('resize', handleResize);
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
    <div className="flex items-center justify-between w-full overflow-x-auto md:overflow-x-visible pb-4 md:pb-0 hide-scrollbar" 
         style={{ WebkitOverflowScrolling: 'touch' }}>
      <div className="flex items-center flex-shrink-0">
        <RankCriteriaIconComponent 
          {...rankIconsData[0]} 
          data={dummyData[0]} 
        />
      </div>
      
      <ConnectingLine />
      
      <div className="flex items-center flex-shrink-0">
        <RankCriteriaIconComponent 
          {...rankIconsData[1]} 
          data={dummyData[1]} 
        />
      </div>
      
      <ConnectingLine />
      
      <div className="flex items-center flex-shrink-0">
        <RankCriteriaIconComponent 
          {...rankIconsData[2]} 
          data={dummyData[2]} 
        />
      </div>
      
      <ConnectingLine />
      
      <div className="flex items-center flex-shrink-0">
        <RankCriteriaIconComponent 
          {...rankIconsData[3]} 
          data={dummyData[3]} 
        />
      </div>
    </div>
  ), []);

  // Memoize the card width calculation
  const calculateCardWidth = useCallback(() => {
    if (!rankCriteriaData) return '280px';
    
    const totalCards = rankCriteriaData.length;
    const totalOrComponents = totalCards - 1;
    
    if (totalCards === 1) return '280px';
    
    let containerWidthPx;
    if (isMobile) {
      containerWidthPx = 300;
    } else if (isTablet) {
      containerWidthPx = 600;
    } else if (isLaptop) {
      containerWidthPx = 750;
    } else {
      containerWidthPx = 850;
    }
    
    const orComponentWidth = 50;
    const totalGapWidth = 20 * (totalCards - 1);
    
    const availableWidthForCards = containerWidthPx - (totalOrComponents * orComponentWidth) - totalGapWidth;
    const cardWidth = Math.floor(availableWidthForCards / totalCards);
    
    return `${Math.max(cardWidth, 200)}px`;
  }, [rankCriteriaData, isMobile, isTablet, isLaptop]);

  // Memoize the card rendering function
  const renderCardWithOrComponents = useMemo(() => {
    if (!rankCriteriaData || rankCriteriaData.length === 0) return null;
    
    const cardWidth = calculateCardWidth();
    
    return (
      <div className="flex items-center justify-between w-full overflow-x-auto pb-4 hide-scrollbar" 
           style={{ WebkitOverflowScrolling: 'touch' }}>
        {rankCriteriaData.map((ele, idx) => (
          <React.Fragment key={`container-${idx}`}>
            <div className="flex-shrink-0">
              <RankCriteriaCardComponent 
                widthLen={cardWidth}
                heightLen={'200px'} 
                key={`card-${idx}`} 
                {...ele}
              />
            </div>
            
            {idx < rankCriteriaData.length - 1 && (
              <div className="flex-shrink-0 mx-2">
                <RankCriteriaOrComponent key={`or-${idx}`} />
              </div>
            )}
          </React.Fragment>
        ))}
      </div>
    );
  }, [rankCriteriaData, calculateCardWidth]);

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

  return (
    <div className='w-full relative bg-backgroundColor min-h-screen'>
      <ProfileHeader/>
      <div className='pt-[8rem] pb-[1rem] sm:px-[3rem] md:px-[4rem] lg:px-[5rem] px-[1rem] 2xl:items-start flex flex-col 2xl:gap-0 gap-10 items-center 2xl:flex-row justify-between w-full min-h-screen'>
        <PersonalDetailsComponent/>
        <section className='lg:w-[90%] xl:w-[60rem] w-full flex flex-col gap-12 min-h-screen'>
          {!showVideoSubmission ? (
            <>
              <div className='w-[95%] md:w-[90%] lg:w-[95%] mx-auto'>
              <h1 className='text-textWhiteColor w-[100%] text-center pb-5 font-bold text-[2.5rem]'>SELECT RANK</h1>
                <div className='flex items-center justify-between w-full overflow-x-auto md:overflow-x-visible whitespace-nowrap hide-scrollbar'
                     style={{ WebkitOverflowScrolling: 'touch' }}>
                      
                  {renderRankIcons}
                </div>
              </div>
              <SelectRankComponent onVideoClick={handleVideoSubmissionClick}/>
              <h2 className='text-[2rem] md:text-[2.5rem] text-textWhiteColor text-center font-bold'>CRITERIA</h2>
              
              <div className='w-[95%] md:w-[90%] lg:w-[95%] mx-auto'>
                {renderCardWithOrComponents}
              </div>

              <div className="sm:w-[80%] md:w-[70%] lg:w-[60%] w-[95%] mx-auto text-base md:text-lg lg:text-xl sm:justify-evenly justify-between text-textWhiteColor flex">
                <div 
                  className="flex gap-2 md:gap-3 cursor-pointer"
                  onClick={handleSampleVideoClick}
                >
                  <img 
                    src={activeButton === 'video' ? minusIcon : addIcon} 
                    alt={activeButton === 'video' ? "Close sample video" : "Add sample video"} 
                  />
                  <p>Sample Video</p>
                </div>
                <div 
                  className="flex gap-2 md:gap-3 cursor-pointer"
                  onClick={handleSafetyGuidelinesClick}
                >
                  <img 
                    src={activeButton === 'guidelines' ? minusIcon : addIcon} 
                    alt={activeButton === 'guidelines' ? "Close safety guidelines" : "Add safety guidelines"} 
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
      <FooterLinkComponent/>
      
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

export default RegisterPage
