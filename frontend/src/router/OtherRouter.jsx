import React from 'react'
import { Route, Routes } from 'react-router-dom'
import UserPage from '../pages/UserPage/UserPage'

function OtherRouter() {
    return (
        <Routes>
            <Route exact path='/user' element={<UserPage/>} />
        </Routes>
    )
}

export default OtherRouter