import React from 'react'
import { Route, Routes } from 'react-router-dom'
import WorkspacePage from '../pages/WorkspacePage/WorkspacePage'
import useAcceptInvitation from '../hooks/useAcceptInvitation'

function WorkspaceRouter() {
    return (
        <Routes>
            <Route exact path='/workspace' element={<WorkspacePage />} />
            <Route exact path='workspace/acceptInvite/:email/:workspaceId' Component={useAcceptInvitation} />
            <Route exact path='workspace/rejectInvite/:email/:workspaceId' Component={useAcceptInvitation} />
        </Routes>

    )
}

export default WorkspaceRouter