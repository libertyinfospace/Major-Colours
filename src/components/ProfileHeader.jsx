import React, { useState, useEffect } from 'react'
import { FaCartPlus, FaBars, FaTimes } from 'react-icons/fa'
import { useNavigate } from 'react-router-dom'
import companyLogo from '../assets/img/MAJOR COLOURS-LOGO.png'
import { useDispatch, useSelector } from 'react-redux'
import { toggleCart } from '../store/activeSlices'

const ProfileHeader = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const cartItems = useSelector(state => state.active.cartItems);
  
  // Calculate total items in cart
  const cartItemCount = cartItems.reduce((total, item) => total + item.quantity, 0);
  
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
  
  const navigateTo = (path) => {
    if (path === "Cart") {
      dispatch(toggleCart(true));
    } else if (path === "Dressing Room") {
      navigate("/dressing-room");
    } else {
      navigate(path);
    }
    setIsMenuOpen(false);
  };
  
  return (
    <div className='w-[100%] flex bg-backgroundColor fixed top-0 py-5 left-0 justify-between px-4 sm:px-[5rem] z-[200]'>
        <img 
          className='w-[9.375rem] cursor-pointer' 
          src={companyLogo} 
          alt="Major Colours Logo" 
          onClick={() => navigate('/')}
        />
        {/* Desktop Menu */}
        <ul className="hidden sm:flex h-fit items-center text-textWhiteColor space-x-6">
            <li
                onClick={() => navigate("/login")}
                className="cursor-pointer hover:text-gray-300 text-navbartextSize"
            >
                Membership
            </li>
            <li
                onClick={() => navigateTo("Dressing Room")}
                className="cursor-pointer hover:text-gray-300 text-navbartextSize"
            >
                Dressing Room
            </li>
            <li
                onClick={() => navigateTo("Cart")}
                className="cursor-pointer hover:text-gray-300 text-navbartextSize"
                data-cart-toggle="true"
            >
                <div className="flex items-center space-x-2 relative">
                    <FaCartPlus className="text-xl"/>
                    <p className=" ">{cartItemCount}</p>
                </div>
            </li>
        </ul>

        {/* Mobile Menu Button */}
        <div className="sm:hidden flex items-center z-[201]">
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
                            <li
                                onClick={() => navigateTo("/login")}
                                className="cursor-pointer hover:text-gray-300 text-xl text-textWhiteColor py-2"
                            >
                                Membership
                            </li>
                            <div className="border-t border-gray-700 w-full"></div>
                            
                            <li
                                onClick={() => navigateTo("Dressing Room")}
                                className="cursor-pointer hover:text-gray-300 text-xl text-textWhiteColor py-2"
                            >
                                Dressing Room
                            </li>
                            <div className="border-t border-gray-700 w-full"></div>
                            
                            <li
                                onClick={() => navigateTo("Cart")}
                                className="cursor-pointer hover:text-gray-300 text-xl text-textWhiteColor py-2"
                                data-cart-toggle="true"
                            >
                                <div className="flex items-center space-x-3">
                                    <FaCartPlus className="text-2xl"/>
                                    <span>Cart ({cartItemCount})</span>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
            </>
        )}
    </div>
  )
}

export default ProfileHeader
