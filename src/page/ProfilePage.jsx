import React, { useState, useRef, useEffect } from 'react'
import ProfileHeader from '../components/ProfileHeader'
import { FaEdit, FaSpinner, FaCamera, FaUser, FaCheck, FaTimes } from 'react-icons/fa'
import DressingRoomComponent from '../components/DressingRoomComponent'
import VideoUploadFailure from './VideoUploadFailure'
import SelectedRankAndUploadVideo from './SelectedRankAndUploadVideo'
import SpearIcon from '../assets/logo/Spear-icon-normal.svg'
import BidentIcon from '../assets/logo/Bident-icon-normal.svg'
import TridentIcon from '../assets/logo/Trident-icon-normal.svg'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { updateUserData } from '../store/activeSlices'

const ProfilePage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [profileImage, setProfileImage] = useState(null);
  const fileInputRef = useRef(null);
  const [activeTab, setActiveTab] = useState('profile');
  const [videoFailed, setVideoFailed] = useState(false);
  const [videoSubmitted, setVideoSubmitted] = useState(false);
  const [currentRank, setCurrentRank] = useState('SPEAR');
  const [nextRank, setNextRank] = useState('BIDENT');
  const [userProfile, setUserProfile] = useState({
    name: '',
    gender: '',
    phone: '',
    email: ''
  });
  const [editingField, setEditingField] = useState(null);
  const [tempValue, setTempValue] = useState('');
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(true);

  // Check for user data in localStorage on component mount
  useEffect(() => {
    // Get login info from localStorage
    const loginInfoData = localStorage.getItem('loginInfo');
    const storedProfileImage = localStorage.getItem('profileImage');
    
    // Always use the existing data as we have default profile values
    setIsUserLoggedIn(true);
    
    // Load profile image if available
    if (storedProfileImage) {
      setProfileImage(storedProfileImage);
    }
    
    // Initialize the user profile with data from localStorage
    const newProfile = { ...userProfile };
    let dataFound = false;
    
    // Try to load user profile data from loginInfo
    if (loginInfoData) {
      try {
        const parsedLoginInfo = JSON.parse(loginInfoData);
        
        // Check if the data is nested in a user, data, or userInfo field
        const userData = parsedLoginInfo.user || parsedLoginInfo.data || parsedLoginInfo.userInfo || parsedLoginInfo;
        
        // Map fields from userData to userProfile with proper field naming
        // Check all possible field names for name
        if (userData.name) {
          newProfile.name = userData.name;
          dataFound = true;
        } else if (userData.username) {
          newProfile.name = userData.username;
          dataFound = true;
        } else if (userData.fullName) {
          newProfile.name = userData.fullName;
          dataFound = true;
        } else if (userData.userName) {
          newProfile.name = userData.userName;
          dataFound = true;
        }
        
        // Check all possible field names for email
        if (userData.email) {
          newProfile.email = userData.email;
          dataFound = true;
        } else if (userData.emailId) {
          newProfile.email = userData.emailId;
          dataFound = true;
        } else if (userData.userEmail) {
          newProfile.email = userData.userEmail;
          dataFound = true;
        }
        
        // Check all possible field names for phone
        if (userData.phone) {
          newProfile.phone = userData.phone;
          dataFound = true;
        } else if (userData.phoneNumber) {
          newProfile.phone = userData.phoneNumber;
          dataFound = true;
        } else if (userData.mobile) {
          newProfile.phone = userData.mobile;
          dataFound = true;
        } else if (userData.mobileNumber) {
          newProfile.phone = userData.mobileNumber;
          dataFound = true;
        } else if (userData.contact) {
          newProfile.phone = userData.contact;
          dataFound = true;
        }
        
        // Check all possible field names for gender
        if (userData.gender) {
          newProfile.gender = userData.gender;
          dataFound = true;
        } else if (userData.sex) {
          newProfile.gender = userData.sex;
          dataFound = true;
        }
        
      } catch (error) {
        // Error parsing loginInfo data
      }

    }
    
    // For empty or missing fields, set empty strings
    if (!dataFound) {
      // Use default empty values
      if (!newProfile.name) newProfile.name = '';
      if (!newProfile.gender) newProfile.gender = '';
      if (!newProfile.phone) newProfile.phone = '';
      if (!newProfile.email) newProfile.email = '';
    } else {
      // If we have data but some fields are missing, ensure they're at least empty strings
      if (!newProfile.name) newProfile.name = '';
      if (!newProfile.gender) newProfile.gender = '';
      if (!newProfile.phone) newProfile.phone = '';
      if (!newProfile.email) newProfile.email = '';
    }
    
    setUserProfile(newProfile);
  }, []);

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
      
      // Update state
      setProfileImage(imageUrl);
      
      // Save to localStorage
      try {
        localStorage.setItem('profileImage', imageUrl);
      } catch (error) {
        // Error saving profile image to localStorage
      }
      
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
    try {
      // Remove the userData key from localStorage
      localStorage.removeItem('userData');
      
      // Clear user data from Redux store
      dispatch(updateUserData({
        name: "",
        email: "",
        number: "",
        gender: ""
      }));
      
      // Redirect to login page
      window.location.href = '/login';
    } catch (error) {
      // Still redirect even if there was an error
      window.location.href = '/login';
    }
  };

  const handleEditClick = (field) => {
    setEditingField(field);
    setTempValue(userProfile[field]);
  };

  const handleSaveEdit = () => {
    if (editingField) {
      // Create updated profile
      const updatedProfile = {
        ...userProfile,
        [editingField]: tempValue
      };
      
      // Update state
      setUserProfile(updatedProfile);
      setEditingField(null);
      
      // Save to localStorage with the loginInfo key
      try {
        // Get existing loginInfo data first
        const existingLoginInfo = localStorage.getItem('loginInfo');
        let loginInfoObj = {};
        
        if (existingLoginInfo) {
          try {
            loginInfoObj = JSON.parse(existingLoginInfo);
          } catch (error) {
            // Error parsing existing loginInfo
          }
        }
        
        // Determine if the user data is nested in the loginInfo
        const isUserDataNested = loginInfoObj.user || loginInfoObj.data || loginInfoObj.userInfo;
        
        // Update the loginInfo object accordingly
        if (isUserDataNested) {
          // If data is nested, update the proper nested object
          if (loginInfoObj.user) {
            loginInfoObj.user = {
              ...loginInfoObj.user,
              [editingField]: tempValue
            };
          } else if (loginInfoObj.data) {
            loginInfoObj.data = {
              ...loginInfoObj.data,
              [editingField]: tempValue
            };
          } else if (loginInfoObj.userInfo) {
            loginInfoObj.userInfo = {
              ...loginInfoObj.userInfo,
              [editingField]: tempValue
            };
          }
        } else {
          // If data is not nested, update at the root level
          loginInfoObj = {
            ...loginInfoObj,
            [editingField]: tempValue
          };
        }
        
        localStorage.setItem('loginInfo', JSON.stringify(loginInfoObj));
      } catch (error) {
        // Error saving profile to localStorage
      }
    }
  };

  const handleCancelEdit = () => {
    setEditingField(null);
  };

  const handleInputChange = (e) => {
    setTempValue(e.target.value);
  };

  // Content for the profile tab
  const ProfileContent = () => {
    return (
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
            {/* Name field */}
            <div className='flex flex-col sm:flex-row sm:items-center border-b border-[#333333] pb-3'>
              <h3 className='font-bold w-full sm:w-1/3 mb-1 sm:mb-0'>Name</h3>
              <div className='flex items-center w-full sm:w-2/3'>
                <span className='text-gray-400 mr-1 sm:hidden'>:</span>
                {editingField === 'name' ? (
                  <div className='flex items-center w-full'>
                    <input 
                      type="text" 
                      value={tempValue}
                      onChange={handleInputChange}
                      className='bg-[#2a2a2a] text-white px-2 py-1 rounded flex-grow mr-2'
                      autoFocus
                    />
                    <button 
                      className='text-green-500 mr-2'
                      onClick={handleSaveEdit}
                    >
                      <FaCheck />
                    </button>
                    <button 
                      className='text-red-500'
                      onClick={handleCancelEdit}
                    >
                      <FaTimes />
                    </button>
                  </div>
                ) : (
                  <>
                    <span>{userProfile.name}</span>
                    <button 
                      className='ml-2 text-sm text-gray-400 hover:text-white transition-colors'
                      onClick={() => handleEditClick('name')}
                    >
                      <FaEdit />
                    </button>
                  </>
                )}
              </div>
            </div>
            
            {/* Gender field */}
            <div className='flex flex-col sm:flex-row sm:items-center border-b border-[#333333] pb-3'>
              <h3 className='font-bold w-full sm:w-1/3 mb-1 sm:mb-0'>Gender</h3>
              <div className='flex items-center w-full sm:w-2/3'>
                <span className='text-gray-400 mr-1 sm:hidden'>:</span>
                {editingField === 'gender' ? (
                  <div className='flex items-center w-full'>
                    <select 
                      value={tempValue}
                      onChange={handleInputChange}
                      className='bg-[#2a2a2a] text-white px-2 py-1 rounded flex-grow mr-2'
                    >
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                      <option value="Other">Other</option>
                    </select>
                    <button 
                      className='text-green-500 mr-2'
                      onClick={handleSaveEdit}
                    >
                      <FaCheck />
                    </button>
                    <button 
                      className='text-red-500'
                      onClick={handleCancelEdit}
                    >
                      <FaTimes />
                    </button>
                  </div>
                ) : (
                  <>
                    <span>{userProfile.gender}</span>
                    <button 
                      className='ml-2 text-sm text-gray-400 hover:text-white transition-colors'
                      onClick={() => handleEditClick('gender')}
                    >
                      <FaEdit />
                    </button>
                  </>
                )}
              </div>
            </div>
            
            {/* Phone field */}
            <div className='flex flex-col sm:flex-row sm:items-center border-b border-[#333333] pb-3'>
              <h3 className='font-bold w-full sm:w-1/3 mb-1 sm:mb-0'>Phone Number</h3>
              <div className='flex items-center w-full sm:w-2/3'>
                <span className='text-gray-400 mr-1 sm:hidden'>:</span>
                {editingField === 'phone' ? (
                  <div className='flex items-center w-full'>
                    <input 
                      type="tel" 
                      value={tempValue}
                      onChange={handleInputChange}
                      className='bg-[#2a2a2a] text-white px-2 py-1 rounded flex-grow mr-2'
                      autoFocus
                    />
                    <button 
                      className='text-green-500 mr-2'
                      onClick={handleSaveEdit}
                    >
                      <FaCheck />
                    </button>
                    <button 
                      className='text-red-500'
                      onClick={handleCancelEdit}
                    >
                      <FaTimes />
                    </button>
                  </div>
                ) : (
                  <>
                    <span>{userProfile.phone}</span>
                    <button 
                      className='ml-2 text-sm text-gray-400 hover:text-white transition-colors'
                      onClick={() => handleEditClick('phone')}
                    >
                      <FaEdit />
                    </button>
                  </>
                )}
              </div>
            </div>
            
            {/* Email field */}
            <div className='flex flex-col sm:flex-row sm:items-center border-b border-[#333333] pb-3'>
              <h3 className='font-bold w-full sm:w-1/3 mb-1 sm:mb-0'>Email ID</h3>
              <div className='flex items-center w-full sm:w-2/3 break-words'>
                <span className='text-gray-400 mr-1 sm:hidden'>:</span>
                <span>{userProfile.email}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

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
  );
}

export default ProfilePage

