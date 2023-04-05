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

   const loginApi = async (credentails)=>{
      try{
        return  await axiosConfig.post('/auth/login',credentails)
        }catch(err)
        {
  
            throw Error(`${err.response.data.message}`)
        }
   } 

   
   const verifyEmailId = (email)=>{
      try{
       return axiosConfig.post('/auth/verifyEmailId',{email})
      }catch(err)
      {
         console.log(err)
      }
   }


   return {registerAPI , loginApi  , verifyEmailId }
}

export default authAPI