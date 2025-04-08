import React from 'react'
import { FaCartPlus } from 'react-icons/fa6'
import { useNavigate } from 'react-router-dom'
import companyLogo from '../assets/img/MAJOR COLOURS-LOGO.png'

const ProfileHeader = () => {
  const navigate = useNavigate();
  
  const navigateTo = (path) => {
    // For now, just log since these paths aren't defined
    console.log(`Navigating to: ${path}`);
    // When actual routes are set up, use: navigate(path)
  };
  
  return (
    <div className='w-[100%] flex bg-backgroundColor fixed top-0 py-5 left-0 justify-between px-[5rem] z-50'>
        <img 
          className='w-[9.375rem] cursor-pointer' 
          src={companyLogo} 
          alt="Major Colours Logo" 
          onClick={() => navigate('/')}
        />
        <ul className="menu flex h-fit items-center text-textColor space-x-6">
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
    </div>
  )
}

export default ProfileHeader
