import React from 'react'

const InputComponent = ({type , placeholder}) => {
  return (
    <input className='border-b-2 border-textColor text-textWhiteColor  py-4 text-[1.125rem] outline-none bg-backgroundColor w-[100%]' type={type}  placeholder={placeholder}/>
  )
}

export default InputComponent
