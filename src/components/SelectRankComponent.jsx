import React, { useEffect, useState, useRef } from 'react'
import { CiCirclePlus } from "react-icons/ci";
import { RxCross2 } from "react-icons/rx";
import { FaInstagram, FaUserFriends } from "react-icons/fa";
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const SelectRankComponent = ({ onVideoClick }) => {
    const navigate = useNavigate();
    const [isSmallScreen, setIsSmallScreen] = useState(false);
    const [selectedVideo, setSelectedVideo] = useState(null);
    const [showSocialHandles, setShowSocialHandles] = useState(false);
    const [instagramHandle, setInstagramHandle] = useState('');
    const [friendInstagramHandle, setFriendInstagramHandle] = useState('');
    const [showUserModal, setShowUserModal] = useState(false);
    const fileInputRef = useRef(null);
    const videoRef = useRef(null);
    const selectedRank = useSelector(store => store.active.rankCretriaActiveState);
    
    // User registration form states
    const [formData, setFormData] = useState({
      email: '',
      password: '',
      fullName: '',
      phoneNumber: '',
      gender: 'male', // Default to male
      receiveNews: false,
      acceptPrivacy: false
    });
    
    // Form errors state
    const [errors, setErrors] = useState({
      email: '',
      password: '',
      fullName: '',
      phoneNumber: '',
      gender: '',
      acceptPrivacy: ''
    });
    
    // Form submission state
    const [isSubmitting, setIsSubmitting] = useState(false);
    
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
      
      // Check if userData exists in localStorage
      const userData = localStorage.getItem('userData');
      
      if (userData) {
        // Redirect to profile page upgrade-rank section if userData exists
        navigate('/profile?section=upgrade-rank');
      } else {
        // Show the user registration modal if userData doesn't exist
        setShowUserModal(true);
      }
    };
    
    // Form handlers for user registration modal
    const handleChange = (e) => {
      const { name, value } = e.target;
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));

      // Clear error when field is edited
      if (errors[name]) {
        setErrors(prev => ({
          ...prev,
          [name]: ''
        }));
      }
    };

    const handlePhoneChange = (e) => {
      const { value } = e.target;
      // Only allow digits (numbers)
      const digitsOnly = value.replace(/\D/g, '');
      
      // Update state with digits only
      setFormData(prev => ({
        ...prev,
        phoneNumber: digitsOnly
      }));

      // Clear error when field is edited if there was one
      if (errors.phoneNumber) {
        setErrors(prev => ({
          ...prev,
          phoneNumber: ''
        }));
      }
    };

    const handleCheckboxChange = (e) => {
      const { name, checked } = e.target;
      setFormData(prev => ({
        ...prev,
        [name]: checked
      }));

      // Clear privacy error if accepted
      if (name === 'acceptPrivacy' && checked && errors.acceptPrivacy) {
        setErrors(prev => ({
          ...prev,
          acceptPrivacy: ''
        }));
      }
    };

    const handleGenderChange = (e) => {
      setFormData(prev => ({
        ...prev,
        gender: e.target.value
      }));
      
      // Clear gender error if there was one
      if (errors.gender) {
        setErrors(prev => ({
          ...prev,
          gender: ''
        }));
      }
    };

    // Validate form fields
    const validateForm = () => {
      let isValid = true;
      const newErrors = { ...errors };

      // Email validation
      if (!formData.email) {
        newErrors.email = 'Email is required';
        isValid = false;
      } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
        newErrors.email = 'Please enter a valid email address';
        isValid = false;
      }

      // Password validation
      if (!formData.password) {
        newErrors.password = 'Password is required';
        isValid = false;
      } else if (formData.password.length < 8) {
        newErrors.password = 'Password must be at least 8 characters';
        isValid = false;
      }

      // Full name validation
      if (!formData.fullName) {
        newErrors.fullName = 'Full name is required';
        isValid = false;
      }

      // Phone number validation
      if (!formData.phoneNumber) {
        newErrors.phoneNumber = 'Phone number is required';
        isValid = false;
      } else if (formData.phoneNumber.length !== 10) {
        newErrors.phoneNumber = 'Please enter a valid 10-digit phone number';
        isValid = false;
      }

      // Privacy statement validation
      if (!formData.acceptPrivacy) {
        newErrors.acceptPrivacy = 'You must accept the privacy statement';
        isValid = false;
      }

      setErrors(newErrors);
      return isValid;
    };

    // Handle form submission
    const handleUserFormSubmit = (e) => {
      e.preventDefault();
      setIsSubmitting(true);

      if (validateForm()) {
        // Form is valid, save user data
        setTimeout(() => {
          // Create proper data structure with user object
          const userData = {
            email: formData.email,
            phone: formData.phoneNumber,
            phoneNumber: formData.phoneNumber,
            user: {
              ...formData,
              password: formData.password.trim() // Ensure password is trimmed
            },
            isLoggedIn: true
          };
          
          // Store user data in localStorage with key 'loginInfo'
          localStorage.setItem('loginInfo', JSON.stringify(userData));
          // Also store the same data with key 'userData'
          localStorage.setItem('userData', JSON.stringify(userData));
          
          setIsSubmitting(false);
          setShowUserModal(false);
          
          // Redirect to profile page upgrade-rank section after saving user data
          navigate('/profile?section=upgrade-rank');
        }, 1000);
      } else {
        setIsSubmitting(false);
      }
    };

    // Close the modal
    const handleCloseModal = () => {
      setShowUserModal(false);
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
      
      {/* User Registration Modal */}
      {showUserModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 pt-20">
          <div className="bg-backgroundColor border border-gray-700 rounded-lg max-w-md w-full max-h-[90vh] overflow-y-auto mt-16">
            <div className="p-5">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-textWhiteColor text-xl font-bold">PERSONAL DETAILS</h2>
                <button 
                  onClick={handleCloseModal}
                  className="text-gray-400 hover:text-white"
                >
                  <RxCross2 size={24} />
                </button>
              </div>
              
              <form onSubmit={handleUserFormSubmit} className="flex flex-col gap-4">
                {/* Email */}
                <div>
                  <input
                    type="email" 
                    placeholder="Email" 
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-3 text-white bg-gray-800 border-b-2 border-gray-600 outline-none"
                  />
                  {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
                </div>
                
                {/* Password */}
                <div>
                  <input
                    type="password" 
                    placeholder="Password" 
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    className="w-full px-4 py-3 text-white bg-gray-800 border-b-2 border-gray-600 outline-none"
                  />
                  {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
                </div>
                
                {/* Full Name */}
                <div>
                  <input
                    type="text" 
                    placeholder="Full Name" 
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    className="w-full px-4 py-3 text-white bg-gray-800 border-b-2 border-gray-600 outline-none"
                  />
                  {errors.fullName && <p className="text-red-500 text-sm mt-1">{errors.fullName}</p>}
                </div>
                
                {/* Phone Number */}
                <div>
                  <div className="flex items-center border-b-2 border-gray-600 bg-gray-800">
                    <p className="text-white flex gap-1 py-3 px-4">+91 <span>IN</span></p>
                    <input 
                      type="tel" 
                      inputMode="numeric"
                      pattern="[0-9]*"
                      maxLength={10}
                      placeholder="Phone Number" 
                      name="phoneNumber"
                      value={formData.phoneNumber}
                      onChange={handlePhoneChange}
                      className="px-4 py-3 text-white outline-none bg-gray-800 w-full"
                    />
                  </div>
                  {errors.phoneNumber && <p className="text-red-500 text-sm mt-1">{errors.phoneNumber}</p>}
                </div>
                
                {/* Gender Selection */}
                <div className="flex items-center gap-6 text-white py-2">
                  {/* Male */}
                  <label className="flex items-center gap-3 cursor-pointer">
                    <input
                      type="radio"
                      name="gender"
                      value="male"
                      checked={formData.gender === 'male'}
                      onChange={handleGenderChange}
                      className="sr-only peer"
                    />
                    <div className="w-5 h-5 rounded-full bg-transparent peer-checked:bg-blue-500 border-2 border-white transition-colors duration-200"></div>
                    <span>Male</span>
                  </label>

                  {/* Female */}
                  <label className="flex items-center gap-3 cursor-pointer">
                    <input
                      type="radio"
                      name="gender"
                      value="female"
                      checked={formData.gender === 'female'}
                      onChange={handleGenderChange}
                      className="sr-only peer"
                    />
                    <div className="w-5 h-5 rounded-full bg-transparent peer-checked:bg-pink-500 border-2 border-white transition-colors duration-200"></div>
                    <span>Female</span>
                  </label>
                </div>
                {errors.gender && <p className="text-red-500 text-sm mt-1">{errors.gender}</p>}
                
                {/* Checkboxes */}
                <div className="space-y-4 mt-2">
                  {/* Receive News Checkbox */}
                  <label className="flex items-center gap-3 cursor-pointer">
                    <input 
                      type="checkbox" 
                      id="receiveNews" 
                      name="receiveNews" 
                      checked={formData.receiveNews}
                      onChange={handleCheckboxChange}
                      className="hidden peer" 
                    />
                    <div className="w-5 h-5 border-2 border-gray-400 peer-checked:bg-blue-900 peer-checked:border-blue-900 flex items-center justify-center">
                      <svg
                        className="w-3 h-3 text-white hidden peer-checked:block"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="3"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                    </div>
                    <span className="text-gray-400 text-sm">I Wish To Receive Major Colours News On My E-Mail</span>
                  </label>

                  {/* Privacy Checkbox */}
                  <label className="flex items-center gap-3 cursor-pointer">
                    <input 
                      type="checkbox" 
                      id="acceptPrivacy" 
                      name="acceptPrivacy" 
                      checked={formData.acceptPrivacy}
                      onChange={handleCheckboxChange}
                      className="hidden peer" 
                    />
                    <div className="w-5 h-5 border-2 border-gray-400 peer-checked:bg-blue-900 peer-checked:border-blue-900 flex items-center justify-center">
                      <svg
                        className="w-3 h-3 text-white hidden peer-checked:block"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="3"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                    </div>
                    <span className="text-gray-400 text-sm">I Accept The Privacy Statement</span>
                  </label>
                  {errors.acceptPrivacy && <p className="text-red-500 text-sm mt-1">{errors.acceptPrivacy}</p>}
                </div>
                
                {/* Submit Button */}
                <button 
                  type="submit" 
                  className="mt-4 py-3 px-6 bg-white text-black font-bold text-lg tracking-wide rounded-lg hover:bg-gray-200 transition-colors duration-200 focus:outline-none"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <div className="flex items-center justify-center">
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-black" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Processing...
                    </div>
                  ) : (
                    "SUBMIT VIDEO"
                  )}
                </button>
                
                {/* Form Error Summary */}
                {Object.values(errors).some(error => error) && (
                  <div className="mt-4 p-3 bg-red-900 bg-opacity-40 border border-red-500 rounded text-white">
                    <p className="text-sm font-medium">Please correct the following errors:</p>
                    <ul className="list-disc list-inside text-sm mt-1">
                      {Object.entries(errors).map(([field, error]) => 
                        error ? <li key={field}>{error}</li> : null
                      )}
                    </ul>
                  </div>
                )}
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default SelectRankComponent
