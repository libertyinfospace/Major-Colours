import React from 'react'
import { RxCross2 } from "react-icons/rx";
import { useDispatch } from 'react-redux';
import { commingSoonActive } from '../store/activeSlices';
const CommingSoonComponent = () => {
    const dispatch = useDispatch();
  return (
    <div className='w-[100%] bg-black relative flex justify-center  border-2 border-y-gray-600 items-center h-[100%]'>
        <p className='text-white text-2xl'>Coming Soon</p>
        <div className='absolute right-2 top-1'>
            <RxCross2 onClick={()=> dispatch(commingSoonActive(false))}  className='text-xl'/>
        </div>
      
    </div>
  )
}

export default CommingSoonComponent
