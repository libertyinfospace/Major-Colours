import React, { useState, memo } from 'react'
import { useNavigate } from 'react-router-dom'
import resetImage from '../assets/img/resetImage.png'
import LoginHeaderComponent from '../components/LoginHeaderComponent'
import LoginComponentImageSection from '../components/LoginComponentImageSection'
import InputComponent from '../components/InputComponent'

const ForgotPasswordPage = () => {
    const navigate = useNavigate()
    const [email, setEmail] = useState('')
    const [error, setError] = useState('')
    
    // Email validation function
    const validateEmail = (email) => {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        return regex.test(email)
    }
    
    // Form submission handler with validation
    const handleSubmit = (e) => {
        e.preventDefault()
        
        // Validate email
        if (!email.trim()) {
            setError('Email is required')
            return
        }
        
        if (!validateEmail(email)) {
            setError('Please enter a valid email address')
            return
        }
        
        // Clear error if validation passes
        setError('')
        
        // Form data object to submit
        const data = { email }
        
        // Navigate to OTP page
        navigate('/otp')
    }
    
    return (
        <div className='min-h-screen bg-backgroundColor flex flex-col lg:flex-row'>
            {/* Login/Form Section */}
            <section className='w-full lg:w-1/2 min-h-screen flex flex-col'>
                <LoginHeaderComponent />
                
                <div className='flex-grow flex items-center justify-center px-4 sm:px-8 md:px-12 py-6'>
                    <div className='w-full max-w-md'>
                        <form onSubmit={handleSubmit} className='flex flex-col gap-6 w-full' role="form">
                            <h1 className='text-textWhiteColor text-xl sm:text-2xl md:text-[1.8125rem] font-bold'>
                                RESET PASSWORD
                            </h1>
                            
                            {error && <p className='text-red-500 text-sm md:text-base'>{error}</p>}
                            
                            <div className='w-full'>
                                <InputComponent 
                                    type="text" 
                                    placeholder="Email Address"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </div>
                            
                            <button 
                                type="submit"
                                className='bg-textWhiteColor w-full font-bold py-3 md:py-4 rounded-sm transition-opacity hover:opacity-90 text-sm md:text-base'
                            >
                                CONTINUE
                            </button>
                            
                            <p className='text-textColor text-xs sm:text-sm md:text-base'>
                                We will send you an email with instructions on how to recover your password
                            </p>
                        </form>
                    </div>
                </div>
                
                <p className='text-textWhiteColor text-center px-4 sm:px-6 py-4 lg:hidden'>
                    © {new Date().getFullYear()} MAJORCOLURS, ALL RIGHTS RESERVED
                </p>
            </section>
            
            {/* Image Section */}
            <LoginComponentImageSection imgUrl={resetImage} />
            
            {/* Footer - only visible on desktop */}
            <p className='hidden lg:block text-textWhiteColor text-center absolute bottom-4 left-0 right-0 text-[0.7rem]'>
                © {new Date().getFullYear()} MAJORCOLURS, ALL RIGHTS RESERVED
            </p>
        </div>
    )
}

export default memo(ForgotPasswordPage)
