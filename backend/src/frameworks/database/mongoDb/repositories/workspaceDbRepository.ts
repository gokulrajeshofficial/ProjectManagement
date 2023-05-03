import mongoose, { ObjectId } from "mongoose";
import { WorkspaceInterface } from "../../../../types/workspaceInterface";
import workspaceModel from "../models/workspaceModel";
;

export default function workspaceDbRepository() {
    const createWorkspace = async (workspaceDetails: WorkspaceInterface) => {
        return await workspaceModel.create(workspaceDetails)
    }
    const getUserWorkspaces = async (userId: string) => {
        let userObj = new mongoose.Types.ObjectId(userId)
        const response = await workspaceModel.aggregate([
            {
                $match: { createdBy: userObj }
            }, {
                $lookup: {
                    from: 'userdetails',
                    localField: 'createdBy',
                    foreignField: '_id',
                    as: 'createdBy'
                }
            },
            {
                $addFields: {
                    createdBy: { $arrayElemAt: ['$createdBy', 0] }
                }
            }
        ])
        console.log(response)
        return response
    }
    const getSharedWorkspaces = async (email: string) => {
        return await workspaceModel.find({ sharedUsers: email })
    }
    const getWorkspaceById = async (workspaceId: string) => {
        return await workspaceModel.findById(workspaceId)
    }

    const updateSharedUser = async (decryptedEmail: string, id: string) => {
        try {
            const workspaceId = new mongoose.Types.ObjectId(id)
            const response = await workspaceModel.findByIdAndUpdate(workspaceId, { $addToSet: { sharedUsers: decryptedEmail } })
            console.log(response)
            return response
        } catch (err) {
            console.error("Error : ", err)
        }

    }

    const inviteUser = async( id : string , email : string)=>{
        try{
            const workspaceId = new mongoose.Types.ObjectId(id)
            const response = await workspaceModel.findByIdAndUpdate(workspaceId, { $addToSet: { invitedUsers: email } })
            return response
        }catch(err){
            console.error("Error at DB repo" , err)
        }

    }

    const getworkspaceMembers = async (id: string) => {
        const workspaceId = new mongoose.Types.ObjectId(id)
        console.log(workspaceId)
        let response = await workspaceModel.aggregate([
            {
                $match: { _id: workspaceId }
            },
            {
                $unwind :  "$sharedUsers"
            },
            {
                $lookup: {
                    from: "userdetails",
                    foreignField: "email",
                    localField: "sharedUsers",
                    as : "sharedUser"
                }
            },{
                $project : {
                    "sharedUser" : { $arrayElemAt: ['$sharedUser', 0] },
                    "_id" : 0
                }
            }
        ])
        console.log(response, " shared Users are : ")

        return response
    }


    return {
        createWorkspace, getUserWorkspaces, getWorkspaceById, getSharedWorkspaces , inviteUser, updateSharedUser, getworkspaceMembers
    }

}

export type typeOfWorkspaceDbRepository = typeof workspaceDbRepository