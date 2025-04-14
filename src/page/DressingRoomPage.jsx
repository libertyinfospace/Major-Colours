import React, { useState, useEffect, useRef } from 'react'
import ProfileHeader from '../components/ProfileHeader'
import RankCriteriaIconComponent from '../components/RankCriteriaIconComponent'
import RankCriteriaLineComponent from '../components/RankCriteriaLineComponent'
import FooterLinkComponent from '../components/FooterLinkComponent'
import SlideInCart from '../components/SlideInCart'
import spearIcon from '../assets/logo/Spear-active-icon.svg'
import spearIcon1 from '../assets/logo/Spear-icon-normal.svg'
import bidentIcon from '../assets/logo/Bident-active-icon.svg'
import bidentIcon1 from '../assets/logo/Bident-icon-normal.svg'
import tridentIcon from '../assets/logo/Trident-active-icon.svg'
import tridentIcon1 from '../assets/logo/Trident-icon-normal.svg'
import excalibur from '../assets/logo/Excalibur-active-icon.svg'
import excalibur1 from '../assets/logo/Excalibur-icon-normal.svg'
import dummyData from '../utils/dummyData'
import { FiFilter } from 'react-icons/fi'
import Filter from '../components/Filter'
import DressingRoomCart from '../components/DressingRoomCart'

// Import Spear images
import spear1_1 from '../assets/img/Dressing Room Images/Spear-1-1.png'
import spear1_2 from '../assets/img/Dressing Room Images/Spear-1-2.png'
import spear1_3 from '../assets/img/Dressing Room Images/Spear-1-3.png'
import spear1_4 from '../assets/img/Dressing Room Images/Spear-1-4.png'
import spear1_5 from '../assets/img/Dressing Room Images/Spear-1-5.png'
import spear1_6 from '../assets/img/Dressing Room Images/Spear-1-6.png'
import spear1_7 from '../assets/img/Dressing Room Images/Spear-1-7.png'
import spear1_8 from '../assets/img/Dressing Room Images/Spear-1-8.png'
import spear1_9 from '../assets/img/Dressing Room Images/Spear-1-9.png'
import spear2_1 from '../assets/img/Dressing Room Images/Spear-2-1.png'
import spear2_2 from '../assets/img/Dressing Room Images/Spear-2-2.png'
import spear2_3 from '../assets/img/Dressing Room Images/Spear-2-3.png'

// Import Bident images
import bident1_1 from '../assets/img/Dressing Room Images/Bident-1-1.png'
import bident1_2 from '../assets/img/Dressing Room Images/Bident-1-2.png'
import bident1_3 from '../assets/img/Dressing Room Images/Bident-1-3.png'
import bident1_4 from '../assets/img/Dressing Room Images/Bident-1-4.png'
import bident1_5 from '../assets/img/Dressing Room Images/Bident-1-5.png'
import bident1_6 from '../assets/img/Dressing Room Images/Bident-1-6.png'
import bident1_7 from '../assets/img/Dressing Room Images/Bident-1-7.png'
import bident1_8 from '../assets/img/Dressing Room Images/Bident-1-8.png'
import bident1_9 from '../assets/img/Dressing Room Images/Bident-1-9.png'

// Import Trident images
import trident1_1 from '../assets/img/Dressing Room Images/Trident-1-1.png'
import trident1_2 from '../assets/img/Dressing Room Images/Trident-1-2.png'
import trident1_3 from '../assets/img/Dressing Room Images/Trident-1-3.png'
import trident1_4 from '../assets/img/Dressing Room Images/Trident-1-4.png'
import trident1_5 from '../assets/img/Dressing Room Images/Trident-1-5.png'
import trident1_6 from '../assets/img/Dressing Room Images/Trident-1-6.png'

// Import Excalibur images
import excalibur1_1 from '../assets/img/Dressing Room Images/Excalibur-1-1.png'
import excalibur1_2 from '../assets/img/Dressing Room Images/Excalibur-1-2.png'
import excalibur1_3 from '../assets/img/Dressing Room Images/Excalibur-1-3.png'
import excalibur1_4 from '../assets/img/Dressing Room Images/Excalibur-1-4.png'
import excalibur1_5 from '../assets/img/Dressing Room Images/Excalibur-1-5.png'
import excalibur1_6 from '../assets/img/Dressing Room Images/Excalibur-1-6.png'
import excalibur1_7 from '../assets/img/Dressing Room Images/Excalibur-1-7.png'
import excalibur1_8 from '../assets/img/Dressing Room Images/Excalibur-1-8.png'
import excalibur1_9 from '../assets/img/Dressing Room Images/Excalibur-1-9.png'

