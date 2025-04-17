import React, { useState } from 'react'
import otpImage from '../assets/img/otpImage.png'
import LoginHeaderComponent from '../components/LoginHeaderComponent'
import ForgotAndRegisterCompnent from '../components/ForgotAndRegisterCompnent'
import LoginComponentImageSection from '../components/LoginComponentImageSection'
import { useNavigate } from 'react-router-dom'

const OtpPage = () => {
  const navigate = useNavigate();
  const [otp, setOtp] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleInputChange = (e) => {
    const value = e.target.value;
    // Only allow numbers
    if (/^\d*$/.test(value) && value.length <= 6) {
      setOtp(value);
      setError('');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!otp.trim()) {
      setError('Please enter the OTP');
      return;
    }
    
    if (otp.length !== 6) {
      setError('OTP must be 6 digits');
      return;
    }
    
    setIsLoading(true);
    try {
      // Here you would typically make an API call to verify OTP
      // For now, we'll just simulate a delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      navigate('/newPassword'); // Navigate to new password page after OTP verification
    } catch (err) {
      setError('Invalid OTP. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className='min-h-screen bg-backgroundColor flex flex-col lg:flex-row'>
      {/* OTP Form Section */}
      <section className='w-full lg:w-1/2 min-h-screen flex flex-col'>
        <LoginHeaderComponent />
        
        <div className='flex-grow flex items-center justify-center px-4 sm:px-8 md:px-12 py-6'>
          <div className='w-full max-w-md'>
            <form onSubmit={handleSubmit} className='flex flex-col gap-5 w-full' noValidate>
              <h1 className='text-textWhiteColor text-xl sm:text-2xl md:text-[1.8125rem] font-bold'>
                ENTER THE OTP
              </h1>
              <div className='flex flex-col gap-2 w-full'>
                <input
                  className='border-b-2 border-textColor text-textWhiteColor py-3 md:py-4 text-sm md:text-[1.125rem] outline-none bg-backgroundColor w-full'
                  type="text"
                  inputMode="numeric"
                  maxLength={6}
                  value={otp}
                  onChange={handleInputChange}
                  placeholder='Type Your OTP Here'
                  aria-label="One-Time Password"
                  required
                />
                {error && <p className="text-red-500 text-xs sm:text-sm">{error}</p>}
              </div>
              <button 
                className='bg-textWhiteColor w-full font-bold py-3 md:py-4 rounded-sm transition-opacity hover:opacity-90 disabled:opacity-50 text-sm md:text-base'
                type="submit"
                disabled={isLoading}
              >
                {isLoading ? 'VERIFYING...' : 'SUBMIT'}
              </button>
              <ForgotAndRegisterCompnent />
            </form>
          </div>
        </div>
        
        <p className='text-textWhiteColor text-center px-4 sm:px-6 py-4 lg:hidden text-xs'>
          © {new Date().getFullYear()} MAJORCOLURS, ALL RIGHTS RESERVED
        </p>
      </section>
      
      {/* Image Section */}
      <LoginComponentImageSection imgUrl={otpImage} />
      
      {/* Footer - only visible on desktop */}
      <p className='hidden lg:block text-textWhiteColor text-center absolute bottom-4 left-0 right-0 text-[0.7rem]'>
        © {new Date().getFullYear()} MAJORCOLURS, ALL RIGHTS RESERVED
      </p>
    </div>
  );
};

export default OtpPage;
