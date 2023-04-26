import { UserInterface } from "../../../../types/userInterface"
import userModel from "../models/userModel"


export default function userRepositoryMongoDb(){
    const findByEmail  = async(email : string)=>{
        const user : UserInterface | null = await userModel.findOne({'email' : email})
        return user
    }

    const addUser = async(userData : UserInterface)=>{
        const user  =  await userModel.create(userData)
        return user
    }

    const findById =   async(id : string)=>{
        const user : UserInterface | null = await userModel.findById(id)
        return user
    }



    return {
        findByEmail , addUser , findById
    }
    
}

export type typeOfUserRepositoryMongoDb = typeof userRepositoryMongoDb



