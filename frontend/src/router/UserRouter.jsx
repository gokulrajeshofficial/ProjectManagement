import React from 'react'
import { Route, Routes } from 'react-router-dom'
import LandingPage from '../pages/LandingPage/LandingPage'
import RegisterEmailPage from '../pages/RegisterEmailPage/RegisterEmailPage'
import SignInPage from '../pages/SignInPage/SignInPage'

function UserRouter() {
    return (
        <Routes>
            <Route exact path='/' element={<LandingPage />} />
            <Route exact path='/login' element={<SignInPage />} />
            <Route exact path='/register' element={<RegisterEmailPage />} />
        </Routes>
    )
}

export default UserRouter
