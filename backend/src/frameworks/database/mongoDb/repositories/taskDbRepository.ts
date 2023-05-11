import { taskInterface } from "../../../../types/taskInterface"
import taskModel from "../models/taskModel"



const taskDbRepository = ()=>{

    const createTask = async(data : taskInterface)=>{

        const response = await taskModel.create(data)

        return response
    }

    const getAllTask  = async() => {
        const response = await taskModel.find({})
        return 
    }



    return { createTask , getAllTask }

}

export default taskDbRepository

export type typeOftaskDbRepository  = typeof taskDbRepository