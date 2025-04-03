import React from 'react'
import { FaDiscord,FaFacebook,FaTwitter ,FaYoutube ,FaInstagram } from "react-icons/fa";
const FooterComponent = () => {
  return (
    <footer className='w-[100%] h-[100%] bg-backgroundColor flex flex-col justify-center items-center gap-20 relative top-[150px]  py-5'>
        <div className='w-[1005px] flex flex-col justify-center gap-5 items-center h-[370px] '>
          <h1 className='text-white text-[80px] font-bold'>About Us</h1>
          <p className='text-navbarTextColor text-center text-[18px]'>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Soluta officia nulla quisquam veritatis iusto eius voluptate, dignissimos nemo! Fuga culpa beatae tenetur eius laborum ad natus corporis voluptates placeat soluta.
          Reiciendis excepturi dolores tenetur ea exercitationem, dolore, animi, </p>
          <p className='text-navbarTextColor text-center text-[18px]'>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Soluta officia nulla quisquam veritatis iusto eius voluptate, dignissimos nemo! Fuga culpa beatae tenetur eius laborum ad natus corporis voluptates placeat soluta.
          Reiciendis excepturi dolores tenetur ea exercitationem, dolore, animi, </p>
        </div>
        <div className='flex justify-between items-center w-[95%] h-[18px] mx-auto'>
          <p>2025 MAJORCOLOURS. ALL RIGHTS RESERVED</p>
          <ol className='flex items-center space-x-4'>
              <li><FaDiscord className='text-linkIconSize'/></li>
              <li><FaFacebook className='text-linkIconSize '/></li>
              <li><FaTwitter className='text-linkIconSize '/></li>
              <li><FaYoutube className='text-linkIconSize '/></li>
              <li><FaInstagram className='text-linkIconSize '/></li>
          </ol>
          
        </div>
    </footer>
  )
}

export default FooterComponent
