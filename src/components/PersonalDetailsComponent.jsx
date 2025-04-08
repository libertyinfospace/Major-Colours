import React, { useState } from 'react'
import InputComponent from './InputComponent'

const PersonalDetailsComponent = () => {
  // State for form fields
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    fullName: '',
    phoneNumber: '',
    gender: 'male',
    receiveNews: false,
    acceptPrivacy: false
  });

  // State for form errors
  const [errors, setErrors] = useState({
    email: '',
    password: '',
    fullName: '',
    phoneNumber: '',
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
        console.log('Form submitted:', formData);
        setFormSubmitted(true);
        setIsSubmitting(false);
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
              <div className="w-5 h-5 rounded-full border-2 border-white flex items-center justify-center peer-checked:border-blue-500">
                <div className="w-2.5 h-2.5 bg-white rounded-full opacity-0 peer-checked:bg-blue-800 transition-opacity duration-200"></div>
              </div>
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
              <div className="w-5 h-5 rounded-full border-2 border-white flex items-center justify-center peer-checked:border-pink-500">
                <div className="w-2.5 h-2.5 bg-white rounded-full opacity-0 peer-checked:opacity-100 transition-opacity duration-200"></div>
              </div>
              <span>Female</span>
            </label>
          </div>

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
        </form>
      )}
    </div>
  )
}

export default PersonalDetailsComponent
