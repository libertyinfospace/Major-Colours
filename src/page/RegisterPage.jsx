import React from 'react'
import ProfileHeader from '../components/ProfileHeader'
import PersonalDetailsComponent from '../components/PersonalDetailsComponent'
import SelectRankComponent from '../components/SelectRankComponent'
import RankCriteriaComponent from '../components/RankCriteriaComponent'
import RankCriteriaIconComponent from '../components/RankCriteriaIconComponent'
import RankCriteriaLineComponent from '../components/RankCriteriaLineComponent'
import  spearIcon from '../assets/logo/Spear-active-icon.svg'
import  spearIcon1 from '../assets/logo/Spear-icon-normal.svg'
import  bidentIcon from '../assets/logo/Bident-active-icon.svg'
import  bidentIcon1 from '../assets/logo/Bident-icon-normal.svg'
import  tridentIcon from '../assets/logo/Trident-active-icon.svg'
import  tridentIcon1 from '../assets/logo/Trident-icon-normal.svg'
import  excalibur from '../assets/logo/Excalibur-active-icon.svg'
import  excalibur1 from '../assets/logo/Excalibur-icon-normal.svg'
import dummyData from '../utils/dummyData'
import RankCritrieaCardContainerComponent from '../components/RankCritrieaCardContainerComponent'
import { useSelector } from 'react-redux'
import RankCriteriaCardComponent from '../components/RankCriteriaCardComponent'
import FooterLinkComponent from '../components/FooterLinkComponent'
import addIcon from '../assets/logo/add.svg'

const RegisterPage = () => {
    const dummyData1 = useSelector((state) => state.active?.rankCriteriaData)
    console.log(dummyData)
  return (
    <div className='w-[100%] relative bg-backgroundColor min-h-screen'>
      <ProfileHeader/>
      <div className='py-[8rem] px-[5rem] flex  justify-between w-[100%] min-h-screen'>
        <PersonalDetailsComponent/>
        <section className='w-[60rem] flex flex-col gap-12 min-h-screen'>
            <SelectRankComponent/>
            <p className='text-[2.5rem] text-textWhiteColor text-center font-bold'>CRITERIA</p>
            <div className='flex w-[57.625rem] mx-auto justify-between items-center '>
                <RankCriteriaIconComponent iconPath={spearIcon} data={dummyData[0]} iconPath1={spearIcon1}  name1={"SPEAR"} name2={"LEVEL 1"} altName={"spear lebel 1"} />
                <RankCriteriaLineComponent />
                <RankCriteriaIconComponent iconPath={bidentIcon } data={dummyData[1]} iconPath1={bidentIcon1} name1={"BIDENT"} name2={"LEVEL 2"} altName={"bident lebel 1"} />
                <RankCriteriaLineComponent />
                <RankCriteriaIconComponent iconPath={tridentIcon} data={dummyData[2]} iconPath1={tridentIcon1} name1={"TRIDENT"} name2={"LEVEL 3"} altName={"trident lebel 1"} /> 
                <RankCriteriaLineComponent />
                <RankCriteriaIconComponent iconPath={excalibur} data={dummyData[3]} iconPath1={excalibur1} name1={"EXCALIBUR"} name2={"LEVEL 4"} altName={"excalibur lebel 1"} />
            </div>
            <div className='w-[57.625rem] mx-auto'>
                <div className='w-[100%] h-[100%] flex flex-wrap items-center md:justify-between justify-center gap-2'>
                    {dummyData1.map((ele,idx)=>  <RankCriteriaCardComponent widthLen={'300px'} heightLen={'200px'} key={idx} {...ele}/> )}
                </div>
            </div>
            <div className=' w-[60%] mx-auto text-xl justify-evenly text-textWhiteColor flex'>
                <div className='flex  gap-3'>
                    <img src={addIcon} alt="" />
                    <p>Sample Video</p>
                </div>
                <div className='flex  gap-3'>
                    <img src={addIcon} alt="" />
                    <p>Safety Guidelines</p>
                </div>
            </div>
        </section>
      </div>
        <FooterLinkComponent/>
    </div>
  )
}

export default RegisterPage
