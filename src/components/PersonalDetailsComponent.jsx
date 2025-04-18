import React, { useState } from 'react'
import InputComponent from './InputComponent'
import { useNavigate } from 'react-router-dom'

const PersonalDetailsComponent = () => {
  const navigate = useNavigate();
  // State for form fields
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    fullName: '',
    phoneNumber: '',
    gender: null,
    receiveNews: false,
    acceptPrivacy: false
  });

  // State for form errors
  const [errors, setErrors] = useState({
    email: '',
    password: '',
    fullName: '',
    phoneNumber: '',
    gender: '',
    acceptPrivacy: ''
  });

  // State for form submission
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    // Clear error when field is edited
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  // Handle phone number input to only allow digits
  const handlePhoneChange = (e) => {
    const { value } = e.target;
    // Only allow digits (numbers)
    const digitsOnly = value.replace(/\D/g, '');
    
    // Update state with digits only
    setFormData(prev => ({
      ...prev,
      phoneNumber: digitsOnly
    }));

    // Clear error when field is edited if there was one
    if (errors.phoneNumber) {
      setErrors(prev => ({
        ...prev,
        phoneNumber: ''
      }));
    }
  };

  // Handle checkbox changes
  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: checked
    }));

    // Clear privacy error if accepted
    if (name === 'acceptPrivacy' && checked && errors.acceptPrivacy) {
      setErrors(prev => ({
        ...prev,
        acceptPrivacy: ''
      }));
    }
  };

  // Handle radio button changes
  const handleGenderChange = (e) => {
    setFormData(prev => ({
      ...prev,
      gender: e.target.value
    }));
    
    // Clear gender error if there was one
    if (errors.gender) {
      setErrors(prev => ({
        ...prev,
        gender: ''
      }));
    }
  };

  // Validate form fields
  const validateForm = () => {
    let isValid = true;
    const newErrors = { ...errors };

    // Email validation
    if (!formData.email) {
      newErrors.email = 'Email is required';
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
      isValid = false;
    }

    // Password validation
    if (!formData.password) {
      newErrors.password = 'Password is required';
      isValid = false;
    } else if (formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
      isValid = false;
    }

    // Full name validation
    if (!formData.fullName) {
      newErrors.fullName = 'Full name is required';
      isValid = false;
    }

    // Phone number validation
    if (!formData.phoneNumber) {
      newErrors.phoneNumber = 'Phone number is required';
      isValid = false;
    } else if (formData.phoneNumber.length !== 10) {
      newErrors.phoneNumber = 'Please enter a valid 10-digit phone number';
      isValid = false;
    }

    // Gender validation
    if (formData.gender === null) {
      newErrors.gender = 'Please select a gender';
      isValid = false;
    }

    // Privacy statement validation
    if (!formData.acceptPrivacy) {
      newErrors.acceptPrivacy = 'You must accept the privacy statement';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    if (validateForm()) {
      // Form is valid, simulate API call
      setTimeout(() => {
        // Create proper data structure with user object
        const userData = {
          email: formData.email,
          phone: formData.phoneNumber,
          phoneNumber: formData.phoneNumber,
          user: {
            ...formData,
            password: formData.password.trim() // Ensure password is trimmed
          },
          isLoggedIn: true
        };
        
        // Store user data in localStorage with key 'loginInfo'
        localStorage.setItem('loginInfo', JSON.stringify(userData));
        // Also store the same data with key 'userData'
        localStorage.setItem('userData', JSON.stringify(userData));
        
        setFormSubmitted(true);
        setIsSubmitting(false);
        // Redirect to homepage after successful submission
        navigate('/');
      }, 1000);
    } else {
      setIsSubmitting(false);
    }
  };

  return (
    <div className='h-[100%] sm:w-[31.1875rem] w-[100%]'>
      <h2 className='text-textWhiteColor text-[1.8125rem]'>PERSONAL DETAILS</h2>
      
      {formSubmitted ? (
        <div className='mt-4 p-4 bg-green-800 text-white rounded'>
          <p>Form submitted successfully!</p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className='flex flex-col gap-5 mt-4'>
          <div>
            <InputComponent 
              type="email" 
              placeholder="Email" 
              name="email"
              value={formData.email}
              onChange={handleChange}
            />
            {errors.email && <p className='text-red-500 text-sm mt-1'>{errors.email}</p>}
          </div>
          
          <div>
            <InputComponent 
              type="password" 
              placeholder="Password" 
              name="password"
              value={formData.password}
              onChange={handleChange}
            />
            {errors.password && <p className='text-red-500 text-sm mt-1'>{errors.password}</p>}
          </div>
          
          <div>
            <InputComponent 
              type="text" 
              placeholder="Full Name" 
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
            />
            {errors.fullName && <p className='text-red-500 text-sm mt-1'>{errors.fullName}</p>}
          </div>
          
          <div>
            <div className='flex items-center border-b-2 border-textColor'>
              <p className='text-textWhiteColor flex gap-1 py-4 border-textColor'>+91 <span>IN</span></p>
              <input 
                type="tel" 
                inputMode="numeric"
                pattern="[0-9]*"
                maxLength={10}
                placeholder='Phone Number' 
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handlePhoneChange}
                className='px-4 text-textWhiteColor py-4 text-[1.125rem] outline-none bg-backgroundColor w-[100%]'
              />
            </div>
            <p className='text-textColor pt-1 px-1 text-[0.7rem]'>We Will Send You An SMS To Verify Your Number</p>
            {errors.phoneNumber && <p className='text-red-500 text-sm mt-1'>{errors.phoneNumber}</p>}
          </div>

          <div className="flex items-center gap-6 text-white bg-black py-2">
            {/* Male */}
            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="radio"
                name="gender"
                value="male"
                checked={formData.gender === 'male'}
                onChange={handleGenderChange}
                className="sr-only peer"
              />
              <div className="w-5 h-5 rounded-full bg-transparent peer-checked:bg-blue-500 border-2 border-white transition-colors duration-200"></div>
              <span>Male</span>
            </label>

            {/* Female */}
            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="radio"
                name="gender"
                value="female"
                checked={formData.gender === 'female'}
                onChange={handleGenderChange}
                className="sr-only peer"
              />
              <div className="w-5 h-5 rounded-full bg-transparent peer-checked:bg-pink-500 border-2 border-white transition-colors duration-200"></div>
              <span>Female</span>
            </label>
          </div>
          {errors.gender && <p className='text-red-500 text-sm mt-1'>{errors.gender}</p>}

          <div className="space-y-4">
            {/* Checkbox 1 */}
            <label className="flex items-center gap-3 cursor-pointer">
              <input 
                type="checkbox" 
                id="receiveNews" 
                name="receiveNews" 
                checked={formData.receiveNews}
                onChange={handleCheckboxChange}
                className="hidden peer" 
              />
              <div className="w-5 h-5 border-2 border-gray-400 peer-checked:bg-blue-900 peer-checked:border-blue-900 flex items-center justify-center">
                <svg
                  className="w-3 h-3 text-white hidden peer-checked:block"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              </div>
              <span className="text-textColor">I Wish To Receive Major Colours News On My E-Mail</span>
            </label>

            {/* Checkbox 2 */}
            <label className="flex items-center gap-3 cursor-pointer">
              <input 
                type="checkbox" 
                id="acceptPrivacy" 
                name="acceptPrivacy" 
                checked={formData.acceptPrivacy}
                onChange={handleCheckboxChange}
                className="hidden peer" 
              />
              <div className="w-5 h-5 border-2 border-gray-400 peer-checked:bg-blue-900 peer-checked:border-blue-900 flex items-center justify-center">
                <svg
                  className="w-3 h-3 text-white hidden peer-checked:block"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              </div>
              <span className="text-textColor">I Accept The Privacy Statement</span>
            </label>
            {errors.acceptPrivacy && <p className='text-red-500 text-sm mt-1'>{errors.acceptPrivacy}</p>}
          </div>
          
          {/* Submit Button */}
          <button 
            type="submit" 
            className="mt-6 py-3 px-6 bg-textWhiteColor text-backgroundColor font-bold text-lg tracking-wide rounded-sm hover:bg-gray-300 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-white"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <div className="flex items-center justify-center">
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-backgroundColor" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Processing...
              </div>
            ) : (
              "CREATE ACCOUNT"
            )}
          </button>
          
          {/* Form Error Summary - appears if validation fails */}
          {Object.values(errors).some(error => error) && (
            <div className="mt-4 p-3 bg-red-900 bg-opacity-40 border border-red-500 rounded text-white">
              <p className="text-sm font-medium">Please correct the following errors:</p>
              <ul className="list-disc list-inside text-sm mt-1">
                {Object.entries(errors).map(([field, error]) => 
                  error ? <li key={field}>{error}</li> : null
                )}
              </ul>
            </div>
          )}
        </form>
      )}
    </div>
  )
}

export default PersonalDetailsComponent
