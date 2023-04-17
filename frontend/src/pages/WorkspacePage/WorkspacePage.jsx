import React from 'react'
import SideNavBar from '../../components/SideNavBar/SideNavBar'
import Navbar from '../../components/Navbar/Navbar'
import WorkspaceComponents from '../../components/WorkspaceComponents/WorkspaceComponents'

function WorkspacePage() {
  return (
    <div className='flex overflow-hidden w-full h-screen'>
      <SideNavBar />

      <div className='w-full flex-col'>
        <Navbar />
        <WorkspaceComponents/>
      </div>
    </div>
  )
}

export default WorkspacePage