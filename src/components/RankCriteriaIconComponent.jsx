import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { rankCriteriaData, rankInfoActiveState } from '../store/activeSlices';

const RankCriteriaIconComponent = ({iconPath ,data , iconPath1 , name1 , name2 , altName}) => {
    const rankActive = useSelector((state) => state.active.rankCretriaActiveState); 
    
    const dispatch =useDispatch();
    const rankCateriaOvbj = {
        iconPath:iconPath,
        name1:name1,
        name2:name2,
        altName:altName
    }

    const updatingTheDataOfRankCriteria = () => {
        dispatch(rankInfoActiveState(rankCateriaOvbj))
        dispatch(rankCriteriaData(data))
    }
  return (
    <div className='flex flex-col  items-center gap-2 relative' >
        <div className={`w-[50px] h-[50px] ${rankActive?.name1 === name1 ? "bg-white": 'bg-[#484848]'}  flex justify-center items-center rounded-full`}>
            <img src={rankActive?.name1 === name1 ? iconPath : iconPath1} alt={altName} onClick={updatingTheDataOfRankCriteria} className=' cursor-pointer' />
        </div>
        <div className='flex flex-col gap-1 items-center'>
            <p className={`font-bold lg:text-[1.75rem] text-[1.30rem] m-0 leading-none ${rankActive?.name1 === name1 ? "text-white": 'text-textColor'}`}>{name1}</p>
            <p className={`lg:text-[1.2rem] text-[1rem] m-0 leading-none ${rankActive?.name1 === name1 ? "text-white": 'text-textColor'}`}>{name2}</p>
        </div>
    </div>

    
  )
}

export default RankCriteriaIconComponent
