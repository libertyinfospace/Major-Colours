import React, { useState } from 'react'
import LoginComponentImageSection from '../components/LoginComponentImageSection'
import LoginHeaderComponent from '../components/LoginHeaderComponent'
import newPasswordImage from '../assets/img/newPasswordImage.png'
import { useNavigate } from 'react-router-dom'

const CreateNewPasswordPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    password: '',
    confirmPassword: ''
  });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    setError('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validate passwords
    if (!formData.password.trim()) {
      setError('Password is required');
      return;
    }
    
    if (formData.password.length < 8) {
      setError('Password must be at least 8 characters');
      return;
    }
    
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      console.log('Password updated successfully');
      setIsLoading(false);
      navigate('/login');
    }, 1000);
  };
  
  return (
    <div className='min-h-screen bg-backgroundColor flex flex-col lg:flex-row'>
      {/* Form Section */}
      <section className='w-full lg:w-1/2 min-h-screen flex flex-col'>
        <LoginHeaderComponent />
        
        <div className='flex-grow flex items-center justify-center px-4 sm:px-8 md:px-12 py-6'>
          <div className='w-full max-w-md'>
            <form onSubmit={handleSubmit} className='flex flex-col gap-6 w-full'>
              <h1 className='text-textWhiteColor text-xl sm:text-2xl md:text-[1.8125rem] font-bold'>
                CREATE YOUR NEW PASSWORD
              </h1>
              
              {error && <p className='text-red-500 text-sm md:text-base'>{error}</p>}
              
              <div className='w-full'>
                <input 
                  className='border-b-2 border-textColor text-textWhiteColor py-4 text-[1.125rem] outline-none bg-backgroundColor w-full' 
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder='Type your new password'
                />
              </div>
              
              <div className='w-full mt-2'>
                <input 
                  className='border-b-2 border-textColor text-textWhiteColor py-4 text-[1.125rem] outline-none bg-backgroundColor w-full' 
                  type="password"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  placeholder='Retype your new password'
                />
              </div>
              
              <button 
                type="submit"
                className='bg-textWhiteColor w-full font-bold py-3 md:py-4 rounded-sm transition-opacity hover:opacity-90 text-sm md:text-base'
                disabled={isLoading}
              >
                {isLoading ? 'PROCESSING...' : 'SUBMIT'}
              </button>
            </form>
          </div>
        </div>
        
        <p className='text-textWhiteColor text-center px-4 sm:px-6 py-4 lg:hidden text-xs'>
          © {new Date().getFullYear()} MAJORCOLURS, ALL RIGHTS RESERVED
        </p>
      </section>
      
      {/* Image Section */}
      <LoginComponentImageSection imgUrl={newPasswordImage} />
      
      {/* Footer - only visible on desktop */}
      <p className='hidden lg:block text-textWhiteColor text-center absolute bottom-4 left-0 right-0 text-[0.7rem]'>
        © {new Date().getFullYear()} MAJORCOLURS, ALL RIGHTS RESERVED
      </p>
    </div>
  )
}

export default CreateNewPasswordPage
