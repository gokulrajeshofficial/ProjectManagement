import {typeOfWorkspaceDbRepository} from "../../frameworks/database/mongoDb/repositories/workspaceDbRepository"
import { WorkspaceInterface } from "../../types/workspaceInterface"



const workspaceRepository = (repository : ReturnType<typeOfWorkspaceDbRepository>)=>{

    const createWorkspace = async(workspaceDetails  : WorkspaceInterface)=>{return repository.createWorkspace(workspaceDetails)}

    const getUserWorkspaces  = async(userId :string) => { return repository.getUserWorkspaces(userId)}

    const getSharedWorkspaces = async(email : string)=>{  return await repository.getSharedWorkspaces(email)}

    const getWorkspaceById = async(workspaceId  : string)=>{ return repository.getWorkspaceById(workspaceId)}

    const updateSharedUser = async(decryptedEmail : string , workspaceId : string )=>{ return repository.updateSharedUser(decryptedEmail , workspaceId ) }

    const getworkspaceMembers = async(workspaceId : string ) => { return repository.getworkspaceMembers(workspaceId)}
    return { createWorkspace , getUserWorkspaces , getSharedWorkspaces , getWorkspaceById , updateSharedUser , getworkspaceMembers}
}

export default workspaceRepository

export type typeofWorkspaceRepository = typeof workspaceRepository