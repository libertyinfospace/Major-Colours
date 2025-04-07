import React from 'react'
import resetImage from '../assets/img/resetImage.png'
import LoginHeaderComponent from '../components/LoginHeaderComponent'
import ForgotAndRegisterCompnent from '../components/ForgotAndRegisterCompnent'
import LoginComponentImageSection from '../components/LoginComponentImageSection'
import { useNavigate } from 'react-router-dom'
const ForgotPasswordPage = () => {
    const navigate = useNavigate()
    //this function is used to submit the reset data
    const submittingTheRessetField = (e) => {
        e.preventDefault()
        const formData = new FormData(e.target)
        const data = Object.fromEntries(formData.entries())
        console.log(data)
        navigate('/newPassword')
    }

  return (
    <div className='w-[100%] min-h-screen relative bg-backgroundColor'>
    <section className='w-[100%]  h-screen'>
      <LoginHeaderComponent/>
      <div className='w-[40rem]  px-[5rem] py-[10rem] min-h-screen flex flex-col gap-[4rem]'>
        <form onSubmit={submittingTheRessetField} action="" className='flex flex-col gap-5'>
          <h1 className='text-textWhiteColor text-[1.8125rem]'>RESET PASSWORD</h1>
          <input className='border-b-2 border-textColor text-textWhiteColor  py-4 text-[1.125rem] outline-none bg-backgroundColor w-[100%]' type="text"  placeholder='Email Or Mobile NUmber'/>
          <button className='bg-textWhiteColor w-[93%] font-bold py-4'>CONTINUE</button>
          <p className='text-textColor'>We Will Send You An Email With Instructions On How To Recover It</p>
        </form>
      </div>
    </section>
    <LoginComponentImageSection imgUrl={resetImage}/>
    <p className='text-textWhiteColor px-[8rem] text-[0.7rem]'>© 2025 MAJORCOLURS, ALL RIGHTS RESERVED</p>
  </div>
  )
}

export default ForgotPasswordPage
