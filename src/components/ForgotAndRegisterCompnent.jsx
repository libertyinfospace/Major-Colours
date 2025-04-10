import React from 'react'
import { Link } from 'react-router-dom'

const ForgotAndRegisterCompnent = () => {
  return (
    <div className='text-textWhiteColor flex flex-col gap-2'>
        <Link className='border-b-2 w-fit py-1' to="/forgot">Forgot Password?</Link>
        <p className='text-textColor'>Don't Have An Account? <span><Link to="/register" className='border-b-2 text-textWhiteColor py-1'>Register</Link></span></p>
    </div>
  )
}

export default ForgotAndRegisterCompnent
