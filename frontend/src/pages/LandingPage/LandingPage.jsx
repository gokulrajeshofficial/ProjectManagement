import React from 'react'
import MainNavBar from '../../components/LandingPageComponents/MainNavbar/MainNavBar'
import LandingPageContent from '../../components/LandingPageComponents/LandingPageContent'
import { useNavigate } from 'react-router-dom'

function LandingPage() {
 const navigate =  useNavigate()
  const registerHandle = ()=>{
    navigate("/register")
  }

  const loginHandle = ()=>{
    navigate("/login")
  }

  return (
    <div>
        <MainNavBar loginHandle={loginHandle} registerHandle={registerHandle}/>
        <LandingPageContent registerHandle={registerHandle} />
        
    </div>
  )
}

export default LandingPage