import React, { useRef } from 'react'
import { CiCirclePlus } from "react-icons/ci";
import { useSelector } from 'react-redux';
const SelectRankComponent = () => {
    const fileInputRef = useRef(null);
    const selectedRank = useSelector(store=> store.active.rankCretriaActiveState);
    const handleDivClick = () => {
      fileInputRef.current?.click();
    };
  
    const handleFileChange = (event) => {
      const file = event.target.files[0];
      if (file) {
        console.log("Selected video:", file);
        // Handle the video file upload logic here
      }
    };


  return (
    <div className='flex flex-col gap-3'>
      <h1 className='text-textWhiteColor text-center text-[2.5rem]'>SELECT RANK</h1>
      <input
        type="file"
        accept="video/*"
        ref={fileInputRef}
        onChange={handleFileChange}
        style={{ display: 'none' }}
      />
      <div
        className='flex items-center w-[57.625rem] h-[19.5rem] rounded-xl bg-[#504F4F] mx-auto border-2 border-dotted border-white px-4 flex-col gap-3 justify-center cursor-pointer'
        onClick={handleDivClick}
      >
        <CiCirclePlus className='text-[3rem] text-white' />
        <p className='text-[1.8125rem] text-textWhiteColor font-bold'>{`
          SUBMIT A VIDEO FOR THE RANK OF ${selectedRank.name1}`}
        </p>
      </div>
    </div>
  )
}

export default SelectRankComponent
