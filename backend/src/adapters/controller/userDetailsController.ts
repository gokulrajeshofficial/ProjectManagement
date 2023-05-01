import { Request, Response } from "express-serve-static-core";
 import userRepository, { typeOfUserRepository } from "../../application/repositories/userDbRepository";
import userRepositoryMongoDb, { typeOfUserRepositoryMongoDb } from "../../frameworks/database/mongoDb/repositories/userRepositoryMongoDb";
const userDetailsController = (
    userRepositoryMongoDb : typeOfUserRepositoryMongoDb,
    userRepository  : typeOfUserRepository
)=>{

    const verifyUserByMail = (req : Request ,res : Response )=>{

        
    }

    return {verifyUserByMail}
}

export default userDetailsController