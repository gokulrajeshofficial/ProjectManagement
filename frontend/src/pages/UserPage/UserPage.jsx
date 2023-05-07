import React from 'react'
import SideNavBar from '../../components/SideNavBar/SideNavBar'
import MobNav from '../../components/MobNav/MobNav'
import Navbar from '../../components/Navbar/Navbar'
import UserProfile from '../../components/UserProfile/UserProfile'
function UserPage() {
  return (
    <div className='flex overflow-hidden  w-full h-screen'>
    <SideNavBar />
    <MobNav/>

    <div className='w-full flex-col'>
      <Navbar />
      {
        <UserProfile/>
      }
    
     
    </div>
  </div>
  )
}

export default UserPage