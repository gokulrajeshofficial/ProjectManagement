import React, { useEffect } from 'react'
import SideNavBar from '../../components/SideNavBar/SideNavBar'
import Navbar from '../../components/Navbar/Navbar'
import HomePageComponents from '../../components/HomePageComponents/HomePageComponents'
import MobNav from '../../components/MobNav/MobNav'

function HomePage() {

  return (
    <div className='flex overflow-hidden w-full h-screen'>
      <SideNavBar />
      <MobNav/>
      <div className='w-full flex-col '>
        <Navbar />
      <HomePageComponents/>
      </div>
    </div>
  )
}

export default HomePage