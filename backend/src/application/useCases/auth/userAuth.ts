import { HttpStatus } from "../../../types/httpStatus"
import { UserInterface } from "../../../types/userInterface";
import { WorkspaceInterface } from "../../../types/workspaceInterface";
import AppError from "../../../utils/appError"
import {typeOfUserRepository} from "../../repositories/userDbRepository"
import { typeofAuthServiceInterface } from "../../services/authServiceInterface";


export const isEmailValid = async( email : string , userDbRepository : ReturnType<typeOfUserRepository> )=>{
    email = email.toLowerCase();
    const user : UserInterface | null  = await userDbRepository.findByEmail(email)

    if(user){
        return false
        throw new AppError("E-mail already exists", HttpStatus.UNAUTHORIZED)
    }
    return true 
       
}

export const registerUser = async(
    userData : UserInterface , 
    workspaceCreation : WorkspaceInterface , 
    inviteList : [] , userDbRepository : ReturnType<typeOfUserRepository>, 
    authServices : ReturnType<typeofAuthServiceInterface>)=>{
    userData.email = userData.email.toLowerCase() 
    userData.password  = await authServices.encryptPassword(userData.password )
    const user = await userDbRepository.addUser(userData) 
    // workspaceCreation.workspaceName    = workspaceCreation.workspaceName.trim()
    // const workspace = await createWorkspace
    console.log(user)


}

export const loginUser = async(email : string , 
    password : string , 
    userDbRepository : ReturnType<typeOfUserRepository>, 
    authServices : ReturnType<typeofAuthServiceInterface>)=>{   

        const user : UserInterface | null  = await userDbRepository.findByEmail(email)

        if(!user){
           throw new AppError("this user does't exist" , HttpStatus.UNAUTHORIZED)
        }else{ 
        const authenticate = await authServices.comparePassword(password , user.password )
        if(!authenticate){
            throw new AppError("Sorry , Password entered is incorrect" , HttpStatus.UNAUTHORIZED)
        }
        const {_id}= user
        const userId = _id
        console.log(user)
        const token = authServices.generateToken(userId as string) 
        return {  user , token  ,  }
    }



}



