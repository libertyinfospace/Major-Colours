import React from 'react'
import { useSelector } from 'react-redux'

const RankCriteriaOrComponent = () => {
  const activeRank = useSelector((state) => state.active.rankCretriaActiveState)
  const displayText = activeRank?.name1 === 'EXCALIBUR' ? 'AND' : 'OR'
  
  let arr = new Array(10).fill(0)
  return (
    <div className='flex flex-col items-center '>
      <div className='flex flex-col gap-1'>
          {arr.map((_, index) => (
                <div key={index} className='w-[5px] h-[3px] bg-[#484848]'></div>
              ))}
        </div>
        <p className='text-[2rem] text-textWhiteColor'>{displayText}</p>
        <div className='flex flex-col gap-1'>
          {arr.map((_, index) => (
                <div key={index} className='w-[5px] h-[3px] bg-[#484848]'>
                </div>
              ))}
        </div>
    </div>
  )
}

export default RankCriteriaOrComponent
