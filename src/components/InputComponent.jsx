import React from 'react'

const InputComponent = ({type, placeholder, name, value, onChange}) => {
  return (
    <input 
      className='border-b-2 border-textColor text-textWhiteColor py-3 md:py-4 text-sm md:text-[1.125rem] outline-none bg-backgroundColor w-full transition-all focus:border-textWhiteColor' 
      type={type} 
      placeholder={placeholder}
      name={name}
      value={value}
      onChange={onChange}
    />
  )
}

export default InputComponent
