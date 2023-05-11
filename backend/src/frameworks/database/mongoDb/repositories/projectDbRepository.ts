
import mongoose from "mongoose"
import { ProjectInterface } from "../../../../types/projectInterface"
import projectModel from "../models/projectModel"

export default function projectDbRepository() {

    const createProject = async (projectDetails: ProjectInterface) => {
        const response = await projectModel.create(projectDetails)
        return response
    }
    const getUserProjects = async (email: string) => {

        try {
            const projects = await projectModel.find({ projectMembers: email }).populate('workspace').populate('createdBy').exec()

            return projects
        } catch (error) {
            console.log(error)
        }
    }
    const workspaceProjects = async (id: string) => {
        const workspaceId = new mongoose.Types.ObjectId(id)

        try {
            const response = await projectModel.find({ workspace: workspaceId }).populate('workspace').populate('createdBy').exec()
            return response

        } catch (err) {
            console.log(err, "error inside project db")
        }

    }
    const deleteWorkspaceProject = async (id: string) => {
        const workspaceId = new mongoose.Types.ObjectId(id)
        try {
            const response = await projectModel.deleteMany({ workspace: workspaceId })
            return response

        } catch (err) {
            console.log(err, "error inside project db")
        }

    }
    const getProjectMembers = async (id: string) => {
        const projectId = new mongoose.Types.ObjectId(id)
        const response = await projectModel.aggregate([
            {
                $match: {
                    _id: projectId
                }
            }, {
                $unwind: "$projectMembers"
            }, 
            {
                $lookup: {
                    from: "userdetails",
                    foreignField: "email",
                    localField: "projectMembers",
                    as: "projectMembers"
                }
            },
            {
                $project: {
                    projectMembers:  { $arrayElemAt: [ "$projectMembers", 0 ] }
                }
            }
        ])

        console.log(response)

        return response

    }

    return { createProject, getUserProjects, workspaceProjects, deleteWorkspaceProject, getProjectMembers }
}

export type typeofProjectDbRepository = typeof projectDbRepository