import { taskInterface } from "../../../../types/taskInterface"
import taskModel from "../models/taskModel"



const taskDbRepository = ()=>{

    const createTask = async(data : taskInterface)=>{

        const response = await taskModel.create(data)

        return response
    }

    const getAllTask  = async(projectId : string) => {
  
        const response = await taskModel.find({ projectId : projectId }).populate('projectId').exec()
        console.log(response)
        return response
    }
    const getTaskById = async(taskId : string)=>{

        const response = await taskModel.findOne({ _id : taskId }).populate('projectId').populate({
            path: 'projectId',
            populate: {
              path: 'workspace'
            }
          }).populate('createdBy').exec()
        console.log(response)
        return response

    }
    const getTaskUser = async(email : string)=>{
        const response = await taskModel.find({assginees : email })
        console.log(response)
        return response
    }

    return { createTask , getAllTask , getTaskById , getTaskUser}

}

export default taskDbRepository

export type typeOftaskDbRepository  = typeof taskDbRepository