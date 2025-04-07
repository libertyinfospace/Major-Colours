import React from 'react'

const RankCriteriaCardComponent = ({widthLen , heightLen , name , last , val1 ,val2}) => {
  return (
    <div className={`w-[${widthLen}] h-[${heightLen}] rounded-lg relative flex items-center justify-center bg-[#484848]`}>
        <div className='m-0 flex flex-col gap-0 leading-none text-white items-center'>
            <p className='text-[2.5rem]'>{name}</p>
            <p className='text-[2.5rem]'>{last}</p>
        </div>
      <div className='absolute bottom-0 rounded-b-lg left-0 w-[100%] h-[25px] bg-[#252934]'>
        <div className='flex justify-between text-white items-center px-4'>
            <p>{val1}</p>
            <p>{val2}</p>
        </div>
      </div>
    </div>
  )
}

export default RankCriteriaCardComponent
