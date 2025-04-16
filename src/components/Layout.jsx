import React, { useEffect } from 'react'
import NavbarComponent from './NavbarComponent'
import { Outlet, useLocation } from 'react-router-dom'
import FooterComponent from './FooterComponent'
import SlideInCart from './SlideInCart'

const Layout = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <div className='bg-backgroundColor relative w-[100%] text-textColor'>
        <NavbarComponent/>
        <Outlet/>
        <FooterComponent/>
        <SlideInCart />
        {/* This Outlet component will render the child routes */}
    </div>
  )
}

export default Layout
