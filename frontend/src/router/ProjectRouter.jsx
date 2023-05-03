import React from 'react'
import { Route, Routes } from 'react-router-dom'
import ProjectPage from '../pages/ProjectPage/ProjectPage'

function ProjectRouter() {
  return (
    <Routes>
            <Route exact path='/projects' element={<ProjectPage />} />
           
        </Routes>
  )
}

export default ProjectRouter