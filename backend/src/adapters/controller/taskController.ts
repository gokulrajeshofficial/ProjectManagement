import { Request, Response } from "express"
import { typeOfTaskRepository } from "../../application/repositories/taskRepository"
import { typeOftaskDbRepository } from "../../frameworks/database/mongoDb/repositories/taskDbRepository"
import asyncHandler from "express-async-handler"
import { taskInterface } from "../../types/taskInterface"
import { getAllTaskUsecase, getAllTaskUser, getTaskDetails, taskCreation, taskDeletion, taskUpdation } from "../../application/useCases/task/taskUsecase"


const taskController = (

    taskRepository :   typeOfTaskRepository, 
    taskDbRepository : typeOftaskDbRepository

)=>{

    const taskRepo =  taskRepository(taskDbRepository())

    const createTask = asyncHandler(async(req : Request , res : Response)=>{
        const task : taskInterface  =  req.body.task
        task.createdBy = req.body.userId
     
        const response = await taskCreation(taskRepo , task , ) 

        res.status(200).json(response)

    }) 
    
    const getAllTasks = asyncHandler(async(req : Request , res : Response)=>{
        const projectId = req.params.projectId
        const tasks = await getAllTaskUsecase( taskRepo , projectId)

        res.json(tasks)

    })
    const getTask = asyncHandler(async(req : Request ,res : Response )=>{

        const taskId = req.params.taskId;
        const response = await getTaskDetails(taskRepo , taskId)
        res.json(response)
    })

    const getUserTasks = asyncHandler(async(req : Request ,res : Response)=>{
        const email = req.params.email
        const response = await getAllTaskUser(taskRepo , email)
        res.json(response)

    })

    const updateTask = asyncHandler(async(req : Request ,res : Response)=>{
        const taskupt = req.body.task
        const updatedTask = await taskUpdation(taskRepo , taskupt)
        res.json(updatedTask)

    })
    
    const deleteTask = asyncHandler(async(req : Request ,res : Response)=>{
        const taskId = req.params.taskId
        const response = await taskDeletion(taskRepo , taskId)
        res.json(response)

    })



    return { createTask , getAllTasks , getTask , getUserTasks , updateTask , deleteTask}


}

export default taskController