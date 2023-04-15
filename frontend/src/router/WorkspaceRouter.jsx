import React from 'react'
import { Route, Routes } from 'react-router-dom'
import WorkspacePage from '../pages/WorkspacePage/WorkspacePage'

function WorkspaceRouter() {
    return (
        <Routes>
            <Route exact path='/workspace' element={<WorkspacePage />} />
            {/* <Route exact path='/workspace/create' element={<LandingPage />} /> */}
            {/* <Route exact path='/' element={<LandingPage />} /> */}
        </Routes>

    )
}

export default WorkspaceRouter