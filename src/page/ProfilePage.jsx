import React, { useState, useRef } from 'react'
import ProfileHeader from '../components/ProfileHeader'
import { FaEdit, FaSpinner, FaCamera, FaUser } from 'react-icons/fa'
import DressingRoomComponent from '../components/DressingRoomComponent'
import VideoUploadFailure from './VideoUploadFailure'
import SelectedRankAndUploadVideo from './SelectedRankAndUploadVideo'
import SpearIcon from '../assets/logo/Spear-icon-normal.svg'
import BidentIcon from '../assets/logo/Bident-icon-normal.svg'
import TridentIcon from '../assets/logo/Trident-icon-normal.svg'
import { useNavigate } from 'react-router-dom'

const ProfilePage = () => {
  const navigate = useNavigate();
  const [profileImage, setProfileImage] = useState(null);
  const fileInputRef = useRef(null);
  const [activeTab, setActiveTab] = useState('profile');
  const [videoFailed, setVideoFailed] = useState(false);
  const [videoSubmitted, setVideoSubmitted] = useState(false);
  const [currentRank, setCurrentRank] = useState('SPEAR');
  const [nextRank, setNextRank] = useState('BIDENT');

  // Get the appropriate logo based on the current rank
  const getRankLogo = (rank) => {
    switch(rank) {
      case 'SPEAR':
        return SpearIcon;
      case 'BIDENT':
        return BidentIcon;
      case 'TRIDENT':
        return TridentIcon;
      default:
        return SpearIcon;
    }
  };

  const handleImageClick = () => {
    fileInputRef.current.click();
  };

  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const imageUrl = URL.createObjectURL(file);
      setProfileImage(imageUrl);
      
      // Here you would typically upload the image to your server
      // For example:
      // uploadImageToServer(file);
    }
  };

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  // Simulates successful video submission
  const handleVideoSuccess = () => {
    setVideoSubmitted(true);
    // Progress the rank from SPEAR to BIDENT
    setCurrentRank(nextRank);
    // Set next rank in progression
    setNextRank('TRIDENT');
  };

  // Handle logout
  const handleLogout = () => {
    // Here you would typically clear user session, tokens, etc.
    // For example:
    // clearUserSession();
    // localStorage.removeItem('token');
    
    // Redirect to homepage
    navigate('/');
  };

  // Content for the profile tab
  const ProfileContent = () => (
    <div className='w-full py-6'>
      {/* Profile Picture with Camera Icon */}
      <div className='flex justify-center mb-8'>
        <div className='relative'>
          {/* Profile Image Container */}
          <div className='w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 rounded-full bg-[#333333] flex items-center justify-center overflow-hidden'>
            {/* Profile image or default user icon */}
            {profileImage ? (
              <img 
                src={profileImage} 
                alt="Profile" 
                className="w-full h-full object-cover"
              />
            ) : (
              <FaUser className="text-gray-400 text-3xl md:text-5xl" />
            )}
          </div>
          
          {/* Camera Icon Button */}
          <div 
            className='absolute bottom-1 right-1 translate-x-[10%] translate-y-[-10%] bg-white text-black p-1 sm:p-1.5 rounded-full shadow-lg cursor-pointer hover:bg-gray-200 transition z-10 border border-gray-600'
            onClick={handleImageClick}
          >
            <FaCamera size={12} className="sm:hidden" />
            <FaCamera size={14} className="hidden sm:block" />
          </div>
          
          {/* Hidden file input */}
          <input 
            type="file" 
            ref={fileInputRef}
            onChange={handleImageChange}
            className="hidden"
            accept="image/*"
          />
        </div>
      </div>
      
      {/* User Details - Card */}
      <div className='w-full max-w-3xl mx-auto bg-[#1a1a1a] rounded-lg p-4 sm:p-6'>
        <h2 className='text-xl md:text-2xl font-bold mb-6 text-center'>Personal Information</h2>
        
        <div className='space-y-4'>
          <div className='flex flex-col sm:flex-row sm:items-center border-b border-[#333333] pb-3'>
            <h3 className='font-bold w-full sm:w-1/3 mb-1 sm:mb-0'>Name</h3>
            <div className='flex items-center w-full sm:w-2/3'>
              <span className='text-gray-400 mr-1 sm:hidden'>:</span>
              <span>Soumyadeep Goswami</span>
              <button className='ml-2 text-sm text-gray-400'>
                <FaEdit />
              </button>
            </div>
          </div>
          
          <div className='flex flex-col sm:flex-row sm:items-center border-b border-[#333333] pb-3'>
            <h3 className='font-bold w-full sm:w-1/3 mb-1 sm:mb-0'>Gender</h3>
            <div className='flex items-center w-full sm:w-2/3'>
              <span className='text-gray-400 mr-1 sm:hidden'>:</span>
              <span>Male</span>
            </div>
          </div>
          
          <div className='flex flex-col sm:flex-row sm:items-center border-b border-[#333333] pb-3'>
            <h3 className='font-bold w-full sm:w-1/3 mb-1 sm:mb-0'>Phone Number</h3>
            <div className='flex items-center w-full sm:w-2/3'>
              <span className='text-gray-400 mr-1 sm:hidden'>:</span>
              <span>+91 9792341450</span>
            </div>
          </div>
          
          <div className='flex flex-col sm:flex-row sm:items-center'>
            <h3 className='font-bold w-full sm:w-1/3 mb-1 sm:mb-0'>Email ID</h3>
            <div className='flex items-center w-full sm:w-2/3 break-words'>
              <span className='text-gray-400 mr-1 sm:hidden'>:</span>
              <span>soumya.goswami@gmail.com</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  // Logout confirmation component
  const LogoutContent = () => (
    <div className='text-center py-12'>
      <h2 className='text-2xl font-bold mb-4'>Are you sure you want to logout?</h2>
      <button 
        className='bg-white text-black py-2 px-6 rounded-md font-medium hover:bg-gray-200 transition'
        onClick={handleLogout}
      >
        Confirm Logout
      </button>
    </div>
  );

  // Upgrade Profile component
  const UpgradeProfileContent = () => (
    <div className='py-8 px-4 md:px-6 flex flex-col w-full'>
      {/* Current Rank Display */}
      <div className='w-full mb-6'>
        <div className='bg-[#1a1a1a] p-4 md:p-6 rounded-lg'>
          <h3 className='text-lg md:text-xl font-semibold mb-3 md:mb-4 text-center'>Current Rank</h3>
          <div className='flex flex-row items-center justify-center space-x-4'>
            {/* Logo Section */}
            <div className='w-16 h-16 md:w-20 md:h-20 flex items-center justify-center'>
              <img 
                src={getRankLogo(currentRank)}
                alt={`${currentRank} Rank Icon`}
                className='w-full h-full'
              />
            </div>
            
            {/* Rank Text Section */}
            <div className='flex flex-col items-start justify-center'>
              <div className='text-xs md:text-sm font-medium text-gray-400'>RANK</div>
              <div className='text-2xl md:text-3xl font-bold text-white'>{currentRank}</div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Rank Promotion Status or Failure */}
      <div className='w-full'>
        {videoFailed ? (
          <div className='w-full'>
            <VideoUploadFailure />
          </div>
        ) : videoSubmitted ? (
          <div className='w-full'>
            <SelectedRankAndUploadVideo hideHeaderFooter={true} />
          </div>
        ) : (
          <div className='w-full flex flex-col items-center justify-center bg-[#1a1a1a] p-4 md:p-8 rounded-lg'>
            <div className='animate-spin text-3xl md:text-4xl text-white mb-4 md:mb-6'>
              <FaSpinner />
            </div>
            <div className='flex flex-col items-center justify-center mb-4'>
              <h1 className='text-xl md:text-2xl font-bold text-white text-center mb-2'>
                PROMOTING TO RANK
              </h1>
              <p className='text-sm md:text-base text-gray-300 text-center'>
                Your promotion to {nextRank} is in progress
              </p>
            </div>
            {/* Test buttons for demo purposes */}
            <div className='flex gap-4 mt-4 md:mt-6'>
              <button 
                className='text-xs md:text-sm text-gray-400 underline'
                onClick={() => setVideoFailed(true)}>
                Simulate failure
              </button>
              <button 
                className='text-xs md:text-sm text-gray-400 underline'
                onClick={handleVideoSuccess}>
                Simulate success
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );

  return (
    <div className='w-[100%] min-h-screen bg-black text-white'>
        <ProfileHeader/>
        
        <div className='max-w-[1440px] mx-auto pt-[8rem] px-4 sm:px-8 md:px-16 lg:px-24'>
          {/* Nav Bar - Full Width within container */}
          <div className='w-full mb-8 overflow-x-auto scrollbar-hide'>
            <div className='flex justify-start border-b border-[#333333] min-w-max pb-[2px]'>
              <button 
                className={`py-2 px-4 whitespace-nowrap ${activeTab === 'profile' ? 'font-bold text-white border-b-2 border-white -mb-[2px]' : 'text-gray-400'}`}
                onClick={() => handleTabClick('profile')}
              >
                PROFILE
              </button>
              <button 
                className={`py-2 px-4 whitespace-nowrap ${activeTab === 'upgrade' ? 'font-bold text-white border-b-2 border-white -mb-[2px]' : 'text-gray-400'}`}
                onClick={() => handleTabClick('upgrade')}
              >
                UPGRADE RANK
              </button>
              <button 
                className={`py-2 px-4 whitespace-nowrap ${activeTab === 'dressing' ? 'font-bold text-white border-b-2 border-white -mb-[2px]' : 'text-gray-400'}`}
                onClick={() => handleTabClick('dressing')}
              >
                MY DRESSING ROOM
              </button>
              <button 
                className={`py-2 px-4 whitespace-nowrap ${activeTab === 'logout' ? 'font-bold text-white border-b-2 border-white -mb-[2px]' : 'text-gray-400'}`}
                onClick={() => handleTabClick('logout')}
              >
                LOGOUT
              </button>
            </div>
          </div>
          
          {/* Conditional rendering based on active tab */}
          {activeTab === 'profile' && <ProfileContent />}
          {activeTab === 'upgrade' && <UpgradeProfileContent />}
          {activeTab === 'dressing' && <DressingRoomComponent />}
          {activeTab === 'logout' && <LogoutContent />}
        </div>

        {/* Add a style block to hide scrollbars */}
        <style jsx global>{`
          /* Hide scrollbar for Chrome, Safari and Opera */
          .scrollbar-hide::-webkit-scrollbar {
            display: none;
          }
          
          /* Hide scrollbar for IE, Edge and Firefox */
          .scrollbar-hide {
            -ms-overflow-style: none;  /* IE and Edge */
            scrollbar-width: none;  /* Firefox */
          }
        `}</style>
    </div>
  )
}

export default ProfilePage
