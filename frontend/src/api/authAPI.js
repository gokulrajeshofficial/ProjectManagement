import React from 'react'
import axiosConfig from '../config/axiosConfig'

const authAPI = ()=>{

   const registerAPI = (sendObject)=>{
    axiosConfig.post('/register',sendObject)
   }

   return {registerAPI  }
}

export default authAPI