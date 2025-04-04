import React from 'react'
import RankCriteriaIconComponent from './RankCriteriaIconComponent'
import RankCriteriaLineComponent from './RankCriteriaLineComponent'
import  spearIcon from '../assets/logo/Spear-active-icon.svg'
import  spearIcon1 from '../assets/logo/Spear-icon-normal.svg'
import  bidentIcon from '../assets/logo/Bident-active-icon.svg'
import  bidentIcon1 from '../assets/logo/Bident-icon-normal.svg'
import  tridentIcon from '../assets/logo/Trident-active-icon.svg'
import  tridentIcon1 from '../assets/logo/Trident-icon-normal.svg'
import  excalibur from '../assets/logo/Excalibur-active-icon.svg'
import  excalibur1 from '../assets/logo/Excalibur-icon-normal.svg'
import RankCritrieaCardContainerComponent from './RankCritrieaCardContainerComponent'
import dummyData from '../utils/dummyData'


const RankCriteriaComponent = () => {
  console.log(dummyData)
  return (
    <div className='w-[100%] h-[100%] flex flex-col gap-10'>
        <div className='flex justify-between flex-col items-center xl:items-start gap-5 xl:flex-row xl:gap-0'>
            <div className="flex flex-col gap-0 text-white">
                <p className="text-[3.125rem]  font-bold m-0 leading-none">RANK</p>
                <p className="text-[3.125rem]  font-bold m-0 leading-none">CRITERIA</p>
            </div>

            <div className='flex lg:w-[53.5rem]  w-[95%]  justify-between items-center '>
                <RankCriteriaIconComponent iconPath={spearIcon} data={dummyData[0]} iconPath1={spearIcon1}  name1={"SPEAR"} name2={"LEVEL 1"} altName={"spear lebel 1"} />
                <RankCriteriaLineComponent />
                <RankCriteriaIconComponent iconPath={bidentIcon } data={dummyData[1]} iconPath1={bidentIcon1} name1={"BIDENT"} name2={"LEVEL 2"} altName={"bident lebel 1"} />
                <RankCriteriaLineComponent />
                <RankCriteriaIconComponent iconPath={tridentIcon} data={dummyData[2]} iconPath1={tridentIcon1} name1={"TRIDENT"} name2={"LEVEL 3"} altName={"trident lebel 1"} /> 
                <RankCriteriaLineComponent />
                <RankCriteriaIconComponent iconPath={excalibur} data={dummyData[3]} iconPath1={excalibur1} name1={"EXCALIBUR"} name2={"LEVEL 4"} altName={"excalibur lebel 1"} />
            </div>

            

            
        </div>
        <RankCritrieaCardContainerComponent/>
    </div>
  )
}

export default RankCriteriaComponent
