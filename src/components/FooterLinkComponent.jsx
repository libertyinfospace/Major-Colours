import React from 'react'
import { FaDiscord,FaFacebook,FaTwitter ,FaYoutube ,FaInstagram } from "react-icons/fa";
const FooterLinkComponent = () => {
  return (
    <div className='flex justify-between items-center w-[95%] py-4 h-[18px] mx-auto'>
          <p className='text-textColor '>2025 MAJORCOLOURS. ALL RIGHTS RESERVED</p>
          <ol className='flex items-center text-textColor space-x-4'>
              <li><FaDiscord className='text-linkIconSize'/></li>
              <li><FaFacebook className='text-linkIconSize '/></li>
              <li><FaTwitter className='text-linkIconSize '/></li>
              <li><FaYoutube className='text-linkIconSize '/></li>
              <li><FaInstagram className='text-linkIconSize '/></li>
          </ol>
          
        </div>
  )
}

export default FooterLinkComponent
