import React from 'react'
import { Route, Routes } from 'react-router-dom'
import LandingPage from '../pages/LandingPage/LandingPage'
import RegisterEmailPage from '../pages/RegisterEmailPage/RegisterEmailPage'

import SignInPage from '../pages/SignInPage/SignInPage'
import HomePage from '../pages/HomePage/HomePage'

function UserRouter() {
    return (
        <Routes>
            <Route exact path='/' element={<LandingPage />} />
            <Route exact path='/login' element={<SignInPage />} />
            <Route exact path='/register' element={<RegisterEmailPage />} />

            <Route exact path='/home' element={<HomePage />} />
            {/* <Route exact path='/projects' element={<   />} /> */}
            {/* <Route exact path='/workspace' element={<RegisterEmailPage />} /> */}

            
        </Routes>
    )
}

export default UserRouter

