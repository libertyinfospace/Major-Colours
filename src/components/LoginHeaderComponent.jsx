import React from 'react'
import companyLogo from '../assets/img/MAJOR COLOURS-LOGO.png'

const LoginHeaderComponent = () => {
  return (
    <header className='fixed bg-backgroundColor top-10 left-20'>
        <img className='w-[13.31rem] h-[4.56rem]' src={companyLogo} alt="" />
    </header>
  )
}

export default LoginHeaderComponent
