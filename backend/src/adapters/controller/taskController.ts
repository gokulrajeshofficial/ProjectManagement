import { Request, Response } from "express"
import { typeOfTaskRepository } from "../../application/repositories/taskRepository"
import { typeOftaskDbRepository } from "../../frameworks/database/mongoDb/repositories/taskDbRepository"
import asyncHandler from "express-async-handler"
import { taskInterface } from "../../types/taskInterface"
import { getAllTaskUsecase, taskCreation } from "../../application/useCases/task/taskUsecase"


const taskController = (

    taskRepository :   typeOfTaskRepository, 
    taskDbRepository : typeOftaskDbRepository

)=>{

    const taskRepo =  taskRepository(taskDbRepository())

    const createTask = asyncHandler(async(req : Request , res : Response)=>{
        const task : taskInterface  =  req.body.task
        task.createdBy = req.body.userId

        const response = await taskCreation(taskRepo , task ) 

        res.status(200).json(response)

    }) 
    
    const getAllTasks = asyncHandler(async(req : Request , res : Response)=>{

        const tasks = await getAllTaskUsecase( taskRepo)

    })


    return { createTask , getAllTasks}


}

export default taskController