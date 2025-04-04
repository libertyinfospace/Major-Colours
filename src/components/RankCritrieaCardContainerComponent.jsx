import React from 'react'
import RankCriteriaCardComponent from './RankCriteriaCardComponent'
import RankCriteriaOrComponent from './RankCriteriaOrComponent'
import { useSelector } from 'react-redux'

const RankCritrieaCardContainerComponent = () => {
    const dummyData = useSelector((state) => state.active.rankCriteriaData)
    console.log(dummyData)
  return (
    <div className='w-[100%] h-[100%] flex flex-wrap items-center md:justify-between justify-center gap-2'>
        {/* <RankCriteriaCardComponent/>
        <RankCriteriaOrComponent/>
        <RankCriteriaCardComponent/>
        <RankCriteriaOrComponent/>
        <RankCriteriaCardComponent/> */}
        {dummyData.map((ele,idx)=>  <RankCriteriaCardComponent key={idx} {...ele}/> )}
      
    </div>
  )
}

export default RankCritrieaCardContainerComponent
