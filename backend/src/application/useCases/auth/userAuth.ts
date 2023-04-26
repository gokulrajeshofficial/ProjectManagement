import { HttpStatus } from "../../../types/httpStatus"
import { UserInterface } from "../../../types/userInterface";
import { WorkspaceInterface } from "../../../types/workspaceInterface";
import AppError from "../../../utils/appError"
import {typeOfUserRepository} from "../../repositories/userDbRepository"
import { typeofWorkspaceRepository } from "../../repositories/workspaceRepository";
import { typeofAuthServiceInterface } from "../../services/authServiceInterface";
import { workspaceCreation } from "../workSpace/worksSpace";


export const isEmailValid = async( email : string , userDbRepository : ReturnType<typeOfUserRepository> )=>{
    email = email.toLowerCase();
    const user : UserInterface | null  = await userDbRepository.findByEmail(email)
    if(user){
        throw new AppError("E-mail already exists", HttpStatus.UNAUTHORIZED)
    }
    return true 
       
}

export const registerUser = async(
    userData : UserInterface , 
    workspaceDetails : WorkspaceInterface  , 
    userDbRepository : ReturnType<typeOfUserRepository>, 
    authServices : ReturnType<typeofAuthServiceInterface>,
    workspaceRepo : ReturnType<typeofWorkspaceRepository>)=>{

    userData.email = userData.email.toLowerCase() 
    userData.password  = await authServices.encryptPassword(userData.password )
    const user = await userDbRepository.addUser(userData) 
    
    const workspace  = await workspaceCreation(workspaceDetails , user._id.toString() , workspaceRepo , userDbRepository )
    // const generatedLink = await generateLink(user._id.toString());

    // const mailResponse = await sendVerifyMail(user .email, generatedLink); 
    return {user , workspace   }


}

export const loginUser = async(email : string , 
    password : string , 
    userDbRepository : ReturnType<typeOfUserRepository>, 
    authServices : ReturnType<typeofAuthServiceInterface>)=>{   

        const user : UserInterface | null  = await userDbRepository.findByEmail(email)
        console.log(user)
        if(!user){
           throw new AppError("this user does't exist" , HttpStatus.UNAUTHORIZED)
        }else{ 
        const authenticate = await authServices.comparePassword(password , user.password )
        if(!authenticate){
            throw new AppError("Sorry , Password entered is incorrect" , HttpStatus.UNAUTHORIZED)
        }
        
        const token = await authServices.generateAccessToken(user._id as string) 
        const refreshToken = await authServices.generateRefreshToken(user._id as string) 
        console.log(token , refreshToken)
        return {  user , token  , refreshToken }
    }
}


export const googleLoginUser = async(email : string  , userDbRepository : ReturnType<typeOfUserRepository>, authServices : ReturnType<typeofAuthServiceInterface>)=>{

    const user : UserInterface | null  = await userDbRepository.findByEmail(email)

    if(!user){
       throw new AppError("this user does't exist" , HttpStatus.UNAUTHORIZED)
    }else{ 
        const token = await authServices.generateAccessToken(user._id as string) 
        const refreshToken = await authServices.generateRefreshToken(user._id as string) 
        console.log( refreshToken)
        
        return {  user , token  , refreshToken }

    }
}

export const getAccessToken = async(refreshToken : string , userDbRepository : ReturnType<typeOfUserRepository>, authServices : ReturnType<typeofAuthServiceInterface> )=>{
    const response  = await authServices.verifyRefreshToken(refreshToken)
    if(typeof(response) != 'object')
    {
        throw new AppError(response , HttpStatus.UNAUTHORIZED)    
    }
    const accessToken =  await authServices.generateAccessToken(response.payload) 
    console.log("New Access token" , accessToken)
    return accessToken
}



