import React, { useMemo, useEffect, useState, useCallback, useRef } from 'react'
import RankCriteriaCardComponent from './RankCriteriaCardComponent'
import RankCriteriaOrComponent from './RankCriteriaOrComponent'
import { useSelector } from 'react-redux'

const RankCritrieaCardContainerComponent = () => {
  const dummyData = useSelector((state) => state.active.rankCriteriaData)
  const [screenWidth, setScreenWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 1200)
  const containerRef = useRef(null)
  const contentRef = useRef(null)
  
  // Handle responsiveness and check if scrolling is needed
  useEffect(() => {
    const handleResize = () => {
      setScreenWidth(window.innerWidth);
    };
    
    // Set initial value
    handleResize();
    
    // Add event listener
    window.addEventListener('resize', handleResize);
    
    // Cleanup
    return () => window.removeEventListener('resize', handleResize);
  }, []); 
  
  // Calculate card width based on screen size
  const calculateCardWidth = useCallback(() => {
    if (!dummyData) return '280px';
    if (screenWidth < 640) return '240px';
    if (screenWidth < 768) return '280px';
    if (screenWidth < 1024) return '300px';
    return '322px';
  }, [dummyData, screenWidth]);
  
  // Render cards with OR components between them
  const renderCards = useMemo(() => {
    if (!dummyData || dummyData.length === 0) return null;
    
    const cardWidth = calculateCardWidth();
    const isLargeScreen = screenWidth >= 1024;
    
    return (
      <div 
        ref={containerRef}
        className="w-full overflow-x-auto hide-scrollbar pb-4"
        style={{ WebkitOverflowScrolling: 'touch' }}
      >
        <div 
          ref={contentRef} 
          className="flex items-center w-[100%]  justify-between px-4"
        >
          {dummyData.map((ele, idx) => (
            <React.Fragment key={`container-${idx}`}>
              <div className="flex-shrink-0">
                <RankCriteriaCardComponent 
                  widthLen={cardWidth}
                  heightLen={screenWidth < 768 ? '180px' : '200px'} 
                  key={`card-${idx}`} 
                  {...ele}
                />
              </div>
              
              {idx < dummyData.length - 1 && (
                <div className={`flex-shrink-0 ${isLargeScreen ? 'mx-6' : 'mx-4'}`}>
                  <RankCriteriaOrComponent key={`or-${idx}`} />
                </div>
              )}
            </React.Fragment>
          ))}
        </div>
      </div>
    );
  }, [dummyData, calculateCardWidth, screenWidth]);
  
  return (
    <div className='w-full'>
      {renderCards}
    </div>
  )
}

export default React.memo(RankCritrieaCardContainerComponent)
