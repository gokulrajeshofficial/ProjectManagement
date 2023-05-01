import React, { useState } from 'react'
import SideNavBar from '../../components/SideNavBar/SideNavBar'
import Navbar from '../../components/Navbar/Navbar'
import WorkspaceComponents from '../../components/WorkspaceComponents/WorkspaceComponents'
import MobNav from '../../components/MobNav/MobNav'
import WorkspaceDetails from '../../components/WorkspaceDetailsComponents/WorkspaceDetails'

function WorkspacePage() {
  const[selectedWorkspace , setSelectedWorkspace] = useState(null)

  return (
    <div className='flex overflow-hidden w-full h-screen'>
      <SideNavBar />
      <MobNav/>

      <div className='w-full flex-col'>
        <Navbar />
        <WorkspaceComponents selectedWorkspace={selectedWorkspace} setSelectedWorkspace={setSelectedWorkspace} />
        <WorkspaceDetails selectedWorkspace={selectedWorkspace} setSelectedWorkspace={setSelectedWorkspace}/>
      </div>
    </div>
  )
}

export default WorkspacePage