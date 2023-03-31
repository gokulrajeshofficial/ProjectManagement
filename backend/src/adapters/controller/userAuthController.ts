import {Request , Response} from 'express'
import asyncHandler from 'express-async-handler'
import { isEmailValid } from '../../application/useCases/auth/userAuth'


export const emailVerification = asyncHandler(async(req : Request,res : Response)=>{
    const {email}:{email : string} =  req.body
    const msg  = await isEmailValid(email)
   
    res.json({
        success : true ,
        message : "E-mail has been verified "
    })
})
export const userRegister = asyncHandler(async(req : Request,res : Response)=>{
    
})


export const userLogin = (req : Request , res : Response)=>{
    console.log(req.body)
}