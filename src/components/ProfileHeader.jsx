import React, { useState } from 'react'
import { FaCartPlus, FaBars, FaTimes } from 'react-icons/fa'
import { useNavigate } from 'react-router-dom'
import companyLogo from '../assets/img/MAJOR COLOURS-LOGO.png'

const ProfileHeader = () => {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  const navigateTo = (path) => {
    // For now, just log since these paths aren't defined
    console.log(`Navigating to: ${path}`);
    // When actual routes are set up, use: navigate(path)
  };
  
  return (
    <div className='w-[100%] flex bg-backgroundColor fixed top-0 py-5 left-0 justify-between px-4 sm:px-[5rem] z-50'>
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
            >
                <div className="flex items-center space-x-2 relative">
                    <FaCartPlus className="text-xl"/>
                    <p className=" ">0</p>
                </div>
            </li>
        </ul>

        {/* Mobile Menu Button */}
        <div className="sm:hidden flex items-center">
            <button 
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="text-textWhiteColor text-2xl"
            >
                {isMenuOpen ? <FaTimes /> : <FaBars />}
            </button>
        </div>

        {/* Mobile Sidebar Menu */}
        {isMenuOpen && (
            <div className="fixed top-0 right-0 w-1/2 h-full bg-backgroundColor sm:hidden z-50">
                <div className="flex justify-end p-4">
                    <button 
                        onClick={() => setIsMenuOpen(false)}
                        className="text-textWhiteColor text-2xl"
                    >
                        <FaTimes />
                    </button>
                </div>
                <ul className="flex flex-col items-center py-8 space-y-8">
                    <li
                        onClick={() => {
                            navigate("/login");
                            setIsMenuOpen(false);
                        }}
                        className="cursor-pointer hover:text-gray-300 text-navbartextSize text-textWhiteColor"
                    >
                        Membership
                    </li>
                    <li
                        onClick={() => {
                            navigateTo("Dressing Room");
                            setIsMenuOpen(false);
                        }}
                        className="cursor-pointer hover:text-gray-300 text-navbartextSize text-textWhiteColor"
                    >
                        Dressing Room
                    </li>
                    <li
                        onClick={() => {
                            navigateTo("Cart");
                            setIsMenuOpen(false);
                        }}
                        className="cursor-pointer hover:text-gray-300 text-navbartextSize text-textWhiteColor"
                    >
                        <div className="flex items-center space-x-2 relative">
                            <FaCartPlus className="text-xl"/>
                            <p>0</p>
                        </div>
                    </li>
                </ul>
            </div>
        )}
    </div>
  )
}

export default ProfileHeader
