import React from 'react'
import SideNavBar from '../../components/SideNavBar/SideNavBar'
import MobNav from '../../components/MobNav/MobNav'
import Navbar from '../../components/Navbar/Navbar'
import MessageComponents from '../../components/MessageComponents/MessageComponents'

function MessagePage() {
  return (
    <div className='flex overflow-hidden w-full h-screen'>
    <SideNavBar />
    <MobNav/>
    <div className='w-full flex-col '>
      <Navbar />
      <MessageComponents/>
    </div>
  </div>
  )
}

export default MessagePage