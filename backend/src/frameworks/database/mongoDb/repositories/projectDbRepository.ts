
import mongoose from "mongoose"
import { ProjectInterface } from "../../../../types/projectInterface"
import projectModel from "../models/projectModel"

export default function projectDbRepository() {

    const createProject = async (projectDetails: ProjectInterface) => {
        const response = await projectModel.create(projectDetails)
        console.log(response)
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

    return { createProject, getUserProjects }
}

export type typeofProjectDbRepository = typeof projectDbRepository