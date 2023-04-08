import { ObjectId } from "mongoose";


export interface WorkspaceInterface{
    workspaceName : string ;
    theme? : string ; 
    createdBy? : string ;
    sharedUsers? : [string];
    invitedUsers? : [string];
    date? : Date;
}