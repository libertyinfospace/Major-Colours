import React from 'react'

const RankCriteriaOrComponent = () => {
  let arr = new Array(10).fill(0)
  return (
    <div className='flex flex-col items-center '>
      <div  className='flex flex-col gap-1' >
          {arr.map((_, index) => (
                <div key={index} className='w-[5px] h-[3px]  bg-[#484848]'></div>
              ))}
        </div>
        <p className='text-[2rem] text-textWhiteColor'>OR</p>
        <div  className='flex flex-col gap-1' >
          {arr.map((_, index) => (
                <div key={index} className='w-[5px] h-[3px]  bg-[#484848]'>
                </div>
              ))}
        </div>

    </div>
  )
}

export default RankCriteriaOrComponent
