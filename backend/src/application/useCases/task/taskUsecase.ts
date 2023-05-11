import { taskInterface } from "../../../types/taskInterface"
import { typeOfTaskRepository } from "../../repositories/taskRepository"


export const taskCreation = async(taskRepo : ReturnType<typeOfTaskRepository> , task : taskInterface)=>{
    const response = await taskRepo.createTask(task)
    return response
}
export const getAllTaskUsecase = async(taskRepo : ReturnType<typeOfTaskRepository>)=>{
    const response = await taskRepo.getAllTask()
    return response

}