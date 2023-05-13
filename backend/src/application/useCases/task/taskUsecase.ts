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
