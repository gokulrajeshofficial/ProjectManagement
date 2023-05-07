import { UserInterface } from "../../../types/userInterface";
import { typeOfUserRepository } from "../../repositories/userDbRepository";

export const userDetailsEdit = async(userDetails : UserInterface ,  userRepo: ReturnType<typeOfUserRepository>)=>{

    const updatedUserDetails  = await  userRepo.updateUserDetails(userDetails)

    return updatedUserDetails

}