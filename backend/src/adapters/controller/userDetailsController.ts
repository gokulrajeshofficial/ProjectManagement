import { Request, Response } from "express-serve-static-core";
 import userRepository, { typeOfUserRepository } from "../../application/repositories/userDbRepository";
import userRepositoryMongoDb, { typeOfUserRepositoryMongoDb } from "../../frameworks/database/mongoDb/repositories/userRepositoryMongoDb";
import { constants } from "buffer";
import { UserInterface } from "../../types/userInterface";
import { userDetailsEdit } from "../../application/useCases/user/user";
import expressAsyncHandler from "express-async-handler";
const userDetailsController = (
    userRepositoryMongoDb : typeOfUserRepositoryMongoDb,
    userRepository  : typeOfUserRepository
)=>{

    const userRepo = userRepository(userRepositoryMongoDb())

    const verifyUserByMail = (req : Request ,res : Response )=>{

        
    }

    const editUserDetails = expressAsyncHandler(async(req : Request ,res : Response)=>{
        const userDetails : UserInterface = req.body.userProfile
        const updateUserDetails = await userDetailsEdit(userDetails ,  userRepo )
        res.status(200).json(updateUserDetails)

    })

    return {verifyUserByMail , editUserDetails}
}

export default userDetailsController