import React, { useRef, useState } from 'react'
import { CiCirclePlus } from "react-icons/ci";
import { FaTimesCircle } from "react-icons/fa";
import { useSelector } from 'react-redux';

const SelectRankComponent = () => {
    const fileInputRef = useRef(null);
    const selectedRank = useSelector(store => store.active.rankCretriaActiveState);
    const [selectedVideo, setSelectedVideo] = useState(null);
    const [videoPreviewUrl, setVideoPreviewUrl] = useState('');
    
    const handleDivClick = () => {
      if (!selectedVideo) {
        fileInputRef.current?.click();
      }
    };
  
    const handleFileChange = (event) => {
      const file = event.target.files[0];
      if (file) {
        // Validate file is a video
        if (!file.type.startsWith('video/')) {
          alert('Please select a valid video file');
          return;
        }
        
        // Create a preview URL for the video
        const url = URL.createObjectURL(file);
        setSelectedVideo(file);
        setVideoPreviewUrl(url);
        console.log("Selected video:", file);
      }
    };

    const handleRemoveVideo = (e) => {
      e.stopPropagation(); // Prevent triggering the parent div click handler
      // Revoke the URL to avoid memory leaks
      if (videoPreviewUrl) {
        URL.revokeObjectURL(videoPreviewUrl);
      }
      setSelectedVideo(null);
      setVideoPreviewUrl('');
      // Reset the file input
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    };

  return (
    <div className='flex flex-col gap-3'>
      <h1 className='text-textWhiteColor w-[100%] text-center text-[2.5rem]'>SELECT RANK</h1>
      <input
        type="file"
        accept="video/*"
        ref={fileInputRef}
        onChange={handleFileChange}
        style={{ display: 'none' }}
      />
      <div
        className={`relative flex items-center lg:w-[57.625rem] w-[100%] h-[19.5rem] rounded-xl bg-[#504F4F] mx-auto border-2 border-dotted border-white px-4 flex-col ${!selectedVideo ? 'gap-3 justify-center' : 'p-0 overflow-hidden'}`}
        onClick={handleDivClick}
      >
        {selectedVideo ? (
          <>
            <div className="absolute top-2 right-2 z-10">
              <FaTimesCircle 
                className="text-white text-2xl cursor-pointer hover:text-red-500 transition-colors" 
                onClick={handleRemoveVideo}
              />
            </div>
            <div className="w-full h-full flex items-center justify-center">
              <video 
                src={videoPreviewUrl} 
                controls 
                className="w-full h-full object-contain"
                style={{ borderRadius: '0.75rem' }}
              >
                Your browser does not support the video tag.
              </video>
            </div>
          </>
        ) : (
          <>
            <CiCirclePlus className='text-[3rem] text-white' />
            <p className='text-[1.8125rem] text-textWhiteColor font-bold text-center'>{`SUBMIT A VIDEO FOR THE RANK OF ${selectedRank.name1}`}</p>
          </>
        )}
      </div>
    </div>
  )
}

export default SelectRankComponent
