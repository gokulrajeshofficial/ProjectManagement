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
        const response = await taskModel.find({assginees : email , status : false }).populate('projectId').populate('createdBy').exec()
        console.log(response)
        return response
    }
    const updateTask = async(taskupt : taskInterface)=>{

        const response = await taskModel.findOneAndUpdate({_id : taskupt._id} , { 
            $set : {
                title: taskupt.title,
                description: taskupt.description,
                priority: taskupt.priority,
                dueDate: taskupt.dueDate,
                assginees : taskupt.assginees ,
                status : taskupt.status
                
            }
        } , {new : true})
        // console.log(response)
        return response
    }

    const deleteTask = async(id : string)=>{
        console.log(id , "TaskID ")
        const response =  await taskModel.deleteOne({_id : id})
        return response
    }

    return { createTask , getAllTask , getTaskById , getTaskUser , updateTask , deleteTask}

}

export default taskDbRepository

export type typeOftaskDbRepository  = typeof taskDbRepository