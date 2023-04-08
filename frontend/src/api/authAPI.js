import React from 'react'
import axiosConfig from '../config/axiosConfig'

const authAPI = ()=>{

   const registerAPI = async(sendObject)=>{
      try{
      return  await axiosConfig.post('/auth/register',sendObject)
      }catch(err){
   
         throw Error(`${err.response.data.message}`)
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

   
   const verifyEmailId = async(email)=>{
      try{
       return await axiosConfig.post('/auth/verifyEmailId',{email})
      }catch(err)
      {
         throw { err : err.response.data.message}
      }
   }


   return {registerAPI , loginApi  , verifyEmailId }
}

export default authAPI