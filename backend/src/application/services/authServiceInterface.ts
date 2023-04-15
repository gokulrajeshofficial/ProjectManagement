import { AuthService } from "../../frameworks/service/authService"
import { UserInterface } from "../../types/userInterface"

export const authServiceInterface = (service : ReturnType<AuthService>)=>{

    const encryptPassword = (password : string)=>{
         return service.encryptPassword(password)
    }
    const comparePassword = (password : string , encryptPassword : string)=>{
        return service.comparePassword(password , encryptPassword)
    }
    const generateAccessToken = (payload : string ) =>{
        return service.generateAccessToken(payload)
    }
    const generateRefreshToken = (payload : string ) =>{
        return service.generateRefreshToken(payload)
    }
    const verifyAccessToken = (token : string)=>{
        return service.verifyAccessToken(token)
    }
    const verifyRefreshToken = (token : string)=>{
        return service.verifyRefreshToken(token)
    }

    return {
        encryptPassword , 
        comparePassword , 
        generateAccessToken , 
        generateRefreshToken , 
        verifyAccessToken ,
        verifyRefreshToken
    }
}

export type typeofAuthServiceInterface  =  typeof authServiceInterface