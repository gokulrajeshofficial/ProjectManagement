import { typeOftaskDbRepository } from "../../frameworks/database/mongoDb/repositories/taskDbRepository"
import { taskInterface } from "../../types/taskInterface"

const taskRepository = (repository : ReturnType<typeOftaskDbRepository>)=>{

    const createTask = (data : taskInterface)=>{ return repository.createTask(data)}
    const getAllTask = ()=>{ return repository.getAllTask()}

    return{createTask , getAllTask}

}

export default taskRepository

export type typeOfTaskRepository = typeof taskRepository