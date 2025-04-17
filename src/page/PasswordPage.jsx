import React, { useState } from 'react'
import otpImage from '../assets/img/otpImage.png'
import LoginHeaderComponent from '../components/LoginHeaderComponent'
import ForgotAndRegisterCompnent from '../components/ForgotAndRegisterCompnent'
import LoginComponentImageSection from '../components/LoginComponentImageSection'
import { useNavigate } from 'react-router-dom'

const PasswordPage = () => {
  const navigate = useNavigate();
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleInputChange = (e) => {
    const value = e.target.value;
    setPassword(value);
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!password.trim()) {
      setError('Please enter your password');
      return;
    }
    
    if (password.length < 8) {
      setError('Password must be at least 8 characters');
      return;
    }
    
    setIsLoading(true);
    try {
      // Here you would typically make an API call to verify password
      // For now, we'll just simulate a delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      navigate('/'); // Navigate to home page after password verification
    } catch (err) {
      setError('Invalid password. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className='min-h-screen bg-backgroundColor flex flex-col lg:flex-row'>
      {/* Password Form Section */}
      <section className='w-full lg:w-1/2 min-h-screen flex flex-col'>
        <LoginHeaderComponent />
        
        <div className='flex-grow flex items-center justify-center px-4 sm:px-8 md:px-12 py-6'>
          <div className='w-full max-w-md'>
            <form onSubmit={handleSubmit} className='flex flex-col gap-5 w-full' noValidate>
              <h1 className='text-textWhiteColor text-xl sm:text-2xl md:text-[1.8125rem] font-bold'>
                ENTER YOUR PASSWORD
              </h1>
              <div className='flex flex-col gap-2 w-full'>
                <input
                  className='border-b-2 border-textColor text-textWhiteColor py-3 md:py-4 text-sm md:text-[1.125rem] outline-none bg-backgroundColor w-full'
                  type="password"
                  value={password}
                  onChange={handleInputChange}
                  placeholder='Type Your Password Here'
                  aria-label="Password"
                  required
                />
                {error && <p className="text-red-500 text-xs sm:text-sm">{error}</p>}
              </div>
              <button 
                className='bg-textWhiteColor w-full font-bold py-3 md:py-4 rounded-sm transition-opacity hover:opacity-90 disabled:opacity-50 text-sm md:text-base'
                type="submit"
                disabled={isLoading}
              >
                {isLoading ? 'VERIFYING...' : 'LOGIN'}
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

export default PasswordPage; 