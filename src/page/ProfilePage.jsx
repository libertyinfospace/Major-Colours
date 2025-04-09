import React, { useState, useRef } from 'react'
import ProfileHeader from '../components/ProfileHeader'
import { FaEdit, FaSpinner, FaCamera, FaUser } from 'react-icons/fa'
import DressingRoomComponent from '../components/DressingRoomComponent'
import VideoUploadFailure from './VideoUploadFailure'

const ProfilePage = () => {
  const [profileImage, setProfileImage] = useState(null);
  const fileInputRef = useRef(null);
  const [activeTab, setActiveTab] = useState('profile');
  const [videoFailed, setVideoFailed] = useState(false);

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

  // Content for the profile tab
  const ProfileContent = () => (
    <div className='pb-[2rem] flex flex-col md:flex-row'>
      {/* Left Section - Profile Info Panel */}
      <div className='w-full md:w-[40%]'>
        {/* Profile Picture with Camera Icon */}
        <div className='flex justify-center mb-8 relative'>
          <div className='relative'>
            {/* Profile Image Container */}
            <div className='w-32 h-32 rounded-full bg-[#333333] flex items-center justify-center overflow-hidden'>
              {/* Profile image or default user icon */}
              {profileImage ? (
                <img 
                  src={profileImage} 
                  alt="Profile" 
                  className="w-full h-full object-cover"
                />
              ) : (
                <FaUser className="text-gray-400 text-5xl" />
              )}
            </div>
            
            {/* Camera Icon Button */}
            <div 
              className='absolute bottom-1 right-1 translate-x-[10%] translate-y-[-10%] bg-white text-black p-1.5 rounded-full shadow-lg cursor-pointer hover:bg-gray-200 transition z-10 border border-gray-600'
              onClick={handleImageClick}
            >
              <FaCamera size={14} />
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
        
        {/* User Details */}
        <div className='space-y-4 mb-8 pb-8 px-6'>
          <div className='grid grid-cols-[150px,auto] items-center'>
            <h3 className='font-bold pl-4 whitespace-nowrap'>Name</h3>
            <div className='flex items-center'>
              <span className='text-gray-400 mr-1'>:</span>
              <span className='text-left'>Soumyadeep Goswami</span>
              <button className='ml-2 text-sm text-gray-400'>
                <FaEdit />
              </button>
            </div>
          </div>
          
          <div className='grid grid-cols-[150px,auto] items-center pt-2 border-t border-[#333333]'>
            <h3 className='font-bold pl-4 whitespace-nowrap'>Gender</h3>
            <div className='flex items-center'>
              <span className='text-gray-400 mr-1'>:</span>
              <span className='text-left'>Male</span>
            </div>
          </div>
          
          <div className='grid grid-cols-[150px,auto] items-center pt-2 border-t border-[#333333]'>
            <h3 className='font-bold pl-4 whitespace-nowrap'>Phone Number</h3>
            <div className='flex items-center'>
              <span className='text-gray-400 mr-1'>:</span>
              <span className='text-left whitespace-nowrap'>+91 9792341450</span>
            </div>
          </div>
          
          <div className='grid grid-cols-[150px,auto] items-center pt-2 border-t border-[#333333]'>
            <h3 className='font-bold pl-4 whitespace-nowrap'>Email ID</h3>
            <div className='flex items-center'>
              <span className='text-gray-400 mr-1'>:</span>
              <span className='text-left'>soumya.goswami@gmail.com</span>
            </div>
          </div>
        </div>
        
        {/* Rank */}
        <div className='pt-2 px-6 text-center'>
          <h2 className='text-2xl font-extrabold py-2'>RANK</h2>
        </div>
      </div>
      
      {/* Right Section - Rank Promotion Status or Failure */}
      {videoFailed ? (
        <div className='w-full md:w-[60%] flex items-start md:pl-6'>
          <VideoUploadFailure />
        </div>
      ) : (
        <div className='w-full md:w-[60%] flex flex-col items-center justify-center md:pl-8 md:ml-4'>
          <div className='animate-spin text-4xl text-white mb-6'>
            <FaSpinner />
          </div>
          <h1 className='text-2xl md:text-3xl lg:text-4xl font-bold text-white text-center'>
            PROMOTING TO THE RANK OF SPEAR
          </h1>
          {/* Test button to simulate failure (remove in production) */}
          <button 
            className='mt-6 text-sm text-gray-400 underline'
            onClick={() => setVideoFailed(true)}>
            Simulate failure
          </button>
        </div>
      )}
    </div>
  );

  // Logout confirmation component
  const LogoutContent = () => (
    <div className='text-center py-12'>
      <h2 className='text-2xl font-bold mb-4'>Are you sure you want to logout?</h2>
      <button className='bg-white text-black py-2 px-6 rounded-md font-medium hover:bg-gray-200 transition'>
        Confirm Logout
      </button>
    </div>
  );

  return (
    <div className='w-[100%] min-h-screen bg-black text-white'>
        <ProfileHeader/>
        
        <div className='max-w-[1440px] mx-auto pt-[8rem] px-4 sm:px-8 md:px-16 lg:px-24'>
          {/* Nav Bar - Full Width within container */}
          <div className='w-full mb-8'>
            <div className='flex justify-start space-x-10 border-b border-[#333333]'>
              <button 
                className={`py-2 px-1 -mb-[2px] ${activeTab === 'profile' ? 'font-bold text-white border-b-2 border-white' : 'text-gray-400'}`}
                onClick={() => handleTabClick('profile')}
              >
                PROFILE
              </button>
              <button 
                className={`py-2 px-1 -mb-[2px] ${activeTab === 'dressing' ? 'font-bold text-white border-b-2 border-white' : 'text-gray-400'}`}
                onClick={() => handleTabClick('dressing')}
              >
                MY DRESSING ROOM
              </button>
              <button 
                className={`py-2 px-1 -mb-[2px] ${activeTab === 'logout' ? 'font-bold text-white border-b-2 border-white' : 'text-gray-400'}`}
                onClick={() => handleTabClick('logout')}
              >
                LOGOUT
              </button>
            </div>
          </div>
          
          {/* Conditional rendering based on active tab */}
          {activeTab === 'profile' && <ProfileContent />}
          {activeTab === 'dressing' && <DressingRoomComponent />}
          {activeTab === 'logout' && <LogoutContent />}
        </div>
    </div>
  )
}

export default ProfilePage
