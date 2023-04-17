import { WorkspaceInterface } from "../../../../types/workspaceInterface";
import workspaceModel from "../models/workspaceModel";

export default function workspaceDbRepository(){
    const createWorkspace = async(workspaceDetails  : WorkspaceInterface)=>{
        return await workspaceModel.create(workspaceDetails)
    }
    const getUserWorkspaces = async(userId : string)=>{
        return await workspaceModel.find({ createdBy : userId })
    }


    return {
        createWorkspace, getUserWorkspaces
    }

}

export type typeOfWorkspaceDbRepository = typeof workspaceDbRepository