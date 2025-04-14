import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { rankCriteriaData, rankInfoActiveState } from '../store/activeSlices';

const RankCriteriaIconComponent = ({iconPath, data, iconPath1, name1, name2, altName}) => {
    // Get active rank from the Redux store
    const rankActive = useSelector((state) => state.active.rankCretriaActiveState); 
    const dispatch = useDispatch();
    
    // Object to dispatch to Redux
    const rankCateriaOvbj = {
        iconPath: iconPath,
        name1: name1,
        name2: name2,
        altName: altName
    }

    const updatingTheDataOfRankCriteria = () => {
        // Reset active state for all ranks by dispatching a clear action first
        dispatch(rankInfoActiveState({
            iconPath: null,
            name1: null, 
            name2: null,
            altName: null
        }));
        
        // Small delay to ensure clear happens first
        setTimeout(() => {
            // Then set this rank as active
            dispatch(rankInfoActiveState(rankCateriaOvbj));
            dispatch(rankCriteriaData(data));
            
            // Find and scroll to the first product of this rank
            const productElements = document.querySelectorAll(`[data-rank="${name1}"]`);
            if (productElements && productElements.length > 0) {
                // Get the window width to determine scroll behavior
                const windowWidth = window.innerWidth;
                
                // Use setTimeout to allow the DOM to update before scrolling
                setTimeout(() => {
                    // Get the actual fixed header heights
                    const profileHeader = 72; // Profile header height is fixed at 72px
                    const rankHeader = document.querySelector('.fixed')?.offsetHeight || 0;
                    const totalHeaderHeight = profileHeader + rankHeader;
                    
                    // Get the product element
                    const element = productElements[0];
                    
                    // Get the element's position
                    const rect = element.getBoundingClientRect();
                    
                    // Get the current scroll position
                    const currentScroll = window.pageYOffset;
                    
                    // Calculate how much to scroll to position the element below the header
                    // Add a substantial buffer (100px) to ensure the element is fully visible
                    const scrollOffset = rect.top + currentScroll - totalHeaderHeight - 100;
                    
                    // Scroll to the element
                    window.scrollTo({
                        top: scrollOffset,
                        behavior: 'smooth'
                    });
                }, 50); // Short delay to ensure DOM is updated
            }
        }, 5); // Very tiny delay for store update
    }
    
    // Check if this specific rank is active
    const isActive = rankActive && rankActive.name1 === name1;
    
    return (
        <div className='flex flex-col items-center gap-2 relative'>
            <div className={`w-[50px] h-[50px] ${isActive ? "bg-white": 'bg-[#484848]'} flex justify-center items-center rounded-full`}>
                <img src={isActive ? iconPath : iconPath1} alt={altName} onClick={updatingTheDataOfRankCriteria} className='cursor-pointer' />
            </div>
            <div className='flex flex-col gap-1 items-center'>
                <p className={`font-bold lg:text-[1.75rem] text-[1.30rem] m-0 leading-none ${isActive ? "text-white": 'text-textColor'}`}>{name1}</p>
                <p className={`lg:text-[1.2rem] text-[1rem] m-0 leading-none ${isActive ? "text-white": 'text-textColor'}`}>{name2}</p>
            </div>
        </div>
    )
}

export default RankCriteriaIconComponent
