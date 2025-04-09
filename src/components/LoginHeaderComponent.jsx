import React from 'react'
import companyLogo from '../assets/img/MAJOR COLOURS-LOGO.png'
import { useNavigate } from 'react-router-dom'

const LoginHeaderComponent = () => {
  const navigate = useNavigate();
  
  return (
    <header className='fixed bg-backgroundColor top-10 left-20'>
        <img 
          className='w-[13.31rem] h-[4.56rem] cursor-pointer' 
          src={companyLogo} 
          alt="MAJOR-COLOURS"
          onClick={() => navigate('/')} 
        />
    </header>
  )
}

export default LoginHeaderComponent
