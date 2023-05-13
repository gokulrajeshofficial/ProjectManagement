import React from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import WorkspacePage from '../pages/WorkspacePage/WorkspacePage'
import useAcceptInvitation from '../hooks/useAcceptInvitation'
import HomePage from '../pages/HomePage/HomePage'
import { userDetails } from '../store/Slice/userDetails.slice'
import { useSelector } from 'react-redux'

function WorkspaceRouter() {
    const user = useSelector(userDetails)
    return (
        <Routes>

 
            <Route exact path='/workspace' element={<WorkspacePage />} />
            <Route exact path='/workspace/acceptInvite/:email/:workspaceId' Component={useAcceptInvitation} />
            <Route exact path='/workspace/rejectInvite/:email/:workspaceId' Component={useAcceptInvitation} />



        </Routes>

    )
}

export default WorkspaceRouter