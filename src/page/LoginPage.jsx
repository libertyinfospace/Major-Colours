import React, { useState } from 'react'
import loginImage from '../assets/img/loginImage.png'
import LoginComponentImageSection from '../components/LoginComponentImageSection'
import ForgotAndRegisterCompnent from '../components/ForgotAndRegisterCompnent'
import LoginHeaderComponent from '../components/LoginHeaderComponent'
import { useNavigate } from 'react-router-dom'

const LoginPage = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    emailOrPhone: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    setError('');
  };

  const validateForm = () => {
    if (!formData.emailOrPhone) {
      setError('Please enter your email or phone number');
      return false;
    }
    
    // Basic email validation
    if (formData.emailOrPhone.includes('@')) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formData.emailOrPhone)) {
        setError('Please enter a valid email address');
        return false;
      }
    } else {
      // Phone number validation (assuming 10 digits)
      const phoneRegex = /^\d{10}$/;
      if (!phoneRegex.test(formData.emailOrPhone)) {
        setError('Please enter a valid 10-digit phone number');
        return false;
      }
    }
    
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsLoading(true);
    try {
      // Here you would typically make an API call to your backend
      // For now, we'll just simulate a delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      navigate('/otp');
    } catch (err) {
      setError('An error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className='w-[100%] min-h-screen relative bg-backgroundColor'>
      <section className='w-[100%] h-screen'>
        <LoginHeaderComponent/>
        <div className='w-[40rem] px-[5rem] py-[10rem] min-h-screen flex flex-col gap-[4rem]'>
          <form onSubmit={handleSubmit} className='flex flex-col gap-5' noValidate>
            <h1 className='text-textWhiteColor text-[1.8125rem]'>WELCOME BACK</h1>
            <div className='flex flex-col gap-2'>
              <input
                className='border-b-2 border-textColor text-textWhiteColor py-4 text-[1.125rem] outline-none bg-backgroundColor w-[100%]'
                type="text"
                name="emailOrPhone"
                value={formData.emailOrPhone}
                onChange={handleInputChange}
                placeholder='Email Or Mobile Number'
                aria-label="Email or Mobile Number"
                required
              />
              {error && <p className="text-red-500 text-sm">{error}</p>}
            </div>
            <button 
              className='bg-textWhiteColor w-[93%] font-bold py-4 disabled:opacity-50'
              type="submit"
              disabled={isLoading}
            >
              {isLoading ? 'SENDING OTP...' : 'GET OTP'}
            </button>
            <ForgotAndRegisterCompnent />
          </form>
        </div>
      </section>
      <LoginComponentImageSection imgUrl={loginImage}/>
      <p className='text-textWhiteColor px-[8rem] text-[0.7rem]'>© 2025 MAJORCOLURS, ALL RIGHTS RESERVED</p>
    </div>
  )
}

export default LoginPage
