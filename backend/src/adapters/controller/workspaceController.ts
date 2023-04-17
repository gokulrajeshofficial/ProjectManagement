
import { typeOfWorkspaceDbRepository } from "../../frameworks/database/mongoDb/repositories/workspaceDbRepository"
import { typeofWorkspaceRepository } from "../../application/repositories/workspaceRepository"
import asyncHandler from "express-async-handler"
import { Request, Response, response } from "express"
import { getUserWorkspaces, workspaceCreation } from "../../application/useCases/workSpace/worksSpace"

const workspaceController = (
    workspaceRepository : typeofWorkspaceRepository , 
    workspaceDbRepository : typeOfWorkspaceDbRepository
)=>{

    const workSpaceDb  = workspaceRepository(workspaceDbRepository())

    const createWorkspace = asyncHandler( async(req : Request , res : Response)=>{


    })

    const getWorkspaces = asyncHandler(async(req : Request , res : Response)=>{
        
        const userId = req.body.userId
        console.log(userId)
       const response = await getUserWorkspaces(userId , workSpaceDb)
       res.json(response)

    })


    return{createWorkspace , getWorkspaces}
}
export default workspaceController