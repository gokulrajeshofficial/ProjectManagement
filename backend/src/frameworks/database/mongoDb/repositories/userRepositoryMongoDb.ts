import mongoose from "mongoose"
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

    const updateUserDetails = async(userDetails : UserInterface)=>{
        try{
            console.log(userDetails)
            const id = new mongoose.Types.ObjectId(userDetails._id)
            const response = await userModel.findByIdAndUpdate(id , {$set : {...userDetails}} , {new : true})
            console.log(response)
            return response
        }catch(err)
        {
             console.log(err)
        }



    }



    return {
        findByEmail , addUser , findById , updateUserDetails
    }
    
}

export type typeOfUserRepositoryMongoDb = typeof userRepositoryMongoDb



