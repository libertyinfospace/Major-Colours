import React, { useState, useRef } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const RegisterVideoSubmission = ({ onBack }) => {
  const navigate = useNavigate();
  const [isSharingEnabled, setIsSharingEnabled] = useState(false);
  const [instagramHandle, setInstagramHandle] = useState('');
  const [challengeFriend, setChallengeFriend] = useState('');
  const [videoFile, setVideoFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState('');
  const fileInputRef = useRef(null);
  
  // Get the selected rank from Redux store
  const selectedRank = useSelector((state) => state.active.rankCretriaActiveState);

  const handleCancel = () => {
    onBack();
  };

  const handleSubmit = () => {
    // Handle submission logic here
    
    // Show success message and don't navigate away
    alert('Video submitted successfully!');
    
    // Go back if onBack is provided
    if (onBack) {
      onBack();
    }
  };

  const handleToggleChange = () => {
    setIsSharingEnabled(!isSharingEnabled);
  };

  const handleVideoClick = () => {
    fileInputRef.current.click();
  };

  const handleVideoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setVideoFile(file);
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
    }
  };

  const handleRemoveVideo = (e) => {
    e.stopPropagation();
    setVideoFile(null);
    setPreviewUrl('');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
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
    <div className="min-h-screen bg-black text-white p-8">
      {/* Selected Rank Display */}
      {selectedRank && (
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-textWhiteColor">
            {selectedRank.name1}
          </h1>
        </div>
      )}
      
      {/* Video Upload Box */}
      <div 
        className="w-full h-64 border-2 border-dashed border-gray-600 rounded-lg flex items-center justify-center cursor-pointer mb-8 hover:border-gray-500 transition-colors"
        onClick={handleVideoClick}
      >
        {previewUrl ? (
          <div className="relative w-full h-full">
            <video 
              src={previewUrl} 
              controls 
              className="w-full h-full object-cover rounded-lg"
            />
            <button
              onClick={handleRemoveVideo}
              className="absolute top-2 right-2 bg-red-500 text-white w-8 h-8 rounded-full flex items-center justify-center hover:bg-red-600"
            >
              ×
            </button>
          </div>
        ) : (
          <div className="text-center">
            <p className="text-xl">Click to upload video</p>
            <p className="text-sm text-gray-400">Supported formats: MP4, MOV, AVI (max 100MB)</p>
          </div>
        )}
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleVideoChange}
          accept="video/*"
          className="hidden"
        />
      </div>

      {/* Sharing Message */}
      <p className="text-xl mb-6">
        We would be honored to share your achievement with the rest of Major Colours
      </p>

      {/* Toggle Button */}
      <div className="mb-6">
        <label className="flex items-center cursor-pointer">
          <div className="relative">
            <input
              type="checkbox"
              className="sr-only"
              checked={isSharingEnabled}
              onChange={handleToggleChange}
            />
            <div className={`block w-14 h-8 rounded-full transition-colors ${
              isSharingEnabled ? 'bg-blue-600' : 'bg-gray-600'
            }`}></div>
            <div className={`dot absolute left-1 top-1 bg-white w-6 h-6 rounded-full transition-transform ${
              isSharingEnabled ? 'transform translate-x-6' : ''
            }`}></div>
          </div>
          <div className="ml-3 text-lg">Enable Sharing</div>
        </label>
      </div>

      {/* Instagram and Challenge Inputs */}
      {isSharingEnabled && (
        <div className="space-y-4 mb-8">
          <div>
            <input
              type="text"
              placeholder="Instagram Handle"
              value={instagramHandle}
              onChange={(e) => setInstagramHandle(e.target.value)}
              className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 focus:outline-none focus:border-blue-500"
            />
          </div>
          <div>
            <input
              type="text"
              placeholder="Challenge a friend (Instagram handle)"
              value={challengeFriend}
              onChange={(e) => setChallengeFriend(e.target.value)}
              className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 focus:outline-none focus:border-blue-500"
            />
          </div>
        </div>
      )}

      {/* Buttons */}
      <div className="flex gap-4">
        <button
          onClick={handleCancel}
          className="px-6 py-2 border border-gray-600 rounded-lg hover:bg-gray-800 transition"
        >
          Cancel
        </button>
        <button
          onClick={handleSubmit}
          className="px-6 py-2 bg-blue-600 rounded-lg hover:bg-blue-700 transition"
        >
          Submit
        </button>
      </div>
    </div>
  );
};

export default RegisterVideoSubmission; 