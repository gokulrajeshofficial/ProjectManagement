import React from 'react'
import axiosConfig from '../config/axiosConfig'

const authAPI = ()=>{

   const registerAPI = async(sendObject)=>{
      try{

      return  await axiosConfig.post('/api/auth/register',sendObject)
      }catch(err){
   
         throw Error(`${err.response.data.message}`)
      }
   }

   const loginApi = async (credentails)=>{
      try{
        return  await axiosConfig.post('/api/auth/login',credentails)
        }catch(err)
        {

         throw { err : err.response.data.message}
        }
   } 

   
   const googleLoginApi = async (email)=>{
      try{
         console.log(email)
        return  await axiosConfig.post('/api/auth/google/login',email)
        }catch(err)
        {
            throw {err : err.response.data.message}
        }
   } 

   
   const verifyEmailId = async(email)=>{
      try{
       return await axiosConfig.post('/api/auth/verifyEmailId',{email})
      }catch(err)
      {
         throw { err : err.response.data.message}
      }
   }

   const requestAccessToken = async(email)=>{
      try{
       return await  axiosConfig.post("/api/auth/accessToken")
      }catch(err)
      {
         throw { err : err.response.data.message}
      }
   }


   return {registerAPI , loginApi  , verifyEmailId , googleLoginApi , requestAccessToken}
}

export default authAPI