import React from 'react'
import axiosConfig from '../config/axiosConfig'

const authAPI = ()=>{

   const registerAPI = (sendObject)=>{
      try{
    axiosConfig.post('/auth/register',sendObject)
      }catch(err){
         console.log(err)
      }
   }

   
   const verifyEmailId = (email)=>{
      try{
      axiosConfig.post('/auth/verifyEmailId',{email})
      }catch(err)
      {
         console.log(err)
      }
   }
   return {registerAPI  , verifyEmailId }
}

export default authAPI