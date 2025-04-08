import React from 'react'

const LoginComponentImageSection = ({imgUrl}) => {
  return (
    <section className='hidden lg:block lg:w-1/2 lg:h-screen bg-backgroundColor'>
        <img className='w-full h-full ' src={imgUrl} alt="Login illustration" />
    </section>
  )
}

export default LoginComponentImageSection
