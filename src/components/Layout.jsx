import React from 'react'
import NavbarComponent from './NavbarComponent'
import { Outlet } from 'react-router-dom'
import FooterComponent from './FooterComponent'

const Layout = () => {
  return (
    <div className='bg-backgroundColor relative w-[100%]  text-textColor'>
        <NavbarComponent/>
        <Outlet/>
        <FooterComponent/>
        {/* This Outlet component will render the child routes */}
    </div>
  )
}

export default Layout
