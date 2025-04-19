import React, { useEffect, useState } from 'react';

const Filter = ({ isOpen, onClose, onApplySort }) => {
  const [sortByHighToLow, setSortByHighToLow] = useState(true);
  const [selectedGender, setSelectedGender] = useState('men');
  const [isGenderExpanded, setIsGenderExpanded] = useState(false);

  // Lock body scroll when filter is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isOpen]);

  const handleClearSelection = () => {
    setSortByHighToLow(true);
    setSelectedGender('men');
    setIsGenderExpanded(false);
    
    // Notify parent component about reset to default sorting (High to Low)
    if (onApplySort) {
      onApplySort(true);
    }
    
    // Automatically close the filter after clearing selection
    onClose();
  };

  const handleApply = () => {
    // Pass the sort order to the parent component
    if (onApplySort) {
      onApplySort(sortByHighToLow);
    }
    onClose();
  };

  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-75 z-[999] transition-opacity"
          onClick={onClose}
        />
      )}
      
      {/* Sidebar */}
      <div 
        className={`fixed top-0 left-0 h-full w-[80%] md:w-[30%] max-w-sm bg-black z-[1000] shadow-lg transform transition-transform duration-300 ease-in-out ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        } text-gray-100 flex flex-col`}
      >
        {/* Header */}
        <div className="p-5 border-b border-gray-700 flex justify-between items-center">
          <h1 className="text-white font-bold text-xl">Filter</h1>
          <button onClick={onClose} className="text-gray-400 hover:text-white text-2xl">
            &times;
          </button>
        </div>

        {/* Filter content */}
        <div className="p-5 flex-grow overflow-y-auto">
          {/* Sort By Section */}
          <div className="mb-6">
            <h2 className="text-sm text-gray-400 mb-3">Sort By</h2>
            <div className="space-y-3">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={sortByHighToLow}
                  onChange={() => setSortByHighToLow(true)}
                  className="form-checkbox h-4 w-4 text-white border-gray-600 rounded bg-gray-800"
                />
                <span className="ml-2">Price: High to Low</span>
              </label>
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={!sortByHighToLow}
                  onChange={() => setSortByHighToLow(false)}
                  className="form-checkbox h-4 w-4 text-white border-gray-600 rounded bg-gray-800"
                />
                <span className="ml-2">Price: Low to High</span>
              </label>
            </div>
          </div>

          {/* Gender Section */}
          <div className="mb-6">
            <div 
              className="flex justify-between items-center cursor-pointer mb-3"
              onClick={() => setIsGenderExpanded(!isGenderExpanded)}
            >
              <h2 className="text-sm text-gray-400">Gender</h2>
              <span>{isGenderExpanded ? '−' : '+'}</span>
            </div>
            {isGenderExpanded && (
              <div className="space-y-3">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={selectedGender === 'men'}
                    onChange={() => setSelectedGender('men')}
                    className="form-checkbox h-4 w-4 text-white border-gray-600 rounded bg-gray-800"
                  />
                  <span className="ml-2">Men</span>
                </label>
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={selectedGender === 'women'}
                    onChange={() => setSelectedGender('women')}
                    className="form-checkbox h-4 w-4 text-white border-gray-600 rounded bg-gray-800"
                  />
                  <span className="ml-2">Women</span>
                </label>
              </div>
            )}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="p-5 border-t border-gray-700">
          <div className="space-y-3">
            <button
              onClick={handleApply}
              className="w-full py-2 bg-white text-black font-medium rounded hover:bg-gray-200 transition-colors"
            >
              APPLY
            </button>
            <button
              onClick={handleClearSelection}
              className="w-full py-2 border border-white text-white font-medium rounded hover:bg-gray-800 transition-colors"
            >
              CLEAR SELECTION
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Filter; 