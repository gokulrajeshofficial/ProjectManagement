import React from 'react'
import SideNavBar from '../../components/SideNavBar/SideNavBar'
import Navbar from '../../components/Navbar/Navbar'
import MobNav from '../../components/MobNav/MobNav'
import ProjectPageComponents from '../../components/ProjectPageComponents/ProjectPageComponents'
import { useState } from 'react'
import ProjectPageDetails from '../../components/ProjectPageDetails/ProjectPageDetails'
function ProjectPage() {
 const[selectedProject , setSelectedProject] = useState(null)
    return (
        <div className='flex overflow-hidden w-full h-screen'>
          <SideNavBar />
          <MobNav/>
    
          <div className='w-full flex-col'>
            <Navbar />
            {!selectedProject ?  <ProjectPageComponents setSelectedProject={setSelectedProject} />   :  <ProjectPageDetails/>}
          </div>
        </div>
      )
}

export default ProjectPage