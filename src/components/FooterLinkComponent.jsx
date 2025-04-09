import React from 'react'
import { FaDiscord, FaFacebook, FaTwitter, FaYoutube, FaInstagram } from "react-icons/fa";

const FooterLinkComponent = () => {
  return (
    <div className='flex flex-col md:flex-row justify-between items-center w-[95%] py-4 mx-auto gap-4 md:gap-0'>
      {/* Social Media Icons - On top for mobile, right side for desktop */}
      <div className='order-1 md:order-2 w-full md:w-auto flex justify-center md:justify-end'>
        <ol className='flex items-center text-textColor space-x-6 md:space-x-4'>
          <li><FaDiscord className='text-linkIconSize text-xl md:text-base hover:text-white transition-colors'/></li>
          <li><FaFacebook className='text-linkIconSize text-xl md:text-base hover:text-white transition-colors'/></li>
          <li><FaTwitter className='text-linkIconSize text-xl md:text-base hover:text-white transition-colors'/></li>
          <li><FaYoutube className='text-linkIconSize text-xl md:text-base hover:text-white transition-colors'/></li>
          <li><FaInstagram className='text-linkIconSize text-xl md:text-base hover:text-white transition-colors'/></li>
        </ol>
      </div>
      
      {/* Copyright Text - Below icons for mobile, left side for desktop */}
      <p className='order-2 md:order-1 text-textColor text-center md:text-left text-sm md:text-base'>
        2025 MAJORCOLOURS. ALL RIGHTS RESERVED
      </p>
    </div>
  )
}

export default FooterLinkComponent
