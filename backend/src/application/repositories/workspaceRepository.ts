import {typeOfWorkspaceDbRepository} from "../../frameworks/database/mongoDb/repositories/workspaceDbRepository"
import { WorkspaceInterface } from "../../types/workspaceInterface"



const workspaceRepository = (repository : ReturnType<typeOfWorkspaceDbRepository>)=>{

    const createWorkspace = async(workspaceDetails  : WorkspaceInterface)=>{return repository.createWorkspace(workspaceDetails)}

    const getUserWorkspaces  = async(userId :string) => { return repository.getUserWorkspaces(userId)}

    const sharedUserWorkspaces = async()=>{}
    return { createWorkspace , getUserWorkspaces }
}

export default workspaceRepository

export type typeofWorkspaceRepository = typeof workspaceRepository