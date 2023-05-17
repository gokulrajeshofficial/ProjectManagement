
import { resolveObjectURL } from "buffer";
import cryptoService from "../../../frameworks/service/cryptoService";
import { mailServiceNodeMailer } from "../../../frameworks/service/mailService";
import { HttpStatus } from "../../../types/httpStatus";
import { UserInterface } from "../../../types/userInterface";
import { WorkspaceInterface } from "../../../types/workspaceInterface";
import AppError from "../../../utils/appError";
import { typeOfUserRepository } from "../../repositories/userDbRepository";
import { typeofWorkspaceRepository } from "../../repositories/workspaceRepository";
import cryptoServiceInterface from "../../services/cryptoServiceInterface";
import { mailServiceRepo, typeofmailServiceRepo } from "../../services/mailServiceInterface";
import { response } from "express";
import { typeofProjectRepository } from "../../repositories/projectRepository";


const mailService = mailServiceRepo(mailServiceNodeMailer())
const cryService = cryptoServiceInterface(cryptoService())

//---------------------------------------------------Workspace Creation Use Case -----------------------------------------//
export const workspaceCreation = async (workspaceDetails: WorkspaceInterface, userId: string, workspaceRepo: ReturnType<typeofWorkspaceRepository>, userDb: ReturnType<typeOfUserRepository>) => {
   workspaceDetails.createdBy = userId
   console.log(workspaceDetails)
   const workspace = await workspaceRepo.createWorkspace(workspaceDetails)
   console.log(workspace)
   if (workspaceDetails.invitedUsers?.length) {
      const getUser = await userDb.findById(workspaceDetails.createdBy)
      await Promise.all( workspaceDetails.invitedUsers.map(async (email) => {
         const encryptedEmail = await cryService.encryption(email)
         const status = await mailService.sendInviteLink(email, getUser as UserInterface, encryptedEmail, workspace._id.toString())
         console.log(status)
      }))
   }

   return workspace
}
//----------------------------------------------- Accept invitation UseCase --------------------------------------------------//
export const acceptInvitationUseCase = async (workspaceId: string, encryptedEmail: string, workspaceRepo: ReturnType<typeofWorkspaceRepository>, userDb: ReturnType<typeOfUserRepository>) => {
   console.log("Reached accept Invitation")
   const workspace = await workspaceRepo.getWorkspaceById(workspaceId)
   console.log(workspace)
   if (!workspace) {
      throw new AppError("Workspace does not exist ", HttpStatus.NOT_FOUND)
   }

   const decryptedEmail = await cryService.decryption(encryptedEmail)
   console.log(decryptedEmail , "Descrypted email : ")
   if (workspace.invitedUsers.includes(decryptedEmail)) {
      
      const updatedWorkspace = await workspaceRepo.updateSharedUser(decryptedEmail, workspaceId)
      const user = await userDb.findByEmail(decryptedEmail)
      if (user) {
         const response = { status: true, msg: "User has been added" }
         return response
      } else {
         const response = { status: false, msg: "User account is not registered" }
         return response
      }
   } else {
   

      if (workspace.sharedUsers.includes(decryptedEmail)) {
         const response = { status: true, msg: "User has been added" }
         return response
      }

      throw new AppError("Email is not their in the  invited list ", HttpStatus.NOT_FOUND)

   }
}
//----------------------------------------------- Reject invitation UseCase --------------------------------------------------//


//----------------------------------------------- Invite User UseCase --------------------------------------------------//


export const InviteUsers = async(workSpaceId: string, inviteList: [string] , workspaceRepo: ReturnType<typeofWorkspaceRepository>, userDb: ReturnType<typeOfUserRepository> , userId : string ) => {

   if (inviteList?.length) {
      const getUser = await userDb.findById(userId)

      await Promise.all(inviteList.map(async (email) => {
         
         const inviteDb = await workspaceRepo.inviteUser(workSpaceId , email)
         const encryptedEmail = await cryService.encryption(email)
         const response = await mailService.sendInviteLink(email, getUser as UserInterface, encryptedEmail, workSpaceId)
       }))
      return  {status : true , msg : "Email were sent "}
   }
   return {status : true , msg : "No inivitation was sent"}

}

export const getUserWorkspaces = async (userId: string,  workspaceRepo: ReturnType<typeofWorkspaceRepository> , userDb: ReturnType<typeOfUserRepository>) => {
   const user = await userDb.findById(userId)
   const userWorkspaces = await workspaceRepo.getUserWorkspaces(userId)
   
   const sharedWorkspaces = await workspaceRepo.getSharedWorkspaces(user?.email as string)
   return { userWorkspaces , sharedWorkspaces }

}


export const workspaceMembers = async(workspaceId: string,  workspaceRepo: ReturnType<typeofWorkspaceRepository> , userDb: ReturnType<typeOfUserRepository>)=>{
   const members = await workspaceRepo.getworkspaceMembers(workspaceId)
   return members 
}


export const workspaceDeleteUsecase = async(workspaceId : string , userId : string , workspaceRepo: ReturnType<typeofWorkspaceRepository> , userDb: ReturnType<typeOfUserRepository>
    , projectRepo : ReturnType<typeofProjectRepository>)=>{

   const projectResponse = await projectRepo.deleteWorkspaceProject(workspaceId)
   
   const workspaceResponse = await workspaceRepo.deleteWorkspace(workspaceId)
   return workspaceResponse
}