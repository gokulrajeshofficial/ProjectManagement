import { typeOftaskDbRepository } from "../../frameworks/database/mongoDb/repositories/taskDbRepository"
import { taskInterface } from "../../types/taskInterface"

const taskRepository = (repository : ReturnType<typeOftaskDbRepository>)=>{

    const createTask = (data : taskInterface)=>{ return repository.createTask(data)}
    const getAllTask = (projectId : string)=>{ return repository.getAllTask(projectId )}
    const getTaskById = (taskId : string)=>{return repository.getTaskById(taskId)}
    
    return{createTask , getAllTask , getTaskById}

}

export default taskRepository

export type typeOfTaskRepository = typeof taskRepository