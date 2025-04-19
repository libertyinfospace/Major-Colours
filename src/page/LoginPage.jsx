import React, { useState } from 'react'
import loginImage from '../assets/img/loginImage.png'
import LoginComponentImageSection from '../components/LoginComponentImageSection'
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
      
      // Check if user info exists in localStorage
      const loginInfo = localStorage.getItem('loginInfo');
      
      if (loginInfo) {
        // Parse the stored data
        const parsedLoginInfo = JSON.parse(loginInfo);
        
        // Check if the entered email or phone matches the stored data
        if (parsedLoginInfo.email === formData.emailOrPhone || 
            parsedLoginInfo.phone === formData.emailOrPhone ||
            parsedLoginInfo.phoneNumber === formData.emailOrPhone) {
          // If there's a match, navigate to password page
          navigate('/password');
        } else {
          // If there's no match, navigate to register page
          navigate('/register');
        }
      } else {
        // If no data exists in localStorage, navigate to register page
        navigate('/register');
      }
    } catch (err) {
      setError('An error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className='min-h-screen bg-backgroundColor flex flex-col lg:flex-row'>
      {/* Login/Form Section */}
      <section className='w-full lg:w-1/2 min-h-screen flex flex-col'>
        <LoginHeaderComponent />
        
        <div className='flex-grow flex items-center justify-center px-4 sm:px-8 md:px-12 py-6'>
          <div className='w-full max-w-md'>
            <form onSubmit={handleSubmit} className='flex flex-col gap-5 w-full' noValidate>
              <h1 className='text-textWhiteColor text-xl sm:text-2xl md:text-[1.8125rem] font-bold'>
                WELCOME BACK
              </h1>
              <div className='flex flex-col gap-2 w-full'>
                <input
                  className='border-b-2 border-textColor text-textWhiteColor py-3 md:py-4 text-sm md:text-[1.125rem] outline-none bg-backgroundColor w-full'
                  type="text"
                  name="emailOrPhone"
                  value={formData.emailOrPhone}
                  onChange={handleInputChange}
                  placeholder='Email Or Mobile Number'
                  aria-label="Email or Mobile Number"
                  required
                />
                {error && <p className="text-red-500 text-xs sm:text-sm">{error}</p>}
              </div>
              <button 
                className='bg-textWhiteColor w-full font-bold py-3 md:py-4 rounded-sm transition-opacity hover:opacity-90 disabled:opacity-50 text-sm md:text-base'
                type="submit"
                disabled={isLoading}
              >
                {isLoading ? 'VERIFYING...' : 'NEXT'}
              </button>
            </form>
          </div>
        </div>
        
        <p className='text-textWhiteColor text-center px-4 sm:px-6 py-4 lg:hidden text-xs'>
          © {new Date().getFullYear()} MAJORCOLURS, ALL RIGHTS RESERVED
        </p>
      </section>
      
      {/* Image Section */}
      <LoginComponentImageSection imgUrl={loginImage} />
      
      {/* Footer - only visible on desktop */}
      <p className='hidden lg:block text-textWhiteColor text-center absolute bottom-4 left-0 right-0 text-[0.7rem]'>
        © {new Date().getFullYear()} MAJORCOLURS, ALL RIGHTS RESERVED
      </p>
    </div>
  )
}

export default LoginPage
