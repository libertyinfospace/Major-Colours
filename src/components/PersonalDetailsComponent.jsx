import React from 'react'
import InputComponent from './InputComponent'

const PersonalDetailsComponent = () => {
  return (
    <div className=' h-[100%] w-[31.1875rem]'>
        <h2 className='text-textWhiteColor text-[1.8125rem]'>PERSONAL DETAILS</h2>
        <form action="" className='flex flex-col gap-5'>
            <InputComponent type={"email"} placeholder={"Email"}/>
            <InputComponent type={"password"} placeholder={"Password"}/>
            <InputComponent type={"text"} placeholder={"Full Name"}/>
            <div>
                <div className='flex items-center border-b-2 border-textColor'>
                    <p className='text-textWhiteColor flex gap-1 py-4 border-textColor'>+91 <span>IN</span></p>
                    <input type="tel" placeholder='Phone Number' className='px-4 text-textWhiteColor  py-4 text-[1.125rem] outline-none bg-backgroundColor w-[100%] '/>
                </div>
                <p className='text-textColor pt-1 px-1 text-[0.7rem]'>We Will Send You An SMS To Verify Your Number</p>
            </div>



            <div className="flex items-center gap-6 text-white bg-black py-2">
                {/* Male */}
                <label className="flex items-center gap-3 cursor-pointer">
                    <input
                    type="radio"
                    name="gender"
                    value="male"
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
                    <input type="checkbox" id="terms" name="terms" className="hidden peer" />
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
                    <input type="checkbox" id="terms1" name="terms1" className="hidden peer" />
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
            </div>


        </form>
    </div>
  )
}

export default PersonalDetailsComponent
