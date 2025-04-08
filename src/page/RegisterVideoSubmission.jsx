import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import LoginHeaderComponent from '../components/LoginHeaderComponent';

const RegisterVideoSubmission = () => {
  const navigate = useNavigate();
  const [videoFile, setVideoFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState('');
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    fullName: '',
    phoneNumber: '',
    gender: 'male',
    receiveNews: false,
    acceptPrivacy: false,
    instagramHandle: '',
    challengeFriend: ''
  });

  const [socialShare, setSocialShare] = useState({
    instagram: false,
    youtube: false,
    challengeFriend: false
  });

  const [friendDetails, setFriendDetails] = useState({
    name: '',
    instagramHandle: '',
    message: ''
  });

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleVideoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Validate file type
      if (!file.type.startsWith('video/')) {
        setError('Please upload a valid video file');
        // Navigate to failure page for invalid file type
        navigate('/upload-failed', { 
          state: { 
            errorMessage: 'Invalid file type. Please upload a video file.' 
          } 
        });
        return;
      }

      // Validate file size (max 100MB)
      if (file.size > 100 * 1024 * 1024) {
        setError('Video file size should be less than 100MB');
        // Navigate to failure page for file too large
        navigate('/upload-failed', { 
          state: { 
            errorMessage: 'Video file size exceeds 100MB limit. Please upload a smaller file.' 
          } 
        });
        return;
      }

      setVideoFile(file);
      setError('');
      // Create preview URL
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
    }
  };

  const handleSocialToggle = (platform) => {
    setSocialShare(prev => ({
      ...prev,
      [platform]: !prev[platform]
    }));
  };

  const handleFriendDetailsChange = (e) => {
    const { name, value } = e.target;
    setFriendDetails(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate required fields
    if (!formData.email || !formData.password || !formData.fullName || !formData.phoneNumber) {
      setError('Please fill in all required fields');
      return;
    }

    // Validate video
    if (!videoFile) {
      setError('Please upload a video');
      return;
    }

    if (!formData.acceptPrivacy) {
      setError('Please accept the privacy statement');
      return;
    }

    setIsUploading(true);
    try {
      const formDataToSubmit = new FormData();
      
      // Append form data
      Object.keys(formData).forEach(key => {
        formDataToSubmit.append(key, formData[key]);
      });
      
      // Append video file and social sharing preferences
      formDataToSubmit.append('video', videoFile);
      formDataToSubmit.append('shareToInstagram', socialShare.instagram);
      formDataToSubmit.append('shareToYoutube', socialShare.youtube);
      
      // Append friend challenge details if enabled
      if (socialShare.challengeFriend) {
        formDataToSubmit.append('friendChallenge', JSON.stringify(friendDetails));
      }

      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Clear all forms
      setFormData({
        email: '',
        password: '',
        fullName: '',
        phoneNumber: '',
        gender: 'male',
        receiveNews: false,
        acceptPrivacy: false,
        instagramHandle: '',
        challengeFriend: ''
      });
      setVideoFile(null);
      setPreviewUrl('');
      setSocialShare({ instagram: false, youtube: false, challengeFriend: false });
      setFriendDetails({ name: '', instagramHandle: '', message: '' });
      
      navigate('/success');
    } catch (err) {
      // Navigate to the failure page with the error message
      navigate('/upload-failed', { state: { errorMessage: 'Failed to upload your video. Please try again.' } });
    } finally {
      setIsUploading(false);
    }
  };

  // Add a function to simulate upload failure (for testing purposes)
  const simulateUploadFailure = () => {
    navigate('/upload-failed', { 
      state: { 
        errorMessage: 'This is a simulated upload failure for testing purposes.' 
      } 
    });
  };

  // Clean up preview URL when component unmounts
  React.useEffect(() => {
    return () => {
      if (previewUrl) {
        URL.revokeObjectURL(previewUrl);
      }
    };
  }, [previewUrl]);

  return (
    <div className='w-[100%] min-h-screen relative bg-black'>
      <LoginHeaderComponent/>
      <div className='flex'>
        {/* Left Section - Personal Details */}
        <div className='w-1/2 px-16 py-12'>
          <h2 className='text-white text-2xl font-bold mb-8'>PERSONAL DETAILS</h2>
          <form onSubmit={handleSubmit} className='flex flex-col gap-6'>
            <div className='flex flex-col gap-4'>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="Email"
                className='bg-transparent border-b border-gray-600 text-white py-2 outline-none'
                required
              />
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                placeholder="Password"
                className='bg-transparent border-b border-gray-600 text-white py-2 outline-none'
                required
              />
              <input
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleInputChange}
                placeholder="Full Name"
                className='bg-transparent border-b border-gray-600 text-white py-2 outline-none'
                required
              />
              <div className='flex items-center gap-2'>
                <span className='text-gray-400'>+91 IN</span>
                <input
                  type="tel"
                  name="phoneNumber"
                  value={formData.phoneNumber}
                  onChange={handleInputChange}
                  placeholder="Phone Number"
                  className='bg-transparent border-b border-gray-600 text-white py-2 outline-none flex-1'
                  required
                />
              </div>
              <p className='text-xs text-gray-400'>We Will Send An SMS To Verify Your Number</p>
            </div>

            <div className='flex gap-8 text-white'>
              <label className='flex items-center gap-2'>
                <input
                  type="radio"
                  name="gender"
                  value="male"
                  checked={formData.gender === 'male'}
                  onChange={handleInputChange}
                />
                Male
              </label>
              <label className='flex items-center gap-2'>
                <input
                  type="radio"
                  name="gender"
                  value="female"
                  checked={formData.gender === 'female'}
                  onChange={handleInputChange}
                />
                Female
              </label>
            </div>

            <div className='flex flex-col gap-2 text-white'>
              <label className='flex items-center gap-2'>
                <input
                  type="checkbox"
                  name="receiveNews"
                  checked={formData.receiveNews}
                  onChange={handleInputChange}
                />
                I Wish To Receive Major Colours News On My E-Mail
              </label>
              <label className='flex items-center gap-2'>
                <input
                  type="checkbox"
                  name="acceptPrivacy"
                  checked={formData.acceptPrivacy}
                  onChange={handleInputChange}
                />
                I Accept The Privacy Statement
              </label>
            </div>

            <div className='mt-8'>
              <h3 className='text-white mb-4'>We would be honored to share your achievements with the rest of Major Colours</h3>
              <div className='flex flex-col gap-4'>
                <div className='flex items-center gap-2'>
                  <span className='text-white'>Instagram</span>
                  <input
                    type="text"
                    name="instagramHandle"
                    value={formData.instagramHandle}
                    onChange={handleInputChange}
                    placeholder="Instagram handle"
                    className='bg-transparent border-b border-gray-600 text-white py-2 outline-none flex-1'
                  />
                </div>
                <div>
                  <p className='text-white mb-2'>Challenge a friend as part of your post</p>
                  <input
                    type="text"
                    name="challengeFriend"
                    value={formData.challengeFriend}
                    placeholder="Instagram handle"
                    onChange={handleInputChange}
                    className='bg-transparent border-b border-gray-600 text-white py-2 outline-none w-full'
                  />
                </div>
              </div>
            </div>

            {error && (
              <p className="text-red-500 text-sm">{error}</p>
            )}

            <div className='flex justify-between mt-8'>
              <button
                type="button"
                onClick={() => navigate(-1)}
                className='px-8 py-2 border border-gray-600 text-white rounded hover:bg-gray-800'
              >
                CANCEL
              </button>
              <button
                type="submit"
                disabled={isUploading}
                className='px-8 py-2 bg-white text-black rounded font-bold disabled:opacity-50'
              >
                {isUploading ? 'SUBMITTING...' : 'SUBMIT'}
              </button>
            </div>
            
            {/* Test button - Remove in production */}
            <div className="mt-4">
              <button
                type="button"
                onClick={simulateUploadFailure}
                className='px-8 py-2 bg-red-600 text-white rounded font-bold'
              >
                Test Failure Page
              </button>
            </div>
          </form>
        </div>

        {/* Right Section - Video */}
        <div className='w-1/2 h-screen bg-zinc-900 flex items-center justify-center'>
          <div className='w-full h-full relative'>
            <div className='absolute inset-0 flex items-center justify-center'>
              <div className='text-center'>
                <h2 className='text-white text-3xl font-bold mb-4'>SPEAR</h2>
                <div 
                  className='w-[480px] h-[270px] bg-black/50 rounded-lg border-2 border-dashed border-gray-600 flex items-center justify-center cursor-pointer mb-6'
                  onClick={() => document.getElementById('videoInput').click()}
                >
                  {previewUrl ? (
                    <div className="relative w-full h-full">
                      <video 
                        src={previewUrl} 
                        controls 
                        className='w-full h-full rounded-lg object-cover'
                      />
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setVideoFile(null);
                          setPreviewUrl('');
                          setError('');
                        }}
                        className="absolute top-2 right-2 bg-red-500 text-white w-8 h-8 rounded-full flex items-center justify-center hover:bg-red-600"
                      >
                        ×
                      </button>
                    </div>
                  ) : (
                    <div className='text-center'>
                      <div className='w-16 h-16 rounded-full bg-white/10 flex items-center justify-center mx-auto mb-4'>
                        <svg className='w-8 h-8 text-white' fill='none' viewBox='0 0 24 24' stroke='currentColor'>
                          <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M12 6v6m0 0v6m0-6h6m-6 0H6' />
                        </svg>
                      </div>
                      <p className='text-white'>Click to upload video</p>
                    </div>
                  )}
                </div>
                <input
                  id="videoInput"
                  type="file"
                  accept="video/*"
                  onChange={handleVideoChange}
                  className='hidden'
                />

                {/* Social Media Sharing Section */}
                <div className='mt-6 w-[480px] mx-auto'>
                  <h3 className='text-white text-xl mb-4'>Share your achievement</h3>
                  <div className='flex gap-4 justify-center mb-6'>
                    <button
                      type="button"
                      onClick={() => handleSocialToggle('instagram')}
                      className={`flex items-center gap-2 px-6 py-3 rounded-lg transition-all ${
                        socialShare.instagram 
                          ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white' 
                          : 'bg-zinc-800 text-gray-300'
                      }`}
                    >
                      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                      </svg>
                      <span>Share to Instagram</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => handleSocialToggle('youtube')}
                      className={`flex items-center gap-2 px-6 py-3 rounded-lg transition-all ${
                        socialShare.youtube 
                          ? 'bg-red-600 text-white' 
                          : 'bg-zinc-800 text-gray-300'
                      }`}
                    >
                      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                      </svg>
                      <span>Share to YouTube</span>
                    </button>
                  </div>

                  {/* Challenge Friend Toggle and Form */}
                  <div className='mt-6 border-t border-zinc-800 pt-6'>
                    <button
                      type="button"
                      onClick={() => handleSocialToggle('challengeFriend')}
                      className={`w-full flex items-center justify-center gap-2 px-6 py-3 rounded-lg transition-all ${
                        socialShare.challengeFriend 
                          ? 'bg-gradient-to-r from-blue-500 to-indigo-500 text-white' 
                          : 'bg-zinc-800 text-gray-300'
                      }`}
                    >
                      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z" />
                      </svg>
                      <span>Challenge a Friend</span>
                    </button>

                    {socialShare.challengeFriend && (
                      <div className='mt-4 space-y-4 text-left'>
                        <div>
                          <label className='block text-gray-400 text-sm mb-1'>Friend's Name</label>
                          <input
                            type="text"
                            name="name"
                            value={friendDetails.name}
                            onChange={handleFriendDetailsChange}
                            placeholder="Enter your friend's name"
                            className='w-full bg-zinc-800 border border-zinc-700 rounded-lg px-4 py-2 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500'
                          />
                        </div>
                        <div>
                          <label className='block text-gray-400 text-sm mb-1'>Friend's Instagram Handle</label>
                          <input
                            type="text"
                            name="instagramHandle"
                            value={friendDetails.instagramHandle}
                            onChange={handleFriendDetailsChange}
                            placeholder="@username"
                            className='w-full bg-zinc-800 border border-zinc-700 rounded-lg px-4 py-2 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500'
                          />
                        </div>
                        <div>
                          <label className='block text-gray-400 text-sm mb-1'>Challenge Message</label>
                          <textarea
                            name="message"
                            value={friendDetails.message}
                            onChange={handleFriendDetailsChange}
                            placeholder="Write a message to challenge your friend..."
                            rows="3"
                            className='w-full bg-zinc-800 border border-zinc-700 rounded-lg px-4 py-2 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 resize-none'
                          />
                        </div>
                      </div>
                    )}
                  </div>

                  {(socialShare.instagram || socialShare.youtube || socialShare.challengeFriend) && (
                    <p className='text-gray-400 text-sm mt-4'>
                      Your video will be shared according to your selected preferences after submission
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterVideoSubmission; 