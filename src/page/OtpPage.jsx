import React from 'react'
import otpImage from '../assets/img/otpImage.png'
import LoginHeaderComponent from '../components/LoginHeaderComponent'
import ForgotAndRegisterCompnent from '../components/ForgotAndRegisterCompnent'
import LoginComponentImageSection from '../components/LoginComponentImageSection'
const OtpPage = () => {
  return (
    <div className='w-[100%] min-h-screen relative bg-backgroundColor'>
      <section className='w-[100%]  h-screen'>
        <LoginHeaderComponent/>
        <div className='w-[40rem]  px-[5rem] py-[10rem] min-h-screen flex flex-col gap-[4rem]'>
          <form action="" className='flex flex-col gap-5'>
            <h1 className='text-textWhiteColor text-[1.8125rem]'>ENTER THE OTP</h1>
            <input className='border-b-2 border-textColor text-textWhiteColor  py-4 text-[1.125rem] outline-none bg-backgroundColor w-[100%]' type="tel" maxLength={6}  placeholder='Type Your OTP Here'/>
            <button className='bg-textWhiteColor w-[93%] font-bold py-4'>SUBMIT</button>
            <ForgotAndRegisterCompnent />
          </form>
        </div>
      </section>
      <LoginComponentImageSection imgUrl={otpImage}/>
      <p className='text-textWhiteColor px-[8rem] text-[0.7rem]'>© 2025 MAJORCOLURS, ALL RIGHTS RESERVED</p>
    </div>
  )
}

export default OtpPage
