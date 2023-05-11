import { typeofProjectDbRepository } from "../../frameworks/database/mongoDb/repositories/projectDbRepository";
import { ProjectInterface } from "../../types/projectInterface";


export default function projectRepository(repository : ReturnType<typeofProjectDbRepository>){

    const createProject = (projectDetails : ProjectInterface)=>{return repository.createProject(projectDetails)}

    const getUserProjects = (email : string )=>{return repository.getUserProjects(email)}
     
    const workspaceProjects = (workspaceId : string)=>{return repository.workspaceProjects(workspaceId)}
    
    const deleteWorkspaceProject = (workspaceId : string)=>{return repository.deleteWorkspaceProject(workspaceId)}

    const getProjectMembers = (projectId : string)=>{return repository.getProjectMembers(projectId)}
    return { createProject , getUserProjects , workspaceProjects , deleteWorkspaceProject , getProjectMembers}

}

export type typeofProjectRepository = typeof projectRepository