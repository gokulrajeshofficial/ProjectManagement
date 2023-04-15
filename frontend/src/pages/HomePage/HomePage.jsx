import React, { useEffect } from 'react'
import SideNavBar from '../../components/SideNavBar/SideNavBar'
import { useSelector } from 'react-redux'
import useAxiosPrivate from '../../hooks/useAxiosPrivate'
import { userDetails } from '../../store/Slice/userDetails.slice'
import Navbar from '../../components/Navbar/Navbar'
import HomePageComponents from '../../components/HomePageComponents/HomePageComponents'

function HomePage() {
  const axiosPrivate = useAxiosPrivate()
  const selection = useSelector(userDetails)
  console.log("Selection", selection)


  return (
    <div className='flex overflow-hidden w-full '>
      <SideNavBar />

      <div className='w-full flex-col'>
        <Navbar />
      <HomePageComponents/>
      </div>



    </div>
  )
}

export default HomePage