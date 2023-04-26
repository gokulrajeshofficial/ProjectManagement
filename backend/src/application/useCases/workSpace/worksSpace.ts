import cryptoService from "../../../frameworks/service/cryptoService";
import { mailServiceNodeMailer } from "../../../frameworks/service/mailService";
import { UserInterface } from "../../../types/userInterface";
import { WorkspaceInterface } from "../../../types/workspaceInterface";
import { typeOfUserRepository } from "../../repositories/userDbRepository";
import { typeofWorkspaceRepository } from "../../repositories/workspaceRepository";
import cryptoServiceInterface from "../../services/cryptoServiceInterface";
import { mailServiceRepo ,typeofmailServiceRepo } from "../../services/mailServiceInterface";


const mailService  = mailServiceRepo(mailServiceNodeMailer())
const cryService = cryptoServiceInterface(cryptoService())

export const workspaceCreation = async(workspaceDetails : WorkspaceInterface , userId : string , workspaceRepo : ReturnType<typeofWorkspaceRepository> , userDb : ReturnType<typeOfUserRepository> )=>{
    workspaceDetails.createdBy = userId
    console.log(workspaceDetails)
    const workspace  = await workspaceRepo.createWorkspace( workspaceDetails )
    console.log(workspace)
    if( workspaceDetails.invitedUsers?.length)
    {
      const getUser = await userDb.findById(workspaceDetails.createdBy)
      workspaceDetails.invitedUsers.forEach(async(email)=>{
         const encryptedEmail  = await cryService.encryption(email)
         const invitedUsers = await  mailService.sendInviteLink(email , getUser as UserInterface  , encryptedEmail ,     workspace._id.toString()   )
      })
    }

    return workspace
} 

export const InviteUsers = async(workSpaceId  : string , inviteList : [string])=>{

}

export const getUserWorkspaces = async(userId : string , workspaceRepo : ReturnType<typeofWorkspaceRepository>)=>{
   const userWorkspaces = await  workspaceRepo.getUserWorkspaces(userId )
//    const sharedWorkspaces = await workspaceRepo
   return {userWorkspaces}

}