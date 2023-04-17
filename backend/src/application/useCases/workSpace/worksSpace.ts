import { mailServiceNodeMailer } from "../../../frameworks/service/mailService";
import { WorkspaceInterface } from "../../../types/workspaceInterface";
import { typeofWorkspaceRepository } from "../../repositories/workspaceRepository";
import { mailServiceRepo ,typeofmailServiceRepo } from "../../services/mailServiceInterface";


const mailService  = mailServiceRepo(mailServiceNodeMailer())

export const workspaceCreation = async(workspaceDetails : WorkspaceInterface , userId : string , workspaceRepo : ReturnType<typeofWorkspaceRepository> )=>{
    workspaceDetails.createdBy = userId
    const workspace = await workspaceRepo.createWorkspace( workspaceDetails )
    if( workspaceDetails.invitedUsers?.length)
    {
    const invitedUsers = await  mailService.sendInviteLink(workspaceDetails.invitedUsers , "hello"  )
    }
    // const workspaceCreation 

    return workspace
} 

export const getUserWorkspaces = async(userId : string , workspaceRepo : ReturnType<typeofWorkspaceRepository>)=>{
   const userWorkspaces = await  workspaceRepo.getUserWorkspaces(userId )
//    const sharedWorkspaces = await workspaceRepo
   return {userWorkspaces}

}