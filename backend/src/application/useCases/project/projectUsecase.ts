import { HttpStatus } from "../../../types/httpStatus";
import { ProjectInterface } from "../../../types/projectInterface";
import AppError from "../../../utils/appError";
import { typeofProjectRepository } from "../../repositories/projectRepository";
import { typeOfUserRepository } from "../../repositories/userDbRepository";




export const projectCreation = async(projectDetails : ProjectInterface , projectRepo : ReturnType<typeofProjectRepository>)=>{

    const newProject = await projectRepo.createProject(projectDetails)

    return newProject

}


export const projectGetAll = async(userId : string , projectRepo : ReturnType<typeofProjectRepository> , userRepo : ReturnType<typeOfUserRepository> )=>{

    const user  = await userRepo.findById(userId)
    if(user)
    {
        const projects = await projectRepo.getUserProjects(user.email as string)
        return projects

    }

    throw new AppError("User Doesn't exist", HttpStatus.UNAUTHORIZED)
}

export const getWorkspaceProjects = async( workspaceId : string , projectRepo :   ReturnType<typeofProjectRepository> )=>{

    const workspaceProjects = await projectRepo.workspaceProjects(workspaceId)
    return workspaceProjects

}
