import React from 'react'

import FooterLinkComponent from './FooterLinkComponent';
const FooterComponent = () => {
  return (
    <footer className='w-full bg-backgroundColor flex flex-col justify-center items-center gap-12 md:gap-20 relative top-[150px] py-5'>
        <div className='w-[95%] xl:w-[1005px] flex flex-col justify-center gap-4 md:gap-5 items-center'>
          <h1 className='text-white text-4xl sm:text-5xl md:text-6xl lg:text-[80px] font-bold text-center'>About Us</h1>
          <p className='text-navbarTextColor text-center text-sm sm:text-base lg:text-[18px] px-4'>
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Soluta officia nulla quisquam veritatis iusto eius voluptate, dignissimos nemo! Fuga culpa beatae tenetur eius laborum ad natus corporis voluptates placeat soluta.
            Reiciendis excepturi dolores tenetur ea exercitationem, dolore, animi,
          </p>
          <p className='text-navbarTextColor text-center text-sm sm:text-base lg:text-[18px] px-4'>
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Soluta officia nulla quisquam veritatis iusto eius voluptate, dignissimos nemo! Fuga culpa beatae tenetur eius laborum ad natus corporis voluptates placeat soluta.
            Reiciendis excepturi dolores tenetur ea exercitationem, dolore, animi,
          </p>
        </div>
        <FooterLinkComponent/>
    </footer>
  )
}

export default FooterComponent
