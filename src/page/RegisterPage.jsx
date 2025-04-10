import React, { useEffect } from 'react'
import ProfileHeader from '../components/ProfileHeader'
import PersonalDetailsComponent from '../components/PersonalDetailsComponent'
import { Link } from 'react-router-dom'

const RegisterPage = () => {
  // Add custom styles for vertical centering on larger screens
  useEffect(() => {
    const style = document.createElement('style');
    style.innerHTML = `
      @media (min-height: 800px) {
        .content-container {
          min-height: calc(100vh - 5rem);
          display: flex;
          flex-direction: column;
          justify-content: center;
        }
      }
      
      @media (min-width: 1440px) {
        .heading-text {
          font-size: 3.5rem !important;
        }
        .subheading-text {
          font-size: 1.25rem !important;
        }
      }
      
      @media (max-width: 640px) {
        .mobile-padding-top {
          padding-top: 6.5rem !important;
        }
      }
      
      @media (max-width: 480px) {
        .mobile-padding-top {
          padding-top: 7rem !important;
        }
      }
    `;
    document.head.appendChild(style);
    return () => document.head.removeChild(style);
  }, []);

  return (
    <div className='w-full bg-backgroundColor min-h-screen overflow-x-hidden'>
      <ProfileHeader />
      <div className='pt-[5.5rem] sm:pt-[6rem] md:pt-[8rem] pb-[2rem] px-[1rem] sm:px-[2rem] md:px-[3rem] lg:px-[5rem] content-container mobile-padding-top'>
        <div className='w-full max-w-[1200px] mx-auto'>
          {/* Flex container for the two sections - column on mobile, row on md+ */}
          <div className='flex flex-col md:flex-row md:items-center md:justify-between md:gap-8 lg:gap-16'>
            
            {/* Section 1: Heading and Text - centered vertically and horizontally */}
            <div className='w-full md:w-2/5 mb-10 md:mb-0 flex flex-col items-center md:items-start justify-center'>
              <h1 className='text-[1.8rem] sm:text-[2.2rem] md:text-[2.5rem] lg:text-[3rem] text-textWhiteColor font-bold mb-4 md:mb-6 text-center md:text-left heading-text leading-none'>
                CREATE YOUR ACCOUNT
              </h1>
              <p className='text-textColor text-sm sm:text-base md:text-lg text-center md:text-left max-w-[90%] md:max-w-full subheading-text'>
                Join our community and showcase your skills. Fill in your details to get started and become part of our growing platform.
              </p>
            </div>
            
            {/* Section 2: Personal Details Component */}
            <div className='w-full md:w-3/5 flex justify-center'>
              <div className='w-full max-w-[500px]'>
                <PersonalDetailsComponent />
              </div>
            </div>
          </div>
          
          {/* Login option for existing users - enhanced styling */}
          <div className='mt-10 sm:mt-12 md:mt-16 w-full flex justify-center'>
            <div className='text-center'>
              <div className='inline-flex items-center gap-2 sm:gap-3'>
                <p className='text-textColor text-sm sm:text-base'>
                  Already have an account?
                </p>
                <Link 
                  to="/login" 
                  className='px-4 py-2 border border-textWhiteColor text-textWhiteColor text-sm sm:text-base font-medium rounded-sm hover:bg-textWhiteColor hover:text-backgroundColor transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-50'
                >
                  Login Here
                </Link>
              </div>
              
              <div className='mt-6 flex items-center justify-center w-full'>
                <div className='h-px bg-gray-700 w-16 sm:w-24'></div>
                <p className='mx-3 text-gray-500 text-xs sm:text-sm'>OR</p>
                <div className='h-px bg-gray-700 w-16 sm:w-24'></div>
              </div>
              
              <p className='mt-4 text-gray-400 text-xs sm:text-sm max-w-[400px] mx-auto'>
                By creating an account, you agree to our Terms of Service and Privacy Policy
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default RegisterPage
