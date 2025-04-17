import React, { useMemo, useEffect, useState, useRef } from 'react'
import RankCriteriaIconComponent from './RankCriteriaIconComponent'
import RankCriteriaLineComponent from './RankCriteriaLineComponent'
import  spearIcon from '../assets/logo/Spear-active-icon.svg'
import  spearIcon1 from '../assets/logo/Spear-icon-normal.svg'
import  bidentIcon from '../assets/logo/Bident-active-icon.svg'
import  bidentIcon1 from '../assets/logo/Bident-icon-normal.svg'
import  tridentIcon from '../assets/logo/Trident-active-icon.svg'
import  tridentIcon1 from '../assets/logo/Trident-icon-normal.svg'
import  excalibur from '../assets/logo/Excalibur-active-icon.svg'
import  excalibur1 from '../assets/logo/Excalibur-icon-normal.svg'
import RankCritrieaCardContainerComponent from './RankCritrieaCardContainerComponent'
import dummyData from '../utils/dummyData'
import { useSelector } from 'react-redux'


const RankCriteriaComponent = () => {
  const [screenWidth, setScreenWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 1200);
  const [isLargeScreen, setIsLargeScreen] = useState(screenWidth >= 1000);
  const [needsScroll, setNeedsScroll] = useState(false);
  const containerRef = useRef(null);
  const iconsContainerRef = useRef(null);
  const iconsContentRef = useRef(null);
  const rankIconRefs = useRef([]);
  const activeRank = useSelector((state) => state.active.rankCretriaActiveState);
  
  // Initialize refs array
  useEffect(() => {
    rankIconRefs.current = rankIconRefs.current.slice(0, 4);
  }, []);
  
  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      setScreenWidth(width);
      setIsLargeScreen(width >= 1000);
      
      // Check if scrolling is needed after resize
      checkScrollNeeded();
    };
    
    // Function to check if content exceeds container width
    const checkScrollNeeded = () => {
      if (iconsContainerRef.current && iconsContentRef.current) {
        const containerWidth = iconsContainerRef.current.clientWidth;
        const contentWidth = iconsContentRef.current.scrollWidth;
        
        // Enable scrolling if content wider than container
        setNeedsScroll(contentWidth > containerWidth);
      }
    };
    
    // Initial check
    window.addEventListener('resize', handleResize);
    
    // Check after component has rendered
    setTimeout(checkScrollNeeded, 100);
    
    // Add a mutation observer to recheck when content changes
    const observer = new MutationObserver(checkScrollNeeded);
    if (iconsContentRef.current) {
      observer.observe(iconsContentRef.current, { 
        childList: true, 
        subtree: true, 
        attributes: true 
      });
    }
    
    return () => {
      window.removeEventListener('resize', handleResize);
      observer.disconnect();
    };
  }, []);

  // Scroll to next rank when active rank changes (only on small screens or when scrolling is needed)
  useEffect(() => {
    if (activeRank && (needsScroll || !isLargeScreen)) {
      const currentRankIndex = rankIconsData.findIndex(rank => rank.name1 === activeRank.name1);
      const nextRankIndex = currentRankIndex + 1;
      
      // Only scroll to next rank if it exists and we're on small screen or need scrolling
      if (nextRankIndex < rankIconsData.length && rankIconRefs.current[nextRankIndex]) {
        const container = iconsContainerRef.current;
        const nextElement = rankIconRefs.current[nextRankIndex];
        
        if (container && nextElement) {
          // Check if next element is not fully visible
          const containerRect = container.getBoundingClientRect();
          const elementRect = nextElement.getBoundingClientRect();
          
          const isFullyVisible = 
            elementRect.left >= containerRect.left && 
            elementRect.right <= containerRect.right;
            
          // Only scroll if next element is not fully visible
          if (!isFullyVisible) {
            // Calculate scroll position to center the next element
            const scrollLeft = elementRect.left + 
                            container.scrollLeft - 
                            containerRect.left - 
                            (containerRect.width / 2) + 
                            (elementRect.width / 2);
                            
            // Scroll smoothly to the position
            container.scrollTo({
              left: scrollLeft,
              behavior: 'smooth'
            });
          }
        }
      }
    }
  }, [activeRank, needsScroll, isLargeScreen]);

  const rankIconsData = useMemo(() => [
    { 
      iconPath: spearIcon, 
      data: dummyData[0],
      iconPath1: spearIcon1, 
      name1: "SPEAR", 
      name2: "LEVEL 1", 
      altName: "spear level 1" 
    },
    { 
      iconPath: bidentIcon, 
      data: dummyData[1],
      iconPath1: bidentIcon1, 
      name1: "BIDENT", 
      name2: "LEVEL 2", 
      altName: "bident level 1" 
    },
    { 
      iconPath: tridentIcon, 
      data: dummyData[2],
      iconPath1: tridentIcon1, 
      name1: "TRIDENT", 
      name2: "LEVEL 3", 
      altName: "trident level 1" 
    },
    { 
      iconPath: excalibur, 
      data: dummyData[3],
      iconPath1: excalibur1, 
      name1: "EXCALIBUR", 
      name2: "LEVEL 4", 
      altName: "excalibur level 1" 
    }
  ], []);

  const connectingLineWidths = useMemo(() => {
    if (screenWidth < 640) return '50px';
    if (screenWidth < 768) return '60px';
    if (screenWidth < 1024) return '80px';
    return '100px';
  }, [screenWidth]);

  const renderRankIcons = useMemo(() => {
    // Container classes based on whether scrolling is needed
    const containerClasses = `flex w-full items-center py-2 ${needsScroll ? 'overflow-x-auto hide-scrollbar' : 'overflow-visible'}`;
    
    // Content classes based on whether scrolling is needed and screen size
    const contentClasses = needsScroll
      ? 'flex items-center w-max'
      : isLargeScreen 
        ? 'flex w-full items-center justify-between' 
        : 'flex items-center justify-center w-full';
      
    return (
      <div 
        className={containerClasses}
        style={needsScroll ? { WebkitOverflowScrolling: 'touch' } : {}}
        ref={iconsContainerRef}
      >
        <div 
          className={contentClasses}
          ref={iconsContentRef}
        >
          <div className="flex-shrink-0" ref={el => rankIconRefs.current[0] = el}>
            <RankCriteriaIconComponent {...rankIconsData[0]} />
          </div>
          <div className="flex-shrink-0" style={{ width: connectingLineWidths }}>
            <RankCriteriaLineComponent />
          </div>
          <div className="flex-shrink-0" ref={el => rankIconRefs.current[1] = el}>
            <RankCriteriaIconComponent {...rankIconsData[1]} />
          </div>
          <div className="flex-shrink-0" style={{ width: connectingLineWidths }}>
            <RankCriteriaLineComponent />
          </div>
          <div className="flex-shrink-0" ref={el => rankIconRefs.current[2] = el}>
            <RankCriteriaIconComponent {...rankIconsData[2]} />
          </div>
          <div className="flex-shrink-0" style={{ width: connectingLineWidths }}>
            <RankCriteriaLineComponent />
          </div>
          <div className="flex-shrink-0" ref={el => rankIconRefs.current[3] = el}>
            <RankCriteriaIconComponent {...rankIconsData[3]} />
          </div>
        </div>
      </div>
    );
  }, [rankIconsData, connectingLineWidths, isLargeScreen, needsScroll]);

  // Custom layout styles based on screen size
  const headerFlexStyle = {
    display: 'flex',
    flexDirection: isLargeScreen ? 'row' : 'column',
    alignItems: isLargeScreen ? 'center' : 'flex-start',
    justifyContent: isLargeScreen ? 'space-between' : 'flex-start',
    gap: 0,
    overflow: 'hidden'
  };

  return (
    <div className='w-full h-full flex flex-col gap-4' aria-labelledby="rank-criteria-title" ref={containerRef}>
      {/* Header section - flex-col below 1000px, flex-row above 1000px */}
      <div className='w-full' style={headerFlexStyle}>
        {/* Heading text - always left-aligned */}
        <div className="flex flex-col gap-0 text-white text-left px-4 md:px-6 lg:px-0" style={{ alignSelf: 'flex-start' }}>
          <h2 
            id="rank-criteria-title" 
            className="text-[2rem] sm:text-[2.5rem] md:text-[3rem] font-extrabold m-0 leading-none tracking-wide text-left"
          >
            RANK
          </h2>
          <p 
            className="text-[2rem] sm:text-[2.5rem] md:text-[3rem] font-extrabold m-0 leading-none tracking-wide mb-0 text-left" 
          >
            CRITERIA
          </p>
        </div>
        
        {/* Icon section - scrolling based on content width */}
        <div className={`w-full ${isLargeScreen ? 'max-w-[60%]' : ''} flex justify-center mt-4 ${!isLargeScreen ? 'self-center' : ''}`}>
          {renderRankIcons}
        </div>
      </div>
      
      {/* Cards section with added margin-top */}
      <div className="w-full mt-8 md:mt-12">
        <RankCritrieaCardContainerComponent />
      </div>
    </div>
  )
}

export default React.memo(RankCriteriaComponent);
