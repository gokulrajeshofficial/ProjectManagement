import { typeOftaskDbRepository } from "../../frameworks/database/mongoDb/repositories/taskDbRepository"
import { taskInterface } from "../../types/taskInterface"

const taskRepository = (repository : ReturnType<typeOftaskDbRepository>)=>{

    const createTask = (data : taskInterface)=>{ return repository.createTask(data)}
    const getAllTask = (projectId : string)=>{ return repository.getAllTask(projectId )}
    const getTaskById = (taskId : string)=>{return repository.getTaskById(taskId)}
    const getTaskUser = (email : string)=>{return repository.getTaskUser(email)}
    
    return{createTask , getAllTask , getTaskById , getTaskUser}

}

export default taskRepository

export type typeOfTaskRepository = typeof taskRepository