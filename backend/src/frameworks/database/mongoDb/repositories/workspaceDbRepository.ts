import { WorkspaceInterface } from "../../../../types/workspaceInterface";
import workspaceModel from "../models/workspaceModel";
import { ObjectId} from 'mongoose'

export default function workspaceDbRepository(){
    const createWorkspace = async(workspaceDetails  : WorkspaceInterface)=>{
        return await workspaceModel.create(workspaceDetails)
    }


    return {
        createWorkspace
    }

}

export type typeOfWorkspaceDbRepository = typeof workspaceDbRepository