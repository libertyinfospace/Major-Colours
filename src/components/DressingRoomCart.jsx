import React, { useState, useEffect } from 'react'
import { FaChevronLeft, FaChevronRight, FaPlus, FaTimes, FaShoppingBag, FaExchangeAlt, FaRuler, FaLock } from 'react-icons/fa'
import { BsDot } from 'react-icons/bs'
import { useDispatch, useSelector } from 'react-redux'
import { rankInfoActiveState, rankCriteriaData, addToCart, toggleCart } from '../store/activeSlices'
import SizeGuideModal from './SizeGuideModal'

const DressingRoomCart = ({ 
  title = "Timeless Comfort Hoodie", 
  price = "$300", 
  images = ["/hoodie-image.jpg"],  // Now accepting an array of images
  modelInfo = "Model is 187cm and 76kg Wearing Size M", 
  inStock = true,
  rankData = null, // Data for the rank associated with this product
  rankType = "" // 'SPEAR', 'BIDENT', 'TRIDENT', or 'EXCALIBUR'
}) => {
  const [currentSlide, setCurrentSlide] = useState(0);  // Using 0-indexed for array access
  const [selectedSize, setSelectedSize] = useState(null);
  const [showSizeGuide, setShowSizeGuide] = useState(false);
  const [isFullScreen, setIsFullScreen] = useState(false); // New state for full-screen mode
  const dispatch = useDispatch();
  
  // Get current rank from Redux store
  const currentRank = useSelector(state => state.active?.currentRank || 'spear');
  
  // Define rank levels for comparison
  const rankLevels = {
    'SPEAR': 1,
    'BIDENT': 2,
    'TRIDENT': 3,
    'EXCALIBUR': 4
  };
  
  // Normalize rankType to uppercase and handle empty strings
  const normalizedRankType = rankType ? rankType.toUpperCase() : 'SPEAR';
  const normalizedCurrentRank = currentRank ? currentRank.toUpperCase() : 'SPEAR';
  
  const productRankLevel = rankLevels[normalizedRankType] || 1;
  const userRankLevel = rankLevels[normalizedCurrentRank] || 1;
  
  // For debugging - only in development
  useEffect(() => {
    if (process.env.NODE_ENV === 'development') {
      console.log(`Product ${title}: ${normalizedRankType} (${productRankLevel}) - User: ${normalizedCurrentRank} (${userRankLevel})`);
    }
  }, [title, normalizedRankType, productRankLevel, normalizedCurrentRank, userRankLevel]);
  
  // Check if current product rank is higher than user's current rank
  const isLocked = productRankLevel > userRankLevel;
  
  const totalSlides = images.length;
  const sizes = ['XXS', 'XS', 'S', 'M', 'L', 'XL', 'XXL'];
  
  // Update rank icon in the header when this product is visible
  useEffect(() => {
    const options = {
      root: null,
      rootMargin: '0px',
      threshold: 0.5, // When 50% of the element is visible
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && rankData) {
          // When this product is visible, update the active rank
          dispatch(rankInfoActiveState({
            iconPath: rankData.iconPath,
            name1: normalizedRankType,
            name2: `LEVEL ${normalizedRankType === 'SPEAR' ? '1' : normalizedRankType === 'BIDENT' ? '2' : normalizedRankType === 'TRIDENT' ? '3' : '4'}`,
            altName: `${normalizedRankType.toLowerCase()} level`
          }));
          dispatch(rankCriteriaData(rankData.data));
        }
      });
    }, options);

    // Get the current element
    const element = document.getElementById(`product-${title.replace(/\s+/g, '-').toLowerCase()}`);
    if (element) {
      observer.observe(element);
    }

    return () => {
      if (element) {
        observer.unobserve(element);
      }
    };
  }, [rankData, normalizedRankType, dispatch, title]);
  
  // Add event listener to handle escape key for closing fullscreen
  useEffect(() => {
    const handleEscKey = (e) => {
      if (e.key === 'Escape' && isFullScreen) {
        setIsFullScreen(false);
      }
    };
    
    if (isFullScreen) {
      document.addEventListener('keydown', handleEscKey);
      // Prevent scrolling when in full-screen mode
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    
    return () => {
      document.removeEventListener('keydown', handleEscKey);
      document.body.style.overflow = '';
    };
  }, [isFullScreen]);
  
  const handlePrevSlide = () => {
    setCurrentSlide(prev => (prev === 0 ? totalSlides - 1 : prev - 1));
  };
  
  const handleNextSlide = () => {
    setCurrentSlide(prev => (prev === totalSlides - 1 ? 0 : prev + 1));
  };
  
  const handleSizeSelect = (size) => {
    if (isLocked) return;
    setSelectedSize(size);
  };

  const toggleSizeGuide = () => {
    setShowSizeGuide(prev => !prev);
  };
  
  const toggleFullScreen = () => {
    setIsFullScreen(prev => !prev);
  };
  
  const handleAddToCart = () => {
    if (isLocked || !selectedSize) return;
    
    const numericPrice = parseInt(price.replace(/[^0-9]/g, ''));
    const productToAdd = {
      id: Date.now(), // Using timestamp as a simple unique ID
      name: title,
      price: numericPrice,
      size: selectedSize,
      quantity: 1,
      image: images[0]
    };
    
    // Dispatch the action to add to cart
    dispatch(addToCart(productToAdd));
    
    // Open the cart slide-in after adding the item
    dispatch(toggleCart(true));
  };
  
  return (
    <div 
      id={`product-${title.replace(/\s+/g, '-').toLowerCase()}`} 
      data-rank={rankType}
      className="text-white p-4 md:p-8 w-full"
    >
      <div className="w-full mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-8">
          {/* Left Section - Product Image Carousel */}
          <div className="relative bg-white rounded-lg overflow-hidden aspect-square w-full">
            <div className="absolute inset-0 flex items-center justify-center p-0">
              <img 
                src={images[currentSlide]} 
                alt={`${title} - image ${currentSlide + 1}`} 
                className="w-full h-full object-cover"
              />
            </div>
            
            {/* Navigation Arrows */}
            <button 
              onClick={handlePrevSlide}
              className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 text-white w-10 h-10 rounded-full flex items-center justify-center hover:bg-black/70 transition z-10"
            >
              <FaChevronLeft />
            </button>
            
            <button 
              onClick={handleNextSlide}
              className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 text-white w-10 h-10 rounded-full flex items-center justify-center hover:bg-black/70 transition z-10"
            >
              <FaChevronRight />
            </button>
            
            {/* Slide Indicator */}
            <div className="absolute bottom-4 left-4 bg-black/50 text-white px-2 py-1 rounded text-sm z-10">
              {currentSlide + 1} / {totalSlides}
            </div>
            
            {/* Zoom/Fullscreen Button */}
            <button 
              onClick={toggleFullScreen}
              className="absolute bottom-4 right-4 bg-black/50 text-white w-8 h-8 rounded-full flex items-center justify-center hover:bg-black/70 transition z-10"
            >
              <FaPlus />
            </button>
          </div>
          
          {/* Right Section - Product Details */}
          <div className="flex flex-col space-y-4 md:space-y-6 w-full">
            {/* Product Name and Price */}
            <div className="flex justify-between items-start">
              <h1 className="text-2xl md:text-3xl font-bold flex items-center">
                {title} {isLocked && <FaLock className="ml-2 text-gray-400" />}
              </h1>
              <span className="text-xl font-medium">{price}</span>
            </div>
            
            {/* Required Rank Message - only show for locked items */}
            {isLocked && (
              <div className="bg-gray-800 text-yellow-400 py-2 px-3 rounded text-sm flex items-center">
                <FaLock className="mr-2" />
                <span>{normalizedRankType} Rank Required</span>
              </div>
            )}
            
            {/* Model Info and Size Guide */}
            <div className="flex flex-col md:flex-row md:justify-between md:items-center text-gray-400 text-sm">
              <p>{modelInfo}</p>
              <button 
                onClick={toggleSizeGuide}
                className="flex items-center space-x-2 text-blue-400 hover:text-blue-300 transition-colors mt-2 md:mt-0"
              >
                <FaRuler />
                <span className="underline">Size & Fit Guide</span>
              </button>
            </div>
            
            {/* Size Selection */}
            <div className="space-y-2">
              <p className="text-sm font-medium">SELECT SIZE</p>
              
              {/* Size Grid */}
              <div className="grid grid-cols-4 sm:grid-cols-7 gap-2">
                {sizes.map(size => (
                  <button
                    key={size}
                    onClick={() => !isLocked && handleSizeSelect(size)}
                    className={`py-2 border rounded-md transition ${
                      selectedSize === size 
                        ? 'border-white bg-white text-black' 
                        : 'border-gray-600 hover:border-gray-400'
                    } ${isLocked ? 'opacity-50 cursor-not-allowed' : ''}`}
                    disabled={isLocked}
                  >
                    {size}
                  </button>
                ))}
              </div>
              
              {/* Select Size Button - only show when no size is selected */}
              {!selectedSize && (
                <button
                  className={`w-full py-3 px-4 bg-white text-black font-medium transition-colors rounded-md mt-3 ${isLocked ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-200'}`}
                  onClick={() => !isLocked && setSelectedSize(null)}
                  disabled={isLocked}
                >
                  {isLocked ? 'LOCKED' : 'SELECT A SIZE'}
                </button>
              )}
            </div>
            
            {/* Add to Cart Button */}
            {selectedSize && (
              <button 
                onClick={handleAddToCart}
                className={`w-full py-3 ${
                  isLocked 
                    ? 'bg-gray-500 text-gray-300 cursor-not-allowed' 
                    : inStock 
                      ? 'bg-white text-black hover:bg-gray-200' 
                      : 'bg-gray-500 text-gray-300 cursor-not-allowed'
                } font-medium transition-colors duration-200 mt-4`}
                disabled={isLocked || !inStock}
              >
                {isLocked ? 'LOCKED' : inStock ? 'ADD TO CART' : 'OUT OF STOCK'}
              </button>
            )}
            
            {/* Shop Pay Button */}
            {selectedSize && (
              <button 
                className={`w-full ${
                  isLocked 
                    ? 'bg-gray-500 cursor-not-allowed' 
                    : inStock 
                      ? 'bg-[#5A31F4] hover:bg-[#4b27d3]' 
                      : 'bg-gray-500 cursor-not-allowed'
                } text-white py-3 rounded-md flex items-center justify-center space-x-1 transition shadow-sm mt-4`}
                disabled={isLocked || !inStock}
              >
                <span>Buy with</span>
                <span className="font-bold">shop</span>
                <span className={`${isLocked ? 'bg-gray-300 text-gray-500' : inStock ? 'bg-white text-[#5A31F4]' : 'bg-gray-300 text-gray-500'} px-1 rounded`}>Pay</span>
              </button>
            )}
            
            {/* Features */}
            <div className="space-y-3 md:space-y-4 pt-4 border-t border-gray-700">
              <div className="flex items-center">
                <div className="w-7 flex justify-center">
                  <FaShoppingBag className="text-gray-400 text-lg" />
                </div>
                <span>Free Shipping</span>
              </div>
              
              <div className="flex items-center">
                <div className="w-7 flex justify-center">
                  <FaExchangeAlt className="text-gray-400 text-lg" />
                </div>
                <span>Easy Returns</span>
              </div>
              
              <div className="flex items-center">
                <div className="w-7 flex justify-center h-6 overflow-visible">
                  <BsDot className={`text-5xl ${isLocked ? 'text-red-500' : inStock ? 'text-green-500' : 'text-red-500'} -mt-3`} />
                </div>
                <span>{isLocked ? 'Locked' : inStock ? 'In Stock' : 'Out of Stock'}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Fullscreen Image Overlay */}
      {isFullScreen && (
        <div className="fixed inset-0 bg-black z-[1000] flex items-center justify-center">
          <div className="relative w-full h-full">
            {/* Fullscreen Image */}
            <img 
              src={images[currentSlide]} 
              alt={`${title} - image ${currentSlide + 1} fullscreen`} 
              className="w-full h-full object-contain"
            />
            
            {/* Navigation Arrows - larger for fullscreen */}
            <button 
              onClick={handlePrevSlide}
              className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 text-white w-12 h-12 rounded-full flex items-center justify-center hover:bg-black/70 transition z-10"
            >
              <FaChevronLeft size={20} />
            </button>
            
            <button 
              onClick={handleNextSlide}
              className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 text-white w-12 h-12 rounded-full flex items-center justify-center hover:bg-black/70 transition z-10"
            >
              <FaChevronRight size={20} />
            </button>
            
            {/* Slide Indicator */}
            <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 bg-black/50 text-white px-4 py-2 rounded text-lg z-10">
              {currentSlide + 1} / {totalSlides}
            </div>
            
            {/* Close Button */}
            <button 
              onClick={toggleFullScreen}
              className="absolute top-6 right-6 bg-black/50 text-white w-12 h-12 rounded-full flex items-center justify-center hover:bg-black/70 transition z-10"
            >
              <FaTimes size={20} />
            </button>
          </div>
        </div>
      )}
      
      {/* Size Guide Modal */}
      {showSizeGuide && (
        <SizeGuideModal onClose={toggleSizeGuide} isVisible={showSizeGuide} />
      )}
    </div>
  )
}

export default DressingRoomCart
