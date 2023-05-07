import React, { useEffect } from 'react'
import SideNavBar from '../../components/SideNavBar/SideNavBar'
import Navbar from '../../components/Navbar/Navbar'
import MobNav from '../../components/MobNav/MobNav'
import ProjectPageComponents from '../../components/ProjectPageComponents/ProjectPageComponents'
import { useState } from 'react'
import ProjectPageDetails from '../../components/ProjectPageDetails/ProjectPageDetails'
import { useSelector } from 'react-redux'
import {projectDetailsSlice} from '../../store/Slice/projectDetails.slice'
function ProjectPage() {

  const selector = useSelector( projectDetailsSlice)
  console.log(selector , " hello")

 const[selectedProject , setSelectedProject] = useState(selector)

    return (
        <div className='flex overflow-hidden w-full h-screen'>
          <SideNavBar />
          <MobNav/>
    
          <div className='w-full flex-col'>
            <Navbar />
            {!selectedProject ?  <ProjectPageComponents setSelectedProject={setSelectedProject} />   :  <ProjectPageDetails project={selectedProject} setProject={setSelectedProject} />}
          </div>
        </div>
      )
}

export default ProjectPage