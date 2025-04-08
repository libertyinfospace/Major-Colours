import React from 'react'
import { CiCirclePlus } from "react-icons/ci";
import { useSelector } from 'react-redux';

const SelectRankComponent = ({ onVideoClick }) => {
    const selectedRank = useSelector(store => store.active.rankCretriaActiveState);
    
    const handleDivClick = () => {
      onVideoClick();
    };

  return (
    <div className='flex flex-col gap-3'>
      
      <div
        className={`relative flex items-center lg:w-[57.625rem] w-[100%] h-[19.5rem] rounded-xl bg-[#504F4F] mx-auto border-2 border-dotted border-white px-4 flex-col gap-3 justify-center cursor-pointer`}
        onClick={handleDivClick}
      >
        <CiCirclePlus className='text-[3rem] text-white' />
        <p className='text-[1.8125rem] text-textWhiteColor font-bold text-center'>{`SUBMIT A VIDEO FOR THE RANK OF ${selectedRank.name1}`}</p>
      </div>
    </div>
  )
}

export default SelectRankComponent
