import React, { useEffect } from 'react'
import {  Route, Routes, useNavigate } from 'react-router-dom'
import WorkspacePage from '../pages/WorkspacePage/WorkspacePage'
import useAcceptInvitation from '../hooks/useAcceptInvitation'
import HomePage from '../pages/HomePage/HomePage'
import { userDetails } from '../store/Slice/userDetails.slice'
import { useSelector } from 'react-redux'

function WorkspaceRouter() {
    const user = useSelector(userDetails)
    const navigate = useNavigate()
    useEffect(()=>{
        console.log(user)
        if(!user?.userId) navigate("/login")
    },[])
    return (
        <Routes>
            <Route exact path='/' element={<WorkspacePage />} />
            <Route exact path='/acceptInvite/:email/:workspaceId' Component={useAcceptInvitation} />
            <Route exact path='/rejectInvite/:email/:workspaceId' Component={useAcceptInvitation} />
        </Routes>

    )
}

export default WorkspaceRouter