const DressingRoomPage = () => {
  const [screenWidth, setScreenWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 1200);
  const [isLargeScreen, setIsLargeScreen] = useState(screenWidth >= 1000);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [sortByHighToLow, setSortByHighToLow] = useState(true);
  const iconsContainerRef = useRef(null);
  
  // Product data organized by categories
  const productCategories = {
    'SPEAR': [
      {
        title: "Spear Comfort Hoodie",
        price: "$150",
        images: [spear1_1, spear1_4, spear1_7],
        modelInfo: "Model is 175cm and 68kg Wearing Size S",
        inStock: true
      },
      {
        title: "Spear Classic Tee",
        price: "$75",
        images: [spear1_2, spear1_5, spear1_8],
        modelInfo: "Model is 180cm and 70kg Wearing Size M",
        inStock: true
      },
      {
        title: "Spear Vintage Jacket",
        price: "$220",
        images: [spear1_3, spear1_6, spear1_9],
        modelInfo: "Model is 182cm and 72kg Wearing Size L",
        inStock: false
      }
    ],
    'BIDENT': [
      {
        title: "Bident Premium Hoodie",
        price: "$180",
        images: [bident1_1, bident1_4, bident1_7],
        modelInfo: "Model is 178cm and 72kg Wearing Size M",
        inStock: true
      },
      {
        title: "Bident Performance Tee",
        price: "$95",
        images: [bident1_2, bident1_5, bident1_8],
        modelInfo: "Model is 183cm and 75kg Wearing Size L",
        inStock: true
      },
      {
        title: "Bident Urban Jacket",
        price: "$250",
        images: [bident1_3, bident1_6, bident1_9],
        modelInfo: "Model is 185cm and 77kg Wearing Size XL",
        inStock: true
      }
    ],
    'TRIDENT': [
      {
        title: "Trident Elite Hoodie",
        price: "$220",
        images: [trident1_1, trident1_4, spear2_1],
        modelInfo: "Model is 181cm and 74kg Wearing Size M",
        inStock: true
      },
      {
        title: "Trident Signature Tee",
        price: "$115",
        images: [trident1_2, trident1_5, spear2_2],
        modelInfo: "Model is 179cm and 73kg Wearing Size M",
        inStock: false
      },
      {
        title: "Trident Technical Jacket",
        price: "$290",
        images: [trident1_3, trident1_6, spear2_3],
        modelInfo: "Model is 184cm and 76kg Wearing Size L",
        inStock: true
      }
    ],
    'EXCALIBUR': [
      {
        title: "Excalibur Luxury Hoodie",
        price: "$300",
        images: [excalibur1_1, excalibur1_4, excalibur1_7],
        modelInfo: "Model is 187cm and 76kg Wearing Size M",
        inStock: true
      },
      {
        title: "Excalibur Premium Tee",
        price: "$150",
        images: [excalibur1_2, excalibur1_5, excalibur1_8],
        modelInfo: "Model is 186cm and 78kg Wearing Size L",
        inStock: true
      },
      {
        title: "Excalibur Designer Jacket",
        price: "$450",
        images: [excalibur1_3, excalibur1_6, excalibur1_9],
        modelInfo: "Model is 188cm and 80kg Wearing Size XL",
        inStock: true
      }
    ]
  };
  
  // Flatten all products into a single array
  const allProducts = Object.values(productCategories).flat();
  
  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      setScreenWidth(width);
      setIsLargeScreen(width >= 1000);
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  
  // Handle sorting function
  const handleApplySort = (isHighToLow) => {
    setSortByHighToLow(isHighToLow);
  };
  
  // Function to get numeric price from string (e.g., "$150" -> 150)
  const getNumericPrice = (priceString) => {
    return parseInt(priceString.replace(/\$|,/g, ''), 10);
  };
  
  // Sort products based on price
  const getSortedProducts = (category, products) => {
    // Create a copy to avoid modifying the original array
    const sortedProducts = [...products];
    
    // Sort by price
    sortedProducts.sort((a, b) => {
      const priceA = getNumericPrice(a.price);
      const priceB = getNumericPrice(b.price);
      
      return sortByHighToLow ? priceB - priceA : priceA - priceB;
    });
    
    return sortedProducts;
  };

  const rankIconsData = [
    { 
      iconPath: spearIcon, 
      data: dummyData[0],
      iconPath1: spearIcon1, 
      name1: "SPEAR", 
      name2: "LEVEL 1", 
      altName: "spear level 1" 
    },
    { 
      iconPath: bidentIcon, 
      data: dummyData[1],
      iconPath1: bidentIcon1, 
      name1: "BIDENT", 
      name2: "LEVEL 2", 
      altName: "bident level 1" 
    },
    { 
      iconPath: tridentIcon, 
      data: dummyData[2],
      iconPath1: tridentIcon1, 
      name1: "TRIDENT", 
      name2: "LEVEL 3", 
      altName: "trident level 1" 
    },
    { 
      iconPath: excalibur, 
      data: dummyData[3],
      iconPath1: excalibur1, 
      name1: "EXCALIBUR", 
      name2: "LEVEL 4", 
      altName: "excalibur level 1" 
    }
  ];

  const connectingLineWidths = (() => {
    if (screenWidth < 640) return '50px';
    if (screenWidth < 768) return '60px';
    if (screenWidth < 1024) return '80px';
    return '100px';
  })();

  return (
    <div className="flex flex-col min-h-screen bg-black">
      <ProfileHeader />
      <SlideInCart />
      
      {/* Fixed header section */}
      <div className="fixed top-[72px] left-0 right-0 z-50 bg-black">
        <div className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 ${screenWidth >= 1000 ? 'py-4' : 'py-3'}`}>
          {/* Extra padding for large screens - removed */}
          
          {/* Header row - switches to column on smaller screens */}
          <div className={`${screenWidth < 1000 ? 'flex-col space-y-4' : 'flex items-center'} flex w-full`}>
            
            {/* Desktop layout - Filter Button first */}
            {screenWidth >= 1000 && (
              <button 
                className="flex-shrink-0 flex items-center gap-2 bg-gray-800 hover:bg-gray-700 transition-colors text-white py-2 px-4 rounded-lg mr-4"
                onClick={() => setIsFilterOpen(true)}
              >
                <FiFilter className="text-lg" />
                <span>Filter</span>
              </button>
            )}
            
            {/* RANK Text - Top position on mobile, second on desktop */}
            {screenWidth < 1000 ? (
              <div className="w-full flex justify-start mb-2">
                <h3 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-white tracking-wider">RANK</h3>
              </div>
            ) : (
              <h3 className="flex-shrink-0 text-4xl md:text-5xl lg:text-6xl font-extrabold text-white whitespace-nowrap mr-6 tracking-wider">RANK</h3>
            )}
            
            {/* Rank Criteria Icons - Middle position on mobile, last on desktop */}
            <div className={`flex-1 overflow-x-auto hide-scrollbar w-full ${screenWidth < 1000 ? 'mb-3' : ''}`}>
              <div className="flex items-center justify-between w-full">
                <div className="flex-shrink-0">
                  <RankCriteriaIconComponent {...rankIconsData[0]} />
                </div>
                <div className="flex-shrink-0" style={{ width: connectingLineWidths }}>
                  <RankCriteriaLineComponent />
                </div>
                <div className="flex-shrink-0">
                  <RankCriteriaIconComponent {...rankIconsData[1]} />
                </div>
                <div className="flex-shrink-0" style={{ width: connectingLineWidths }}>
                  <RankCriteriaLineComponent />
                </div>
                <div className="flex-shrink-0">
                  <RankCriteriaIconComponent {...rankIconsData[2]} />
                </div>
                <div className="flex-shrink-0" style={{ width: connectingLineWidths }}>
                  <RankCriteriaLineComponent />
                </div>
                <div className="flex-shrink-0">
                  <RankCriteriaIconComponent {...rankIconsData[3]} />
                </div>
              </div>
            </div>
            
            {/* Filter Button - Bottom position on mobile */}
            {screenWidth < 1000 && (
              <div className="w-full flex justify-start">
                <button 
                  className="flex items-center gap-2 bg-gray-800 hover:bg-gray-700 transition-colors text-white py-2 px-6 rounded-lg"
                  onClick={() => setIsFilterOpen(true)}
                >
                  <FiFilter className="text-lg" />
                  <span>Filter</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
      
      {/* Main content with added top padding to account for fixed header */}
      <div className={`flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 ${screenWidth < 1000 ? 'pt-56 mt-36' : 'pt-36 mt-24'}`}>
        <div className="bg-black rounded-lg shadow-lg overflow-hidden">
          <div className="p-4 sm:p-6 md:p-8">
            {/* Section 2: All Products Line by Line */}
            <div className="mb-8">
              <div className="grid grid-cols-1 gap-8 md:gap-12">
                {Object.entries(productCategories).map(([category, products]) => {
                  // Get sorted products for this category
                  const sortedProducts = getSortedProducts(category, products);
                  
                  return sortedProducts.map((product, index) => {
                    // Find the corresponding rank data
                    const rankIconData = rankIconsData.find(icon => icon.name1 === category);
                    
                    return (
                      <div key={`${category}-${index}`} className="w-full border-b border-gray-800 pb-8 last:border-0 last:pb-0">
                        <DressingRoomCart
                          title={product.title}
                          price={product.price}
                          images={product.images}
                          modelInfo={product.modelInfo}
                          inStock={product.inStock}
                          rankData={rankIconData}
                          rankType={category}
                        />
                      </div>
                    );
                  });
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Filter Modal */}
      <Filter 
        isOpen={isFilterOpen} 
        onClose={() => setIsFilterOpen(false)} 
        onApplySort={(isHighToLow) => {
          setSortByHighToLow(isHighToLow);
          // If filter is closed after Clear Selection is clicked, 
          // this ensures the reset takes effect immediately
          if (isFilterOpen) {
            handleApplySort(isHighToLow);
          }
        }}
      />
      
      {/* Responsive footer spacing */}
      <div className="h-16 sm:h-20 md:h-24"></div>
      
      {/* Footer section */}
      <FooterLinkComponent />
    </div>
  )
}

export default DressingRoomPage
