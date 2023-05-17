import { taskInterface } from "../../../types/taskInterface"
import { typeOfTaskRepository } from "../../repositories/taskRepository"


export const taskCreation = async(taskRepo : ReturnType<typeOfTaskRepository> , task : taskInterface , )=>{
    const response = await taskRepo.createTask(task)
    return response
}
export const getAllTaskUsecase = async(taskRepo : ReturnType<typeOfTaskRepository> , projectId : string)=>{
    const response = await taskRepo.getAllTask(projectId)
    return response
}

export const getTaskDetails = async(taskRepo : ReturnType<typeOfTaskRepository> , taskId : string)=>{
    const response = await taskRepo.getTaskById(taskId)
    return response
}

export const getAllTaskUser = async(taskRepo : ReturnType<typeOfTaskRepository> , email : string )=>{

    const response = await taskRepo.getTaskUser(email)
    return response

}

export const  taskUpdation = async(taskRepo: ReturnType<typeOfTaskRepository>  , taskupt : taskInterface )=>{

    console.log("Reached taskUpdation" )
    console.log(taskupt)

    const response = await taskRepo.updateTask(taskupt)
    return response

}

export const taskDeletion = async(taskRepo :  ReturnType<typeOfTaskRepository> , taskId : string)=>{
    const response  = await taskRepo.deleteTask(taskId)
    console.log(response)
    return response
}