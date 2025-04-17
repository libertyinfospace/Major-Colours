import React from 'react'

import FooterLinkComponent from './FooterLinkComponent';
const FooterComponent = () => {
  return (
    <footer className='w-full bg-backgroundColor flex flex-col justify-center items-center gap-12 md:gap-20 relative top-[150px] py-5'>
        <div className='w-[95%] xl:w-[1005px] flex flex-col justify-center gap-4 md:gap-5 items-center'>
          <h1 className='text-white text-4xl sm:text-5xl md:text-6xl lg:text-[80px] font-bold text-center'>About Us</h1>
          <p className='text-navbarTextColor text-center text-sm sm:text-base lg:text-[18px] px-4'>
          At Major Colours, fitness is more than just a routine - it’s a journey of strength, discipline, and achievement. We’ve 
          built a community where hard work is recognized, progress is celebrated, and success is earned.With our unique challenge-based system, you advance through levels—Spear, Bident, Trident, and Excalibur—by pushing your limits. Each milestone unlocks exclusive badges and customized apparel, symbolizing your dedication and growth.
          </p>
          <p className='text-navbarTextColor text-center text-sm sm:text-base lg:text-[18px] px-4'>
          Our goal is simple: to turn fitness into a shared experience where achievements are acknowledged and rewarded. Whether you’re a beginner or an elite athlete, Major Colours gives you the motivation, challenges, and recognition you need to stay inspired.
          </p>
        </div>
        <FooterLinkComponent/>
    </footer>
  )
}

export default FooterComponent
