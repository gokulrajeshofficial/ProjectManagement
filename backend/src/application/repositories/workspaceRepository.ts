import {typeOfWorkspaceDbRepository} from "../../frameworks/database/mongoDb/repositories/workspaceDbRepository"
import { WorkspaceInterface } from "../../types/workspaceInterface"



const workspaceRepository = (repository : ReturnType<typeOfWorkspaceDbRepository>)=>{

    const createWorkspace = async(workspaceDetails  : WorkspaceInterface)=>{return repository.createWorkspace(workspaceDetails)}

    const getWorkspaces  = async() => { return repository}

    return { createWorkspace }
}

export default workspaceRepository

export type typeofWorkspaceRepository = typeof workspaceRepository