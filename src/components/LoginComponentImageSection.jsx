import React from 'react'

const LoginComponentImageSection = ({imgUrl}) => {
  return (
    <section className='fixed right-12 top-0 w-[50%] h-screen'>
        <img className='w-[100%] h-screen' src={imgUrl} alt="" />
      </section>
  )
}

export default LoginComponentImageSection
