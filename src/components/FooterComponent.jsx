import React from 'react'

import FooterLinkComponent from './FooterLinkComponent';
const FooterComponent = () => {
  return (
    <footer className='w-[100%] h-[100%] bg-backgroundColor flex flex-col justify-center items-center gap-20 relative top-[150px]  py-5'>
        <div className='xl:w-[1005px] w-[95%] flex flex-col justify-center gap-5 items-center h-[370px] '>
          <h1 className='text-white text-[80px] font-bold'>About Us</h1>
          <p className='text-navbarTextColor text-center text-[18px]'>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Soluta officia nulla quisquam veritatis iusto eius voluptate, dignissimos nemo! Fuga culpa beatae tenetur eius laborum ad natus corporis voluptates placeat soluta.
          Reiciendis excepturi dolores tenetur ea exercitationem, dolore, animi, </p>
          <p className='text-navbarTextColor text-center text-[18px]'>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Soluta officia nulla quisquam veritatis iusto eius voluptate, dignissimos nemo! Fuga culpa beatae tenetur eius laborum ad natus corporis voluptates placeat soluta.
          Reiciendis excepturi dolores tenetur ea exercitationem, dolore, animi, </p>
        </div>
        <FooterLinkComponent/>
    </footer>
  )
}

export default FooterComponent
