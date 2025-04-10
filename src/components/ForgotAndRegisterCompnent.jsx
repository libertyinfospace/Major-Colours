import React from 'react'

const ForgotAndRegisterCompnent = () => {
  return (
    <div className='text-textWhiteColor flex flex-col gap-2'>
        <a className='border-b-2 w-fit py-1' href="/forgot"> Forgot Password?</a>
        <p className='text-textColor'>Don't Have An Account? <span><a href="/select-rank" className='border-b-2 text-textWhiteColor py-1'>Register</a></span></p>
    </div>
  )
}

export default ForgotAndRegisterCompnent
