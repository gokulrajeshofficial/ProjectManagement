import { NextFunction, Request, Response } from "express";
import AppError from "../../../utils/appError";
import { HttpStatus } from "../../../types/httpStatus";
import { authService } from "../../service/authService";



const userAuthMiddleware = async(req : Request , res : Response , next : NextFunction)=>{
    console.log("Reached")
    const authHeader = req.headers['authorization'] 
    let token:string | null="";
    if(authHeader  && authHeader.startsWith('Bearer'))
    {
         token = authHeader.split(" ")[1]
    }
    if(!token){
        res.status(HttpStatus.UNAUTHORIZED).json({ err : "Unauthorized"} )
    }
    try{
        const response :any = await authService().verifyAccessToken(token);
        req.body.userId = response as string
        next()
    }catch(err){
        console.log(err)
        res.status(HttpStatus.FORBIDDEN).json(err )
    }

}

export default userAuthMiddleware