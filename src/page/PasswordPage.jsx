import React, { useState, useEffect } from 'react'
import otpImage from '../assets/img/otpImage.png'
import LoginHeaderComponent from '../components/LoginHeaderComponent'
import ForgotAndRegisterCompnent from '../components/ForgotAndRegisterCompnent'
import LoginComponentImageSection from '../components/LoginComponentImageSection'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { updateUserData } from '../store/activeSlices'

const PasswordPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [storedLoginInfo, setStoredLoginInfo] = useState(null);

  useEffect(() => {
    // Get stored login info on component mount
    const loginInfoString = localStorage.getItem('loginInfo');
    if (loginInfoString) {
      try {
        const loginInfo = JSON.parse(loginInfoString);
        setStoredLoginInfo(loginInfo);
      } catch (err) {
        console.error('Error parsing login info from localStorage:', err);
      }
    }
  }, []);

  const handleInputChange = (e) => {
    const value = e.target.value;
    setPassword(value);
    setError('');
  };

  const validatePassword = (pwd) => {
    if (!pwd.trim()) {
      return 'Please enter your password';
    }
    
    if (pwd.length < 8) {
      return 'Password must be at least 8 characters';
    }
    
    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const validationError = validatePassword(password);
    if (validationError) {
      setError(validationError);
      return;
    }
    
    setIsLoading(true);
    try {
      // Get the latest loginInfo directly from localStorage
      const loginInfoString = localStorage.getItem('loginInfo');
      
      if (!loginInfoString) {
        throw new Error('No login information found. Please try again later.');
      }
      
      const loginInfo = JSON.parse(loginInfoString);
      
      // Check if the password matches
      if (loginInfo && (loginInfo.password === password || (loginInfo.user && loginInfo.user.password === password))) {
        // Password matches, create user data with login time
        const userData = {
          ...loginInfo,
          loginTime: new Date().toISOString(),
          isLoggedIn: true
        };
        
        // Save user data to localStorage
        localStorage.setItem('userData', JSON.stringify(userData));
        
        // Update Redux store with user data
        dispatch(updateUserData({
          name: loginInfo.name || "",
          fullName: loginInfo.fullName || loginInfo.name || "",
          email: loginInfo.email || "",
          number: loginInfo.phoneNumber || loginInfo.number || "",
          gender: loginInfo.gender || ""
        }));
        
        // Navigate to profile page
        navigate('/profile');
      } else {
        // Password doesn't match
        throw new Error('Password does not match. Please try again.');
      }
    } catch (err) {
      setError(err.message || 'Invalid password. Please try again.');
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