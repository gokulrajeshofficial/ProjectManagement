
import { typeOfWorkspaceDbRepository } from "../../frameworks/database/mongoDb/repositories/workspaceDbRepository"
import { typeofWorkspaceRepository } from "../../application/repositories/workspaceRepository"
import asyncHandler from "express-async-handler"
import { Request, Response, response } from "express"
import { getUserWorkspaces, workspaceCreation } from "../../application/useCases/workSpace/worksSpace"
import { WorkspaceInterface } from "../../types/workspaceInterface"
import { typeOfUserRepositoryMongoDb } from "../../frameworks/database/mongoDb/repositories/userRepositoryMongoDb"
import { typeOfUserRepository } from "../../application/repositories/userDbRepository"

const workspaceController = (
    workspaceRepository : typeofWorkspaceRepository , 
    workspaceDbRepository : typeOfWorkspaceDbRepository , 
    userRepository: typeOfUserRepository,
    userRepositoryMongoDb: typeOfUserRepositoryMongoDb,
)=>{

    const workSpaceDb  = workspaceRepository(workspaceDbRepository())
    const userDb = userRepository(userRepositoryMongoDb())


    //---------------------------------Create Workspace Controller ----------------------------------//
    const createWorkspace = asyncHandler( async(req : Request , res : Response)=>{
        const userId = req.body.userId

        const workspaceDetails : WorkspaceInterface = req.body.workspace
        workspaceDetails.invitedUsers = req.body.inviteList

        const workspace = await workspaceCreation( workspaceDetails , userId , workSpaceDb , userDb )
        res.status(200).json({status : true , msg : "Workspace has been Created"})

    })

    //---------------------------------Get ALL Workspace Controller ----------------------------------//

    const getWorkspaces = asyncHandler(async(req : Request , res : Response)=>{
        
        const userId = req.body.userId
        console.log(userId)
       const response = await getUserWorkspaces(userId , workSpaceDb)
       res.json(response)

    })

    //------------------------------Get Specific Workspace Controller ------------------------------//

    const getWorkspaceDetails = asyncHandler(async(req: Request , res : Response )=>{

        const workspaceId : string = req.params.id
        console.log(workspaceId)

    })


    return{createWorkspace , getWorkspaces , getWorkspaceDetails}
}
export default workspaceController