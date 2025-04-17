import React, { useEffect, useState, useRef } from 'react'
import { CiCirclePlus } from "react-icons/ci";
import { RxCross2 } from "react-icons/rx";
import { FaInstagram, FaUserFriends } from "react-icons/fa";
import { useSelector } from 'react-redux';

const SelectRankComponent = () => {
    const [isSmallScreen, setIsSmallScreen] = useState(false);
    const [selectedVideo, setSelectedVideo] = useState(null);
    const [showSocialHandles, setShowSocialHandles] = useState(false);
    const [instagramHandle, setInstagramHandle] = useState('');
    const [friendInstagramHandle, setFriendInstagramHandle] = useState('');
    const fileInputRef = useRef(null);
    const videoRef = useRef(null);
    const selectedRank = useSelector(store => store.active.rankCretriaActiveState);
    
    // Add responsive breakpoint detection
    useEffect(() => {
      const handleResize = () => {
        setIsSmallScreen(window.innerWidth < 765);
      };
      
      // Set initial value
      handleResize();
      
      // Add event listener
      window.addEventListener('resize', handleResize);
      
      // Cleanup
      return () => window.removeEventListener('resize', handleResize);
    }, []);

    // Add CSS for width control on small screens
    useEffect(() => {
      const style = document.createElement('style');
      style.innerHTML = `
        @media (max-width: 764px) {
          .select-rank-container {
            min-width: 100%;
            overflow-x: auto;
            padding: 0 !important;
          }
          
          .rank-card {
            min-width: 280px !important;
            width: 100% !important;
          }
        }
      `;
      document.head.appendChild(style);
      return () => document.head.removeChild(style);
    }, []);
    
    // Cleanup function for video URL
    useEffect(() => {
      // Cleanup when component unmounts or when selectedVideo changes
      return () => {
        if (selectedVideo && selectedVideo.url) {
          URL.revokeObjectURL(selectedVideo.url);
        }
      };
    }, [selectedVideo]);
    
    const handleDivClick = () => {
      // Reset the file input value to allow re-selecting the same file
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
      fileInputRef.current.click();
    };

    const handleFileChange = (e) => {
      const file = e.target.files[0];
      if (file && file.type.startsWith('video/')) {
        // Clean up previous URL if it exists
        if (selectedVideo && selectedVideo.url) {
          URL.revokeObjectURL(selectedVideo.url);
        }
        
        setSelectedVideo({
          file,
          url: URL.createObjectURL(file)
        });
      }
    };

    const handleRemoveVideo = () => {
      if (selectedVideo && selectedVideo.url) {
        URL.revokeObjectURL(selectedVideo.url);
      }
      setSelectedVideo(null);
      
      // Reset file input
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    };

    const handleCancel = () => {
      // Release object URL to prevent memory leaks
      if (selectedVideo && selectedVideo.url) {
        URL.revokeObjectURL(selectedVideo.url);
      }
      
      // Reset all state to initial values
      setSelectedVideo(null);
      setShowSocialHandles(false);
      setInstagramHandle('');
      setFriendInstagramHandle('');
      
      // Reset file input
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    };

    const handleSubmit = () => {
      if (!selectedVideo) return;
      
      // Submit the video
      console.log('Uploading video:', selectedVideo.file);
      
      // Include social handles if provided
      if (showSocialHandles) {
        console.log('Social handles:', {
          instagram: instagramHandle,
          friendInstagram: friendInstagramHandle
        });
      }
    };

  return (
    <div className='flex flex-col gap-3 w-[95%] sm:w-[90%] md:w-[95%] mx-auto select-rank-container'>
      <input
        type="file"
        accept="video/*"
        ref={fileInputRef}
        style={{ display: 'none' }}
        onChange={handleFileChange}
      />

      {!selectedVideo ? (
        <div
          className={`group relative flex items-center w-full h-[14rem] sm:h-[16rem] md:h-[18rem] lg:h-[19.5rem] rounded-xl bg-[#504F4F] border-2 border-dotted border-white px-4 flex-col gap-2 sm:gap-3 justify-center cursor-pointer transition-all duration-300 hover:bg-[#5a5959] hover:shadow-lg rank-card`}
          onClick={handleDivClick}
          style={{ minWidth: isSmallScreen ? '280px' : 'auto' }}
        >
          <CiCirclePlus className='text-[2.5rem] sm:text-[3rem] text-white transition-transform duration-300 ease-in-out group-hover:scale-110' />
          <p className='text-[1.25rem] sm:text-[1.5rem] md:text-[1.8125rem] text-textWhiteColor font-bold text-center px-2 sm:px-4 md:px-6 lg:px-8'>{`SUBMIT A VIDEO FOR THE RANK OF ${selectedRank?.name1 || 'SPEAR'}`}</p>
        </div>
      ) : (
        <div className='flex flex-col gap-5'>
          <div
            className={`group relative w-full h-[14rem] sm:h-[16rem] md:h-[18rem] lg:h-[19.5rem] rounded-xl overflow-hidden rank-card`}
            style={{ minWidth: isSmallScreen ? '280px' : 'auto' }}
          >
            <video 
              src={selectedVideo.url} 
              className="w-full h-full object-contain bg-black"
              controls
              ref={videoRef}
            />
            <button 
              onClick={handleRemoveVideo}
              className="absolute top-2 right-2 bg-black bg-opacity-60 text-white p-2 rounded-full hover:bg-opacity-80"
            >
              <RxCross2 size={20} />
            </button>
          </div>

          <div className="bg-gray-800 rounded-lg p-4">
            <div className="flex items-center justify-between mb-4">
              <p className="text-white font-medium">Social Media Profiles</p>
              
              {/* Toggle Switch */}
              <div className="flex items-center">
                <span className="mr-2 text-sm text-gray-300">
                  {showSocialHandles ? "Hide" : "Show"}
                </span>
                <div 
                  onClick={() => setShowSocialHandles(!showSocialHandles)} 
                  className={`relative inline-block w-12 h-6 transition-colors duration-300 ease-in-out rounded-full cursor-pointer ${showSocialHandles ? 'bg-black' : 'bg-gray-600'}`}
                >
                  <div 
                    className={`absolute w-5 h-5 transition-transform duration-300 ease-in-out bg-white rounded-full transform ${showSocialHandles ? 'translate-x-6' : 'translate-x-1'} top-[2px]`} 
                  />
                </div>
              </div>
            </div>
            
            {showSocialHandles && (
              <div className="space-y-4 mt-3">
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <FaInstagram className="text-pink-500" />
                  </div>
                  <input
                    type="text"
                    value={instagramHandle}
                    onChange={(e) => setInstagramHandle(e.target.value)}
                    placeholder="Your Instagram profile link"
                    className="w-full pl-10 pr-3 py-3 bg-gray-700 text-white rounded-lg focus:ring-2 focus:ring-pink-500 focus:outline-none"
                  />
                </div>
                
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <FaUserFriends className="text-blue-400" />
                  </div>
                  <input
                    type="text"
                    value={friendInstagramHandle}
                    onChange={(e) => setFriendInstagramHandle(e.target.value)}
                    placeholder="Challenge a friend (Instagram profile)"
                    className="w-full pl-10 pr-3 py-3 bg-gray-700 text-white rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  />
                </div>
              </div>
            )}
          </div>
          
          <div className="flex flex-col sm:flex-row gap-3 justify-end">
            <button 
              onClick={handleCancel}
              className="bg-white text-black border border-gray-300 hover:bg-gray-100 font-bold py-3 px-6 rounded-lg w-full sm:w-auto"
            >
              Cancel
            </button>
            <button 
              onClick={handleSubmit}
              className="bg-white text-black border border-black hover:bg-gray-100 font-bold py-3 px-6 rounded-lg w-full sm:w-auto"
            >
              Submit Video
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default SelectRankComponent
