
import { typeOfWorkspaceDbRepository } from "../../frameworks/database/mongoDb/repositories/workspaceDbRepository"
import { typeofWorkspaceRepository } from "../../application/repositories/workspaceRepository"
import asyncHandler from "express-async-handler"
import { Request, Response } from "express"
import {  InviteUsers, acceptInvitationUseCase, getUserWorkspaces, workspaceCreation, workspaceDeleteUsecase, workspaceMembers } from "../../application/useCases/workSpace/worksSpace"
import { WorkspaceInterface } from "../../types/workspaceInterface"
import { typeOfUserRepositoryMongoDb } from "../../frameworks/database/mongoDb/repositories/userRepositoryMongoDb"
import { typeOfUserRepository } from "../../application/repositories/userDbRepository"
import { typeofProjectRepository } from "../../application/repositories/projectRepository"
import { typeofProjectDbRepository } from "../../frameworks/database/mongoDb/repositories/projectDbRepository"

const workspaceController = (
    workspaceRepository : typeofWorkspaceRepository , 
    workspaceDbRepository : typeOfWorkspaceDbRepository , 
    userRepository: typeOfUserRepository,
    userRepositoryMongoDb: typeOfUserRepositoryMongoDb,
    projectRepository : typeofProjectRepository, 
    projectDbRepository: typeofProjectDbRepository
)=>{

    const workSpaceDb  = workspaceRepository(workspaceDbRepository())
    const userDb = userRepository(userRepositoryMongoDb())
    const projectRepo = projectRepository(projectDbRepository())


    //---------------------------------Create Workspace Controller ----------------------------------//
    const createWorkspace = asyncHandler( async(req : Request , res : Response)=>{
        const userId = req.body.userId

        const workspaceDetails : WorkspaceInterface = req.body.workspace
        workspaceDetails.invitedUsers = req.body.inviteList

        const workspace = await workspaceCreation( workspaceDetails , userId , workSpaceDb , userDb )
        res.status(200).json({status : true , msg : "Workspace has been Created"})

    })

     //---------------------------------Accept workspace Invitation Controller ----------------------------------//
    const acceptInvitation = asyncHandler(async(req ,res )=>{
        const workspaceId = req.body.workspaceId 
        const email = req.body.email ;
        console.log(workspaceId , "WorkspaceId")
        const response = await acceptInvitationUseCase(workspaceId , email ,workSpaceDb ,userDb )
        console.log(response)
        res.status(200).json(response )
    })

    //---------------------------------Reject workspace Invitation Controller ----------------------------------//
    const rejectInvitation = asyncHandler(async(req ,res )=>{

    })

    //---------------------------------Get ALL Workspace Controller ----------------------------------//

    const getWorkspaces = asyncHandler(async(req : Request , res : Response)=>{
        
        const userId = req.body.userId
        console.log(userId)
       const response = await getUserWorkspaces(userId , workSpaceDb , userDb)
       res.json(response)

    })

    //-------------------------------------Invite user to a workspace -------------------------------//
    const inviteUsers = asyncHandler(async(req : Request , res : Response)=>{

        const { workspaceId , inviteList} : {workspaceId : string , inviteList : [string]} = req.body
        console.log(inviteList)
        const response = await InviteUsers(workspaceId , inviteList ,workSpaceDb ,userDb , req.body.userId)
        console.log(response)
        res.json(response)  

    })

    //------------------------------Get Specific Workspace Controller ------------------------------//

    const getWorkspaceDetails = asyncHandler(async(req: Request , res : Response )=>{

        const workspaceId : string = req.params.id
        console.log(workspaceId)

    })

    //------------------------------Get Workspace Members -------------------------------------------//

    const getMembers = asyncHandler(async(req : Request , res : Response)=>{
        const workspaceId = req.params.workspaceId
        const members  = await workspaceMembers(workspaceId , workSpaceDb , userDb )
        res.json(members)

    })

    //-----------------------------------Delete Workspace --------------------------------------------//

    const deleteWorkspace = asyncHandler(async(req : Request , res : Response)=>{

        const workspaceId = req.params.workspaceId
        const userId = req.body.userId
        const response = await workspaceDeleteUsecase(workspaceId , userId , workSpaceDb , userDb , projectRepo)
        res.json(response)

    })


    return{createWorkspace , getWorkspaces , getWorkspaceDetails , acceptInvitation , rejectInvitation , inviteUsers , getMembers , deleteWorkspace}
}
export default workspaceController