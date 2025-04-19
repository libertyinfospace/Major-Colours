import React, { useState, useEffect } from 'react'
import { FaCartPlus, FaBars, FaTimes } from 'react-icons/fa'
import { useNavigate } from 'react-router-dom'
import companyLogo from '../assets/img/MAJOR COLOURS-LOGO.png'
import { useDispatch, useSelector } from 'react-redux'
import { toggleCart } from '../store/activeSlices'
// Import rank icons
import spearIconNormal from "../assets/logo/Spear-icon-normal.svg"
import bidentIconNormal from "../assets/logo/Bident-icon-normal.svg"
import tridentIconNormal from "../assets/logo/Trident-icon-normal.svg"
import excaliburIconNormal from "../assets/logo/Excalibur-icon-normal.svg"

const ProfileHeader = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const cartItems = useSelector(state => state.active.cartItems);
  const isCartOpen = useSelector(state => state.active.isCartOpen);
  const rankInfo = useSelector(state => state.active.rankCretriaActiveState);
  // Get the currentRank string directly from the Redux store
  const currentRank = useSelector(state => state.active.currentRank);
  const [userInfo, setUserInfo] = useState(null);
  
  // Calculate total items in cart
  const cartItemCount = cartItems.reduce((total, item) => total + item.quantity, 0);
  
  // Check if user is logged in
  useEffect(() => {
    const loginInfoString = localStorage.getItem('userData');
    if (loginInfoString) {
      try {
        const loginInfo = JSON.parse(loginInfoString);
        // console.log(loginInfo.user.fullName)
        if (loginInfo.isLoggedIn) {
          setUserInfo(loginInfo.user);
        }
      } catch (error) {
        // Error parsing login info
      }
    }
  }, []);
  
  // Prevent scrolling when menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isMenuOpen]);
  
  const handleCartClick = (e) => {
    if (e) e.stopPropagation(); // Prevent event bubbling
    dispatch(toggleCart(true)); // Open the cart
  };
  
  const navigateTo = (path) => {
    if (path === "Cart") {
      handleCartClick();
    } else if (path === "Dressing Room") {
      navigate("/dressing-room");
      // Close cart if open
      if (isCartOpen) {
        dispatch(toggleCart(false));
      }
    } else {
      navigate(path);
      // Close cart if open
      if (isCartOpen) {
        dispatch(toggleCart(false));
      }
    }
    setIsMenuOpen(false);
  };
  
  // Get the appropriate rank icon based on currentRank from redux store
  const getRankIcon = () => {
    // Use the currentRank value to determine which icon to show
    // Convert to lowercase and trim for case-insensitive comparison
    const rank = currentRank ? currentRank.toLowerCase().trim() : "spear";
    
    switch (rank) {
      case "bident":
        return bidentIconNormal;
      case "trident":
        return tridentIconNormal;
      case "excalibur":
        return excaliburIconNormal;
      default:
        return spearIconNormal; // Default to spear
    }
  };
  
  return (
    <>
      <style>
        {`
          .cart-icon-container {
            position: relative;
            display: inline-flex;
            align-items: center;
            justify-content: center;
          }
          .cart-count {
            position: absolute;
            top: -9px;
            right: -9px;
            background-color: #ffffff;
            color: #000000;
            border-radius: 50%;
            width: 16px;
            height: 16px;
            font-size: 10px;
            line-height: 1;
            display: flex;
            align-items: center;
            justify-content: center;
            font-weight: bold;
            z-index: 1;
            padding: 0;
            box-sizing: content-box;
            border: 1px solid #ffffff;
          }
          .user-profile {
            display: flex;
            align-items: center;
          }
          .rank-icon {
            height: 26px;
            margin-right: 8px;
          }
          .user-rank {
            font-size: 0.7rem;
            opacity: 0.7;
            margin-left: 5px;
          }
        `}
      </style>

      <div className='w-[100%] flex bg-backgroundColor fixed top-0 py-5 left-0 justify-between px-4 sm:px-[5rem] z-[200]'>
          <img 
            className='w-[9.375rem] cursor-pointer' 
            src={companyLogo} 
            alt="Major Colours Logo" 
            onClick={() => navigate('/')}
          />
          {/* Desktop Menu */}
          <ul className="hidden sm:flex h-fit items-center text-textWhiteColor space-x-6">
              {userInfo ? (
                <li
                  onClick={() => navigate("/profile")}
                  className="cursor-pointer hover:text-gray-300 text-navbartextSize"
                >
                  <div className="user-profile">
                    <img 
                      src={getRankIcon()} 
                      alt="Rank" 
                      className="rank-icon" 
                    />
                    <span>{userInfo.fullName}</span>
                  </div>
                </li>
              ) : (
                <li
                  onClick={() => navigate("/login")}
                  className="cursor-pointer hover:text-gray-300 text-navbartextSize"
                >
                  Membership
                </li>
              )}
              <li
                  onClick={() => navigateTo("Dressing Room")}
                  className="cursor-pointer hover:text-gray-300 text-navbartextSize"
              >
                  Dressing Room
              </li>
              <li
                  onClick={handleCartClick}
                  className="cursor-pointer hover:text-gray-300 text-navbartextSize"
                  data-cart-toggle="true"
                  aria-label="Open cart"
              >
                  <div className="cart-icon-container">
                      <FaCartPlus className="text-xl"/>
                      {cartItemCount > 0 && (
                        <span className="cart-count">
                          {cartItemCount < 10 ? cartItemCount : '9+'}
                        </span>
                      )}
                  </div>
              </li>
          </ul>

          {/* Mobile Menu Button */}
          <div className="sm:hidden flex items-center z-[201]">
              {/* Mobile Cart Icon */}
              <div 
                className="text-textWhiteColor text-2xl mr-4 cursor-pointer"
                onClick={handleCartClick}
                aria-label="Cart"
              >
                <div className="cart-icon-container">
                  <FaCartPlus className="text-xl" />
                  {cartItemCount > 0 && (
                    <span className="cart-count">
                      {cartItemCount < 10 ? cartItemCount : '9+'}
                    </span>
                  )}
                </div>
              </div>
              
              <button 
                  onClick={() => setIsMenuOpen(!isMenuOpen)}
                  className="text-textWhiteColor text-2xl"
                  aria-label="Toggle menu"
              >
                  {isMenuOpen ? <FaTimes /> : <FaBars />}
              </button>
          </div>

          {/* Mobile Sidebar Menu */}
          {isMenuOpen && (
              <>
                  {/* Backdrop overlay */}
                  <div 
                      className="fixed inset-0 bg-black bg-opacity-60 z-[1000]" 
                      onClick={() => setIsMenuOpen(false)}
                  ></div>
                  
                  {/* Menu panel */}
                  <div className="fixed top-0 right-0 w-[80%] max-w-sm h-full bg-backgroundColor z-[1001] overflow-y-auto">
                      <div className="flex justify-end p-4">
                          <button 
                              onClick={() => setIsMenuOpen(false)}
                              className="text-textWhiteColor text-2xl"
                              aria-label="Close menu"
                          >
                              <FaTimes />
                          </button>
                      </div>
                      
                      <div className="px-6 py-4">
                          <ul className="flex flex-col space-y-6">
                              {userInfo ? (
                                <li
                                  onClick={() => navigate("/profile")}
                                  className="cursor-pointer hover:text-gray-300 text-xl text-textWhiteColor py-2"
                                >
                                  <div className="user-profile">
                                    <img 
                                      src={getRankIcon()} 
                                      alt="Rank" 
                                      className="rank-icon" 
                                    />
                                    <span>{userInfo.fullName}</span>
                                  </div>
                                </li>
                              ) : (
                                <li
                                  onClick={() => navigate("/login")}
                                  className="cursor-pointer hover:text-gray-300 text-xl text-textWhiteColor py-2"
                                >
                                  Membership
                                </li>
                              )}
                              <div className="border-t border-gray-700 w-full"></div>
                              
                              <li
                                  onClick={() => navigateTo("Dressing Room")}
                                  className="cursor-pointer hover:text-gray-300 text-xl text-textWhiteColor py-2"
                              >
                                  Dressing Room
                              </li>
                              <div className="border-t border-gray-700 w-full"></div>
                              
                              <li
                                  onClick={handleCartClick}
                                  className="cursor-pointer hover:text-gray-300 text-xl text-textWhiteColor py-2"
                                  data-cart-toggle="true"
                                  aria-label="Open cart"
                              >
                                  <div className="flex items-center space-x-3">
                                      <div className="cart-icon-container">
                                        <FaCartPlus className="text-2xl"/>
                                        {cartItemCount > 0 && (
                                          <span className="cart-count">
                                            {cartItemCount < 10 ? cartItemCount : '9+'}
                                          </span>
                                        )}
                                      </div>
                                      <span>Cart</span>
                                  </div>
                              </li>
                          </ul>
                      </div>
                  </div>
              </>
          )}
      </div>
    </>
  )
}

export default ProfileHeader
