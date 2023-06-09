import React, { useEffect } from 'react'
import { Route, Routes, useNavigate } from 'react-router-dom'
import ProjectPage from '../pages/ProjectPage/ProjectPage'
import { useSelector } from 'react-redux'
import { userDetails } from '../store/Slice/userDetails.slice'
import MessagePage from '../pages/MessagesPage/MessagePage'
function ProjectRouter() {
  const user = useSelector(userDetails)
  const navigate = useNavigate()
  useEffect(()=>{
    console.log(user)
    if(!user?.userId) navigate("/login")
})
  return (
    <Routes>
      <Route exact path='/' element={<ProjectPage />} />
      <Route exact path='/messages' element={<MessagePage/>} />
    </Routes>
  )
}

export default ProjectRouter