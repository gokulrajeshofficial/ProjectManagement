import {Request , Response} from 'express'

export const userRegister = (req : Request,res : Response)=>{
    console.log(req.body)
}
export const userLogin = (req : Request , res : Response)=>{
    console.log(req.body)
}