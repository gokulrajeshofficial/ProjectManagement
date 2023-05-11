import express, { Request, Response, response } from 'express'
import { typeofWorkspaceRepository } from '../../application/repositories/workspaceRepository'
import { typeOfWorkspaceDbRepository } from '../../frameworks/database/mongoDb/repositories/workspaceDbRepository'
import { typeOfUserRepository } from '../../application/repositories/userDbRepository'
import { typeOfUserRepositoryMongoDb } from '../../frameworks/database/mongoDb/repositories/userRepositoryMongoDb'
import { typeofProjectDbRepository } from '../../frameworks/database/mongoDb/repositories/projectDbRepository'
import { typeofProjectRepository } from '../../application/repositories/projectRepository'
import { getAllMembersOfProject, getWorkspaceProjects, projectCreation, projectGetAll } from '../../application/useCases/project/projectUsecase'
import { ProjectInterface } from '../../types/projectInterface'
import asyncHandler from 'express-async-handler'


const projectController = (
    workspaceRepository : typeofWorkspaceRepository , 
    workspaceDbRepository : typeOfWorkspaceDbRepository , 
    userRepository: typeOfUserRepository,
    userRepositoryMongoDb: typeOfUserRepositoryMongoDb,
    projectRepository : typeofProjectRepository, 
    projectDbRepository: typeofProjectDbRepository
)=>{
    const userRepo = userRepository(userRepositoryMongoDb())
    const projectRepo = projectRepository(projectDbRepository())
    const workspaceRepo = workspaceRepository(workspaceDbRepository())

    const createNewProject = asyncHandler(async(req : Request ,res : Response )=>{

        const userId : string  = req.body.userId 
        const projectDetails : ProjectInterface = req.body
        projectDetails.createdBy = userId
        console.log(userId , projectDetails)
        const response = await projectCreation(projectDetails , projectRepo)

        res.json(response)
    })

    const getAllProjects = asyncHandler(async(req : Request, res : Response)=>{
        const userId : string = req.body.userId
        const response = await projectGetAll(userId , projectRepo , userRepo)
        res.json(response)

    })

    const workspaceProjects = asyncHandler(async(req : Request, res : Response)=>{
        const workspaceId : string = req.params.workspaceId

        const response = await getWorkspaceProjects(workspaceId , projectRepo)
        console.log(response)
        res.json(response)

    })

    const projectMembers = asyncHandler(async(req : Request, res : Response)=>{
        const projectId : string = req.params.projectId
        const response = await getAllMembersOfProject(projectId , projectRepo)

        res.json(response)
    })


    return {createNewProject , getAllProjects , workspaceProjects , projectMembers}

}

export default projectController