
import { typeOfWorkspaceDbRepository } from "../../frameworks/database/mongoDb/repositories/workspaceDbRepository"
import { typeofWorkspaceRepository } from "../../application/repositories/workspaceRepository"
import asyncHandler from "express-async-handler"
import { Request, Response } from "express"

const workspaceController = (
    workspaceRepository : typeofWorkspaceRepository , 
    workspaceDbRepository : typeOfWorkspaceDbRepository
)=>{

    const workSpaceDb  = workspaceRepository(workspaceDbRepository())

    const createWorkspace = asyncHandler( async(req : Request , res : Response)=>{


    })
    const getWorkspaces = asyncHandler(async(req : Request , res : Response)=>{
        const userId = req.body.userId
        console.log




    })


    return{createWorkspace , getWorkspaces}
}
export default workspaceController