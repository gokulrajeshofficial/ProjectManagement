import React, { useEffect } from 'react'
import { Navigate, Route, Routes, useNavigate } from 'react-router-dom'
import LandingPage from '../pages/LandingPage/LandingPage'
import RegisterEmailPage from '../pages/RegisterEmailPage/RegisterEmailPage'

import SignInPage from '../pages/SignInPage/SignInPage'
import HomePage from '../pages/HomePage/HomePage'
import { useSelector } from 'react-redux'
import { userDetails } from '../store/Slice/userDetails.slice'
import UserPage from '../pages/UserPage/UserPage'

function UserRouter() {
    const user = useSelector(userDetails)
    const navigate = useNavigate()

    return (
        <Routes>
            <Route exact path='/' element={<LandingPage />} />
            <Route exact path='/register' element={<RegisterEmailPage />} />
            <Route exact path='/login' element={<SignInPage />} /> 
          
            <Route exact path='/home' element={  user ?  <HomePage /> : <Navigate to="/login" />} />
            <Route exact path='/user' element={ user ?  <UserPage/> : <Navigate to="/login" />} />
        </Routes>
    )
}

export default UserRouter

