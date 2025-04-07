import React from 'react'
import RankCriteriaCardComponent from './RankCriteriaCardComponent'
import RankCriteriaOrComponent from './RankCriteriaOrComponent'
import { useSelector } from 'react-redux'

const RankCritrieaCardContainerComponent = () => {
    const dummyData = useSelector((state) => state.active.rankCriteriaData)
  return (
    <div className='w-[100%] h-[100%] flex flex-wrap items-center md:justify-between justify-center gap-2'>
        {dummyData.map((ele,idx)=>  <RankCriteriaCardComponent widthLen={'322px'} heightLen={"200px"} key={idx} {...ele}/> )}
      
    </div>
  )
}

export default RankCritrieaCardContainerComponent
