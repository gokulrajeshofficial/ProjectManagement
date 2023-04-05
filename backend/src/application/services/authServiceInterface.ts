import { AuthService } from "../../frameworks/service/authService"
import { UserInterface } from "../../types/userInterface"

export const authServiceInterface = (service : ReturnType<AuthService>)=>{

    const encryptPassword = (password : string)=>{
         return service.encryptPassword(password)
    }
    const comparePassword = (password : string , encryptPassword : string)=>{
        return service.comparePassword(password , encryptPassword)
    }
    const generateToken = (payload : string ) =>{
        return service.generateToken(payload)
    }

    return {
        encryptPassword , 
        comparePassword , 
        generateToken
    }
}

export type typeofAuthServiceInterface  =  typeof authServiceInterface